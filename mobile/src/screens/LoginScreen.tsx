import { Stack, Text } from '@tamagui/core';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenBackground } from '../components/ScreenBackground';
import type { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <ScreenBackground>
      <Stack
        flex={1}
        paddingTop={insets.top + 48}
        paddingHorizontal={32}
        gap={48}
      >
        <Stack alignItems="center" gap={8}>
          <Text
            color={colors.white}
            fontWeight="600"
            textAlign="center"
            textTransform="uppercase"
            width="100%"
            {...typography.heading1}
          >
            SE CONNECTER
          </Text>
          <Text
            color={colors.textMuted}
            textAlign="center"
            {...typography.label}
          >
            Bienvenue sur Monkey Run
          </Text>
        </Stack>

        <Stack gap={24} flex={1}>
          <Stack gap={8}>
            <Text
              color={colors.textBody}
              textTransform="uppercase"
              {...typography.label}
            >
              EMAIL
            </Text>
            <Stack
              backgroundColor={colors.surface}
              borderWidth={1}
              borderColor={colors.border}
              borderRadius={8}
              height={36}
              paddingHorizontal={12}
              justifyContent="center"
            >
              <Text
                color={colors.textPlaceholder}
                {...typography.inputPlaceholder}
              >
                ton@email.com
              </Text>
            </Stack>
          </Stack>

          <Stack gap={8}>
            <Text
              color={colors.textBody}
              textTransform="uppercase"
              {...typography.label}
            >
              MOT DE PASSE
            </Text>
            <Stack
              backgroundColor={colors.surface}
              borderWidth={1}
              borderColor={colors.border}
              borderRadius={8}
              height={36}
              paddingHorizontal={12}
              justifyContent="center"
            >
              <Text
                color={colors.textPlaceholder}
                {...typography.inputPlaceholder}
              >
                ••••••••
              </Text>
            </Stack>
          </Stack>

          <Pressable onPress={() => console.log('TODO')}>
            <Text color={colors.primary} {...typography.label}>
              Mot de passe oublié ?
            </Text>
          </Pressable>
        </Stack>

        <Stack gap={16} paddingBottom={insets.bottom + 24}>
          <Pressable onPress={() => navigation.replace('Main')}>
            <Stack
              backgroundColor={colors.primary}
              height={56}
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
              >
                SE CONNECTER
              </Text>
            </Stack>
          </Pressable>
          <Stack
            flexDirection="row"
            alignItems="center"
            flexWrap="wrap"
            gap={4}
          >
            <Text color={colors.textMuted} {...typography.label}>
              Nouveau ?{' '}
            </Text>
            <Pressable onPress={() => navigation.navigate('Signup')}>
              <Text color={colors.primary} {...typography.label}>
                Créer un compte
              </Text>
            </Pressable>
          </Stack>
        </Stack>
      </Stack>
    </ScreenBackground>
  );
}
