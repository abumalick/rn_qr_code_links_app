module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'prettier/prettier': 0,
    'react/self-closing-comp': 0,
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-native/no-inline-styles': 0,
  },
}
