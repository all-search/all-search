import pkg from '../../package.json'

const now = new Date()
const meta = `// ==UserScript==
// @name         ${pkg.name}
// @version      ${pkg.version}
// @description  在各个引擎之间跳转的顶部菜单，借鉴自searchEngineJump
// @author       ${pkg.author}
// @license      ${pkg.license}
// @update       ${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}
// @include      *
// @homepageURL  ${pkg.homepage}

// @require      https://cdn.jsdelivr.net/npm/vue
// @run-at       document-body

// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle

// ==/UserScript==
/* eslint-disable */
`

export default meta
