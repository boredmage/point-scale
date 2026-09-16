import { Platform } from 'react-native';
import Toast, { ToastType } from 'react-native-toast-message';

const fontFamily = Platform.select({
  ios: 'GoogleSans-Regular',
  default: 'GoogleSans_400Regular',
});

export const toast = (title: string, msg: string, type?: ToastType) => {
  return Toast.show({
    type: type || 'success',
    swipeable: true,
    text1: title,
    text1Style: {
      fontFamily,
      fontSize: 16,
      fontWeight: 400,
    },

    text2: msg,
    text2Style: { fontFamily, fontSize: 14 },
    topOffset: Platform.select({
      android: 60,
      default: 40,
    }),
  });
};
