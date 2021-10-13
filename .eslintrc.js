module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
    es2020: true,
    commonjs: true,
    browser: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', '@react-native-community', 'prettier'],
  plugins: ['import', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020
  },
  rules: {
    'import/order': [
      'error',
      {
        groups: ['index', 'sibling', 'parent', 'internal', 'external', 'builtin', 'object', 'type'],
        alphabetize: { order: 'asc' }
      }
    ],
    'import/no-unresolved': 0,
    'no-param-reassign': [
      2,
      {
        props: false
      }
    ],
    'object-shorthand': ['error', 'always'],
    'prettier/prettier': ['error'],
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    'jsx-quotes': 0,
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true
      }
    ],
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/ban-types': 0,
    'no-catch-shadow': 0,
    'no-shadow': 0,
    'react/prop-types': 0,
    'react/no-children-prop': 0,
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'react/no-array-index-key': 0,
    'max-len': ['error', 120],
    '@typescript-eslint/ban-ts-comment': 2,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 0,
    'react-native/no-color-literals': 0,
    'react-native/no-raw-text': 0,
    'import/no-extraneous-dependencies': 2,
    'import/extensions': ['error', 'never', { svg: 'always' }],
    'import/no-duplicates': 2,
    'import/no-useless-path-segments': 2,
    'import/prefer-default-export': 0,
    'import/named': 0,
    'import/namespace': 0,
    'import/default': 0,
    'import/no-named-as-default-member': 0,
    'import/no-named-as-default': 0,
    'import/no-unused-modules': 0,
    'import/no-deprecated': 0,
    '@typescript-eslint/indent': 0,
    'import/no-anonymous-default-export': 2,
    'react-hooks/rules-of-hooks': 1,
    'react-hooks/exhaustive-deps': ['warn', { additionalHooks: '(useMemoOne)' }],
    'jest/no-identical-title': 2,
    'jest/valid-expect': 2,
    camelcase: 0,
    'prefer-destructuring': 2,
    'no-nested-ternary': 2,
    'comma-dangle': 0
  },
  settings: {
    'import/core-modules': ['react-native', 'react'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.d.ts',
          '.android.js',
          '.android.jsx',
          '.android.ts',
          '.android.tsx',
          '.ios.js',
          '.ios.jsx',
          '.ios.ts',
          '.ios.tsx',
          '.web.js',
          '.web.jsx',
          '.web.ts',
          '.web.tsx'
        ]
      },
      alias: {
        map: [
          ['#src/*', './src/*'],
          ['#assets', './src/assets/index'],
          ['#assets/*', './src/assets/*'],
          ['#api', './src/service/network/api/index'],
          ['#animated', './src/common/animated/index'],
          ['#common', './src/common/index'],
          ['#common/*', './src/common/*'],
          ['#components', './src/components/index'],
          ['#components/*', './src/components/*'],
          ['#config', './src/config/index'],
          ['#config/*', './src/config/*'],
          ['#models', './src/service/network/model/index'],
          ['#models/*', './src/service/network/model/*'],
          ['#navigation', './src/navigation/NavigationUtil'],
          ['#screens/*', './src/screens/*'],
          ['#storage', './src/service/storage/index'],
          ['#theme', './src/theme/index'],
          ['#theme/*', './src/theme/*'],
          ['#R', './src/assets/R.ts'],
          ['#redux/*', './src/redux/slices/*'],
          ['#utils', './src/utils/index'],
          ['#utils/*', './src/utils/*']
        ],
        extensions: ['.js', '.ts', 'tsx']
      }
    }
  }
};
