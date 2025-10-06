import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: '/', // Change to '/subdirectory/' if deployed in subdirectory
  plugins: [
    react(),
    tailwindcss(),
    glsl()
  ],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src/assets/')
    }
  },
})
