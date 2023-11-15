import {buildCjs, buildDeps, buildEsm} from '../../rollup.config.mjs';
import pkg from './package.json' assert { type: "json" };

const deps = buildDeps(pkg);

export default [...buildCjs(pkg, deps), ...buildEsm(pkg, deps)];
