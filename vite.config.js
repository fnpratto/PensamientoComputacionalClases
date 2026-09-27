import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  // 'mpa' apaga el fallback tipo SPA (que serviría siempre el index.html de
  // la raíz para cualquier ruta). Sin esto, /archive/<clase>/ nunca se veía:
  // el dev server devolvía la home transformada en lugar de la página real.
  appType: 'mpa',
  plugins: [react()],
});
