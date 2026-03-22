import { calculateCGPA, getGrade } from '@/constants/utils';
import { useBottomSheetContext } from '@/context/bottom-sheet-context';
import { cn } from '@/lib/utils';
import { CourseType, useCourseStore } from '@/store/courses-store';
import { useSemesterStore } from '@/store/semester-store';
import { useUserStore } from '@/store/user-store';
import { AntDesign, Entypo } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';
import { default as React, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, FlatList, Pressable, View } from 'react-native';
import ReanimatedSwipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import { GetGradeIcon } from './getGradeIcon';
import { Pencil } from './icons';
import Text from './text';

interface ActionProps extends React.ComponentProps<typeof Pressable> {
  onPress: () => void;
  semesterId: string;
  courseId: string;
}

function RightAction({ semesterId, courseId, onPress }: ActionProps) {
  return (
    <View className="h-full w-2/5 flex-row">
      <Link
        href={{
          pathname: '/manage-course/[semester-id]',
          params: { 'semester-id': semesterId, 'course-id': courseId },
        }}
        asChild
      >
        <Pressable className="block h-full flex-1 items-center justify-center bg-[#5271FF]">
          <Pencil stroke="#fff" />
        </Pressable>
      </Link>
      <Pressable
        className="block h-full flex-1 items-center justify-center rounded-lg rounded-l-none bg-[#DC3545]"
        onPress={onPress}
      >
        <Feather name="trash-2" size={24} color="#fff" />
      </Pressable>
    </View>
  );
}

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
  const openSwipeableRef = useRef<SwipeableMethods | null>(null);
  const { gradeScale } = useUserStore();

  const semesterName = semesterDetails
    ? `${semesterDetails.session} ${semesterDetails.semester}`
    : '';

  useEffect(() => {
    const result = calculateCGPA(results, gradeScale);
    setCgpa(result[3] || 0);
  }, [results]);

  const ResultCard = ({ item }: { item: CourseType }) => {
    const swipeableRef = useRef<SwipeableMethods | null>(null);
    const { course_title, course_code, course_units, result } = item;
    const [swipedToLeft, setSwipedToLeft] = useState(false);
    const [swipedToRight, setSwipedToRight] = useState(false);
    const removeCourse = useCourseStore((store) => store.removeCourse);
    const { open, setActiveResultId } = useBottomSheetContext();

    const openBottomSheet = () => {
      setActiveResultId(item.id);
      open('result');
    };

    const handleDelete = () => {
      Alert.alert(`Are you sure you want to delete ${course_code}?`, 'It will be gone for good', [
        {
          text: 'Yes',
          onPress: () => {
            removeCourse(item.id);
          },
          style: 'destructive',
        },
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => swipeableRef.current?.close(),
        },
      ]);
    };

    const openHandlerCallback = useCallback((dir: 'left' | 'right') => {
      setSwipedToLeft(dir === 'right');
      setSwipedToRight(dir === 'left');

      if (openSwipeableRef.current && openSwipeableRef.current !== swipeableRef.current) {
        openSwipeableRef.current.close();
      }
      // Update the ref to the currently open swipeable
      openSwipeableRef.current = swipeableRef.current;
    }, []);

    const closeHandlerCallback = useCallback(
      (dir: 'left' | 'right') => {
        setSwipedToLeft(dir === 'right' ? false : swipedToLeft);
        setSwipedToRight(dir === 'left' ? false : swipedToRight);
      },
      [swipedToLeft, swipedToRight],
    );

    return (
      <ReanimatedSwipeable
        ref={swipeableRef}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={() => (
          <RightAction onPress={handleDelete} courseId={item.id} semesterId={item.session_id} />
        )}
        overshootFriction={0}
        dragOffsetFromRightEdge={40}
        overshootLeft={false}
        overshootRight={false}
        onSwipeableWillOpen={openHandlerCallback}
        onSwipeableOpen={openHandlerCallback}
        onSwipeableClose={closeHandlerCallback}
        onSwipeableWillClose={closeHandlerCallback}
      >
        <Pressable
          onPress={openBottomSheet}
          className={cn(
            'box-border flex-row justify-between border border-[#c5c5c5] bg-white p-4',
            swipedToLeft ? '!rounded-r-none border-r-0' : 'rounded-lg',
            swipedToRight ? '!rounded-l-none border-l-0' : 'rounded-lg',
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
      </ReanimatedSwipeable>
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
          <Link href={{ pathname: '/manage-course/[semester-id]', params: { 'semester-id': activeSemesterId! } }} asChild>
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
