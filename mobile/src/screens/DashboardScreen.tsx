import { Stack, Text } from '@tamagui/core';
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Clock from 'lucide-react-native/dist/esm/lucide-react-native/src/icons/clock.js';
import TrendingUp from 'lucide-react-native/dist/esm/lucide-react-native/src/icons/trending-up.js';
import { Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SessionCard } from '../components/SessionCard';
import { ScreenBackground } from '../components/ScreenBackground';
import type { HomeStackParamList, MainTabParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type Nav = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'Dashboard'>,
  BottomTabNavigationProp<MainTabParamList>
>;

export function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();

  const goHistory = () =>
    navigation.navigate('History', { screen: 'HistoryMain' });
  const goChrono = () =>
    navigation.navigate('Chrono', { screen: 'ChronoMain' });
  const goSessionDetail = () =>
    navigation.navigate('History', { screen: 'SessionDetail' });

  return (
    <ScreenBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 24 + insets.top,
          paddingBottom: 24,
          paddingHorizontal: 24,
          gap: 32,
        }}
      >
        <Stack gap={8}>
          <Text
            color={colors.primary}
            fontWeight="600"
            {...typography.label}
            letterSpacing={0.8}
          >
            HEY, MONKEY RUNNER
          </Text>
          <Text color={colors.white} fontWeight="600" {...typography.heading1}>
            DASHBOARD
          </Text>
        </Stack>

        <Stack flexDirection="row" gap={16}>
          <Stack
            flex={1}
            backgroundColor={colors.surface}
            borderWidth={1}
            borderColor={colors.border}
            borderRadius={10}
            padding={17}
            gap={8}
          >
            <Stack
              flexDirection="row"
              alignItems="center"
              gap={8}
              minHeight={48}
            >
              <TrendingUp size={16} color={colors.primary} />
              <Text color={colors.textMuted} {...typography.label}>
                Cette semaine
              </Text>
            </Stack>
            <Text color={colors.white} textAlign="center" {...typography.label}>
              5 séances
            </Text>
          </Stack>
          <Stack
            flex={1}
            backgroundColor={colors.surface}
            borderWidth={1}
            borderColor={colors.border}
            borderRadius={10}
            padding={17}
            gap={8}
          >
            <Stack
              flexDirection="row"
              alignItems="center"
              gap={8}
              minHeight={48}
            >
              <Clock size={16} color={colors.primary} />
              <Text color={colors.textMuted} {...typography.label}>
                Durée totale
              </Text>
            </Stack>
            <Text color={colors.white} textAlign="center" {...typography.label}>
              2h 15min
            </Text>
          </Stack>
        </Stack>

        <Pressable
          onPress={() => {
            console.log('TODO');
            goChrono();
          }}
        >
          <Stack
            backgroundColor={colors.primary}
            height={72}
            borderRadius={10}
            alignItems="center"
            justifyContent="center"
          >
            <Text
              color={colors.black}
              fontWeight="600"
              textAlign="center"
              textTransform="uppercase"
              {...typography.label}
              letterSpacing={0.8}
            >
              LANCER UNE SÉANCE
            </Text>
          </Stack>
        </Pressable>

        <Stack gap={16}>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text
              color={colors.white}
              fontWeight="600"
              textTransform="uppercase"
              {...typography.heading2}
            >
              DERNIÈRES SÉANCES
            </Text>
            <Pressable onPress={() => console.log('TODO')}>
              <Text color={colors.primary} {...typography.label}>
                Voir tout
              </Text>
            </Pressable>
          </Stack>
          <Stack gap={12}>
            <SessionCard
              title="Fractionné matin"
              dateLabel="2025-11-03"
              durationLabel="25:34"
              onPress={goSessionDetail}
            />
            <SessionCard
              title="Session intense"
              dateLabel="2025-11-02"
              durationLabel="18:42"
              onPress={goSessionDetail}
            />
            <SessionCard
              title="Run du soir"
              dateLabel="2025-11-01"
              durationLabel="32:15"
              onPress={goSessionDetail}
            />
          </Stack>
        </Stack>
      </ScrollView>
    </ScreenBackground>
  );
}
