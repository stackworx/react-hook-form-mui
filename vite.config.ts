import react from '@vitejs/plugin-react';
import {defaultClientConditions, defineConfig} from 'vite';

// Shared by Storybook and Vitest: stories and tests import the packages by
// name and resolve them to their source through this export condition.
export default defineConfig({
  plugins: [react()],
  resolve: {conditions: ['@stackworx/source', ...defaultClientConditions]},
});
