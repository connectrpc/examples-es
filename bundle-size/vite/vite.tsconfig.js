// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: "dist/ts",
    lib: {
      entry: "src/ts/index.ts",
      name: "index"
    }
  },
})
