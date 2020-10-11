const path = require('path')
const fs = require('fs')
const argv = require('minimist')(process.argv.slice(2))
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const srcFiles = fs.readdirSync(path.resolve(__dirname, 'src/'))
// 项目名称
const projectName = path.resolve(__dirname).split(path.sep).pop()
// 页面片路径
const indexPath = srcFiles.find(file => path.extname(file) === '.html')
// 入口路径 (相对路径)
const entryPath = './src/main.js'

module.exports = {
  outputDir: 'dist/',
  indexPath: indexPath,
  publicPath: `${projectName}/`,
  lintOnSave: process.env.NODE_ENV !== 'production',
  runtimeCompiler: true,
  productionSourceMap: !!argv.sourceMap,
  crossorigin: 'anonymous',
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].minify = false
        args[0].filename = indexPath
        args[0].template = path.join(__dirname, `src/${indexPath}`)
        return args
      })
    config.externals = {
      vue: 'Vue'
    }
  },
  configureWebpack: config => {
    config.entry.app[0] = entryPath
    config.plugins.push(new VuetifyLoaderPlugin())
  },
  css: {
    extract: false
  }
}
