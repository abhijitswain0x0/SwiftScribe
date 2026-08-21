import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import electron from 'vite-plugin-electron/simple'

// base './' keeps asset paths relative so the built app loads via file:// in Electron
export default defineConfig({
  base: './',
  plugins: [
    svelte(),
    electron({
      main: {
        entry: 'electron/main.ts',
      },
      preload: {
        input: 'electron/preload.ts',
      },
    }),
  ],
})
