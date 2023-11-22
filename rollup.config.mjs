import typescriptPlugin from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy'
import typescript from 'typescript';
import json from '@rollup/plugin-json';
import summary from 'rollup-plugin-summary';

export const copyTypes = copy({
  targets: [{ src: 'src/types.d.ts', dest: 'dist' }]
});

const es5BuildPlugins = [
  copyTypes,
  typescriptPlugin({
    typescript
  }),
  json(),
  summary(),
];

const esm2017BuildPlugins = [
  copyTypes,
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
  }),
  summary(),
];



export function buildDeps(pkg) {
  return Object.keys(
    Object.assign({}, pkg.peerDependencies, pkg.dependencies)
  );
}

/**
 * @param {Object} pkg
 * @param {string[]} deps
 * @param {Array|Object} plugins
 */
export function buildEsm(pkg, deps, plugins= {
  esm5: es5BuildPlugins,
  esm2017: esm2017BuildPlugins,
}, options) {
  options = options || {};

  if (Array.isArray(plugins)) {
    plugins = {
      esm5: plugins,
      esm2017: plugins,
    }
  }

  return [
    {
      input: 'src/main.js',
      output: [{ file: pkg.esm5, format: 'es', sourcemap: true }],
      external: id => deps.some(dep => id === dep || id.startsWith(`${dep}/`)),
      plugins: [...plugins.esm5],
      ...options,
    },
    {
      input: 'src/main.js',
      output: [{ file: pkg.browser, format: 'es', sourcemap: true }],
      external: id => deps.some(dep => id === dep || id.startsWith(`${dep}/`)),
      plugins: [...plugins.esm2017],
      ...options,
    }
  ];
}

export function buildCjs(pkg, deps, plugins = es5BuildPlugins, options) {
  options = options || {};

  return [
    {
      input: 'src/main.js',
      output: [{ file: pkg.main, format: 'cjs', sourcemap: true }],
      external: id => deps.some(dep => id === dep || id.startsWith(`${dep}/`)),
      plugins: [...plugins],
      ...options,
    },
  ];
}
