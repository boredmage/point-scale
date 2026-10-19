import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetProps,
  useBottomSheetTimingConfigs,
} from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { View } from 'react-native';
import { Easing } from 'react-native-reanimated';
import Text from './text';

/** Shared chrome for every bottom sheet: rounded top, faint handle, dimmed backdrop. */
export const Sheet = forwardRef<BottomSheet, BottomSheetProps>((props, ref) => {
  // A short ease-out feels far snappier than the library's default spring.
  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 220,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      enablePanDownToClose
      enableDynamicSizing
      animationConfigs={animationConfigs}
      backgroundStyle={{ borderRadius: 24, backgroundColor: '#FFFFFF' }}
      handleIndicatorStyle={{ backgroundColor: '#D2D4DF', width: 40 }}
      backdropComponent={(backdropProps) => (
        // Start touch-through: by default the closed, invisible backdrop mounts with
        // pointerEvents "auto" and covers the whole screen until a reanimated
        // reaction flips it, which can leave every screen unclickable on some devices.
        <BottomSheetBackdrop
          {...backdropProps}
          enableTouchThrough
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.45}
        />
      )}
      {...props}
    />
  );
});
Sheet.displayName = 'Sheet';

export const SheetHeader = ({ title, description }: { title: string; description?: string }) => (
  <View className="gap-0.5">
    <Text className="text-xl font-medium text-ink">{title}</Text>
    {description ? <Text className="text-sm text-muted">{description}</Text> : null}
  </View>
);
