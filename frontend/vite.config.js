import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // opcional, define a porta do front
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // endereço do backend
        changeOrigin: true,
        secure: false
      }
    }
  }
})
