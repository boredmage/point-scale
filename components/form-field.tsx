import React from 'react';
import { View } from 'react-native';
import Text from './text';

/** Label + control + optional validation message, used by the add/edit forms. */
const FormField = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | false;
  children: React.ReactNode;
}) => (
  <View className="gap-1.5">
    <Text className="text-sm text-muted">{label}</Text>
    {children}
    {error ? <Text className="text-xs text-[#DC3545]">{error}</Text> : null}
  </View>
);

export default FormField;
