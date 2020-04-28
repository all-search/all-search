import pkg from '../../package.json'

const now = new Date()
const meta = `// ==UserScript==
// @name         ${pkg.name} 全搜，一个搜索引擎快捷跳转菜单
// @version      ${pkg.version}
// @description  ${pkg.description}
// @author       ${pkg.author}
// @license      ${pkg.license}
// @update       ${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}
// @include      *
// @homepageURL  ${pkg.homepage}

// @noframes
// @require      https://cdn.jsdelivr.net/npm/vue
// @run-at       document-start

// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle

// ==/UserScript==
/* eslint-disable */
`

export default meta
