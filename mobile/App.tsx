/**
 * Monkey Run — shell app (navigation + Tamagui).
 */

import { TamaguiProvider } from '@tamagui/core';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import tamaguiConfig from './tamagui.config';

function App() {
  return (
    <TamaguiProvider config={tamaguiConfig as never} defaultTheme="light">
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
        <RootNavigator />
      </SafeAreaProvider>
    </TamaguiProvider>
  );
}

export default App;
