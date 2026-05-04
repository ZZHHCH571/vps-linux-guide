import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/// <reference types="vitest" />
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3266,
    host: true,
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 800,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
  },
});
