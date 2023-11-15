import {buildCjs, buildDeps, buildEsm} from '../../rollup.config.mjs';
import pkg from './package.json' assert { type: "json" };
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import summary from 'rollup-plugin-summary';
import { babel } from '@rollup/plugin-babel';

const deps = buildDeps(pkg);

export default [
    ...buildCjs(pkg, deps),
    ...buildEsm(pkg, deps),
    {
        input: 'src/skeleton/main.js',
        output: [{ dir: 'dist/components', format: 'es' }],
        preserveEntrySignatures: 'strict',
        plugins: [
            resolve(),
            //babel({ babelHelpers: 'bundled' }),
            terser(),
            summary(),
        ],
    },
];
