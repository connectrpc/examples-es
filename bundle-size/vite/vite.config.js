import { resolve } from 'path';
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        js: 'src/js/index.js',
        ts: 'src/ts/index.ts',
      },
      output: {
        // Use the dir option to output to separate directories for eachapp
        dir: resolve(__dirname, 'dist'),
        entryFileNames: '[name]/consumer-vite.js'
      },
    }
  },
})
