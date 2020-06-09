const height = 30
const width = 110

const list = [
  {
    url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^?]+\?(?!tbm=)(?:&?q=|(?:[^#](?!&tbm=))+?&q=)(?:.(?!&tbm=))*$/,
    style: {
      1: `.srp #searchform:not(.minidiv){top: ${height + 20}px !important;} .srp .minidiv{top: ${height}px !important;}`
    }
  },
  {
    url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^#]*#(?:&?q=|.+?&q=).+/
  },
  {
    url: /^https?:\/\/www\.baidu\.com\/(?:s|baidu)/,
    style: {
      2: `#u { right: ${width}px; }`
    }
  },
  {
    url: /^https?:\/\/[^.]*\.bing\.com\/search/
  },
  {
    url: /^https?:\/\/duckduckgo\.com\/*/i
  },
  {
    url: /^https?:\/\/search\.yahoo\.com\/search/i
  },
  {
    url: /^https?:\/\/tw\.search\.yahoo\.com\/search/i
  },
  {
    url: /^https?:\/\/searx\.me\/\?q/i
  },
  {
    url: /^https?:\/\/www\.sogou\.com\/(?:web|s)/,
    style: {
      1: `.header { top: ${height}px }`,
      2: `.header { right: ${width}px }`
    }
  },
  {
    url: /^https?:\/\/yandex\.com\/search/i,
    style: {
      1: `body { margin: ${height}px!important; }`
    }
  },
  {
    url: /^https?:\/\/www\.startpage\.com\/do\/asearch/i
  },
  {
    url: /^https?:\/\/mijisou.com\/\?q/i,
    style: {
      1: `.search-page{top: ${height}px;} .searx-navbar{top: ${height + 12}px!important;}`,
      2: `.search-page{right: ${width}px!important;}`
    }
  },
  {
    url: /^https?:\/\/google\.infinitynewtab\.com\/\?q/i
  },
  {
    url: /^https?:\/\/www\.dogedoge\.com\/results\?q/i,
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
    url: /^https?:\/\/wenku\.baidu\.com\/search/i
  },
  {
    url: /^https?:\/\/zhidao\.baidu\.com\/search/i
  },
  {
    url: /^https?:\/\/\D{2,5}\.wikipedia\.org\/wiki/i
  },
  {
    url: /^https?:\/\/www\.zhihu\.com\/search\?/i,
    style: {
      1: `.AppHeader.is-fixed {top: ${height}px!important;}`
    }
  },
  {
    url: /^https?:\/\/www\.so\.com\/s/i
  },
  {
    url: /^https?:\/\/so\.baike\.com\/doc/i
  },
  {
    url: /^https?:\/\/www\.baike\.com\/wiki/i
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
    url: /^https?:\/\/www\.quora\.com\/search\?/i
  },
  {
    url: /^https?:\/\/stackoverflow\.com\/search\?/i,
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
      1: `body { margin-top: ${height}px!important; } .fixed-top { top: ${height}px }`
    }
  },
  {
    url: /^https?:\/\/www\.acfun\.cn\/search/
  },
  {
    url: /^https?:\/\/www\.youtube\.com\/results/
  },
  {
    url: /^https?:\/\/www\.nicovideo\.jp\/search\//
  },
  {
    url: /^https?:\/\/so\.iqiyi\.com\/so\/q/
  },
  {
    url: /^https?:\/\/v\.qq\.com\/x\/search/i
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
    url: /^https?:\/\/s\.music\.qq\.com/i
  },
  {
    url: /^https?:\/\/music\.163\.com\/.*?#\/search/i
  },
  {
    url: /^https?:\/\/so\.yinyuetai\.com\/\?keyword/
  },
  {
    url: /^https?:\/\/image\.baidu\.com\/search/i
  },
  {
    url: /^https?:\/\/\w{2,10}\.google(?:\.\D{1,3}){1,2}\/[^?]+\?.*&tbm=isch/i
  },
  {
    url: /^https?:\/\/.*\.bing\.com\/images\/search/i
  },
  {
    url: /^https?:\/\/www\.flickr\.com\/search\//
  },
  {
    url: /^http:\/\/www\.pixiv\.net\/search\.php/i
  },
  {
    url: /^https?:\/\/huaban\.com\/search\/\?/
  },
  {
    url: /^https?:\/\/www\.pinterest\.com\/search\//
  },
  {
    url: /^https?:\/\/thepiratebay\.org\/search/i
  },
  {
    url: /^https?:\/\/share\.dmhy\.org\/topics\/list\?keyword=/i
  },
  {
    url: /^https?:\/\/www\.ed2000\.com\/filelist\.asp/i
  },
  {
    url: /^https?:\/\/www\.zimuzu\.tv\/search\//
  },
  {
    url: /^https?:\/\/so\.cqp\.cc\/search/i
  },
  {
    url: /^https?:\/\/subhd\.com\/search/i
  },
  {
    url: /^https?:\/\/translate\.google(?:\.\D{1,4}){1,2}/i
  },
  {
    url: /^https?:\/\/fanyi\.baidu\.com/i,
    keyword () {
      return document.getElementById('baidu_translate_input').value
    }
  },
  {
    url: /^https?:\/\/.*\.bing\.com\/dict\/search\?q=/i
  },
  {
    url: /^https?:\/\/dict\.youdao\.com\/search/i
  },
  {
    url: /^https?:\/\/dict\.youdao\.com\/w/i
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
    url: /^https?:\/\/list\.tmall\.com\/search_product\.htm.*from=chaoshi/i
  },
  {
    url: /^https?:\/\/list\.tmall\.com\/search_product\.htm/i
  },
  {
    url: /^https?:\/\/search\.jd\.com\/Search/
  },
  {
    url: /^https?:\/\/search\.suning\.com/i
  },
  {
    url: /^https?:\/\/search\.yhd\.com\/c0-0\/k/i
  },
  {
    url: /^https?:\/\/search\.smzdm\.com\/\?/i
  },
  {
    url: /^https?:\/\/s\.weibo\.com\/weibo\//i
  },
  {
    url: /^https?:\/\/tieba\.baidu\.com\/f\/search/i
  },
  {
    url: /^https?:\/\/(movie|music|book)\.douban\.com\/subject_search?/
  },
  {
    url: /^https?:\/\/www\.douban\.com\/search/i
  },
  {
    url: /^https?:\/\/xueshu\.baidu\.com\/(?:s|baidu)/
  },
  {
    url: /^https?:\/\/scholar\.google(?:\.\D{1,3}){1,2}\/scholar\?/
  },
  {
    url: /^http:\/\/search\.cnki\.net\/search\.aspx/i
  },
  {
    url: /^http:\/\/epub\.cnki\.net\/kns\/brief\/default_result\.aspx/i
  },
  {
    url: /^https?:\/\/s\.g\.wanfangdata\.com\.cn\/Paper\.aspx/i
  },
  {
    url: /^http:\/\/.*?ebscohost\.com\/.*?results/i
  },
  {
    url: /^http:\/\/link\.springer\.com\/search\?query=/i
  },
  {
    url: /^https?:.*?jstor.org\/action\/doAdvancedSearch/i
  },
  {
    url: /^https?:.*?runoob\.com\//i
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
    url: /^https?:\/\/endday\.github\.io/
  },
  {
    url: /^https?:\/\/endday\.gitee\.io/
  }
]

let item = {}

const target = list.find(item => {
  return item.url.test(window.location.href)
})

if (target && !target.disabled) {
  item.url = target.url
  item.disabled = target.disabled
  item.style = target.style
  item.keyword = target.keyword
  item.create = target.create
  item.mounted = target.mounted
} else {
  item = null
}

export default item
