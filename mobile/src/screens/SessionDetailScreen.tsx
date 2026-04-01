import { Stack, Text } from '@tamagui/core';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ChevronLeft from 'lucide-react-native/dist/esm/lucide-react-native/src/icons/chevron-left.js';
import { Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenBackground } from '../components/ScreenBackground';
import type { HistoryStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type Nav = NativeStackNavigationProp<HistoryStackParamList, 'SessionDetail'>;

/** Barres du graphique fractionné (maquette : alternance hauteurs). */
function IntervalBars() {
  const heights = [48, 32, 48, 24, 48, 40, 48, 28, 48, 36, 48, 30, 48, 24];

  return (
    <Stack
      flexDirection="row"
      flexWrap="wrap"
      gap={4}
      justifyContent="space-between"
    >
      {heights.map((h, i) => (
        <Stack
          key={i}
          width={18}
          height={h}
          borderRadius={2}
          backgroundColor={i % 2 === 0 ? colors.primary : colors.surface}
          borderWidth={i % 2 === 1 ? 1 : 0}
          borderColor={colors.border}
        />
      ))}
    </Stack>
  );
}

export function SessionDetailScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();

  return (
    <ScreenBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 24 + insets.top,
          paddingBottom: 32,
          paddingHorizontal: 24,
        }}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ marginBottom: 24 }}
        >
          <Stack flexDirection="row" alignItems="center" gap={8}>
            <ChevronLeft size={20} color={colors.primary} />
            <Text color={colors.primary} {...typography.label}>
              Retour
            </Text>
          </Stack>
        </Pressable>

        <Stack gap={8} marginBottom={32}>
          <Text color={colors.white} fontWeight="600" {...typography.heading1}>
            Session intense
          </Text>
          <Text color={colors.textMuted} {...typography.label}>
            2025-11-02
          </Text>
        </Stack>

        <Stack
          backgroundColor={colors.surface}
          borderWidth={1}
          borderColor={colors.border}
          borderRadius={10}
          padding={25}
          alignItems="center"
          gap={8}
          marginBottom={24}
        >
          <Text
            color={colors.textMuted}
            textTransform="uppercase"
            {...typography.label}
          >
            DURÉE TOTALE
          </Text>
          <Text
            color={colors.white}
            fontWeight="700"
            textAlign="center"
            {...typography.statLarge}
          >
            18:42
          </Text>
        </Stack>

        <Stack
          flexDirection="row"
          backgroundColor={colors.surface}
          borderWidth={1}
          borderColor={colors.border}
          borderRadius={10}
          padding={16}
          marginBottom={24}
        >
          {[
            { label: 'Minutes', value: '26' },
            { label: 'Accélérations', value: '13' },
            { label: 'Type', value: '1/1' },
          ].map(c => (
            <Stack key={c.label} flex={1} alignItems="center" gap={4}>
              <Text
                color={colors.textMuted}
                textAlign="center"
                {...typography.label}
              >
                {c.label}
              </Text>
              <Text color={colors.white} fontWeight="600" fontSize={22}>
                {c.value}
              </Text>
            </Stack>
          ))}
        </Stack>

        <Stack
          backgroundColor={colors.surface}
          borderWidth={1}
          borderColor={colors.border}
          borderRadius={10}
          padding={25}
          gap={16}
          marginBottom={24}
        >
          <Text
            color={colors.white}
            fontWeight="600"
            textTransform="uppercase"
            {...typography.heading3}
          >
            DÉTAIL DE LA SÉANCE
          </Text>
          <IntervalBars />
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            marginTop={8}
          >
            <Text color={colors.textMuted} {...typography.label}>
              0 min
            </Text>
            <Text color={colors.textMuted} {...typography.label}>
              25 min
            </Text>
          </Stack>
        </Stack>

        <Stack
          backgroundColor={colors.surface}
          borderWidth={1}
          borderColor={colors.border}
          borderRadius={10}
          padding={25}
          gap={12}
        >
          <Text
            color={colors.white}
            fontWeight="600"
            textTransform="uppercase"
            {...typography.heading3}
          >
            PARAMÈTRES UTILISÉS
          </Text>
          <Text color={colors.textBody} {...typography.label}>
            ✓ Notification vocale
          </Text>
          <Text color={colors.textBody} {...typography.label}>
            ✓ Vibration
          </Text>
        </Stack>
      </ScrollView>
    </ScreenBackground>
  );
}
