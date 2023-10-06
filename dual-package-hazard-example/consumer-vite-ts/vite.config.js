// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: "src/index.ts",
            name: "index",
        },
        commonjsOptions: {
            // only necessary because "intermediary" is linked, and some
            // part stumbles over this link.
            include: [/intermediary/, /node_modules/],
        }
    },
})
