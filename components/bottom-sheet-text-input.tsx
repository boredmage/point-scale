import { cn } from '@/lib/utils';
import { BottomSheetTextInput as TextInput } from '@gorhom/bottom-sheet';
import React from 'react';

const BottomSheetTextInput = ({
  className,
  style,
  ...props
}: React.ComponentProps<typeof TextInput>) => {
  return (
    <TextInput
      placeholderTextColor="#9A9DB3"
      {...props}
      style={[{ height: 48, fontSize: 16, paddingHorizontal: 14, lineHeight: 20 }, style]}
      className={cn('rounded-lg border border-line bg-white font-system text-ink', className)}
    />
  );
};

export default BottomSheetTextInput;
