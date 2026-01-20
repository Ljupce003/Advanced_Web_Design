import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import cleanup from 'rollup-plugin-cleanup'
import filesize from 'rollup-plugin-filesize'


export default {
    input: 'src/index.js',
    plugins: [nodeResolve({ browser: true }),commonjs(),cleanup()],
    output: [
        {
            file: 'dist/vanilla_project.js',
            format: 'esm',
            plugins: [filesize()],
        },
    ],
}