import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

interface PackageJson {
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}

/** Library build shared by every package: ESM only, one file per module, peers external. */
export function defineLibraryConfig(packageJson: PackageJson) {
  const externals = Object.keys({
    ...packageJson.dependencies,
    ...packageJson.peerDependencies,
  });
  const isExternal = (id: string) =>
    externals.some((name) => id === name || id.startsWith(`${name}/`));

  return defineConfig({
    plugins: [
      react(),
      dts({tsconfigPath: './tsconfig.build.json', entryRoot: 'src'}),
    ],
    build: {
      lib: {entry: 'src/main.ts', formats: ['es']},
      sourcemap: true,
      minify: false,
      rolldownOptions: {
        external: isExternal,
        output: {
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].js',
        },
      },
    },
  });
}
