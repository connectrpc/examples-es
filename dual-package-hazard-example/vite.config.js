const nodeResolve = require('@rollup/plugin-node-resolve');
const babel = require('@rollup/plugin-babel');

module.exports = {
  optimizeDeps: {
    force: true
  },
  build: {
    minify: false,
    lib: {
      entry: "./consumer/index.js",
      fileName: "bundle",
      formats: ["es"]
    },
    commonjsOptions: {
      include: [/intermediary/, /node_modules/],
      defaultIsModuleExports: true,
    },
    rollupOptions: {
      output: {
        dir: "vite/dist",
        sourcemap: true
      },
      plugins: [
        babel({
            babelHelpers: 'bundled',
        }),
        nodeResolve()
      ]
    }
  },
}
