import { Stack, Text } from '@tamagui/core';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Clock from 'lucide-react-native/dist/esm/lucide-react-native/src/icons/clock.js';
import History from 'lucide-react-native/dist/esm/lucide-react-native/src/icons/history.js';
import Home from 'lucide-react-native/dist/esm/lucide-react-native/src/icons/house.js';
import User from 'lucide-react-native/dist/esm/lucide-react-native/src/icons/user.js';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

const tabConfig: Record<string, { label: string; Icon: typeof Home }> = {
  Home: { label: 'Home', Icon: Home },
  Chrono: { label: 'Chrono', Icon: Clock },
  History: { label: 'Historique', Icon: History },
  Profile: { label: 'Profil', Icon: User },
};

export function MainTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <Stack
      backgroundColor={colors.background}
      borderTopWidth={1}
      borderTopColor={colors.border}
      paddingBottom={Math.max(insets.bottom, 8)}
      paddingTop={9}
      paddingHorizontal={16}
    >
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const cfg = tabConfig[route.name];
          if (!cfg) {
            return null;
          }
          const { Icon, label } = cfg;
          const color = isFocused ? colors.primary : colors.textMuted;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              style={{ flex: 1, alignItems: 'center', minWidth: 56 }}
            >
              <Stack alignItems="center" gap={4} paddingVertical={4}>
                <Icon size={24} color={color} strokeWidth={2} />
                <Text
                  color={color}
                  fontWeight="500"
                  textAlign="center"
                  {...typography.tabLabel}
                >
                  {label}
                </Text>
              </Stack>
            </Pressable>
          );
        })}
      </Stack>
    </Stack>
  );
}
