import js from '@eslint/js';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import vueParser from 'vue-eslint-parser';
import vuePlugin from 'eslint-plugin-vue';
import nuxtPlugin from 'eslint-plugin-nuxt';
import prettier from 'eslint-config-prettier';

// Determine if we're in production environment
const isProduction = process.env.NODE_ENV === 'production';

export default [
  js.configs.recommended,
  prettier,
  {
    ignores: [
      '.nuxt/**/*',
      'node_modules/**/*',
      'dist/**/*',
      '.output/**/*'
    ],
  },
  {
    files: ['**/*.js', '**/*.ts', '**/*.vue'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      parser: typescriptParser,
      globals: {
        defineNuxtConfig: 'readonly',
        process: 'readonly'
      }
    },
    rules: {
      'no-console': isProduction ? 'error' : 'warn',
      'no-debugger': isProduction ? 'error' : 'warn'
    }
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser
      }
    },
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': typescriptPlugin,
      nuxt: nuxtPlugin
    },
    rules: {
      ...vuePlugin.configs['vue3-recommended'].rules,
      ...nuxtPlugin.configs.recommended.rules,
      'vue/multi-word-component-names': 'off'
    }
  }
]; 