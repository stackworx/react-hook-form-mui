import js from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import type {Linter} from 'eslint';
import {defineConfig, globalIgnores} from 'eslint/config';
import jsxA11y from 'eslint-plugin-jsx-a11y-x';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const typeCheckedReact = {
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
    '@typescript-eslint/no-unused-vars': [
      'error',
      {argsIgnorePattern: '^_', varsIgnorePattern: '^_'},
    ],
  } satisfies Linter.RulesRecord,
};

const namedExportsOnly: {selector: string; message: string}[] = [
  {
    selector: 'ExportDefaultDeclaration',
    message: 'Use named exports.',
  },
  {
    selector: 'ExportSpecifier[exported.name="default"]',
    message: 'Use named exports.',
  },
];

export default defineConfig(
  globalIgnores([
    '**/dist',
    '**/node_modules',
    'storybook-static',
    'docs',
  ]),
  {
    ...typeCheckedReact,
    files: ['packages/*/src/**/*.{ts,tsx}', 'test/**/*.{ts,tsx}'],
    // The oldest React the packages support, so lint doesn't suggest React 19-only APIs.
    settings: {'react-x': {version: '18.3.1'}},
    rules: {
      ...typeCheckedReact.rules,
      'no-restricted-syntax': [
        'error',
        ...namedExportsOnly,
      ] satisfies Linter.RuleEntry,
    },
  },
  {
    // Emitted declarations keep these specifiers; node16/nodenext consumers need the extension.
    files: ['packages/*/src/**/*.{ts,tsx}'],
    ignores: ['**/*.test.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        ...namedExportsOnly,
        {
          selector:
            ':matches(ImportDeclaration, ExportNamedDeclaration, ExportAllDeclaration)[source.value=/^\\.\\.?\\/(?!.*\\.js$)/]',
          message: 'Relative imports in shipped files end in .js.',
        },
      ] satisfies Linter.RuleEntry,
    },
  },
  {
    // Storybook's CSF files and config need default exports.
    ...typeCheckedReact,
    files: ['src/**/*.{ts,tsx}', '.storybook/*.{ts,tsx}'],
  },
);
