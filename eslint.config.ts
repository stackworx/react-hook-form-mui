import js from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import {defineConfig, globalIgnores} from 'eslint/config';
import jsxA11y from 'eslint-plugin-jsx-a11y-x';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  globalIgnores([
    '**/dist',
    '**/node_modules',
    'storybook-static',
    'docs',
    'packages/*/src/legacy',
  ]),
  {
    files: ['packages/*/src/**/*.{ts,tsx}', 'test/**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      eslintReact.configs['recommended-type-checked'],
      reactHooks.configs.flat.recommended,
      jsxA11y.configs.recommended,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ExportDefaultDeclaration',
          message: 'Use named exports.',
        },
        {
          selector: 'ExportSpecifier[exported.name="default"]',
          message: 'Use named exports.',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {argsIgnorePattern: '^_', varsIgnorePattern: '^_'},
      ],
    },
  },
  {
    // Emitted declarations keep these specifiers; node16/nodenext consumers need the extension.
    files: ['packages/*/src/**/*.{ts,tsx}'],
    ignores: ['**/*.test.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ExportDefaultDeclaration',
          message: 'Use named exports.',
        },
        {
          selector: 'ExportSpecifier[exported.name="default"]',
          message: 'Use named exports.',
        },
        {
          selector:
            ':matches(ImportDeclaration, ExportNamedDeclaration, ExportAllDeclaration)[source.value=/^\\.\\.?\\/(?!.*\\.js$)/]',
          message: 'Relative imports in shipped files end in .js.',
        },
      ],
    },
  },
);
