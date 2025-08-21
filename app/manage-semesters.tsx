import { Trash } from '@/components/icons';
import PageHeader from '@/components/page-header';
import Text from '@/components/text';
import { useCourseStore } from '@/store/courses-store';
import { SemesterType, useSemesterStore } from '@/store/semester-store';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { Alert, FlatList, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
interface SemesterProps extends React.ComponentProps<typeof Pressable> {
  semester: SemesterType;
  isSelected: boolean;
  onToggleSelection: (id: string) => void;
}

const Semester = ({ semester, isSelected, onToggleSelection }: SemesterProps) => {
  return (
    <Pressable
      onPress={() => onToggleSelection(semester.id)}
      className="flex-row items-center justify-between py-4 text-lg font-bold text-gray-800"
    >
      <View className="w-full flex-row-reverse items-center justify-between">
        <Checkbox
          style={{
            borderWidth: isSelected ? 4 : 1.5,
            borderColor: '#5271FF',
            width: 24,
            height: 24,
          }}
          value={isSelected}
          onValueChange={() => onToggleSelection(semester.id)}
          color={isSelected ? '#5271FF' : '#5271FF'}
        />
        <View>
          <Text className="text-xl">
            {semester.session} {semester.semester}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const ManageSemesters = () => {
  const { semesters, removeSemester } = useSemesterStore((state) => state);
  const removeCoursesBySessionId = useCourseStore((state) => state.removeCoursesBySessionId);
  const [selectedSemesters, setSelectedSemesters] = useState<Set<string>>(new Set());

  const toggleSelection = (id: string) => {
    const newSelection = new Set(selectedSemesters);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedSemesters(newSelection);
  };

  const handleBulkDelete = () => {
    const selectedIds = Array.from(selectedSemesters);
    const selectedSemesterNames = selectedIds
      .map((id) => {
        const semester = semesters.find((s) => s.id === id);
        return `${semester?.session} ${semester?.semester}`;
      })
      .join(', ');

    const plural = selectedIds.length > 1 ? 's' : '';
    const semester = selectedIds.length > 1 ? 'these semesters' : 'this semester';

    Alert.alert(
      `Are you sure you want to delete ${semester}?`,
      `This will remove ${selectedIds.length} semester${plural} and all courses under them.`,
      [
        {
          text: 'Cancel',
          // style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            selectedIds.forEach((id) => {
              removeCoursesBySessionId(id);
              removeSemester(id);
            });
            setSelectedSemesters(new Set());
          },
          style: 'destructive',
        },
      ],
    );
  };

  const DeleteButton = () => (
    <View className="relative">
      <Pressable
        onPress={handleBulkDelete}
        disabled={selectedSemesters.size === 0}
        className={`rounded-xl p-2 ${
          selectedSemesters.size === 0 ? 'bg-gray-300' : 'bg-[#d50000a8]'
        }`}
      >
        <Trash stroke="#fff" />
      </Pressable>
      {selectedSemesters.size > 0 && (
        <View className="absolute -right-2 -top-2 h-6 w-6 items-center justify-center rounded-full bg-[#5271FF]">
          <Text className="text-xs font-bold text-white">{selectedSemesters.size}</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader
        title="Manage Semesters"
        description="Take control of your semesters."
        actionButton={<DeleteButton />}
      />
      <FlatList
        data={semesters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Semester
            semester={item}
            isSelected={selectedSemesters.has(item.id)}
            onToggleSelection={toggleSelection}
          />
        )}
        ListEmptyComponent={
          <View className="mt-8 items-center justify-center">
            <Text className="text-lg text-gray-500">No semesters found</Text>
          </View>
        }
        ItemSeparatorComponent={() => <View className="h-[1px] bg-gray-200" />}
        contentContainerClassName="py-4 w-11/12 mx-auto flex-1"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ManageSemesters;
