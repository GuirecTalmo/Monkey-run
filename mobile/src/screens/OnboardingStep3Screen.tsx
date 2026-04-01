import { Stack, Text } from '@tamagui/core';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ChevronRight from 'lucide-react-native/dist/esm/lucide-react-native/src/icons/chevron-right.js';
import Play from 'lucide-react-native/dist/esm/lucide-react-native/src/icons/play.js';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { OnboardingPagerDots } from '../components/OnboardingPagerDots';
import { ScreenBackground } from '../components/ScreenBackground';
import type { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding3'>;

export function OnboardingStep3Screen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <ScreenBackground>
      <Stack flex={1} paddingTop={insets.top + 8} paddingHorizontal={32}>
        <Stack flexDirection="row" justifyContent="flex-end" marginBottom={8}>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text color={colors.textMuted} {...typography.label}>
              Skip
            </Text>
          </Pressable>
        </Stack>

        <Stack
          flex={1}
          alignItems="center"
          justifyContent="center"
          paddingHorizontal={13}
          gap={16}
        >
          <Stack
            alignItems="center"
            justifyContent="center"
            width={80}
            height={80}
          >
            <Play size={56} color={colors.primary} strokeWidth={2.5} />
          </Stack>

          <Stack alignItems="center" gap={8}>
            <Text
              color={colors.white}
              fontWeight="600"
              textAlign="center"
              textTransform="uppercase"
              {...typography.heading1}
            >
              START. RUN. SAVE.
            </Text>
            <Text
              color={colors.primary}
              fontWeight="600"
              textAlign="center"
              textTransform="uppercase"
              {...typography.subtitleAccent}
            >
              NO COMPLEXITY
            </Text>
          </Stack>

          <Text
            color={colors.textBody}
            textAlign="center"
            fontWeight="400"
            paddingHorizontal={4}
            {...typography.bodyLarge}
          >
            Lance une séance, cours, enregistre. Retrouve ton historique quand
            tu veux.
          </Text>
        </Stack>

        <Stack gap={24} paddingBottom={insets.bottom + 16}>
          <OnboardingPagerDots total={3} activeIndex={2} />
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Stack
              backgroundColor={colors.primary}
              height={56}
              borderRadius={10}
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              gap={8}
            >
              <Text
                color={colors.black}
                fontWeight="600"
                textTransform="uppercase"
                {...typography.label}
              >
                COMMENCER
              </Text>
              <ChevronRight size={20} color={colors.black} strokeWidth={2.5} />
            </Stack>
          </Pressable>
        </Stack>
      </Stack>
    </ScreenBackground>
  );
}
