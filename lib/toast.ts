import Toast, { ToastType } from 'react-native-toast-message';
import { hapticNotify } from './haptics';

/** Show an app-styled toast. Rendering is handled by `components/app-toast.tsx`. */
export const toast = (title: string, msg: string, type: ToastType = 'success') => {
  hapticNotify(type === 'error' ? 'error' : type === 'info' ? 'warning' : 'success');
  return Toast.show({
    type,
    text1: title,
    text2: msg,
    swipeable: true,
  });
};
