import { cn } from '@/lib/utils';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ArrowNarrowLeft } from './icons';

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
  const navigate = useNavigation();

  const handleGoBack = () => {
    navigate.goBack();
  };

  return (
    <View className="mx-auto w-11/12 flex-row pt-4">
      {showBackButton ? (
        <View className="flex-1">
          <Pressable onPress={handleGoBack} className="-left-2">
            <ArrowNarrowLeft width={40} height={40} stroke="#5271FF" strokeWidth={1.5} />
          </Pressable>
        </View>
      ) : null}
      <View className="flex-grow">
        <Text
          className={cn(
            'text-2xl font-normal uppercase text-primary',
            showBackButton ? 'text-center' : 'text-left',
          )}
        >
          {title}
        </Text>
        <Text
          className={cn(
            'text-sm font-normal text-gray-700',
            showBackButton ? 'text-center' : 'text-left',
          )}
        >
          {description}
        </Text>
      </View>
      {actionButton ? (
        <View className="flex-1 items-end">{actionButton}</View>
      ) : (
        <View className="flex-1"></View>
      )}
    </View>
  );
};

export default PageHeader;
