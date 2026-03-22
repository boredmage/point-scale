import PageHeader from '@/components/page-header';
import Text from '@/components/text';
import { GradeScale, useUserStore } from '@/store/user-store';
import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const scales: { value: GradeScale; label: string; description: string }[] = [
  { value: '4.0', label: '4.0 Scale', description: 'Common in most universities' },
  { value: '5.0', label: '5.0 Scale', description: 'Used in some institutions' },
];

const Grades = () => {
  const { gradeScale, setGradeScale } = useUserStore();
  const [selectedScale, setSelectedScale] = useState<GradeScale>(gradeScale);

  const hasChanges = selectedScale !== gradeScale;

  const handleSave = () => {
    setGradeScale(selectedScale);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title="Grade Scale" description="Choose the grading scale for your institution" />
      <View className="mx-auto w-11/12 flex-1 gap-6 py-4">
        <View className="gap-3">
          {scales.map((scale) => {
            const isSelected = selectedScale === scale.value;
            return (
              <TouchableOpacity
                key={scale.value}
                className={`flex-row items-center gap-4 rounded-xl border-2 p-4 ${
                  isSelected ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white'
                }`}
                onPress={() => setSelectedScale(scale.value)}
                activeOpacity={0.7}
              >
                <View
                  className={`h-6 w-6 items-center justify-center rounded-full border-2 ${
                    isSelected ? 'border-primary' : 'border-gray-300'
                  }`}
                >
                  {isSelected && <View className="h-3 w-3 rounded-full bg-primary" />}
                </View>
                <View className="flex-1">
                  <Text className={`text-lg ${isSelected ? 'text-primary' : 'text-gray-900'}`}>
                    {scale.label}
                  </Text>
                  <Text className="text-sm text-gray-500">{scale.description}</Text>
                </View>
                <Text className={`text-3xl ${isSelected ? 'text-primary' : 'text-gray-300'}`}>
                  {scale.value}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View className="flex-row items-start justify-center gap-4 rounded-xl bg-[#f3f4f6] px-6 py-4">
          <Feather name="info" size={20} color="#6b7280" className="top-1" />
          <Text className="flex-1 text-base text-gray-500">
            Changing the grade scale will affect how your GPA is calculated across all semesters.
          </Text>
        </View>

        <View className="flex-1" />

        <TouchableOpacity
          className={`flex-row items-center justify-center gap-3 rounded-xl p-4 ${
            hasChanges ? 'bg-primary' : 'bg-gray-300'
          }`}
          onPress={handleSave}
          activeOpacity={0.8}
          disabled={!hasChanges}
        >
          <Feather name="check" size={22} color="white" />
          <Text className="text-lg text-white">Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Grades;
