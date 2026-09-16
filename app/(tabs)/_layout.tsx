import CourseActionsBottomSheet from '@/components/bottom-sheets/course-actions-bottom-sheet';
import CourseOrderBottomSheet from '@/components/bottom-sheets/course-order-bottom-sheet';
import ResultBottomSheet from '@/components/bottom-sheets/result-bottom-sheet-display';
import { HapticTab } from '@/components/HapticTab';
import TabBar from '@/components/tab-bar';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useUserStore } from '@/store/user-store';
import { Redirect, Tabs } from 'expo-router';
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';
import { DynamicColorIOS, Platform } from 'react-native';

const iosTint = DynamicColorIOS({ light: '#5271FF', dark: '#7B93FF' });

/** iOS: system tab bar. Renders as Liquid Glass on iOS 26+ and the classic bar on older versions. */
function IOSTabs() {
  return (
    <NativeTabs tintColor={iosTint} minimizeBehavior="onScrollDown">
      <NativeTabs.Trigger name="index">
        <Icon sf={{ default: 'house', selected: 'house.fill' }} />
        <Label>Home</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <Icon sf={{ default: 'gearshape', selected: 'gearshape.fill' }} />
        <Label>Settings</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

/** Android: custom floating pill tab bar with an animated bubble behind the active tab. */
function AndroidTabs() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarButton: HapticTab,
        headerTitle: '',
        headerStyle: {
          shadowColor: 'transparent',
        },
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', headerShown: false }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', headerShown: false }} />
    </Tabs>
  );
}

export default function TabLayout() {
  const hasFinishedOnboarding = useUserStore((state) => state.hasFinishedOnboarding);

  if (!hasFinishedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <>
      {Platform.OS === 'ios' ? <IOSTabs /> : <AndroidTabs />}
      <ResultBottomSheet />
      <CourseOrderBottomSheet />
      <CourseActionsBottomSheet />
    </>
  );
}
