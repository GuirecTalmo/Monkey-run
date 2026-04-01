import { Stack, Text } from '@tamagui/core';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenBackground } from '../components/ScreenBackground';
import type { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

function FakeField({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <Stack gap={8}>
      <Text
        color={colors.textBody}
        textTransform="uppercase"
        {...typography.label}
      >
        {label}
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
        <Text color={colors.textPlaceholder} {...typography.inputPlaceholder}>
          {placeholder}
        </Text>
      </Stack>
    </Stack>
  );
}

export function SignupScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <ScreenBackground>
      <Stack
        flex={1}
        paddingTop={insets.top + 24}
        paddingHorizontal={32}
        gap={32}
      >
        <Stack alignItems="center" gap={8}>
          <Text
            color={colors.white}
            fontWeight="600"
            textAlign="center"
            textTransform="uppercase"
            {...typography.heading1}
          >
            CRÉER UN COMPTE
          </Text>
          <Text
            color={colors.textMuted}
            textAlign="center"
            {...typography.label}
          >
            Rejoins la communauté des runners
          </Text>
        </Stack>

        <Stack gap={16} flex={1}>
          <FakeField label="EMAIL" placeholder="ton@email.com" />
          <FakeField label="MOT DE PASSE" placeholder="••••••••" />
          <FakeField label="CONFIRMER MOT DE PASSE" placeholder="••••••••" />

          <Stack
            flexDirection="row"
            alignItems="flex-start"
            gap={12}
            marginTop={8}
          >
            <Stack
              width={16}
              height={16}
              borderWidth={1}
              borderColor={colors.border}
              borderRadius={4}
              marginTop={4}
              backgroundColor={colors.surface}
            />
            <Text color={colors.textBody} flex={1} {...typography.label}>
              J&apos;accepte les conditions générales d&apos;utilisation et la
              politique de confidentialité.
            </Text>
          </Stack>
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
                CRÉER MON COMPTE
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
              Déjà un compte ?{' '}
            </Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text color={colors.primary} {...typography.label}>
                Se connecter
              </Text>
            </Pressable>
          </Stack>
        </Stack>
      </Stack>
    </ScreenBackground>
  );
}
