import {defineConfig, mergeConfig} from 'vitest/config';
import viteConfig from './vite.config.ts';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      include: ['packages/*/src/**/*.test.{ts,tsx}'],
      setupFiles: ['./test/setup.ts'],
    },
  }),
);
