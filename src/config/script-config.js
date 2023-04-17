import pkg from '../../package.json'

const now = new Date()
const fileName = 'index.user.js'
const scriptUrl = `https://raw.github.com/all-search/all-search/release/${fileName}`

export default {
  name: `${pkg.name} 全搜，搜索引擎快捷跳转，支持任意网站展示`,
  namespace: pkg.name,
  version: pkg.version,
  description: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}更新 搜索辅助增强，任意跳转，无需代码适配，支持任意网站展示`,
  author: pkg.author,
  license: pkg.license,
  homepageURL: pkg.homepage,
  updateURL: scriptUrl,
  downloadURL: scriptUrl,
  match: ['*://*/*'],
  noframes: true,
  'run-at': 'document-idle'
}
