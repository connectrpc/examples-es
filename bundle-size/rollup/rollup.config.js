import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: "src/index.js",
    plugins: [
        nodeResolve({
            extensions: [".js"],
        }),
    ],
    output: {
        file: "dist/index.js",
        format: "iife",
    },
};
