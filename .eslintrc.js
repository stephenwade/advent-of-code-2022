module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },

  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:unicorn/recommended',
    'prettier',
  ],

  plugins: ['import', 'simple-import-sort', 'unused-imports'],

  rules: {
    'no-octal-escape': 'error',
    'no-plusplus': 'warn',
    quotes: ['warn', 'single', { avoidEscape: true }],
    'require-unicode-regexp': 'warn',

    'import/first': 'warn',
    'import/newline-after-import': 'warn',
    'import/no-duplicates': 'warn',

    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',

    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': 'warn',

    'unicorn/filename-case': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/prefer-code-point': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/prefer-switch': 'off',
    'unicorn/prefer-top-level-await': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/switch-case-braces': 'off',
  },
};
