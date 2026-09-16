import PageHeader from '@/components/page-header';
import PrimaryButton from '@/components/primary-button';
import Text from '@/components/text';
import { hapticSelect } from '@/lib/haptics';
import { toast } from '@/lib/toast';
import { cn } from '@/lib/utils';
import { GradeScale, useUserStore } from '@/store/user-store';
import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const scales: { value: GradeScale; label: string; description: string }[] = [
  { value: '4.0', label: '4.0 scale', description: 'Common in most universities' },
  { value: '5.0', label: '5.0 scale', description: 'Used in some institutions' },
];

const Grades = () => {
  const { gradeScale, setGradeScale } = useUserStore();
  const [selectedScale, setSelectedScale] = useState<GradeScale>(gradeScale);
  const insets = useSafeAreaInsets();

  const hasChanges = selectedScale !== gradeScale;

  return (
    <View
      className="flex-1 bg-surface"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom + 16 }}
    >
      <PageHeader title="Grade scale" description="Choose the scale your institution uses" />
      <View className="flex-1 gap-4 px-5 pt-6">
        <View className="gap-3">
          {scales.map((scale) => {
            const isSelected = selectedScale === scale.value;
            return (
              <Pressable
                key={scale.value}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
                className={cn(
                  'flex-row items-center gap-4 rounded-2xl border-2 bg-white p-4',
                  isSelected ? 'border-primary bg-primary-soft/60' : 'border-white',
                )}
                onPress={() => {
                  if (scale.value !== selectedScale) hapticSelect();
                  setSelectedScale(scale.value);
                }}
              >
                <View
                  className={cn(
                    'h-6 w-6 items-center justify-center rounded-full border-2',
                    isSelected ? 'border-primary' : 'border-[#C4C6D4]',
                  )}
                >
                  {isSelected ? <View className="h-3 w-3 rounded-full bg-primary" /> : null}
                </View>
                <View className="flex-1">
                  <Text className="text-base text-ink">{scale.label}</Text>
                  <Text className="text-[13px] text-muted">{scale.description}</Text>
                </View>
                <Text
                  className={cn(
                    'text-2xl font-medium',
                    isSelected ? 'text-primary' : 'text-[#C4C6D4]',
                  )}
                >
                  {scale.value}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View className="flex-row items-start gap-3 rounded-2xl bg-white p-4">
          <Feather name="info" size={18} color="#6B6E85" style={{ marginTop: 2 }} />
          <Text className="flex-1 text-sm text-muted">
            Changing the grade scale affects how your GPA is calculated across all semesters.
          </Text>
        </View>

        <View className="flex-1" />

        <PrimaryButton
          title="Save"
          icon={<Feather name="check" size={18} color="#fff" />}
          onPress={() => {
            setGradeScale(selectedScale);
            toast('Grade Scale Updated', `Now using the ${selectedScale} scale`);
          }}
          disabled={!hasChanges}
        />
      </View>
    </View>
  );
};

export default Grades;
