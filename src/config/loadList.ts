export interface SiteAdapter {
  url: RegExp;
  style?: Record<number | string, string>;
  selectors?: string;
  invisible?: boolean;
  disabled?: boolean;
  query?: string;
  /**
   * 构建时扫描用的页面地址，`%s` 会替换成探测关键词。
   * 配上之后 `pnpm style:scan` 会打开该页面，把压在菜单条上的固定元素
   * 转成静态样式写进 `config/generatedStyle.ts`，运行时不再动态采样。
   */
  probe?: string;
}

const width = 100

export const list: SiteAdapter[] = [
  {
    url: /\/\/www\.google\.com(.hk)?\/search/,
    probe: 'https://www.google.com/search?q=%s'
  },
  {
    url: /\/\/www\.baidu\.com\/(s|baidu)\?/,
    probe: 'https://www.baidu.com/s?wd=%s',
    style: {
      1: '.selected-search-box { transform: translateY(-30px);}'
    }
  },
  {
    // 推特（X）搜索结果页是 SPA，不在这里声明会被 siteInfo 判定为 disabled，整块 UI 不渲染（issue #68）
    url: /\/\/(?:www\.|mobile\.)?(?:twitter|x)\.com\/(?:search|explore|hashtag)/
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
    url: /\/\/www\.zhihu\.com\/search\?/,
    probe: 'https://www.zhihu.com/search?type=content&q=%s'
  },
  {
    url: /\/\/www\.so\.com\/s/
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
    probe: 'https://search.bilibili.com/all?keyword=%s',
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
    url: /\/\/translate\.google(?:\.\D{1,4}){1,2}/
  },
  {
    url: /\/\/fanyi\.baidu\.com/
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
    url: /\/\/www\.douban\.com\/search/,
    probe: 'https://www.douban.com/search?q=%s'
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
    url: /\/\/github\.com\/search/,
    probe: 'https://github.com/search?q=%s'
  },
  {
    url: /\/\/www\.startpage\.com\/sp\/search/
  },
  {
    url: /\/\/all-search\.github\.io/,
    invisible: true
  },
  {
    url: /\/\/endday\.gitee\.io/,
    invisible: true
  }
]
