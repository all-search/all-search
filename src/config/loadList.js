import { initSites } from '../util/sites'

// const height = 30
const width = 100

export const list = [
  {
    url: /\/\/www\.google\.com(.hk)?\/search/
  },
  {
    url: /\/\/www\.baidu\.com\/(s|baidu)\?/
  },
  {
    url: /\/\/[^.]*\.bing\.com\/search/
  },
  {
    url: /\/\/duckduckgo\.com\/*/
  },
  {
    url: /\/\/searx\.me\/\?q/
  },
  {
    url: /\/\/www\.sogou\.com\/(?:web|s)/,
    selectors: '#upquery'
  },
  {
    url: /\/\/yandex\.com\/search/
  },
  {
    url: /\/\/google\.infinitynewtab\.com\/\?q/
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
    url: /\/\/www\.zhihu\.com\/search\?/
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
    selectors: '#upquery'
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
      2: `.top-bar._fixed { right: ${width}px }`
    }
  },
  {
    url: /\/\/search\.bilibili\.com\/all/,
    selectors: '.search-input-el'
  },
  {
    url: /\/\/www\.acfun\.cn\/search/,
    selectors: '.search-text--standalone'
  },
  {
    url: /\/\/www\.youtube\.com\/results/,
    style: {
      2: `ytd-app {margin-left:${width}px !important;}ytd-mini-guide-renderer.ytd-app, app-drawer{left:${width}px !important;}#masthead-container.ytd-app {width: calc(100% - 100px);}`
    }
  },
  {
    url: /\/\/www\.nicovideo\.jp\/search\//
  },
  {
    url: /\/\/so\.iqiyi\.com\/so\/q/
  },
  {
    url: /\/\/v\.qq\.com\/x\/search/
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
    url: /\/\/image\.baidu\.com\/search/
  },
  {
    url: /\/\/\w{2,10}\.google(?:\.\D{1,3}){1,2}\/[^?]+\?.*&tbm=isch/
  },
  {
    url: /\/\/.*\.bing\.com\/images\/search/
  },
  {
    url: /\/\/www\.flickr\.com\/search\//
  },
  {
    url: /^http:\/\/www\.pixiv\.net\/search\.php/
  },
  {
    url: /\/\/huaban\.com\/search\?/
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
    query: ['text', 'q']
  },
  {
    url: /\/\/fanyi\.baidu\.com/,
    selectors: '.baidu_translate_input'
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
    url: /\/\/s\.taobao\.com\/search/
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
    url: /\/\/s\.weibo\.com\/weibo\?q=/
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
      2: `#left_menu_content { left: ${width}px !important;}`
    }
  },
  {
    url: /\/\/scholar\.google(?:\.\D{1,3}){1,2}\/scholar\?/
  },
  {
    url: /\/\/github\.com\/search/
  },
  {
    url: /\/\/www\.startpage\.com\/sp\/search/
  },
  {
    url: /\/\/endday\.github\.io/,
    disabled: true
  },
  {
    url: /\/\/endday\.gitee\.io/,
    disabled: true
  },
  {
    url: /\/\/localhost/,
    disabled: true
  }
]

let currentSite = null

export const siteInfo = function (refresh) {
  if (refresh || !currentSite) {
    currentSite = getSite()
  }
  return currentSite
}

function getMenuItem () {
  let targetItem = null
  let urlObj = null
  const curItem = new URL(window.location.href)
  initSites('tm').some(category => {
    category.list.find(item => {
      const menuItem = new URL(item.url)
      if (menuItem.hostname === curItem.hostname &&
        menuItem.pathname === curItem.pathname) {
        targetItem = item
        urlObj = menuItem
      }
    })
  })
  if (urlObj) {
    for (const key of urlObj.searchParams.keys()) {
      if (!curItem.searchParams.has(key)) {
        targetItem = null
      }
    }
  }
  return targetItem
}

const getSite = function () {
  const target = list
    .find(item => item.url.test(window.location.href.toLowerCase()))
  const menuItem = getMenuItem()
  if (target) {
    return {
      url: target.url,
      invisible: !!target.invisible,
      disabled: !!target.disabled,
      style: target.style,
      selectors: target.selectors,
      query: target.query
    }
  } else if (menuItem) {
    return {
      url: menuItem.url,
      invisible: false,
      disabled: false,
      style: menuItem.style,
      selectors: menuItem.selectors,
      query: menuItem.query
    }
  }
  return {
    url: '',
    invisible: true,
    disabled: true,
    style: {},
    selectors: null,
    query: null
  }
}
