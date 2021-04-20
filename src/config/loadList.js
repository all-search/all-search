import { getQueryString } from '../util/index.js'

const height = 30
const width = 100

export const list = [
  {
    url: /^https?:\/\/www\.google\.com(.hk)?\/search/,
    style: {
      1: `.srp #searchform:not(.minidiv){top: ${height + 20}px !important;} .srp .minidiv{top: ${height}px !important;}`
    }
  },
  {
    url: /^https?:\/\/www\.baidu\.com\/$/,
    invisible: true
  },
  {
    url: /^https?:\/\/www\.baidu\.com\/s/,
    style: {
      1: `.fix-head { top: ${height}px !important; }`,
      2: `.fix-head #u { right: ${width}px; }`
    }
  },
  {
    url: /^https?:\/\/www\.baidu\.com\/baidu\?wd/,
    style: {
      1: `.fix-head { top: ${height}px !important; }`,
      2: `.fix-head #u { right: ${width}px; }`
    }
  },
  {
    url: /^https?:\/\/[^.]*\.bing\.com\/search/
  },
  {
    url: /^https?:\/\/duckduckgo\.com\/*/
  },
  {
    url: /^https?:\/\/search\.yahoo\.com\/search/
  },
  {
    url: /^https?:\/\/tw\.search\.yahoo\.com\/search/
  },
  {
    url: /^https?:\/\/searx\.me\/\?q/
  },
  {
    url: /^https?:\/\/www\.sogou\.com\/(?:web|s)/,
    style: {
      1: `.header { top: ${height}px }`,
      2: `.header { right: ${width}px }`
    }
  },
  {
    url: /^https?:\/\/yandex\.com\/search/,
    style: {
      1: `body { margin: ${height}px!important; }`
    }
  },
  {
    url: /^https?:\/\/www\.startpage\.com\/do\/asearch/
  },
  {
    url: /^https?:\/\/mijisou.com\/\?q/,
    style: {
      1: `.search-page{top: ${height}px;} .searx-navbar{top: ${height + 12}px!important;}`,
      2: `.search-page{right: ${width}px!important;}`
    }
  },
  {
    url: /^https?:\/\/google\.infinitynewtab\.com\/\?q/
  },
  {
    url: /^https?:\/\/www\.dogedoge\.com\/results\?q/,
    style: {
      1: `#header_wrapper{top: ${height}px!important;}`,
      2: `#header_wrapper{right: ${width}px!important;}`
    }
  },
  {
    url: /^https?:\/\/baike\.baidu\.com\/item/
  },
  {
    url: /^https?:\/\/baike\.baidu\.com\/search/
  },
  {
    url: /^https?:\/\/wenku\.baidu\.com\/search/
  },
  {
    url: /^https?:\/\/zhidao\.baidu\.com\/search/
  },
  {
    url: /^https?:\/\/\D{2,5}\.wikipedia\.org\/wiki/
  },
  {
    url: /^https?:\/\/www\.zhihu\.com\/search\?/,
    style: {
      1: `.AppHeader.is-fixed {top: ${height}px!important;}`
    }
  },
  {
    url: /^https?:\/\/www\.so\.com\/s/
  },
  {
    url: /^https?:\/\/so\.baike\.com\/doc/
  },
  {
    url: /^https?:\/\/www\.baike\.com\/wiki/
  },
  {
    url: /^https?:\/\/www\.docin\.com\/search\.do/
  },
  {
    url: /^https?:\/\/zhihu\.sogou\.com\/zhihu/,
    style: {
      1: `.header { top:${height}px }`
    }
  },
  {
    url: /^https?:\/\/weixin\.sogou\.com\/weixin\?/
  },
  {
    url: /^https?:\/\/www\.quora\.com\/search\?/
  },
  {
    url: /^https?:\/\/stackoverflow\.com\/search\?/,
    style: {
      1: `.top-bar._fixed { top: ${height}px }`,
      2: `.top-bar._fixed { right: ${width}px }`
    }
  },
  {
    url: /^https?:\/\/search\.bilibili\.com\/all/,
    keyword () {
      return document.getElementById('search-keyword').value
    },
    style: {
      1: `body { margin-top: ${height}px!important; } .fixed-top {top: ${height}px;}`
    }
  },
  {
    url: /^https?:\/\/www\.acfun\.cn\/search/
  },
  {
    url: /^https?:\/\/www\.youtube\.com\/results/,
    style: {
      1: `#masthead-container.ytd-app {top:${height}px !important;} html:not(.style-scope) {--ytd-toolbar-height:${height + 56}px !important;}`,
      2: `ytd-app {margin-left:${width}px !important;}ytd-mini-guide-renderer.ytd-app, app-drawer{left:${width}px !important;}#masthead-container.ytd-app {width: calc(100% - 100px);}`
    }
  },
  {
    url: /^https?:\/\/www\.nicovideo\.jp\/search\//
  },
  {
    url: /^https?:\/\/so\.iqiyi\.com\/so\/q/
  },
  {
    url: /^https?:\/\/v\.qq\.com\/x\/search/,
    style: {
      1: `.site_head {top: ${height}px;}`
    }
  },
  {
    url: /^https?:\/\/music\.baidu\.com\/search/
  },
  {
    url: /^https?:\/\/so\.1ting\.com\/all\.do/
  },
  {
    url: /^https?:\/\/www\.xiami\.com\/search/
  },
  {
    url: /^https?:\/\/s\.music\.qq\.com/
  },
  {
    url: /^https?:\/\/music\.163\.com\/.*?#\/search/
  },
  {
    url: /^https?:\/\/so\.yinyuetai\.com\/\?keyword/
  },
  {
    url: /^https?:\/\/image\.baidu\.com\/search/,
    style: {
      1: `#search .s_search { top: ${height}px; }`
    }
  },
  {
    url: /^https?:\/\/\w{2,10}\.google(?:\.\D{1,3}){1,2}\/[^?]+\?.*&tbm=isch/
  },
  {
    url: /^https?:\/\/.*\.bing\.com\/images\/search/,
    style: {
      1: `#miniheader {padding-top: ${height}px;}`
    }
  },
  {
    url: /^https?:\/\/www\.flickr\.com\/search\//
  },
  {
    url: /^http:\/\/www\.pixiv\.net\/search\.php/
  },
  {
    url: /^https?:\/\/huaban\.com\/search\/\?/
  },
  {
    url: /^https?:\/\/www\.pinterest\.com\/search\//
  },
  {
    url: /^https?:\/\/thepiratebay\.org\/search/
  },
  {
    url: /^https?:\/\/share\.dmhy\.org\/topics\/list\?keyword=/
  },
  {
    url: /^https?:\/\/www\.ed2000\.com\/filelist\.asp/
  },
  {
    url: /^https?:\/\/www\.zimuzu\.tv\/search\//
  },
  {
    url: /^https?:\/\/so\.cqp\.cc\/search/
  },
  {
    url: /^https?:\/\/subhd\.com\/search/
  },
  {
    url: /^https?:\/\/translate\.google(?:\.\D{1,4}){1,2}/,
    keyword () {
      return getQueryString('text') || getQueryString('q')
    }
  },
  {
    url: /^https?:\/\/fanyi\.baidu\.com/,
    keyword () {
      return document.getElementById('baidu_translate_input').value
    }
  },
  {
    url: /^https?:\/\/.*\.bing\.com\/dict\/search\?q=/
  },
  {
    url: /^https?:\/\/dict\.youdao\.com\/search/
  },
  {
    url: /^https?:\/\/dict\.youdao\.com\/w/
  },
  {
    url: /^https?:\/\/dict\.cn\/./
  },
  {
    url: /^https?:\/\/s\.taobao\.com\/search/,
    style: {
      1: `.m-header-fixed .header-inner { top: ${height}px !important;}`
    }
  },
  {
    url: /^https?:\/\/list\.tmall\.com\/search_product\.htm.*from=chaoshi/
  },
  {
    url: /^https?:\/\/list\.tmall\.com\/search_product\.htm/
  },
  {
    url: /^https?:\/\/search\.jd\.com\/search/
  },
  {
    url: /^https?:\/\/search\.suning\.com/
  },
  {
    url: /^https?:\/\/search\.yhd\.com\/c0-0\/k/
  },
  {
    url: /^https?:\/\/search\.smzdm\.com\/\?/
  },
  {
    url: /^https?:\/\/s\.weibo\.com\/weibo\?q=/,
    style: {
      1: `.WB_global_nav { top: ${height}px !important;}`
    }
  },
  {
    url: /^https?:\/\/tieba\.baidu\.com\/f\/search/
  },
  {
    url: /^https?:\/\/(movie|music|book)\.douban\.com\/subject_search?/
  },
  {
    url: /^https?:\/\/www\.douban\.com\/search/
  },
  {
    url: /^https?:\/\/xueshu\.baidu\.com\/(?:s|baidu)/
  },
  {
    url: /^https?:\/\/scholar\.google(?:\.\D{1,3}){1,2}\/scholar\?/
  },
  {
    url: /^http:\/\/search\.cnki\.net\/search\.aspx/
  },
  {
    url: /^http:\/\/epub\.cnki\.net\/kns\/brief\/default_result\.aspx/
  },
  {
    url: /^https?:\/\/s\.g\.wanfangdata\.com\.cn\/Paper\.aspx/
  },
  {
    url: /^http:\/\/.*?ebscohost\.com\/.*?results/
  },
  {
    url: /^http:\/\/link\.springer\.com\/search\?query=/
  },
  {
    url: /^https?:.*?jstor.org\/action\/doAdvancedSearch/
  },
  {
    url: /^https?:.*?runoob\.com\//
  },
  {
    url: /^https?:\/\/github\.com\/search/
  },
  {
    url: /^https?:\/\/developer\.mozilla\.org\/.{2,5}\/search/
  },
  {
    url: /^https?:\/\/google\.infinitynewtab\.com\/\?q/
  },
  {
    url: /^https?:\/\/www\.startpage\.com\/do\/search/
  },
  {
    url: /^https?:\/\/endday\.github\.io/,
    invisible: true
  },
  {
    url: /^https?:\/\/endday\.gitee\.io/,
    invisible: true
  }
]

export const siteInfo = function () {
  const target = list.find(item => {
    return item.url.test(window.location.href.toLowerCase())
  })
  if (target) {
    return {
      url: target.url,
      invisible: target.invisible,
      disabled: target.disabled,
      style: target.style,
      keyword: target.keyword,
      create: target.create,
      mounted: target.mounted
    }
  }
  return null
}
