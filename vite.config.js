import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  base: '/PensamientoComputacionalClases/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main:   resolve(__dirname, 'index.html'),
        repaso: resolve(__dirname, 'repaso.html'),
      },
    },
  },
});
