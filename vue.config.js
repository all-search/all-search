const path = require('path')
const fs = require('fs')
const argv = require('minimist')(process.argv.slice(2))
const { InjectManifest } = require('workbox-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'
const srcFiles = fs.readdirSync(path.resolve(__dirname, 'src/'))
// 项目名称
const projectName = path.resolve(__dirname).split(path.sep).pop()
// 页面片路径
const indexPath = srcFiles.find(file => path.extname(file) === '.html')
// 入口路径 (相对路径)
const entryPath = './src/main.js'

function getVersion () {
  let d = new Date()
  return '' + d.getFullYear() + d.getMonth() + 1 + d.getDate() + d.getHours() + d.getMinutes() + d.getSeconds()
}

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
    if (isDev) {
      config.plugins.delete('preload')
      config.plugins.delete('prefetch')
    }
  },
  configureWebpack: config => {
    config.entry.app[0] = entryPath
    if (isDev) {
      config.output.filename = 'js/[name].js'
      config.output.chunkFilename = 'js/[name].js'
    }
    config.plugins.push(
      new InjectManifest({
        swSrc: './src/util/service-worker.js',
        importsDirectory: 'js',
        importWorkboxFrom: 'disabled', // 不使用谷歌workerbox的cdn
        exclude: [/\.map$/, /^manifest.*\.js$/, /\.html$/]
      }),
      new webpack.DefinePlugin({
        __SW_VERSION__: getVersion(),
        __PROJECT_NAME__: JSON.stringify(projectName)
      })
    )
  }
}
