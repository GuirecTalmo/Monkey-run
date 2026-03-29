import { Stack } from '@tamagui/core';
import { colors } from '../theme/colors';

type Props = {
  total: number;
  activeIndex: number;
};

export function OnboardingPagerDots({ total, activeIndex }: Props) {
  return (
    <Stack
      flexDirection="row"
      gap={8}
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      {Array.from({ length: total }).map((_, i) => (
        <Stack
          key={i}
          height={8}
          width={i === activeIndex ? 32 : 8}
          borderRadius={9999}
          backgroundColor={
            i === activeIndex ? colors.primary : colors.dotInactive
          }
        />
      ))}
    </Stack>
  );
}
