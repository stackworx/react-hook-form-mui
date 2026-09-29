import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

const sourceCondition = '@stackworx/source';

interface PackageJson {
  exports: Record<string, Record<string, string>>;
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}

/**
 * Library build shared by every package: ESM only, one file per module, dependencies and peers
 * external, one entry per `exports` subpath (read from its source condition).
 */
export function defineLibraryConfig(packageJson: PackageJson) {
  const externals = Object.keys({
    ...packageJson.dependencies,
    ...packageJson.peerDependencies,
  });
  const isExternal = (id: string) =>
    externals.some((name) => id === name || id.startsWith(`${name}/`));
  const entries = Object.values(packageJson.exports).map((conditions) => {
    const source = conditions[sourceCondition];
    if (!source) throw new Error(`every export needs a "${sourceCondition}"`);
    return source;
  });

  return defineConfig({
    plugins: [
      react(),
      dts({tsconfigPath: './tsconfig.build.json', entryRoot: 'src'}),
    ],
    build: {
      lib: {entry: entries, formats: ['es']},
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
