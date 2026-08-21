import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// base './' keeps asset paths relative so the built app loads via file:// in Electron
export default defineConfig({
  base: './',
  plugins: [svelte()],
})
