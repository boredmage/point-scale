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
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { getCourses, courses: default_list } = useCourseStore((store) => store);
  const courses = getCourses();
  const [totalCGPA, setTotalCGPA] = useState(0);
  const [totalWGPA, setTotalWGPA] = useState(0);
  const [totalUnits, setTotalUnits] = useState(0);
  const [unitsPassed, setUnitsPassed] = useState(0);
  const { semesters, activeSemesterId, setActiveSemesterId } = useSemesterStore((store) => store);
  const { gradeScale } = useUserStore();

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
    <View className="flex-1">
      <View className="flex-1 bg-[#f3f4f6]">
        <View className="bg-white">
          <SafeAreaView className="mx-auto w-11/12 gap-8 py-8" edges={['top', 'left', 'right']}>
            <View className="items-center gap-2">
              <Text>Current CGPA</Text>
              <Text className="text-7xl font-normal text-primary">{totalCGPA.toFixed(2)}</Text>
            </View>
            <View className="flex-row gap-4">
              <DetailsCard title="Units Reg." value={totalUnits + ''} />
              <DetailsCard title="Units Passed" value={unitsPassed + ''} />
              <DetailsCard title="Total WGP" value={totalWGPA + ''} />
            </View>

            <SessionTabs
              semesters={semesters}
              activeSemesterId={activeSemesterId}
              setActiveSemesterId={setActiveSemesterId}
            />
          </SafeAreaView>
        </View>
        {semesters.length ? (
          <View className="mx-auto w-11/12 flex-1 gap-4">
            <ResultList activeSemesterId={activeSemesterId} />
          </View>
        ) : (
          <View className="mt-12 flex-1 self-center justify-self-center">
            <Text className="text-center text-xl text-black">No semesters added yet</Text>
            <Text className="text-center text-sm text-[#606067]">
              Tap the + button above to add a semester
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const DetailsCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <View className="flex-1 items-center gap-1 rounded-lg bg-[#f3f4f6] p-4">
      <Text className="font-system text-sm text-[#606067]">{title}</Text>
      <Text className="font-system text-2xl font-normal text-primary">{value}</Text>
    </View>
  );
};
