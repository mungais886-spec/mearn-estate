import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss()
  ],
  server: {
    proxy: {
      '/backend': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    },
    headers: {
      'Cross-Origin-Opener-Policy': 'unsafe-none',
    },
  },
  optimizeDeps: {
    include: ['redux-persist', 'redux-persist/lib/storage'],
  },
})