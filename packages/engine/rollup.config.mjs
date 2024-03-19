import {buildCDN, buildCjs, buildDeps, buildEsm, removeBuildDirs} from '../../rollup.config.mjs';
import pkg from './package.json' assert { type: "json" };

const deps = buildDeps(pkg);

removeBuildDirs(['cdn', 'dist']);

export default [
    ...buildCjs(pkg, deps),
    ...buildEsm(pkg, deps),
    ...buildCDN(pkg, deps),
];
