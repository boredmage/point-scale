import { getGrade } from '@/constants/utils';
import { useBottomSheetContext } from '@/context/bottom-sheet-context';
import { useCourseStore } from '@/store/courses-store';
import { useUserStore } from '@/store/user-store';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { View } from 'react-native';
import { GetGradeIcon } from '../getGradeIcon';
import Text from '../text';

const ResultBottomSheet = () => {
  const { bottomSheetRef, activeResultId } = useBottomSheetContext();
  const course = useCourseStore((store) => store.getResultById(activeResultId));
  const { gradeScale } = useUserStore();

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[1]}
      index={-1}
      enablePanDownToClose
      backdropComponent={(props) => <BottomSheetBackdrop {...props} />}
    >
      <BottomSheetView className="relative p-5 pb-20 pt-9">
        <View className="mb-4">
          <Text className="text-sm">Course Code:</Text>
          <Text className="text-2xl">{course?.course_code}</Text>
        </View>
        <View className="mb-4">
          <Text className="text-sm">Course Title</Text>
          <Text className="text-2xl">{course?.course_title}</Text>
        </View>
        <View className="mb-4">
          <Text className="text-sm">Units</Text>
          <Text className="text-3xl">{course?.course_units} Units</Text>
        </View>
        <View>
          <Text className="text-sm">Score</Text>
          <Text className="text-4xl">{course?.result}%</Text>
        </View>
        <View className="absolute -right-10 top-0 -z-10">
          <GetGradeIcon grade={getGrade(course?.result || 0, gradeScale)} width={200} height={200} />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default ResultBottomSheet;
