import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
    plugins: [
        nodeResolve({
            extensions: [".js"],
        }),
        typescript({
          noEmitOnError: true
        }),
    ],
    output: {
        format: "iife",
    },
};


