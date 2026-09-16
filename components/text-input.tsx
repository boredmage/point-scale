import { cn } from '@/lib/utils';
import React from 'react';
import { TextInput as ExpoTextInput } from 'react-native';

/** Height of every form control so mixed rows line up. */
export const INPUT_HEIGHT = 48;

const TextInput = ({ className, style, ...props }: React.ComponentProps<typeof ExpoTextInput>) => {
  return (
    <ExpoTextInput
      placeholderTextColor="#9A9DB3"
      {...props}
      style={[{ height: INPUT_HEIGHT, fontSize: 16, paddingHorizontal: 14, lineHeight: 20 }, style]}
      className={cn('rounded-lg border border-line bg-white font-system text-ink', className)}
    />
  );
};

export default TextInput;
