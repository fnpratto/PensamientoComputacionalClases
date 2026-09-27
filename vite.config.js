import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Render y el dev local sirven el sitio en la raíz del dominio.
  // GitHub Pages lo sirve bajo /PensamientoComputacionalClases/: el workflow
  // de deploy (.github/workflows/deploy.yml) setea GH_PAGES=true para ese caso.
  base: process.env.GH_PAGES ? '/PensamientoComputacionalClases/' : '/',
  plugins: [react()],
});
