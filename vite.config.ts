import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/portfolio/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        about: path.resolve(__dirname, 'pages/about.html'),
        contact: path.resolve(__dirname, 'pages/contact.html'),
        posts: path.resolve(__dirname, 'pages/posts.html'),
        work: path.resolve(__dirname, 'pages/work.html'),
      },
    },
  },
})
