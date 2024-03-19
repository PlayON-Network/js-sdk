import {
    buildCjs,
    buildDeps,
    buildEsm,
    copyTypes, packageFileName, removeBuildDirs
} from '../../rollup.config.mjs';
import pkg from './package.json' assert { type: "json" };
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import summary from 'rollup-plugin-summary';
import { babel } from '@rollup/plugin-babel';

const deps = buildDeps(pkg);
const plugins = [
    copyTypes,
    resolve(),
    //babel({ babelHelpers: 'bundled' }),
    terser(),
    summary(),
];

const options = {
    preserveEntrySignatures: 'strict',
}

const name = packageFileName(pkg);

removeBuildDirs(['cdn', 'dist']);

export default [
    ...buildCjs(pkg, deps, plugins, options),
    ...buildEsm(pkg, deps, plugins, options),
    {
        input: 'src/browser.js',
        output: [{ file: `cdn/${name}.js`, format: 'es', sourcemap: true }],
        preserveEntrySignatures: 'strict',
        plugins: [
            resolve(),
            babel({ babelHelpers: 'bundled' }),
            terser({
                format: { comments: false },
                compress: true
            }),
            summary(),
        ],
    },
];
