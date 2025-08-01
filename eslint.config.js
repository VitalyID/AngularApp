// .eslintrc.js
// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const path = require('node:path');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      'my-rules': {
        rules: {
          'no-comments': require(
            path.resolve(__dirname, '.eslint-rules/no-comments.js')
          ),
          'no-console-log': require(
            path.resolve(__dirname, '.eslint-rules/no-console-log.js')
          ),
        },
      },
    },
    rules: {
      // Ваши правила ESLint.
      // Теперь ESLint будет сам проверять 'semi', 'no-multi-spaces' и т.д.
      // Если вы хотите, чтобы Prettier управлял этими правилами, а ESLint их игнорировал,
      // вам придется отключить их здесь (например, "semi": "off").
      // Но если вы хотите, чтобы ESLint проверял их независимо от Prettier, оставьте их.
      // Для начала, давайте оставим ваши оригинальные правила.
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/prefer-standalone': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-inferrable-types': 'off',
      'spaced-comment': [
        'error',
        'always',
        {
          markers: ['TODO', 'FIXME', 'NOTE', 'DEBUG', 'HACK'],
          exceptions: ['-', 'eslint', 'ts-ignore', 'ts-nocheck', ''],
        },
      ],
      'no-restricted-syntax': 'off',
      'my-rules/no-comments': 'error',
      'my-rules/no-console-log': 'error',
      eqeqeq: ['error', 'always'],
      'no-multi-spaces': 'error', // <-- Вернули, ESLint будет проверять это
      semi: ['error', 'always'], // <-- Вернули, ESLint будет проверять это
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
  },
  {
    // Игнорирование файлов для ESLint
    // Это важно, чтобы ESLint не пытался линтить файлы, которые ему не по зубам.
    // Добавьте сюда все файлы, которые вызывали "Parsing error: Unexpected token".
    ignores: [
      'src/assets/**/*.html', // Пример: если у вас там SVG-спрайты или другие не-HTML файлы
      'src/index.html', // Часто index.html не нужно линтить
      // Добавьте другие пути, которые вы хотите игнорировать
    ],
  }
);
