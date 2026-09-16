import { cn } from '@/lib/utils';
import React from 'react';
import { Text as ExpoText } from 'react-native';

const weightClass = /\bfont-(?:medium|semibold|bold|extrabold|black)\b/g;

/**
 * App text. Uses Google Sans and maps any Tailwind weight class
 * (font-medium, font-bold, ...) to the medium face, which is the heaviest
 * weight the app ships.
 */
const Text = ({ className, ...props }: React.ComponentProps<typeof ExpoText>) => {
  const wantsMedium = weightClass.test(className ?? '');
  weightClass.lastIndex = 0;
  const family = wantsMedium ? 'font-system-medium' : 'font-system';

  return <ExpoText {...props} className={cn(family, className?.replace(weightClass, ''))} />;
};

export default Text;
