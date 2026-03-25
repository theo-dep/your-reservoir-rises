const { defineConfig } = require("eslint/config");

const globals = require("globals");
const eslint = require("@eslint/js");

const typescriptEslint = require("typescript-eslint");
const eslintPluginVue = require("eslint-plugin-vue");
const eslintConfigPrettier = require("eslint-config-prettier");

module.exports = defineConfig([
  { ignores: ["*.d.ts", "**/coverage", "**/dist"] },
  {
    extends: [
      eslint.configs.recommended,
      ...typescriptEslint.configs.recommended,
      ...eslintPluginVue.configs["flat/recommended"],
    ],
    files: ["**/*.{ts,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
    rules: {
      "vue/multi-word-component-names": [
        "error",
        {
          ignores: ["Home", "Privacy"],
        },
      ],
    },
  },
  eslintConfigPrettier,
]);
