// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: "dist/js",
    lib: {
      entry: "src/js/index.js",
      name: "index"
    }
  },
})
