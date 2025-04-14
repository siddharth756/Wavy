import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
   // 👇 Add this section to fix 404 on refresh
   resolve: {
    alias: {
      '@': '/src',
    },
  },
  base: '/',
})
