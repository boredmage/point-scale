import { cn } from '@/lib/utils';
import { SemesterType } from '@/store/semester-store';
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, PressableProps } from 'react-native';
import { Point } from './icons';
import Text from './text';

interface SelectorProps extends PressableProps {
  session: string;
  semester: string;
  active?: boolean;
}

interface SessionTabsProps {
  semesters: SemesterType[];
  activeSemesterId: string | null;
  setActiveSemesterId: (id: string) => void;
}

const Selector = ({ session, semester, active, ...props }: SelectorProps) => {
  const color = active ? '#ffffff' : '#5271FF';
  const dotColor = active ? 'rgba(255,255,255,0.6)' : 'rgba(82,113,255,0.45)';
  return (
    <Pressable
      className={cn(
        'h-11 flex-row items-center justify-center rounded-lg bg-primary-soft px-5',
        active && 'bg-primary',
      )}
      {...props}
    >
      <Text className="text-[15px]" style={{ color }}>
        {session}
      </Text>
      <Point width={10} height={10} fill={dotColor} style={{ marginHorizontal: 6 }} />
      <Text className="text-[15px]" style={{ color }}>
        {semester}
      </Text>
    </Pressable>
  );
};

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
          session={semester.session}
          semester={semester.semester}
          active={activeSemesterId === semester.id}
        />
      )}
      contentContainerClassName="flex-row items-center gap-2 px-5"
      ListHeaderComponent={
        <Link href="/add-semester" asChild>
          <Pressable
            hitSlop={8}
            accessibilityLabel="Add semester"
            className="h-11 w-11 items-center justify-center rounded-lg bg-primary"
          >
            <AntDesign name="plus" size={20} color="#fff" />
          </Pressable>
        </Link>
      }
    />
  );
};

export default SessionTabs;
