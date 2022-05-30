import pkg from '../../package.json'
import { list } from './loadList'

const endOfLine = require('os').EOL

const now = new Date()

const includeList = list
  .map(item => `// @include      ${item.url}`)
  .join(endOfLine)

const meta = `// ==UserScript==
// @name         ${pkg.name} 全搜v${pkg.version}，一个搜索引擎快捷跳转菜单, 支持图形界面自定义
// @version      ${pkg.version}
// @description  ${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日更新 ${pkg.description}
// @author       ${pkg.author}
// @license      ${pkg.license}
// @update       ${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}
// @homepageURL  ${pkg.homepage}
// @updateURL    https://unpkg.com/all-search@latest/build/index.user.js
// @downloadURL  https://unpkg.com/all-search@latest/build/index.user.js
// @noframes
// @require      https://unpkg.com/vue@3.2.33/dist/vue.global.prod.js
// @run-at       document-start
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_getResourceText

${includeList}

// ==/UserScript==
/* eslint-disable */
`

export default meta
