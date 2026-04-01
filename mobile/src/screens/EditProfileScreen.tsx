import { Stack, Text } from '@tamagui/core';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Camera from 'lucide-react-native/dist/esm/lucide-react-native/src/icons/camera.js';
import ChevronLeft from 'lucide-react-native/dist/esm/lucide-react-native/src/icons/chevron-left.js';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenBackground } from '../components/ScreenBackground';
import type { ProfileStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type Nav = NativeStackNavigationProp<ProfileStackParamList, 'EditProfile'>;

export function EditProfileScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();

  return (
    <ScreenBackground>
      <Stack
        flex={1}
        paddingTop={24 + insets.top}
        paddingHorizontal={24}
        paddingBottom={24}
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
          <Text
            color={colors.white}
            fontWeight="600"
            textTransform="uppercase"
            {...typography.heading1}
          >
            MODIFIER LE PROFIL
          </Text>
          <Text color={colors.textMuted} {...typography.label}>
            Personnalise ton compte
          </Text>
        </Stack>

        <Stack alignItems="center" marginBottom={32}>
          <Stack width={96} height={96} position="relative">
            <Stack
              width={96}
              height={96}
              borderRadius={48}
              backgroundColor={colors.surface}
              borderWidth={2}
              borderColor={colors.border}
              alignItems="center"
              justifyContent="center"
            >
              <Text color={colors.white} fontWeight="700" fontSize={28}>
                MR
              </Text>
            </Stack>
            <Pressable
              onPress={() => console.log('TODO')}
              style={{ position: 'absolute', right: -2, bottom: -2 }}
            >
              <Stack
                width={34}
                height={34}
                borderRadius={17}
                backgroundColor={colors.primary}
                alignItems="center"
                justifyContent="center"
              >
                <Camera size={16} color={colors.black} />
              </Stack>
            </Pressable>
          </Stack>
        </Stack>

        <Stack gap={16} flex={1}>
          <Stack gap={8}>
            <Text
              color={colors.textBody}
              textTransform="uppercase"
              {...typography.label}
            >
              PSEUDO
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
              <Text color={colors.white} {...typography.inputPlaceholder}>
                MONKEY_RUNNER
              </Text>
            </Stack>
          </Stack>
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
              <Text color={colors.white} {...typography.inputPlaceholder}>
                runner@colormonkey.com
              </Text>
            </Stack>
            <Text color={colors.textMuted} fontSize={13} marginTop={4}>
              L&apos;email ne peut pas être modifié
            </Text>
          </Stack>
        </Stack>

        <Pressable onPress={() => console.log('TODO')}>
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
              textTransform="uppercase"
              {...typography.label}
            >
              ENREGISTRER
            </Text>
          </Stack>
        </Pressable>
      </Stack>
    </ScreenBackground>
  );
}
