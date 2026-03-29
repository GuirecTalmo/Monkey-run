import { Stack, Text } from '@tamagui/core';
import Calendar from 'lucide-react-native/dist/esm/lucide-react-native/src/icons/calendar.js';
import ChevronRight from 'lucide-react-native/dist/esm/lucide-react-native/src/icons/chevron-right.js';
import Clock from 'lucide-react-native/dist/esm/lucide-react-native/src/icons/clock.js';
import { Pressable } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type Props = {
  title: string;
  dateLabel: string;
  durationLabel: string;
  onPress?: () => void;
};

export function SessionCard({
  title,
  dateLabel,
  durationLabel,
  onPress,
}: Props) {
  return (
    <Pressable onPress={onPress ?? (() => console.log('TODO'))}>
      <Stack
        backgroundColor={colors.surface}
        borderWidth={1}
        borderColor={colors.border}
        borderRadius={10}
        paddingTop={17}
        paddingBottom={17}
        paddingHorizontal={17}
        marginBottom={0}
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack flex={1} gap={8}>
            <Text
              color={colors.white}
              fontWeight="400"
              {...typography.heading3}
            >
              {title}
            </Text>
            <Stack flexDirection="row" alignItems="center" gap={16}>
              <Stack flexDirection="row" alignItems="center" gap={4}>
                <Calendar size={16} color={colors.textMuted} />
                <Text color={colors.textMuted} {...typography.heading3}>
                  {dateLabel}
                </Text>
              </Stack>
              <Stack flexDirection="row" alignItems="center" gap={4}>
                <Clock size={16} color={colors.textMuted} />
                <Text color={colors.textMuted} {...typography.heading3}>
                  {durationLabel}
                </Text>
              </Stack>
            </Stack>
            <Stack
              alignSelf="flex-start"
              backgroundColor={colors.primary}
              paddingHorizontal={12}
              paddingVertical={4}
              borderRadius={4}
              marginTop={9}
            >
              <Text color={colors.black} fontWeight="400" {...typography.badge}>
                Fractionné
              </Text>
            </Stack>
          </Stack>
          <ChevronRight size={20} color={colors.textMuted} />
        </Stack>
      </Stack>
    </Pressable>
  );
}
