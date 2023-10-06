import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import TsconfigPathsPlugin from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TsconfigPathsPlugin()],
  resolve: {
    alias: {
      '~/': '/src/',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'antd'],
        },
      },
    },
  },
});
