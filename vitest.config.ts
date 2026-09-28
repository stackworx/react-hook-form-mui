import react from '@vitejs/plugin-react';
import {defaultClientConditions} from 'vite';
import {defineConfig} from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {conditions: ['@stackworx/source', ...defaultClientConditions]},
  test: {
    environment: 'jsdom',
    include: ['packages/*/src/**/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/legacy/**'],
    setupFiles: ['./test/setup.ts'],
  },
});
