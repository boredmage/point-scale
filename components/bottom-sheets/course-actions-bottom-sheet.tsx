import { useBottomSheetContext } from '@/context/bottom-sheet-context';
import { useCourseStore } from '@/store/courses-store';
import { Feather } from '@expo/vector-icons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Pressable, View } from 'react-native';
import { Pencil } from '../icons';
import Text from '../text';

/**
 * Long-press actions for a course row (edit / delete), similar to a chat list context menu.
 * The target course is whichever id is stored in `activeResultId`.
 */
const CourseActionsBottomSheet = () => {
  const { courseActionsBottomSheetRef, activeResultId, close } = useBottomSheetContext();
  const course = useCourseStore((store) => store.getResultById(activeResultId));
  const removeCourse = useCourseStore((store) => store.removeCourse);
  const router = useRouter();

  const handleEdit = () => {
    if (!course) return;
    close('courseActions');
    router.push({
      pathname: '/manage-course/[semester-id]',
      params: { 'semester-id': course.session_id, 'course-id': course.id },
    });
  };

  const handleDelete = () => {
    if (!course) return;
    Alert.alert(`Delete ${course.course_code}?`, 'It will be gone for good', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          close('courseActions');
          removeCourse(course.id);
        },
      },
    ]);
  };

  return (
    <BottomSheet
      ref={courseActionsBottomSheetRef}
      snapPoints={[1]}
      index={-1}
      enablePanDownToClose
      backdropComponent={(props) => <BottomSheetBackdrop {...props} />}
    >
      <BottomSheetView className="gap-5 px-5 pb-12 pt-4">
        <View>
          <Text className="text-2xl" numberOfLines={1}>
            {course?.course_title}
          </Text>
          <Text className="text-[#BEC3C9]">{course?.course_code}</Text>
        </View>
        <View className="gap-2">
          <ActionRow
            icon={<Pencil width={22} height={22} stroke="#5271FF" />}
            title="Edit course"
            description="Change the title, units or score."
            onPress={handleEdit}
          />
          <ActionRow
            icon={<Feather name="trash-2" size={22} color="#DC3545" />}
            title="Delete course"
            description="Remove this course from the semester."
            destructive
            onPress={handleDelete}
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const ActionRow = ({
  icon,
  title,
  description,
  destructive = false,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  destructive?: boolean;
  onPress: () => void;
}) => (
  <Pressable
    onPress={onPress}
    className="flex-row items-center gap-4 rounded-lg px-3 py-3 active:bg-[#f3f4f6]"
  >
    <View className="h-11 w-11 items-center justify-center rounded-full bg-[#f3f4f6]">{icon}</View>
    <View className="flex-1">
      <Text className={destructive ? 'text-lg text-[#DC3545]' : 'text-lg'}>{title}</Text>
      <Text className="-mt-1 text-sm text-[#BEC3C9]">{description}</Text>
    </View>
  </Pressable>
);

export default CourseActionsBottomSheet;
