import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.tsx'),
      name: 'llqqssttyy-react-modules-components',
      formats: ['es', 'cjs', 'umd'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react'],
      output: {
        dir: 'dist',
        format: 'es',
        entryFileNames: '[name].js',
        globals: {
          react: 'React',
        },
      },
    },
    commonjsOptions: {
      esmExternals: ['react'],
    },
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      entryRoot: 'src/lib',
    }),
  ],
});
