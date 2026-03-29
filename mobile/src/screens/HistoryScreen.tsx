import { Stack, Text } from '@tamagui/core';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SessionCard } from '../components/SessionCard';
import { ScreenBackground } from '../components/ScreenBackground';
import type { HistoryStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type Nav = NativeStackNavigationProp<HistoryStackParamList, 'HistoryMain'>;

const filters = ['Toutes', 'Cette semaine', 'Ce mois'] as const;

export function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();

  return (
    <ScreenBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 24 + insets.top,
          paddingBottom: 24,
          paddingHorizontal: 24,
          gap: 24,
        }}
      >
        <Stack gap={8}>
          <Text
            color={colors.white}
            fontWeight="600"
            textTransform="uppercase"
            {...typography.heading1}
          >
            HISTORIQUE
          </Text>
          <Text color={colors.textMuted} {...typography.label}>
            Toutes tes séances
          </Text>
        </Stack>

        <Stack flexDirection="row" flexWrap="wrap" gap={8}>
          {filters.map(f => (
            <Pressable key={f} onPress={() => console.log('TODO')}>
              <Stack
                paddingHorizontal={16}
                paddingVertical={7}
                borderRadius={8}
                borderWidth={1}
                borderColor={colors.border}
                backgroundColor={colors.surface}
              >
                <Text color={colors.white} {...typography.label}>
                  {f}
                </Text>
              </Stack>
            </Pressable>
          ))}
        </Stack>

        <Stack gap={12}>
          <SessionCard
            title="Fractionné matin"
            dateLabel="2025-11-03"
            durationLabel="25:34"
            onPress={() => navigation.navigate('SessionDetail')}
          />
          <SessionCard
            title="Session intense"
            dateLabel="2025-11-02"
            durationLabel="18:42"
            onPress={() => navigation.navigate('SessionDetail')}
          />
          <SessionCard
            title="Run du soir"
            dateLabel="2025-11-01"
            durationLabel="32:15"
            onPress={() => navigation.navigate('SessionDetail')}
          />
          <SessionCard
            title="Training rapide"
            dateLabel="2025-10-31"
            durationLabel="15:20"
            onPress={() => navigation.navigate('SessionDetail')}
          />
          <SessionCard
            title="Session endurance"
            dateLabel="2025-10-30"
            durationLabel="42:18"
            onPress={() => navigation.navigate('SessionDetail')}
          />
        </Stack>
      </ScrollView>
    </ScreenBackground>
  );
}
