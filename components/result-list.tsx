import { calculateCGPA, getGrade } from '@/constants/utils';
import { useBottomSheetContext } from '@/context/bottom-sheet-context';
import { cn } from '@/lib/utils';
import { CourseType, useCourseStore } from '@/store/courses-store';
import { useSemesterStore } from '@/store/semester-store';
import { useUserStore } from '@/store/user-store';
import { AntDesign, Entypo } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Link } from 'expo-router';
import { default as React, useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { GetGradeIcon } from './getGradeIcon';
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
          'box-border flex-row justify-between rounded-lg border border-[#c5c5c5] bg-white p-4',
          'active:bg-[#f3f4f6]',
        )}
      >
        <View className="flex-1">
          <View className="w-11/12 flex-row items-center gap-2">
            <Text className="text-lg" numberOfLines={1}>
              {course_title}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-[#606067]">{course_code}</Text>
            <Entypo name="dot-single" size={24} color="#606067" />
            <Text className="text-[#606067]">
              {course_units} Unit{course_units && course_units > 1 ? 's' : ''}
            </Text>
          </View>
        </View>
        <GetGradeIcon grade={getGrade(result || 0, gradeScale)} />
      </Pressable>
    );
  };

  return (
    <FlatList
      data={results}
      ListHeaderComponentClassName="pt-4"
      ListHeaderComponent={
        <View className="flex-row justify-between">
          <View>
            <View className="flex-row items-center gap-2">
              <Text className="text-lg">{semesterName}</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-[#606067]">Current CGPA: {cgpa}</Text>
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
              className="flex-row items-center gap-2 rounded-lg bg-primary px-4 py-2"
            >
              <AntDesign name="plus" size={16} color="#fff" />
              <Text className="font-system text-white">Add Course</Text>
            </Pressable>
          </Link>
        </View>
      }
      renderItem={({ item }) => <ResultCard item={item} />}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      className="flex-1"
      contentContainerClassName="gap-4 pb-28"
      ListEmptyComponent={
        <View className="mt-12 flex-1 self-center justify-self-center">
          <Text className="text-center text-xl text-black">No courses added yet</Text>
          <Text className="text-center text-sm text-[#606067]">
            Tap the button above to add a course
          </Text>
        </View>
      }
    />
  );
};

export default ResultList;
