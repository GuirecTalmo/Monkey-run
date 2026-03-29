import type { ReactNode } from 'react';
import { Stack } from '@tamagui/core';
import { colors } from '../theme/colors';

type Props = {
  children: ReactNode;
};

export function ScreenBackground({ children }: Props) {
  return (
    <Stack flex={1} backgroundColor={colors.background}>
      {children}
    </Stack>
  );
}
