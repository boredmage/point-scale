import { Adjustments, ChartLine, Target } from '@/components/icons';
import Text from '@/components/text';
import { useUserStore } from '@/store/user-store';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg from 'react-native-svg';

interface DetailsProps {
  title: string;
  description: string;
  comingSoon?: boolean;
  icon: React.FC<React.ComponentProps<typeof Svg>>;
}

const Details = ({ title, description, icon }: DetailsProps) => {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-4">
        {icon({
          width: 53,
          height: 53,
          strokeWidth: 1.5,
          stroke: '#5271FF',
        })}
        <View className="flex-1 leading-3">
          <Text className="text-xl">{title}</Text>
          <Text className="text-base leading-5 text-[#85898e]">{description}</Text>
        </View>
      </View>
    </View>
  );
};

const Onboarding = () => {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  const router = useRouter();
  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded);

  const handlePress = () => {
    toggleHasOnboarded();
    router.replace('/');
  };

  return (
    <SafeAreaView className="android:py-8 flex-1 bg-white">
      <View className="mx-auto w-10/12 flex-1 justify-between">
        <View>
          <Text className="android:mt-28 my-16 text-center text-3xl">Welcome to Point Scale</Text>

          <View className="gap-10">
            <Details
              title="Grade Insights"
              description="Get detailed analysis of your grades and CGPA trends over time."
              icon={ChartLine}
            />
            <Details
              title="Customization"
              description="Adjust grading scales, course units, and semesters to match your university's system."
              icon={Adjustments}
            />
            <Details
              title="Goal Tracking"
              description="Set academic targets and get suggestions on the grades you need to achieve them."
              icon={Target}
            />
          </View>
        </View>

        <TouchableOpacity className="rounded-xl bg-primary p-3.5" onPress={handlePress}>
          <Text className="text-center text-lg text-white">Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
