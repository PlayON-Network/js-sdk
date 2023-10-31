import typescriptPlugin from 'rollup-plugin-typescript2';
import typescript from 'typescript';
import json from '@rollup/plugin-json';
import pkg from './package.json' assert { type: "json" };

const deps = Object.keys(
  Object.assign({}, pkg.peerDependencies, pkg.dependencies)
);

const es5BuildPlugins = [
  typescriptPlugin({
    typescript
  }),
  json()
];

const es2017BuildPlugins = [
  typescriptPlugin({
    typescript,
    tsconfigOverride: {
      compilerOptions: {
        target: 'es2017'
      }
    }
  }),
  json({
    preferConst: true
  })
];

const esmBuilds = [
  /**
   * Browser Builds
   */
  {
    input: 'src/main.js',
    output: [{ file: pkg.esm5, format: 'es', sourcemap: true }],
    external: id => deps.some(dep => id === dep || id.startsWith(`${dep}/`)),
    plugins: [
      ...es5BuildPlugins,
    ],
  },
  {
    input: 'src/main.js',
    output: {
    	file: pkg.browser,
      format: 'es',
      sourcemap: true
    },
    external: id => deps.some(dep => id === dep || id.startsWith(`${dep}/`)),
    plugins: [
      ...es2017BuildPlugins,
    ],
  }
];

const cjsBuilds = [
  {
    input: 'src/main.js',
    output: [{ file: pkg.main, format: 'cjs', sourcemap: true }],
    external: id => deps.some(dep => id === dep || id.startsWith(`${dep}/`)),
    plugins: [
      ...es5BuildPlugins,
    ],
  },
];

export default [...esmBuilds, ...cjsBuilds];
