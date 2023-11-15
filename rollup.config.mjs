import typescriptPlugin from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy'
import typescript from 'typescript';
import json from '@rollup/plugin-json';
import summary from 'rollup-plugin-summary';

const copyTypes = copy({
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

const es2017BuildPlugins = [
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

export function buildEsm(pkg, deps) {
  return [
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
}

export function buildCjs(pkg, deps) {
  return [
    {
      input: 'src/main.js',
      output: [{ file: pkg.main, format: 'cjs', sourcemap: true }],
      external: id => deps.some(dep => id === dep || id.startsWith(`${dep}/`)),
      plugins: [
        ...es5BuildPlugins,
      ],
    },
  ];
}
