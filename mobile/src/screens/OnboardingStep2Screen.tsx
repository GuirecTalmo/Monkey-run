import { Stack, Text } from '@tamagui/core';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ChevronRight from 'lucide-react-native/dist/esm/lucide-react-native/src/icons/chevron-right.js';
import Zap from 'lucide-react-native/dist/esm/lucide-react-native/src/icons/zap.js';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { OnboardingPagerDots } from '../components/OnboardingPagerDots';
import { ScreenBackground } from '../components/ScreenBackground';
import type { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding2'>;

export function OnboardingStep2Screen({ navigation }: Props) {
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
            <Zap size={56} color={colors.primary} strokeWidth={2.5} />
          </Stack>

          <Stack alignItems="center" gap={8}>
            <Text
              color={colors.white}
              fontWeight="600"
              textAlign="center"
              textTransform="uppercase"
              {...typography.heading1}
            >
              ACCELERATE
            </Text>
            <Text
              color={colors.primary}
              fontWeight="600"
              textAlign="center"
              textTransform="uppercase"
              {...typography.subtitleAccent}
            >
              SLOW DOWN
            </Text>
          </Stack>

          <Text
            color={colors.textBody}
            textAlign="center"
            fontWeight="400"
            paddingHorizontal={4}
            {...typography.bodyLarge}
          >
            À chaque minute, l&apos;app te guide : accélère puis ralentis.
            Simple et efficace.
          </Text>
        </Stack>

        <Stack gap={24} paddingBottom={insets.bottom + 16}>
          <OnboardingPagerDots total={3} activeIndex={1} />
          <Pressable onPress={() => navigation.navigate('Onboarding3')}>
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
                SUIVANT
              </Text>
              <ChevronRight size={20} color={colors.black} strokeWidth={2.5} />
            </Stack>
          </Pressable>
        </Stack>
      </Stack>
    </ScreenBackground>
  );
}
