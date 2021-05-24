const path = require('path')
const fs = require('fs')
const argv = require('minimist')(process.argv.slice(2))
const srcFiles = fs.readdirSync(path.resolve(__dirname, 'src/'))
// 项目名称
const projectName = path.resolve(__dirname).split(path.sep).pop()
// 页面片路径
const indexPath = srcFiles.find(file => path.extname(file) === '.html')

module.exports = {
  outputDir: 'dist/',
  indexPath: indexPath,
  publicPath: `/${projectName}/`,
  lintOnSave: process.env.NODE_ENV !== 'production',
  runtimeCompiler: true,
  productionSourceMap: !!argv.sourceMap,
  crossorigin: 'anonymous',
  chainWebpack: config => {
    if (argv.tm) {
      config.entry('app').clear().add('./src/as-script/main.js')
    } else {
      config.plugin('html')
        .tap(args => {
          args[0].minify = false
          args[0].filename = indexPath
          args[0].template = path.join(__dirname, `src/${indexPath}`)
          return args
        })
      config.entry('app').clear().add('./src/main.js')
    }
    config
      .plugin('userscript-metadata')
      .use(new UserScriptMetaDataPlugin({
        metaData
      }))
    config.externals = {
      vue: 'Vue'
    }
  },
  css: {
    extract: false
  }
}
