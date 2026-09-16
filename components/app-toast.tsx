import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast, { ToastConfig, ToastConfigParams } from 'react-native-toast-message';
import Text from './text';

type Kind = 'success' | 'error' | 'info';

const styles: Record<
  Kind,
  { icon: React.ComponentProps<typeof Feather>['name']; bg: string; fg: string }
> = {
  success: { icon: 'check', bg: '#E3F7EC', fg: '#1E9E5A' },
  error: { icon: 'alert-circle', bg: '#FDE2E2', fg: '#B42318' },
  info: { icon: 'info', bg: '#E8ECFF', fg: '#5271FF' },
};

const ToastCard = ({ kind, text1, text2, hide }: ToastConfigParams<unknown> & { kind: Kind }) => {
  const { width } = useWindowDimensions();
  const { icon, bg, fg } = styles[kind];

  return (
    <Pressable
      onPress={() => hide()}
      accessibilityRole="alert"
      style={{ width: width - 40 }}
      className="flex-row items-center gap-3 rounded-xl border border-line bg-white p-3.5"
    >
      <View
        className="h-10 w-10 items-center justify-center rounded-lg"
        style={{ backgroundColor: bg }}
      >
        <Feather name={icon} size={20} color={fg} />
      </View>
      <View className="flex-1 gap-px">
        {text1 ? (
          <Text className="text-[15px] font-medium text-ink" numberOfLines={1}>
            {text1}
          </Text>
        ) : null}
        {text2 ? (
          <Text className="text-[13px] text-muted" numberOfLines={2}>
            {text2}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
};

const toastConfig: ToastConfig = {
  success: (props) => <ToastCard {...props} kind="success" />,
  error: (props) => <ToastCard {...props} kind="error" />,
  info: (props) => <ToastCard {...props} kind="info" />,
};

/** Mount once at the root. Positions toasts just below the status bar on every screen. */
const AppToast = () => {
  const insets = useSafeAreaInsets();
  return <Toast config={toastConfig} topOffset={insets.top + 8} visibilityTime={2500} />;
};

export default AppToast;
