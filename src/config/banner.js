import pkg from '../../package.json'

const banner =
  `// ==UserScript==
// @name         ${pkg.name}
// @version      ${pkg.version}
// @description  在各个引擎之间跳转的顶部菜单，借鉴自searchEngineJump
// @author       endday
// @include      *
// @namespace    https://github.com/endday
// @homepage     /all-search

// @require      https://cdn.jsdelivr.net/npm/vue
// @run-at       document-body

// @grant        GM_getValue
// @grant        GM_setValue

// ==/UserScript==

`

export default banner
