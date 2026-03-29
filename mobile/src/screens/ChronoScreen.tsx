import { Stack, Text } from '@tamagui/core';
import Settings from 'lucide-react-native/dist/esm/lucide-react-native/src/icons/settings.js';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenBackground } from '../components/ScreenBackground';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export function ChronoScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScreenBackground>
      <Stack
        flex={1}
        paddingTop={24 + insets.top}
        paddingHorizontal={24}
        paddingBottom={24}
      >
        <Stack alignItems="center" gap={8} marginBottom={32}>
          <Text
            color={colors.white}
            fontWeight="600"
            textAlign="center"
            textTransform="uppercase"
            {...typography.heading1}
          >
            CHRONOMÈTRE
          </Text>
          <Text
            color={colors.textMuted}
            textAlign="center"
            {...typography.label}
          >
            Prêt à t&apos;entraîner ?
          </Text>
        </Stack>

        <Stack flex={1} alignItems="center" justifyContent="center" gap={16}>
          <Text
            color={colors.white}
            fontWeight="700"
            textAlign="center"
            {...typography.timerDisplay}
          >
            00:00
          </Text>
          <Text color={colors.textMuted} {...typography.label}>
            En attente
          </Text>
        </Stack>

        <Stack gap={12}>
          <Pressable onPress={() => console.log('TODO')}>
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              gap={8}
              height={58}
              borderWidth={1}
              borderColor={colors.border}
              borderRadius={10}
              backgroundColor={colors.surface}
            >
              <Settings size={20} color={colors.white} />
              <Text color={colors.white} {...typography.label}>
                Paramètres de la séance
              </Text>
            </Stack>
          </Pressable>
          <Pressable onPress={() => console.log('TODO')}>
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
                textTransform="uppercase"
                {...typography.label}
              >
                DÉMARRER
              </Text>
            </Stack>
          </Pressable>
        </Stack>
      </Stack>
    </ScreenBackground>
  );
}
