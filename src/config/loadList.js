import { getQueryString } from '../util/index'

const height = 30
const width = 100

export const list = [
  {
    url: /\/\/www\.google\.com(.hk)?\/search/,
    style: {
      1: `.srp #searchform:not(.minidiv){top: ${height + 20}px !important;}#searchform.minidiv{top: ${height}px !important;}`
    }
  },
  {
    url: /\/\/www\.baidu\.com\/$/,
    invisible: true
  },
  {
    url: /\/\/www\.baidu\.com\/s\?/,
    style: {
      1: `.fix-head { top: ${height}px !important; }`,
      2: `.fix-head #u { right: ${width}px; }`
    }
  },
  {
    url: /\/\/www\.baidu\.com\/baidu\?/,
    style: {
      1: `.fix-head { top: ${height}px !important; }`,
      2: `.fix-head #u { right: ${width}px; }`
    }
  },
  {
    url: /\/\/[^.]*\.bing\.com\/search/
  },
  {
    url: /\/\/duckduckgo\.com\/*/
  },
  {
    url: /\/\/search\.yahoo\.com\/search/
  },
  {
    url: /\/\/tw\.search\.yahoo\.com\/search/
  },
  {
    url: /\/\/searx\.me\/\?q/
  },
  {
    url: /\/\/www\.sogou\.com\/(?:web|s)/,
    keyword () {
      return document.getElementById('upquery').value
    }
  },
  {
    url: /\/\/yandex\.com\/search/
  },
  {
    url: /\/\/google\.infinitynewtab\.com\/\?q/
  },
  {
    url: /\/\/www\.dogedoge\.com\/results\?q/,
    style: {
      1: `#header_wrapper{top: ${height}px!important;}`,
      2: `#header_wrapper{right: ${width}px!important;}`
    }
  },
  {
    url: /\/\/baike\.baidu\.com\/item/
  },
  {
    url: /\/\/baike\.baidu\.com\/search/
  },
  {
    url: /\/\/wenku\.baidu\.com\/search/
  },
  {
    url: /\/\/zhidao\.baidu\.com\/search/
  },
  {
    url: /\/\/\D{2,5}\.wikipedia\.org\/wiki/
  },
  {
    url: /\/\/www\.zhihu\.com\/search\?/,
    style: {
      1: `.AppHeader.is-fixed {top: ${height}px!important;}`
    }
  },
  {
    url: /\/\/www\.so\.com\/s/,
    style: {
      2: `.body-vertical #header { z-index: 2000!important; }`
    }
  },
  {
    url: /\/\/so\.baike\.com\/doc/
  },
  {
    url: /\/\/www\.baike\.com\/wiki/
  },
  {
    url: /\/\/www\.docin\.com\/search\.do/
  },
  {
    url: /\/\/zhihu\.sogou\.com\/zhihu/,
    keyword () {
      return document.getElementById('upquery').value
    },
    style: {
      1: `.header { top:${height}px }`
    }
  },
  {
    url: /\/\/weixin\.sogou\.com\/weixin\?/,
    style: {
      2: `.headsearch#scroll-header { left:unset; }`
    }
  },
  {
    url: /\/\/www\.quora\.com\/search\?/
  },
  {
    url: /\/\/stackoverflow\.com\/search\?/,
    style: {
      1: `.top-bar._fixed { top: ${height}px }`,
      2: `.top-bar._fixed { right: ${width}px }`
    }
  },
  {
    url: /\/\/search\.bilibili\.com\/all/,
    keyword () {
      const el = document.querySelector('.search-input-el')
      return el ? el.value : ''
    },
    style: {
      1: `.fixed-top {top: ${height}px;}`
    }
  },
  {
    url: /\/\/www\.acfun\.cn\/search/,
    keyword () {
      return document.getElementById('search-text--standalone').value
    },
    style: {
      1: `#header {top: ${height}px;}`
    }
  },
  {
    url: /\/\/www\.youtube\.com\/results/,
    style: {
      1: `#masthead-container.ytd-app {top:${height}px !important;}
          html:not(.style-scope) {--ytd-toolbar-height:${height + 56}px !important;}
          ytd-mini-guide-renderer.ytd-app {padding-top: ${height}px;}`,
      2: `ytd-app {margin-left:${width}px !important;}ytd-mini-guide-renderer.ytd-app, app-drawer{left:${width}px !important;}#masthead-container.ytd-app {width: calc(100% - 100px);}`
    }
  },
  {
    url: /\/\/www\.youtube\.com\/watch/,
    invisible: true
  },
  {
    url: /\/\/www\.nicovideo\.jp\/search\//
  },
  {
    url: /\/\/so\.iqiyi\.com\/so\/q/
  },
  {
    url: /\/\/v\.qq\.com\/x\/search/,
    style: {
      1: `.site_head {top: ${height}px;}`
    }
  },
  {
    url: /\/\/music\.baidu\.com\/search/
  },
  {
    url: /\/\/so\.1ting\.com\/all\.do/
  },
  {
    url: /\/\/s\.music\.qq\.com/
  },
  {
    url: /\/\/music\.163\.com\/.*?#\/search/
  },
  {
    url: /\/\/image\.baidu\.com\/search/,
    style: {
      1: `#search .s_search { top: ${height}px; }`
    }
  },
  {
    url: /\/\/\w{2,10}\.google(?:\.\D{1,3}){1,2}\/[^?]+\?.*&tbm=isch/
  },
  {
    url: /\/\/.*\.bing\.com\/images\/search/,
    style: {
      1: `#miniheader {padding-top: ${height}px;}`
    }
  },
  {
    url: /\/\/www\.flickr\.com\/search\//
  },
  {
    url: /^http:\/\/www\.pixiv\.net\/search\.php/
  },
  {
    url: /\/\/huaban\.com\/search\/\?/,
    style: {
      1: `#header  { top: ${height}px; }`
    }
  },
  {
    url: /\/\/www\.pinterest\.com\/search\//
  },
  {
    url: /\/\/thepiratebay\.org\/search/
  },
  {
    url: /\/\/subhd\.tv\/search/
  },
  {
    url: /\/\/translate\.google(?:\.\D{1,4}){1,2}/,
    keyword () {
      return getQueryString('text') || getQueryString('q')
    }
  },
  {
    url: /\/\/fanyi\.baidu\.com/,
    keyword () {
      const el = document.getElementById('baidu_translate_input')
      return el ? el.value : ''
    }
  },
  {
    url: /\/\/.*\.bing\.com\/dict\/search\?q=/
  },
  {
    url: /\/\/dict\.youdao\.com\/search/
  },
  {
    url: /\/\/dict\.youdao\.com\/w/
  },
  {
    url: /\/\/dict\.cn\/./
  },
  {
    url: /\/\/s\.taobao\.com\/search/,
    style: {
      1: `.m-header-fixed .header-inner { top: ${height}px !important;}`
    }
  },
  {
    url: /\/\/list\.tmall\.com\/search_product\.htm.*from=chaoshi/
  },
  {
    url: /\/\/list\.tmall\.com\/search_product\.htm/
  },
  {
    url: /\/\/search\.jd\.com\/search/
  },
  {
    url: /\/\/search\.suning\.com/
  },
  {
    url: /\/\/search\.smzdm\.com\/\?/
  },
  {
    url: /\/\/s\.weibo\.com\/weibo\?q=/,
    style: {
      1: `div[role="navigation"] { top: ${height}px !important;}`
    }
  },
  {
    url: /\/\/tieba\.baidu\.com\/f\/search/
  },
  {
    url: /\/\/(movie|music|book)\.douban\.com\/subject_search?/
  },
  {
    url: /\/\/www\.douban\.com\/search/
  },
  {
    url: /\/\/xueshu\.baidu\.com\/(?:s|baidu)/,
    style: {
      1: `#head_wr.gj #head.gj, #left_menu_content { top: ${height}px !important;}`,
      2: `#left_menu_content { left: ${width}px !important;}`
    }
  },
  {
    url: /\/\/scholar\.google(?:\.\D{1,3}){1,2}\/scholar\?/
  },
  {
    url: /^http:\/\/search\.cnki\.net\/search\.aspx/
  },
  {
    url: /^http:\/\/link\.springer\.com\/search\?query=/
  },
  {
    url: /\/\/github\.com\/search/
  },
  {
    url: /\/\/www\.startpage\.com\/sp\/search/,
    style: {
      1: `.layout-web__header {top: ${height}px !important;}`
    }
  },
  {
    url: /\/\/so\.toutiao\.com\/search/,
    style: {}
  },
  {
    url: /\/\/endday\.github\.io/,
    invisible: true
  },
  {
    url: /\/\/endday\.gitee\.io/,
    invisible: true
  },
  {
    url: /\/\/localhost/
  }
]

let currentSite = null

export const siteInfo = function (refresh) {
  if (refresh || !currentSite) {
    currentSite = getSite()
  }
  return currentSite
}

const getSite = function () {
  const target = list
    .find(item => item.url.test(window.location.href.toLowerCase()))
  if (target) {
    return {
      url: target.url,
      invisible: !!target.invisible,
      disabled: !!target.disabled,
      style: target.style,
      keyword: target.keyword
    }
  }
  return {
    url: '',
    invisible: true,
    disabled: true,
    style: {},
    keyword: null
  }
}
