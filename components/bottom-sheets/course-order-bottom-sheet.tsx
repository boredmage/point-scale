import { useBottomSheetContext } from '@/context/bottom-sheet-context';
import { hapticSelect } from '@/lib/haptics';
import { toast } from '@/lib/toast';
import { cn } from '@/lib/utils';
import { CoursesOrder, useCourseStore } from '@/store/courses-store';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import PrimaryButton from '../primary-button';
import { Sheet, SheetHeader } from '../sheet';
import Text from '../text';

const options: { value: CoursesOrder; title: string; description: string }[] = [
  { value: 'result', title: 'Result', description: 'Ordered by your results or grades.' },
  { value: 'course_units', title: 'Course units', description: 'Ordered by the number of units.' },
  { value: 'course_code', title: 'Course code', description: 'Ordered alphabetically by code.' },
  { value: 'default', title: 'As added', description: 'Ordered by the sequence you added them.' },
];

const CourseOrderBottomSheet = () => {
  const { courseOrderBottomSheetRef, close } = useBottomSheetContext();
  const { courseOrder, setCourseOrder } = useCourseStore((store) => store);
  const [selectedOrder, setSelectedOrder] = useState<CoursesOrder>(courseOrder);

  const handleSave = () => {
    setCourseOrder(selectedOrder);
    close('courseOrder');
    toast('Order Updated', 'Your courses have been reordered');
  };

  return (
    <Sheet ref={courseOrderBottomSheetRef}>
      <BottomSheetView className="gap-5 px-5 pb-12 pt-2">
        <SheetHeader title="Course order" description="Choose how courses are listed." />
        <View className="gap-2.5">
          {options.map((option) => (
            <Option
              key={option.value}
              {...option}
              selected={selectedOrder === option.value}
              onPress={() => {
                if (option.value !== selectedOrder) hapticSelect();
                setSelectedOrder(option.value);
              }}
            />
          ))}
        </View>
        <PrimaryButton title="Save" onPress={handleSave} disabled={courseOrder === selectedOrder} />
      </BottomSheetView>
    </Sheet>
  );
};

const Option = ({
  title,
  description,
  selected,
  onPress,
}: {
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
}) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="radio"
    accessibilityState={{ selected }}
    className={cn(
      'flex-row items-center gap-3.5 rounded-xl border-2 bg-surface p-3.5',
      selected ? 'border-primary bg-primary-soft/60' : 'border-surface',
    )}
  >
    <View
      className={cn(
        'h-6 w-6 items-center justify-center rounded-full border-2',
        selected ? 'border-primary' : 'border-[#C4C6D4]',
      )}
    >
      {selected ? <View className="h-3 w-3 rounded-full bg-primary" /> : null}
    </View>
    <View className="flex-1">
      <Text className="text-base text-ink">{title}</Text>
      <Text className="text-[13px] text-muted">{description}</Text>
    </View>
  </Pressable>
);

export default CourseOrderBottomSheet;
