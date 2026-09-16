import { cn } from '@/lib/utils';
import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import Text from './text';

interface PrimaryButtonProps extends PressableProps {
  title: string;
  icon?: React.ReactNode;
}

/** Solid primary call-to-action used at the bottom of forms and sheets. */
const PrimaryButton = ({ title, icon, className, disabled, ...props }: PrimaryButtonProps) => (
  <Pressable
    accessibilityRole="button"
    disabled={disabled}
    className={cn(
      'h-12 flex-row items-center justify-center gap-2 rounded-lg bg-primary active:opacity-90',
      disabled && 'opacity-40',
      className,
    )}
    {...props}
  >
    {icon}
    <Text className="text-base font-medium text-white">{title}</Text>
  </Pressable>
);

export default PrimaryButton;
