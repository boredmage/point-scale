import { getGrade } from '@/constants/utils';
import { useBottomSheetContext } from '@/context/bottom-sheet-context';
import { hapticNotify } from '@/lib/haptics';
import { toast } from '@/lib/toast';
import { useCourseStore } from '@/store/courses-store';
import { useUserStore } from '@/store/user-store';
import { Feather } from '@expo/vector-icons';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Pressable, View } from 'react-native';
import GradeTile from '../grade-tile';
import { Pencil, Point } from '../icons';
import { Sheet } from '../sheet';
import Text from '../text';

const ResultBottomSheet = () => {
  const { bottomSheetRef, activeResultId, close } = useBottomSheetContext();
  const course = useCourseStore((store) => store.getResultById(activeResultId));
  const removeCourse = useCourseStore((store) => store.removeCourse);
  const { gradeScale } = useUserStore();
  const router = useRouter();
  const grade = getGrade(course?.result || 0, gradeScale);
  const units = course?.course_units ?? 0;

  const handleEdit = () => {
    if (!course) return;
    close('result');
    router.push({
      pathname: '/manage-course/[semester-id]',
      params: { 'semester-id': course.session_id, 'course-id': course.id },
    });
  };

  const handleDelete = () => {
    if (!course) return;
    hapticNotify('warning');
    Alert.alert(`Delete ${course.course_code}?`, 'It will be gone for good', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          close('result');
          removeCourse(course.id);
          toast('Course Deleted', `${course.course_code} has been removed`);
        },
      },
    ]);
  };

  return (
    <Sheet ref={bottomSheetRef}>
      <BottomSheetView className="gap-5 px-5 pb-12 pt-2">
        <View className="flex-row items-start justify-between gap-4">
          <View className="flex-1 gap-0.5">
            <Text className="text-xl font-medium text-ink">{course?.course_title}</Text>
            <View className="flex-row items-center">
              <Text className="text-sm text-muted">{course?.course_code}</Text>
              <Point width={10} height={10} fill="#C4C6D4" style={{ marginHorizontal: 6 }} />
              <Text className="text-sm text-muted">
                {units} unit{units === 1 ? '' : 's'}
              </Text>
            </View>
          </View>
          <GradeTile grade={grade} size={56} />
        </View>

        <View className="flex-row gap-3">
          <Detail label="Score" value={`${course?.result ?? 0}%`} />
          <Detail label="Grade" value={grade} />
          <Detail label="Units" value={`${units}`} />
        </View>

        <View className="flex-row gap-3">
          <ActionButton
            title="Edit"
            icon={<Pencil width={18} height={18} stroke="#15172B" />}
            onPress={handleEdit}
          />
          <ActionButton
            title="Delete"
            icon={<Feather name="trash-2" size={18} color="#DC3545" />}
            destructive
            onPress={handleDelete}
          />
        </View>
      </BottomSheetView>
    </Sheet>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-1 gap-0.5 rounded-xl bg-surface p-3.5">
    <Text className="text-xs text-muted">{label}</Text>
    <Text className="text-2xl font-medium text-ink">{value}</Text>
  </View>
);

const ActionButton = ({
  title,
  icon,
  destructive = false,
  onPress,
}: {
  title: string;
  icon: React.ReactNode;
  destructive?: boolean;
  onPress: () => void;
}) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="button"
    className={
      destructive
        ? 'h-12 flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-[#FDE2E2] active:opacity-80'
        : 'h-12 flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-surface active:opacity-80'
    }
  >
    {icon}
    <Text
      className={
        destructive ? 'text-base font-medium text-[#DC3545]' : 'text-base font-medium text-ink'
      }
    >
      {title}
    </Text>
  </Pressable>
);

export default ResultBottomSheet;
