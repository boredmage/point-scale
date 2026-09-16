import { Point, Trash } from '@/components/icons';
import PageHeader from '@/components/page-header';
import Text from '@/components/text';
import { hapticNotify, hapticSelect } from '@/lib/haptics';
import { toast } from '@/lib/toast';
import { cn } from '@/lib/utils';
import { useCourseStore } from '@/store/courses-store';
import { SemesterType, useSemesterStore } from '@/store/semester-store';
import Checkbox from 'expo-checkbox';
import React, { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SemesterRow = ({
  semester,
  courseCount,
  isSelected,
  isLast,
  onToggle,
}: {
  semester: SemesterType;
  courseCount: number;
  isSelected: boolean;
  isLast: boolean;
  onToggle: (id: string) => void;
}) => (
  <Pressable
    onPress={() => onToggle(semester.id)}
    accessibilityRole="checkbox"
    accessibilityState={{ checked: isSelected }}
    className={cn('active:bg-surface', isSelected && 'bg-primary-soft/60')}
  >
    <View className="min-h-16 flex-row items-center gap-3.5 px-4 py-3.5">
      <Checkbox
        value={isSelected}
        onValueChange={() => onToggle(semester.id)}
        color={isSelected ? '#5271FF' : undefined}
        style={{ width: 22, height: 22, borderRadius: 6, borderColor: '#C4C6D4' }}
      />
      <View className="flex-1 gap-0.5">
        <Text className="text-base text-ink">
          {semester.session} {semester.semester}
        </Text>
        <Text className="text-[13px] text-muted">
          {courseCount} course{courseCount === 1 ? '' : 's'}
        </Text>
      </View>
    </View>
    {!isLast ? <View className="ml-[58px] h-px bg-[#EEEFF5]" /> : null}
  </Pressable>
);

const ManageSemesters = () => {
  const { semesters, removeSemester } = useSemesterStore((state) => state);
  const courses = useCourseStore((state) => state.courses);
  const removeCoursesBySessionId = useCourseStore((state) => state.removeCoursesBySessionId);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const insets = useSafeAreaInsets();

  const courseCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const course of courses) {
      counts[course.session_id] = (counts[course.session_id] ?? 0) + 1;
    }
    return counts;
  }, [courses]);

  const allSelected = semesters.length > 0 && selected.size === semesters.length;

  const toggleSelection = (id: string) => {
    hapticSelect();
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    hapticSelect();
    setSelected(allSelected ? new Set() : new Set(semesters.map((semester) => semester.id)));
  };

  const handleBulkDelete = () => {
    const ids = Array.from(selected);
    const plural = ids.length > 1;
    hapticNotify('warning');

    Alert.alert(
      `Delete ${plural ? `${ids.length} semesters` : 'this semester'}?`,
      `This will remove ${plural ? 'these semesters' : 'the semester'} and every course under ${plural ? 'them' : 'it'}. It cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            ids.forEach((id) => {
              removeCoursesBySessionId(id);
              removeSemester(id);
            });
            setSelected(new Set());
            toast(
              plural ? 'Semesters Deleted' : 'Semester Deleted',
              `${ids.length} semester${plural ? 's' : ''} removed`,
            );
          },
        },
      ],
    );
  };

  const DeleteButton = () => (
    <View>
      <Pressable
        onPress={handleBulkDelete}
        disabled={selected.size === 0}
        accessibilityLabel="Delete selected semesters"
        className={cn(
          'h-10 w-10 items-center justify-center rounded-lg',
          selected.size === 0 ? 'border border-line bg-white' : 'bg-[#DC3545]',
        )}
      >
        <Trash stroke={selected.size === 0 ? '#C4C6D4' : '#fff'} width={20} height={20} />
      </Pressable>
      {selected.size > 0 ? (
        <View className="absolute -right-1.5 -top-1.5 h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1">
          <Text className="text-[11px] font-medium text-white">{selected.size}</Text>
        </View>
      ) : null}
    </View>
  );

  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      <PageHeader
        title="Semesters"
        description="Select semesters to remove them"
        actionButton={<DeleteButton />}
      />
      <ScrollView contentContainerClassName="px-5 pb-10 pt-6" showsVerticalScrollIndicator={false}>
        {semesters.length ? (
          <>
            <View className="mb-2.5 flex-row items-center justify-between px-1">
              <View className="flex-row items-center">
                <Text className="text-[13px] text-muted">
                  {semesters.length} semester{semesters.length === 1 ? '' : 's'}
                </Text>
                {selected.size > 0 ? (
                  <>
                    <Point width={10} height={10} fill="#C4C6D4" style={{ marginHorizontal: 6 }} />
                    <Text className="text-[13px] text-muted">{selected.size} selected</Text>
                  </>
                ) : null}
              </View>
              <Pressable onPress={toggleSelectAll} hitSlop={8}>
                <Text className="text-sm font-medium text-primary">
                  {allSelected ? 'Clear selection' : 'Select all'}
                </Text>
              </Pressable>
            </View>
            <View className="overflow-hidden rounded-2xl bg-white">
              {semesters.map((semester, index) => (
                <SemesterRow
                  key={semester.id}
                  semester={semester}
                  courseCount={courseCounts[semester.id] ?? 0}
                  isSelected={selected.has(semester.id)}
                  isLast={index === semesters.length - 1}
                  onToggle={toggleSelection}
                />
              ))}
            </View>
          </>
        ) : (
          <View className="mt-10 items-center gap-1">
            <Text className="text-center text-xl text-ink">No semesters yet</Text>
            <Text className="text-center text-sm text-muted">
              Add one from the Home screen to see it here
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ManageSemesters;
