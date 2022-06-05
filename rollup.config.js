import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'
import vue from '@vitejs/plugin-vue'
import { terser } from 'rollup-plugin-terser'
import del from 'rollup-plugin-delete'
import styles from 'rollup-plugin-styles'
import externalGlobals from 'rollup-plugin-external-globals'
import meta from './src/config/meta'

const styleInjectPath = require
  .resolve('./src/util/injectStyle.js')
  .replace(/[\\/]+/g, '/')

const config =  {
  input: 'src/as-script/main.js',
  output: [
    {
      name: 'allSearch',
      file: 'build/index.user.js',
      format: 'iife',
      plugins: [
        terser({
          compress: false,
          mangle: false,
          output: {
            beautify: true,
            preamble: meta('tm')
          }
        })
      ]
    },
    {
      name: 'allSearch',
      file: 'build/index.sc.user.js',
      format: 'iife',
      plugins: [
        terser({
          compress: false,
          mangle: false,
          output: {
            beautify: true,
            preamble: meta('sc')
          }
        })
      ]
    }
  ],
  plugins: [
    del({ targets: 'build/*' }),
    vue(),
    json(),
    styles({
      mode: [
        'inject',
        cssContent => {
          return `\n
          import { injectStyle } from '${styleInjectPath}';\n
          injectStyle(${cssContent});`
        }
      ]
    }),
    nodeResolve({
      extensions: ['.js', '.json', '.vue']
    }),
    commonjs(),
    externalGlobals({
      vue: 'Vue',
      '@popperjs/core': 'Popper'
    }),
    replace({
      preventAssignment: false,
      values: {
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.VUE_ENV': JSON.stringify('browser')
      }
    })
  ]
}

export default config
