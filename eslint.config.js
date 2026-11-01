const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
module.exports = defineConfig([
  expoConfig,
  // Network/storage effects deliberately update loading/error state (RF06/RF09).
  { rules: { 'react-hooks/set-state-in-effect': 'off', 'import/no-named-as-default-member': 'off' } },
  { ignores: ['dist/**', 'dist-local/**', 'dist-android/**', 'tmp/**', 'output/**', 'test-results/**', '.claude/**'] },
]);
