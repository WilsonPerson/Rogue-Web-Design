import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset URLs so `dist/index.html` works from disk or subpaths (avoids blank page when `/assets/...` 404s).
  base: './',
  plugins: [react(), tailwindcss()],
})
