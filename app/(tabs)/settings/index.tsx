import {
  Badges,
  Category,
  MessageReport,
  Point,
  RoudedArrowDown,
  SortAscendingShapes,
} from '@/components/icons';
import Text from '@/components/text';
import { useBottomSheetContext } from '@/context/bottom-sheet-context';
import { cn } from '@/lib/utils';
import { CoursesOrder, useCourseStore } from '@/store/courses-store';
import { useUserStore } from '@/store/user-store';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Href, Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { forwardRef } from 'react';
import { Platform, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg from 'react-native-svg';

const orderLabels: Record<CoursesOrder, string> = {
  result: 'By result',
  course_units: 'By course units',
  course_code: 'By course code',
  default: 'As added',
};

interface RowProps extends React.ComponentProps<typeof Pressable> {
  title: string;
  description: string;
  icon: React.FC<React.ComponentProps<typeof Svg>>;
  trailing?: 'chevron' | 'external' | 'soon';
  isLast?: boolean;
}

interface NavRowProps extends RowProps {
  href: Href;
}

const Row = forwardRef<View, RowProps>(
  ({ title, description, icon: Icon, onPress, trailing = 'chevron', isLast = false }, ref) => {
    const disabled = trailing === 'soon';
    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        disabled={disabled}
        className="active:bg-surface"
        accessibilityRole="button"
      >
        <View className="min-h-16 flex-row items-center gap-3.5 px-4 py-3.5">
          <View
            className={cn(
              'h-10 w-10 items-center justify-center rounded-xl',
              disabled ? 'bg-[#F1F2F7]' : 'bg-primary-soft',
            )}
          >
            <Icon fill={disabled ? '#9A9DB3' : '#5271FF'} width={22} height={22} />
          </View>
          <View className="flex-1 gap-px">
            <Text className={cn('text-base', disabled ? 'text-faint' : 'text-ink')}>{title}</Text>
            <Text className={cn('text-[13px]', disabled ? 'text-[#B6B8C8]' : 'text-muted')}>
              {description}
            </Text>
          </View>
          {trailing === 'soon' ? (
            <View className="rounded-full bg-[#F1F2F7] px-2.5 py-1">
              <Text className="text-[11px] font-medium tracking-wide text-muted">SOON</Text>
            </View>
          ) : (
            <Feather
              name={trailing === 'external' ? 'arrow-up-right' : 'chevron-right'}
              size={18}
              color="#C4C6D4"
            />
          )}
        </View>
        {!isLast ? <View className="ml-[70px] h-px bg-[#EEEFF5]" /> : null}
      </Pressable>
    );
  },
);
Row.displayName = 'SettingsRow';

const NavRow = ({ href, ...props }: NavRowProps) => (
  <Link href={href} asChild>
    <Row {...props} />
  </Link>
);

const Section = ({ children }: { children: React.ReactNode }) => (
  <View className="overflow-hidden rounded-[18px] bg-white">{children}</View>
);

const Settings = () => {
  const { open } = useBottomSheetContext();
  const { gradeScale } = useUserStore();
  const courseOrder = useCourseStore((store) => store.courseOrder);
  const insets = useSafeAreaInsets();
  const version = Constants.expoConfig?.version ?? '';

  const openWebBrowser = async (url: string) => {
    try {
      await WebBrowser.openBrowserAsync(url);
    } catch (error) {
      console.error('Error opening browser:', error);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-surface"
      contentContainerClassName="gap-6 px-5 pb-32"
      // iOS native tabs inset the first ScrollView for the status bar themselves.
      contentContainerStyle={{ paddingTop: Platform.OS === 'ios' ? 16 : insets.top + 16 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="gap-1">
        <Text className="text-3xl font-medium text-ink">Settings</Text>
        <Text className="text-sm text-muted">Manage your app settings</Text>
      </View>

      <Section>
        <NavRow
          title="Semesters"
          description="Manage your semesters"
          icon={Category}
          href="/manage-semesters"
        />
        <NavRow
          title="Grade scale"
          description={`${gradeScale} scale`}
          icon={Badges}
          href="/grades"
        />
        <Row
          title="Course order"
          description={orderLabels[courseOrder]}
          icon={SortAscendingShapes}
          onPress={() => open('courseOrder')}
          isLast
        />
      </Section>

      <Section>
        <Row
          title="Download results"
          description="Download and share your results"
          icon={RoudedArrowDown}
          trailing="soon"
        />
        <Row
          title="Feedback"
          description="Send us your feedback"
          icon={MessageReport}
          trailing="external"
          onPress={() => openWebBrowser('https://www.qudusayo.pro/contact-me')}
          isLast
        />
      </Section>

      {version ? (
        <View className="flex-row items-center justify-center">
          <Text className="text-xs text-[#B6B8C8]">Point Scale</Text>
          <Point width={10} height={10} fill="#D2D4DF" style={{ marginHorizontal: 6 }} />
          <Text className="text-xs text-[#B6B8C8]">Version {version}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
};

export default Settings;
