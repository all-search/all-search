import path from 'path'
import pkg from '../../package.json'

const now = new Date()

const fileName = 'index.user.js'
export const localFileName = 'index.local.js'
export const devFileName = 'index.dev.js'
const scriptUrl = `https://raw.github.com/endday/all-search/release/${fileName}`

const meta = `// @name         ${pkg.name} 全搜，搜索引擎快捷跳转，支持任意网站展示
// @version      ${pkg.version}
// @description  ${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}更新 搜索辅助增强，任意跳转，无需代码适配，支持任意网站展示
// @author       ${pkg.author}
// @license      ${pkg.license}
// @homepageURL  ${pkg.homepage}
// @updateURL    ${scriptUrl}
// @downloadURL  ${scriptUrl}
// @supportURL
// @noframes
// @include      *
// @require      https://unpkg.com/vue@3.2.33/dist/vue.global.prod.js
// @require      https://unpkg.com/@popperjs/core@2.11.5/dist/umd/popper-lite.min.js
// @run-at       document-body
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_getResourceText
`

export const proMeta = `// ==UserScript==
${meta}
// ==/UserScript==
`

export const devMeta = `// ==UserScript==
${meta}
// @require      file:///${path.join(__dirname, `/dist/${localFileName}`)}
// ==/UserScript==
`
