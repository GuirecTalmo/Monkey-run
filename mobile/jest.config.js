module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '^lucide-react-native/dist/esm/lucide-react-native/src/icons/.+\\.js$':
      '<rootDir>/__mocks__/lucideIcon.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-navigation|@react-navigation|@tamagui|lucide-react-native|react-native-svg)/)',
  ],
};
