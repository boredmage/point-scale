import ResultList from '@/components/result-list';
import SessionTabs from '@/components/session-tabs';
import Text from '@/components/text';
import { calculateCGPA } from '@/constants/utils';
import { useCourseStore } from '@/store/courses-store';
import { useSemesterStore } from '@/store/semester-store';
import { useUserStore } from '@/store/user-store';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

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
        <View className="flex-row items-center justify-between px-5">
          <Text className="text-[15px] text-muted">Point Scale</Text>
          <View className="h-9 flex-row items-center gap-1.5 rounded-lg border border-line bg-white px-3.5">
            <ScaleIcon />
            <Text className="text-sm text-muted">{gradeScale} scale</Text>
          </View>
        </View>

        <View className="mx-5 flex-row items-center gap-4 rounded-2xl bg-primary px-4 py-3.5">
          <View className="gap-0.5">
            <Text className="text-xs text-white/70">Current CGPA</Text>
            <View className="flex-row items-baseline gap-1">
              <Text className="text-[34px] font-medium leading-10 text-white">
                {totalCGPA.toFixed(2)}
              </Text>
              <Text className="text-xs text-white/70">/ {gradeScale}</Text>
            </View>
          </View>
          <View className="h-9 w-px bg-white/25" />
          <View className="flex-1 flex-row">
            <Stat title="Units reg." value={totalUnits} />
            <Stat title="Passed" value={unitsPassed} />
            <Stat title="WGP" value={totalWGPA} />
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

const Stat = ({ title, value }: { title: string; value: number }) => (
  <View className="flex-1 items-center">
    <Text className="text-lg font-medium text-white">{value}</Text>
    <Text className="text-[11px] text-white/70">{title}</Text>
  </View>
);

const ScaleIcon = () => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"
      stroke="#5271FF"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
