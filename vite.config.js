import { readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const root = import.meta.dirname;

// Cada archive/<clase>/index.html es una página React. Las clases viejas
// (HTML sueltos) viven en public/archive/ y se copian tal cual.
const classPages = Object.fromEntries(
  readdirSync(resolve(root, 'archive'), { withFileTypes: true })
    .filter(d => d.isDirectory() && existsSync(resolve(root, 'archive', d.name, 'index.html')))
    .map(d => [d.name, resolve(root, 'archive', d.name, 'index.html')]),
);

export default defineConfig({
  base: '/',
  // 'mpa' apaga el fallback tipo SPA (que serviría siempre el index.html de
  // la raíz para cualquier ruta). Sin esto, /archive/<clase>/ nunca se veía:
  // el dev server devolvía la home transformada en lugar de la página real.
  appType: 'mpa',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: { main: resolve(root, 'index.html'), ...classPages },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) return 'react';
          if (id.includes('node_modules/@codemirror') || id.includes('node_modules/@lezer') || id.includes('node_modules/codemirror')) return 'codemirror';
        },
      },
    },
  },
  test: {
    include: ['src/**/*.test.{js,jsx}'],
  },
});
