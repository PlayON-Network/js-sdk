import typescriptPlugin from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy'
import typescript from 'typescript';
import json from '@rollup/plugin-json';
import summary from 'rollup-plugin-summary';
import resolve from "@rollup/plugin-node-resolve";
import {babel} from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import {rmSync} from "fs";
import {join} from "path";

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
 * @param {Array|Object?} plugins
 * @param {Object?} options
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

export function buildCDN(pkg, deps, options) {
  options = options || {};
  const filename = packageFileName(pkg);
  const name = filename.split('@')[0];

  return [
    {
      input: 'src/main.js',
      output: {
        file: `cdn/${filename}.js`,
        format: 'iife',
        name: `playon_network.${name}`,
        sourcemap: true,
        globals: {
          '@playon-network/engine': 'this.playon_network.engine',
        }
      },
      preserveEntrySignatures: 'strict',
      external: id => deps.some(dep => id === dep || id.startsWith(`${dep}/`)),
      plugins: [
        resolve(),
        babel({ babelHelpers: 'bundled' }),
        terser({
          format: { comments: false },
          compress: true
        }),
        summary(),
      ],
      ...options,
    },
  ];
}

export function packageFileName(pkg) {
  const name = pkg.name.split('/')[1];
  const version = pkg.version;

  return `${name}@${version}`;
}

/**
 * @param {string|string[]} names
 */
export function removeBuildDirs(names) {
  if (typeof names === 'string') {
    names = [names];
  }

  for (const name of names) {
    rmSync(join(process.cwd(), name), { recursive: true });
  }
}
