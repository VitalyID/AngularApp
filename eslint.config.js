// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const path = require('node:path'); // Для работы с путями

// Убираем явный импорт плагина для HTML, так как будем полагаться на extends
// const pluginAngularTemplate = require('@angular-eslint/eslint-plugin-template');

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
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
          'no-comments': require(path.resolve(__dirname, '.eslint-rules/no-comments.js')),
          'no-console-log': require(path.resolve(__dirname, '.eslint-rules/no-console-log.js')),
        }
      }
    },
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/prefer-standalone": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-inferrable-types": "off",
      "spaced-comment": [
        "error",
        "always",
        {
          markers: ["TODO", "FIXME", "NOTE", "DEBUG", "HACK"],
          exceptions: ["-", "eslint", "ts-ignore", "ts-nocheck", "*"]
        }
      ],
      "no-restricted-syntax": "off",
      "my-rules/no-comments": "error",
      "my-rules/no-console-log": "error",
      "eqeqeq": ["error", "always"],
      "no-multi-spaces": "error",
      "semi": ["error", "always"]
    }
  },
  {
    files: ["**/*.html"],
    // *** ИЗМЕНЕНИЕ ЗДЕСЬ: ПОЛНОСТЬЮ ПОЛАГАЕМСЯ НА EXTENDS ***
    // Эти конфигурации уже включают правила accessibility-alt-text и accessibility-table-scope
    // и должны правильно регистрировать плагины.
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    // УДАЛЯЕМ СЕКЦИИ plugins И rules ДЛЯ HTML-ФАЙЛОВ
    // plugins: { ... },
    // rules: { ... },
  }
);
