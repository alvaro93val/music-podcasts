const RULES = {
  OFF: 'off',
  WARN: 'warn',
  ERROR: 'error'
};
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:react/recommended', 'standard', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'no-unused-vars': RULES.WARN,
    'react/prop-types': RULES.OFF,
    'react/react-in-jsx-scope': RULES.OFF
  }
};
