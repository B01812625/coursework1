import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 3001,
    proxy: {
      '/graphql': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})