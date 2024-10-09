// @ts-nocheck
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@API': path.resolve(__dirname, './src/api'),
      '@app': path.resolve(__dirname, './src/app'),
      '@config': path.resolve(__dirname, './src/config'),
      '@icons': path.resolve(__dirname, './src/icons'),
      '@locales': path.resolve(__dirname, './src/locales'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@providers': path.resolve(__dirname, './src/providers'),
      '@ui': path.resolve(__dirname, './src/ui'),
      '@p-home': path.resolve(__dirname, './src/pages/Home'),
      '@p-honorboard': path.resolve(__dirname, './src/pages/HonorBoard'),
      '@p-leaderboard': path.resolve(__dirname, './src/pages/Leaderboard'),
      '@p-profile': path.resolve(__dirname, './src/pages/Profile'),
      '@p-tasks': path.resolve(__dirname, './src/pages/Tasks'),
      '@p-upgrades': path.resolve(__dirname, './src/pages/Upgrades'),


    },
  },
})
