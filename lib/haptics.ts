import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

const native = Platform.OS === 'ios' || Platform.OS === 'android';

/** Light tick for changing a selection (chips, radios, checkboxes). */
export const hapticSelect = () => {
  if (native) Haptics.selectionAsync().catch(() => {});
};

/** Soft tap for opening something (sheets, tabs). */
export const hapticTap = () => {
  if (native) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
};

/** Result feedback after an action completes. */
export const hapticNotify = (kind: 'success' | 'warning' | 'error') => {
  if (!native) return;
  const type = {
    success: Haptics.NotificationFeedbackType.Success,
    warning: Haptics.NotificationFeedbackType.Warning,
    error: Haptics.NotificationFeedbackType.Error,
  }[kind];
  Haptics.notificationAsync(type).catch(() => {});
};
