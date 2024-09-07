import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@API': path.resolve(__dirname, './src/API'),
      '@UI': path.resolve(__dirname, './src/ui'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@icons': path.resolve(__dirname, 'src/icons'),
      '@page-home': path.resolve(__dirname, 'src/pages/Home'),
      '@page-upgrades': path.resolve(__dirname, 'src/pages/Upgrades'),
      '@page-tasks': path.resolve(__dirname, 'src/pages/Tasks'),
      '@page-profile': path.resolve(__dirname, 'src/pages/Profile'),
    }
  }
})
