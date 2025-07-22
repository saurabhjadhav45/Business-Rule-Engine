module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    project: ['./tsconfig.json'],
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', '@typescript-eslint', 'import', 'prettier', 'react-hooks', 'jsx-a11y'],
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'prettier/prettier': ['error', {endOfLine: 'auto'}, {usePrettierrc: true}],
    'react/jsx-filename-extension': [
      1,
      {extentions: ['.js', '.jsx', 'tsx', 'ts']},
    ],
    'react/function-component-definition': [
      2,
      {namedComponents: 'function-declaration'},
    ],
    'import/extensions': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prefer-stateless-function': 'off',
    'react/prop-types': 'off',
    'import/no-extraneous-dependencies': ['error', {devDependencies: true}],
    'react/jsx-filename-extension': [
      'warn',
      {extensions: ['*.js', '.jsx', '*.ts', '.tsx']},
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    // label-has-associated-control is off  for label
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'no-param-reassign': 'off',
    'import/no-unresolved': 'off',
  },
  overrides: [
    {
      files: ['vite.config.ts'],
      parserOptions: {
        project: ['./tsconfig.node.json'],
      },
    },
    {
      files: ['src/shared/icons/*'],
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
    {
      files: ['src/common/constants/*'],
      rules: {
        'import/prefer-default-export': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
      },
    },
    {
      files: ['src/core/constants/*'],
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
    {
      files: ['**/*.test.tsx', '**/*.test.ts'],
      parserOptions: {
        project: null,
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
  ignorePatterns: ['src/modules/**/*'],
};
