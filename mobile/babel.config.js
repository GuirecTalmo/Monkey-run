module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      '@tamagui/babel-plugin',
      {
        components: ['@tamagui/core'],
        config: './tamagui.config.ts',
        logTimings: true,
      },
    ],
  ],
};
