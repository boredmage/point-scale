import { useBottomSheetContext } from '@/context/bottom-sheet-context';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { View } from 'react-native';
import BottomSheetTextInput from '../bottom-sheet-text-input';
import PrimaryButton from '../primary-button';
import { Sheet, SheetHeader } from '../sheet';
import Text from '../text';

const GradeSettingsBottomSheet = () => {
  const { gradeSettingsBottomSheetRef } = useBottomSheetContext();

  return (
    <Sheet ref={gradeSettingsBottomSheetRef}>
      <BottomSheetView className="gap-5 px-5 pb-12 pt-2">
        <SheetHeader title="Grade settings" description="Adjust the settings for your grades." />

        <View className="flex-row gap-4">
          <View className="flex-1">
            <Text className="mb-1.5 text-sm text-muted">Min Score</Text>
            <BottomSheetTextInput placeholder="e.g. 70" />
          </View>
          <View className="flex-1">
            <Text className="mb-1.5 text-sm text-muted">Max Score</Text>
            <BottomSheetTextInput placeholder="e.g. 100" />
          </View>
        </View>
        <View className="flex-row gap-4">
          <View className="flex-1">
            <Text className="mb-1.5 text-sm text-muted">Grade Point</Text>
            <BottomSheetTextInput placeholder="e.g. 5" />
          </View>
          <View className="flex-1">
            <Text className="mb-1.5 text-sm text-muted">Letter</Text>
            <BottomSheetTextInput placeholder="e.g. A" />
          </View>
        </View>

        <PrimaryButton title="Coming soon" disabled className="mt-2" />
      </BottomSheetView>
    </Sheet>
  );
};

export default GradeSettingsBottomSheet;
