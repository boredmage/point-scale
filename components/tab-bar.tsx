import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Home, Settings } from './icons';

const PRIMARY = '#5271FF';
const GREY = '#6c6d73';
const BUBBLE_INSET = 6;
const SPRING = { damping: 18, stiffness: 180, mass: 0.8 };

const icons = {
  index: Home,
  settings: Settings,
};

type TabItemProps = {
  routeName: string;
  label: string;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  accessibilityLabel?: string;
  testID?: string;
};

const TabItem = ({
  routeName,
  label,
  isFocused,
  onPress,
  onLongPress,
  accessibilityLabel,
  testID,
}: TabItemProps) => {
  const progress = useDerivedValue(() => withTiming(isFocused ? 1 : 0, { duration: 220 }));

  const labelStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], [GREY, '#ffffff']),
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + progress.value * 0.08 }],
  }));

  const IconComponent = icons[routeName as keyof typeof icons];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
      android_ripple={null}
      style={styles.tabBarItem}
    >
      <Animated.View style={iconStyle}>
        <IconComponent width={20} height={20} color={isFocused ? '#ffffff' : GREY} />
      </Animated.View>
      <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>
    </Pressable>
  );
};

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const [barWidth, setBarWidth] = useState(0);

  const visibleRoutes = state.routes.filter(
    (route) => !['_sitemap', '+not-found'].includes(route.name),
  );
  const itemWidth = visibleRoutes.length ? barWidth / visibleRoutes.length : 0;
  const focusedVisibleIndex = visibleRoutes.findIndex(
    (route) => route.key === state.routes[state.index]?.key,
  );

  const bubbleX = useSharedValue(0);

  React.useEffect(() => {
    if (itemWidth > 0 && focusedVisibleIndex >= 0) {
      bubbleX.value = withSpring(focusedVisibleIndex * itemWidth + BUBBLE_INSET, SPRING);
    }
  }, [focusedVisibleIndex, itemWidth, bubbleX]);

  const bubbleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: bubbleX.value }],
  }));

  const onLayout = (event: LayoutChangeEvent) => {
    setBarWidth(event.nativeEvent.layout.width);
  };

  return (
    <View className="android:pt-10 absolute bottom-0 w-full border border-transparent pt-12">
      <View style={styles.tabBar} onLayout={onLayout}>
        {itemWidth > 0 && (
          <Animated.View
            pointerEvents="none"
            style={[styles.bubble, { width: itemWidth - BUBBLE_INSET * 2 }, bubbleStyle]}
          />
        )}
        {visibleRoutes.map((route) => {
          const { options } = descriptors[route.key];
          const label =
            typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.routes[state.index]?.key === route.key;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({ type: 'tabLongPress', target: route.key });
          };

          return (
            <TabItem
              key={route.key}
              routeName={route.name}
              label={label}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    bottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 50,
    borderCurve: 'continuous',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 0.1,
    width: '50%',
    alignSelf: 'center',
    elevation: 10,
    overflow: 'hidden',
  },
  bubble: {
    position: 'absolute',
    top: BUBBLE_INSET,
    bottom: BUBBLE_INSET,
    left: 0,
    borderRadius: 50,
    borderCurve: 'continuous',
    backgroundColor: PRIMARY,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    height: '100%',
    paddingVertical: 10,
  },
  label: {
    fontSize: 10,
  },
});

export default TabBar;
