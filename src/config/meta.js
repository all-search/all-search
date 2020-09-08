import pkg from '../../package.json'
import { list } from './loadList'

const endOfLine = require('os').EOL

const now = new Date()

const includeList = list
  .map(item => `// @include      ${item.url}`)
  .join(endOfLine)

const meta = `// ==UserScript==
// @name         ${pkg.name} 全搜，一个搜索引擎快捷跳转菜单
// @version      ${pkg.version}
// @description  ${pkg.description}
// @author       ${pkg.author}
// @license      ${pkg.license}
// @update       ${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}
// @homepageURL  ${pkg.homepage}

// @noframes
// @require      https://lib.baomitu.com/vue/2.6.11/vue.js
// @resource     iconFont  https://cdn.jsdelivr.net/gh/endday/all-search/src/assets/iconfont.css
// @resource     as-style  https://raw.githubusercontent.com/endday/all-search/master/build/as-style.css
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
