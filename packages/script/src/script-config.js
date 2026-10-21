import pkg from '../../../package.json'

const now = new Date()

/**
 * 文件名必须保持 `index.user.js`，不要带版本号。
 *
 * 油猴 / Violentmonkey 的升级方式是定期回拉 `@updateURL` / `@downloadURL`
 * 里这个地址、比对文件内的 `@version`。一旦文件名带上版本号，老用户手里的
 * 地址就会 404，更新链直接断掉。所以：
 * - 这个地址固定不变，版本信息只写在文件内部的 @version
 * - 发布时另存一份 `all-search-<version>.user.js` 到 GitHub Release 做归档
 */
const fileName = 'index.user.js'
const scriptUrl = `https://raw.githubusercontent.com/all-search/all-search/release/${fileName}`

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
  'run-at': 'document-idle',
  grant: ['GM_addStyle', 'GM_setValue', 'GM_getValue', 'GM_deleteValue', 'GM_listValues']
}
