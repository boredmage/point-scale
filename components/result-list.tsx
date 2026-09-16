import { calculateCGPA, getGrade } from '@/constants/utils';
import { useBottomSheetContext } from '@/context/bottom-sheet-context';
import { cn } from '@/lib/utils';
import { CourseType, useCourseStore } from '@/store/courses-store';
import { useSemesterStore } from '@/store/semester-store';
import { useUserStore } from '@/store/user-store';
import { AntDesign } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Link } from 'expo-router';
import { default as React, useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import GradeTile from './grade-tile';
import { Point } from './icons';
import Text from './text';

const ResultList = ({ activeSemesterId }: { activeSemesterId: string | null }) => {
  const [cgpa, setCgpa] = useState(0);
  const { getCourses, courseOrder, courses: default_list } = useCourseStore((store) => store);
  const courses = useMemo(() => {
    const allCourses = getCourses();
    return allCourses;
  }, [getCourses, courseOrder, default_list]);
  const results = courses.filter((course) => course.session_id === activeSemesterId);
  const semester = useSemesterStore((store) => store.semesters);
  const semesterDetails = semester.find((semester) => semester.id === activeSemesterId);
  const { gradeScale } = useUserStore();

  const semesterName = semesterDetails
    ? `${semesterDetails.session} ${semesterDetails.semester}`
    : '';

  useEffect(() => {
    const result = calculateCGPA(results, gradeScale);
    setCgpa(result[3] || 0);
  }, [results]);

  const ResultCard = ({ item }: { item: CourseType }) => {
    const { course_title, course_code, course_units, result } = item;
    const { open, setActiveResultId } = useBottomSheetContext();

    const openBottomSheet = () => {
      setActiveResultId(item.id);
      open('result');
    };

    const openActions = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setActiveResultId(item.id);
      open('courseActions');
    };

    return (
      <Pressable
        onPress={openBottomSheet}
        onLongPress={openActions}
        delayLongPress={350}
        accessibilityHint="Long press for edit and delete options"
        className={cn(
          'flex-row items-center gap-3.5 rounded-2xl bg-white px-4 py-3.5',
          'active:bg-surface',
        )}
      >
        <View className="flex-1 gap-0.5">
          <Text className="text-lg text-ink" numberOfLines={1}>
            {course_title}
          </Text>
          <View className="flex-row items-center">
            <Text className="text-sm text-muted">{course_code}</Text>
            <Point width={10} height={10} fill="#C4C6D4" style={{ marginHorizontal: 6 }} />
            <Text className="text-sm text-muted">
              {course_units} unit{course_units && course_units > 1 ? 's' : ''}
            </Text>
          </View>
        </View>
        <GradeTile grade={getGrade(result || 0, gradeScale)} />
      </Pressable>
    );
  };

  return (
    <FlatList
      data={results}
      ListHeaderComponentClassName="pb-1 pt-6"
      ListHeaderComponent={
        <View className="flex-row items-end justify-between">
          <View className="gap-0.5">
            <Text className="text-lg font-medium text-ink">{semesterName}</Text>
            <View className="flex-row items-center">
              <Text className="text-[13px] text-muted">
                {results.length} course{results.length === 1 ? '' : 's'}
              </Text>
              <Point width={10} height={10} fill="#C4C6D4" style={{ marginHorizontal: 6 }} />
              <Text className="text-[13px] text-muted">GPA {cgpa}</Text>
            </View>
          </View>
          <Link
            href={{
              pathname: '/manage-course/[semester-id]',
              params: { 'semester-id': activeSemesterId! },
            }}
            asChild
          >
            <Pressable
              hitSlop={8}
              className="h-11 flex-row items-center gap-2 rounded-lg bg-primary px-4"
            >
              <AntDesign name="plus" size={16} color="#fff" />
              <Text className="text-[15px] text-white">Add course</Text>
            </Pressable>
          </Link>
        </View>
      }
      renderItem={({ item }) => <ResultCard item={item} />}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      className="flex-1"
      contentContainerClassName="gap-3 pb-32"
      ListEmptyComponent={
        <View className="mt-10 items-center gap-1">
          <Text className="text-center text-xl text-ink">No courses yet</Text>
          <Text className="text-center text-sm text-muted">Tap Add course to get started</Text>
        </View>
      }
    />
  );
};

export default ResultList;
