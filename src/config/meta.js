import pkg from '../../package.json'
import { list } from './loadList'

const endOfLine = require('os').EOL

const now = new Date()

const includeList = type => {
  if (type === 'tm') {
    return list
      .map(item => `// @include      ${item.url}`)
      .join(endOfLine)
  } else {
    return '// @include      *'
  }
}

const scriptUrl = type => {
  return `https://unpkg.com/all-search@latest/build/${type === 'tm' ? 'index.user.js': 'index.sc.user.js'}`
}

const meta = type => `// ==UserScript==
// @name         ${pkg.name} 全搜v${pkg.version}，一个搜索引擎快捷跳转菜单, 支持图形界面自定义
// @version      ${pkg.version}
// @description  ${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日更新 ${pkg.description}
// @author       ${pkg.author}
// @license      ${pkg.license}
// @homepageURL  ${pkg.homepage}
// @updateURL    ${scriptUrl(type)}
// @downloadURL  ${scriptUrl(type)}
// @supportURL
// @noframes
// @require      https://unpkg.com/vue@3.2.33/dist/vue.global.prod.js
// @require      https://unpkg.com/@popperjs/core@2.11.5/dist/umd/popper-lite.min.js
// @run-at       document-body
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_getResourceText
${includeList(type)}

// ==/UserScript==
/* eslint-disable */
`

export default meta
