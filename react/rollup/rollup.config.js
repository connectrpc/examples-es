import serve from "rollup-plugin-serve";
import css from "rollup-plugin-import-css";
import livereload from "rollup-plugin-livereload";
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

const plugins = [
        css(),
            nodeResolve({
            extensions: [".js"],
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify( 'development' ),
            'preventAssignment': true
        }),
        babel({
            presets: ["@babel/preset-react"],
            babelHelpers: 'bundled',
        }),
        commonjs(),
        typescript(),
];

if (process.env.NODE_ENV === 'development') {
    plugins.push(serve({
        open: true,
        verbose: true,
        contentBase: [""],
        host: "localhost",
        port: 3000,
    }));
    plugins.push(livereload({ watch: "dist" }));
}

export default {
    input: "src/index.js",
    output: {
        file: "dist/bundle.js",
        format: "iife",
        sourcemap: true,
    },
    plugins
};

