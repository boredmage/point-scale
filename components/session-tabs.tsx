import { cn } from '@/lib/utils';
import { SemesterType } from '@/store/semester-store';
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, PressableProps } from 'react-native';
import Text from './text';

interface SelectorProps extends PressableProps {
  title: string;
  active?: boolean;
}

interface SessionTabsProps {
  semesters: SemesterType[];
  activeSemesterId: string | null;
  setActiveSemesterId: (id: string) => void;
}

const Selector = ({ title, active, ...props }: SelectorProps) => (
  <Pressable
    className={cn(
      'items-center justify-center rounded-lg bg-primary/20 px-5 py-3',
      active && 'bg-primary',
    )}
    {...props}
  >
    <Text className="font-system text-white">{title}</Text>
  </Pressable>
);

const SessionTabs = ({ semesters, activeSemesterId, setActiveSemesterId }: SessionTabsProps) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={semesters}
      keyExtractor={(semester) => semester.id}
      renderItem={({ item: semester }) => (
        <Selector
          onPress={() => {
            setActiveSemesterId(semester.id);
          }}
          title={`${semester.session} ${semester.semester}`}
          active={activeSemesterId === semester.id}
        />
      )}
      contentContainerClassName="flex-row items-center gap-3"
      ListHeaderComponent={
        <Link href="/add-semester" asChild>
          <Pressable hitSlop={8} className="rounded-lg bg-primary p-2">
            <AntDesign name="plus" size={24} color="#fff" />
          </Pressable>
        </Link>
      }
    />
  );
};

export default SessionTabs;
