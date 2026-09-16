import ResultList from '@/components/result-list';
import SessionTabs from '@/components/session-tabs';
import Text from '@/components/text';
import { calculateCGPA } from '@/constants/utils';
import { cn } from '@/lib/utils';
import { useCourseStore } from '@/store/courses-store';
import { useSemesterStore } from '@/store/semester-store';
import { useUserStore } from '@/store/user-store';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { getCourses, courses: default_list } = useCourseStore((store) => store);
  const courses = getCourses();
  const [totalCGPA, setTotalCGPA] = useState(0);
  const [totalWGPA, setTotalWGPA] = useState(0);
  const [totalUnits, setTotalUnits] = useState(0);
  const [unitsPassed, setUnitsPassed] = useState(0);
  const { semesters, activeSemesterId, setActiveSemesterId } = useSemesterStore((store) => store);
  const { gradeScale } = useUserStore();
  const insets = useSafeAreaInsets();

  const calculateTotalCGPA = () => {
    const cgpa = calculateCGPA(courses, gradeScale);
    setTotalUnits(cgpa[0] || 0);
    setUnitsPassed(cgpa[1] || 0);
    setTotalWGPA(cgpa[2] || 0);
    setTotalCGPA(cgpa[3] || 0);
  };

  useEffect(() => {
    calculateTotalCGPA();
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 500);
  }, []);

  useEffect(() => {
    calculateTotalCGPA();
  }, [activeSemesterId, default_list, gradeScale]);

  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      <View className="gap-5 pt-4">
        <View className="mx-5 flex-row items-center gap-5 rounded-2xl bg-primary px-5 py-[18px]">
          <View className="flex-1 justify-center gap-0.5">
            <Text className="text-[13px] text-white/70">Current CGPA</Text>
            <View className="flex-row items-baseline gap-1.5">
              <Text className="text-[48px] font-medium leading-[52px] tracking-tight text-white">
                {totalCGPA.toFixed(2)}
              </Text>
              <Text className="text-sm text-white/70">/ {gradeScale}</Text>
            </View>
          </View>
          <View className="min-w-[132px] gap-1.5">
            <Stat title="Units reg." value={totalUnits} />
            <Stat title="Passed" value={unitsPassed} />
            <Stat title="WGP" value={totalWGPA} isLast />
          </View>
        </View>

        <SessionTabs
          semesters={semesters}
          activeSemesterId={activeSemesterId}
          setActiveSemesterId={setActiveSemesterId}
        />
      </View>

      {semesters.length ? (
        <View className="flex-1 px-5">
          <ResultList activeSemesterId={activeSemesterId} />
        </View>
      ) : (
        <View className="mt-16 items-center gap-1 px-10">
          <Text className="text-center text-xl text-ink">No semesters yet</Text>
          <Text className="text-center text-sm text-muted">
            Tap the + button above to add your first semester
          </Text>
        </View>
      )}
    </View>
  );
}

const Stat = ({
  title,
  value,
  isLast = false,
}: {
  title: string;
  value: number;
  isLast?: boolean;
}) => (
  <View
    className={cn(
      'flex-row items-baseline justify-between',
      !isLast && 'border-b border-white/15 pb-1.5',
    )}
  >
    <Text className="text-[13px] text-white/70">{title}</Text>
    <Text className="text-base font-medium text-white">{value}</Text>
  </View>
);
