import { Stack, Text } from '@tamagui/core';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ChevronRight from 'lucide-react-native/dist/esm/lucide-react-native/src/icons/chevron-right.js';
import LogOut from 'lucide-react-native/dist/esm/lucide-react-native/src/icons/log-out.js';
import Pencil from 'lucide-react-native/dist/esm/lucide-react-native/src/icons/pencil.js';
import { Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenBackground } from '../components/ScreenBackground';
import type { ProfileStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type Nav = NativeStackNavigationProp<ProfileStackParamList, 'ProfileMain'>;

function SettingsRow({
  label,
  onPress,
}: {
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress ?? (() => console.log('TODO'))}>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal={16}
        paddingVertical={16}
        borderBottomWidth={1}
        borderBottomColor={colors.border}
      >
        <Text color={colors.white} {...typography.label}>
          {label}
        </Text>
        <ChevronRight size={20} color={colors.textMuted} />
      </Stack>
    </Pressable>
  );
}

export function ProfileScreen() {
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
        <Stack gap={8} marginBottom={24}>
          <Text
            color={colors.white}
            fontWeight="600"
            textTransform="uppercase"
            {...typography.heading1}
          >
            PROFIL
          </Text>
          <Text color={colors.textMuted} {...typography.label}>
            Gère ton compte
          </Text>
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
          <Stack flexDirection="row" alignItems="center" gap={16}>
            <Stack
              width={73}
              height={80}
              borderRadius={10}
              backgroundColor={colors.primary}
              alignItems="center"
              justifyContent="center"
            >
              <Text color={colors.black} fontWeight="700" fontSize={24}>
                MR
              </Text>
            </Stack>
            <Stack flex={1} gap={4}>
              <Text
                color={colors.white}
                fontWeight="600"
                {...typography.heading2}
              >
                MONKEY_RUNNER
              </Text>
              <Text color={colors.textMuted} {...typography.label}>
                runner@colormonkey.com
              </Text>
            </Stack>
          </Stack>
          <Pressable onPress={() => navigation.navigate('EditProfile')}>
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              gap={8}
              height={48}
              borderRadius={8}
              borderWidth={1}
              borderColor={colors.border}
            >
              <Pencil size={16} color={colors.primary} />
              <Text color={colors.white} {...typography.label}>
                Modifier mon profil
              </Text>
            </Stack>
          </Pressable>
        </Stack>

        <Stack marginBottom={24}>
          <Text
            color={colors.white}
            fontWeight="600"
            textTransform="uppercase"
            marginBottom={16}
            {...typography.heading3}
          >
            PARAMÈTRES DU COMPTE
          </Text>
          <Stack
            borderWidth={1}
            borderColor={colors.border}
            borderRadius={10}
            overflow="hidden"
          >
            <SettingsRow label="Changer le mot de passe" />
            <SettingsRow label="Modifier le pseudo" />
            <SettingsRow label="Modifier l'avatar" />
          </Stack>
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
            MES STATISTIQUES
          </Text>
          <Stack flexDirection="row" justifyContent="space-between">
            {[
              { k: 'Séances', v: '24' },
              { k: 'Heures', v: '12' },
              { k: 'Semaines', v: '8' },
            ].map(s => (
              <Stack key={s.k} alignItems="center" flex={1} gap={4}>
                <Text color={colors.textMuted} {...typography.label}>
                  {s.k}
                </Text>
                <Text color={colors.white} fontWeight="700" fontSize={28}>
                  {s.v}
                </Text>
              </Stack>
            ))}
          </Stack>
        </Stack>

        <Pressable onPress={() => console.log('TODO')}>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            gap={8}
            height={58}
            borderRadius={10}
            borderWidth={1}
            borderColor={colors.border}
          >
            <LogOut size={20} color={colors.primary} />
            <Text color={colors.primary} {...typography.label}>
              Se déconnecter
            </Text>
          </Stack>
        </Pressable>
      </ScrollView>
    </ScreenBackground>
  );
}
