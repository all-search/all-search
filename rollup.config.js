import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import VuePlugin from 'rollup-plugin-vue'
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'
import banner from './src/config/banner'

export default {
  input: 'src/main.js',
  output: {
    name: 'allSearch',
    file: 'build/index.js',
    format: 'umd',
    banner: banner
  },
  external: ['vue'],
  plugins: [
    resolve(),
    commonjs(),
    VuePlugin(/* VuePluginOptions */),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.VUE_ENV': JSON.stringify('browser')
    }),
    terser({
      output: {
        comments: function (node, comment) {
          var text = comment.value
          var type = comment.type
          if (type === 'comment1') {
            // single comment
            return /==UserScript==|@|==\/UserScript==/i.test(text)
          }
        }
      }
    })
  ]
}
