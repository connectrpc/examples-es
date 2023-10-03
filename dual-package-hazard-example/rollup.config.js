const babel = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const replace = require('@rollup/plugin-replace');
const nodeResolve = require('@rollup/plugin-node-resolve');

const plugins = [
        replace({
            'process.env.NODE_ENV': JSON.stringify( 'development' ),
            'preventAssignment': true
        }),
        babel({
            babelHelpers: 'bundled',
        }),
        commonjs(),
        nodeResolve()
];

module.exports = {
    input: "./consumer/index.js",
    output: {
        file: "rollup/dist/bundle.js",
        format: "iife",
        sourcemap: true,
    },
    plugins
};

