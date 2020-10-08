import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import VuePlugin from 'rollup-plugin-vue'
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'
import css from 'rollup-plugin-css-only'
import json from '@rollup/plugin-json'
import del from 'rollup-plugin-delete'
import meta from './src/config/meta'

export default {
  input: 'src/as-script/main.js',
  output: {
    name: 'allSearch',
    file: 'build/index.js',
    format: 'iife',
    // sourceMap: true,
    globals: {
      vue: 'Vue'
    }
  },
  external: ['vue'],
  plugins: [
    del({ targets: 'build/*' }),
    resolve(),
    commonjs(),
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.VUE_ENV': JSON.stringify('browser')
    }),
    VuePlugin({
      css: false,
      needMap: false
    }),
    css({ output: `build/as-style.css` }),
    terser({
      output: {
        beautify: true,
        preamble: meta
      }
    })
  ]
}
