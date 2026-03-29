import { config } from '@tamagui/config/v3';
import { createTamagui } from '@tamagui/core';

// Cast : aligne les types @tamagui/config / @tamagui/core (tsc + parse Jest/Babel).
const appConfig = createTamagui(config as any);

export default appConfig;
