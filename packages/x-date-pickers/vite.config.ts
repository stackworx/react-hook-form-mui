import {defineLibraryConfig} from '../../vite.library.ts';
import packageJson from './package.json' with {type: 'json'};

export default defineLibraryConfig(packageJson);
