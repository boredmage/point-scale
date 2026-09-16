import { useNavigation } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';
import { ArrowNarrowLeft } from './icons';
import Text from './text';

const PageHeader = ({
  title,
  description,
  showBackButton = true,
  actionButton,
}: {
  title: string;
  description: string;
  showBackButton?: boolean;
  actionButton?: React.ReactNode;
}) => {
  const navigation = useNavigation();

  return (
    <View className="flex-row items-center gap-3 px-5 pt-3">
      {showBackButton ? (
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="h-10 w-10 items-center justify-center rounded-lg border border-line bg-white active:bg-surface"
        >
          <ArrowNarrowLeft width={24} height={24} stroke="#15172B" strokeWidth={1.75} />
        </Pressable>
      ) : null}
      <View className="flex-1 gap-0.5">
        <Text className="text-2xl font-medium text-ink" numberOfLines={1}>
          {title}
        </Text>
        <Text className="text-sm text-muted" numberOfLines={1}>
          {description}
        </Text>
      </View>
      {actionButton ? <View>{actionButton}</View> : null}
    </View>
  );
};

export default PageHeader;
