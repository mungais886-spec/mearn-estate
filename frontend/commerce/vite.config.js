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
        secure: false
      }
    }
  },
  optimizeDeps: {
    include: ['redux-persist', 'redux-persist/lib/storage'],
  },
})