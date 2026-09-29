import {fileURLToPath} from 'node:url';
import type {StorybookConfig} from '@storybook/react-vite';

// MUI props that make useful controls. Every other prop MUI declares stays out of the parsed prop
// types, so the Docs tables list ours.
const muiControlProps = new Set([
  'ampm',
  'calendars',
  'closeOnSelect',
  'color',
  'disableClearable',
  'disableFuture',
  'disablePast',
  'format',
  'limitTags',
  'minRows',
  'multiline',
  'placeholder',
  'readOnly',
  'size',
  'variant',
]);

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-docs'],
  framework: {name: '@storybook/react-vite', options: {}},
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // The root tsconfig covers the stories only; the components live in the packages.
      tsconfigPath: fileURLToPath(
        new URL('tsconfig.docgen.json', import.meta.url),
      ),
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) =>
        !(prop.parent?.fileName.includes('node_modules') ?? false)
        || muiControlProps.has(prop.name),
    },
  },
};

export default config;
