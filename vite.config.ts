import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { readFileSync } from 'fs';

function resolvePathAlias() {
  const tsConfigRaw = (readFileSync('./tsconfig.json', 'utf-8'));
  const cleanedTsConfig = tsConfigRaw.replace(/\/\/.*$/gm, '') // removed comment with format /* ... */
    .replace(/\/\*[\s\S]*?\*\//g, '');
  const paths = JSON.parse(cleanedTsConfig).compilerOptions?.paths || {};
  const aliases: Record<string, any> = {};
  for (const key in paths) {
    if (Object.hasOwnProperty.call(paths, key)) {
      const aliasKey = key.replace('/*', '');
      const aliasPath = paths[key][0].replace('/*', '');
      aliases[aliasKey] = resolve(__dirname, aliasPath);
    }
  }
  return aliases;
}


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: resolvePathAlias()
  }
});
