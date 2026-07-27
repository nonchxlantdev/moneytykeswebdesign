import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages project site: https://<user>.github.io/<repo>/
const base = process.env.VITE_BASE_PATH ?? '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    rollupOptions: {
      output: {
        // Function form is required by Vite 8+/Rolldown; object form still works on Vite 6
        manualChunks(id) {
          if (
            id.includes('node_modules/framer-motion') ||
            id.includes('node_modules/gsap')
          ) {
            return 'motion'
          }
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/lenis')
          ) {
            return 'vendor'
          }
        },
      },
    },
  },
})
