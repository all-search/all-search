/**
 * 自动生成，请勿手改。
 *
 * 由 `pnpm style:scan` 产出：构建时用无头浏览器打开 loadList 里配了 probe 的站点，
 * 找出压在菜单条上的 fixed/sticky 元素，把避让偏移写成静态 CSS。
 * 运行时只注入这些规则，不再做任何 DOM 采样；站点改版后重跑一次即可。
 */
export interface GeneratedStyleRule {
  /** 站点匹配正则的源码，运行时用 new RegExp(pattern, flags) 匹配 */
  pattern: string;
  /** 正则 flags */
  flags: string;
  /** 菜单条位于顶部时注入的样式（扫描场景就是顶部） */
  top?: string;
  /** 扫描时打开的页面地址，便于复验与排查 */
  probe?: string;
}

export const generatedStyle: GeneratedStyleRule[] = [
  {
    pattern: "\\/\\/[^.]*\\.bing\\.com\\/search",
    flags: "",
    probe: "https://cn.bing.com/search?q=all-search",
    top: [
      "#b_header { top: 30px !important; }"
    ].join('\n')
  },
  {
    pattern: "\\/\\/baike\\.baidu\\.com\\/search",
    flags: "",
    probe: "http://baike.baidu.com/search/word?pic=1&sug=1&word=all-search",
    top: [
      "div.headerWrap_W4DP5 { top: 30px !important; }"
    ].join('\n')
  },
  {
    pattern: "\\/\\/www\\.so\\.com\\/s",
    flags: "",
    probe: "https://www.so.com/s?ie=utf-8&q=all-search",
    top: [
      "#header { top: 30px !important; }"
    ].join('\n')
  },
  {
    pattern: "\\/\\/stackoverflow\\.com\\/search\\?",
    flags: "",
    probe: "https://stackoverflow.com/search?q=all-search",
    top: [
      "header.s-topbar.ps-fixed.t0.l0.js-top-bar { top: 30px !important; }"
    ].join('\n')
  },
  {
    pattern: "\\/\\/www\\.acfun\\.cn\\/search",
    flags: "",
    probe: "https://www.acfun.cn/search?keyword=all-search",
    top: [
      "#header { top: 30px !important; }"
    ].join('\n')
  },
  {
    pattern: "\\/\\/www\\.youtube\\.com\\/results",
    flags: "",
    probe: "https://www.youtube.com/results?search_query=all-search",
    top: [
      "#masthead-container { top: 30px !important; }"
    ].join('\n')
  },
  {
    pattern: "\\/\\/www\\.nicovideo\\.jp\\/search\\/",
    flags: "",
    probe: "http://www.nicovideo.jp/search/all-search",
    top: [
      "div.max-w_\\[calc\\(100vw_-_var\\(--scrollbar-width\\)\\)\\].left_0.bg-c_monotone\\.L15.min-h_commonHeader\\.height.pointer-events_auto { top: 30px !important; }",
      "#CommonHeader { top: 30px !important; }"
    ].join('\n')
  },
  {
    pattern: "\\/\\/so\\.iqiyi\\.com\\/so\\/q",
    flags: "",
    probe: "http://so.iqiyi.com/so/q_all-search",
    top: [
      "#topbar { top: 30px !important; }"
    ].join('\n')
  },
  {
    pattern: "\\/\\/v\\.qq\\.com\\/x\\/search",
    flags: "",
    probe: "https://v.qq.com/x/search/?q=all-search",
    top: [
      "div.top-nav-wrap.head_inner { top: 30px !important; }"
    ].join('\n')
  },
  {
    pattern: "\\/\\/image\\.baidu\\.com\\/search",
    flags: "",
    probe: "http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=all-search",
    top: [
      "#image-search-header { top: 30px !important; }"
    ].join('\n')
  },
  {
    pattern: "\\/\\/.*\\.bing\\.com\\/images\\/search",
    flags: "",
    probe: "https://www.bing.com/images/search?q=all-search",
    top: [
      "#miniheader { top: 30px !important; }"
    ].join('\n')
  },
  {
    pattern: "\\/\\/www\\.flickr\\.com\\/search\\/",
    flags: "",
    probe: "http://www.flickr.com/search/?q=all-search",
    top: [
      "div.nav-ad-container { top: 30px !important; }"
    ].join('\n')
  },
  {
    pattern: "\\/\\/www\\.pinterest\\.com\\/search\\/",
    flags: "",
    probe: "https://www.pinterest.com/search/pins/?q=all-search&rs=typed&term_meta",
    top: [
      "div:nth-of-type(1) > div:nth-of-type(1) > header.box_k > div:nth-of-type(1) { top: 30px !important; }"
    ].join('\n')
  },
  {
    pattern: "\\/\\/dict\\.youdao\\.com\\/search",
    flags: "",
    probe: "http://dict.youdao.com/search?q=all-search",
    top: [
      "div.c-topbar-wrapper.setTop { top: 30px !important; }"
    ].join('\n')
  },
  {
    pattern: "\\/\\/s\\.taobao\\.com\\/search",
    flags: "",
    probe: "http://s.taobao.com/search?q=all-search",
    top: [
      "div.tbpc-layout.pageContentCoverSkeleton { top: 30px !important; }"
    ].join('\n')
  },
  {
    pattern: "\\/\\/list\\.tmall\\.com\\/search_product\\.htm",
    flags: "",
    probe: "http://list.tmall.com/search_product.htm?q=all-search",
    top: [
      "div.tbpc-layout.pageContentCoverSkeleton { top: 30px !important; }"
    ].join('\n')
  },
  {
    pattern: "\\/\\/search\\.jd\\.com\\/search",
    flags: "",
    probe: "http://search.jd.com/search?keyword=all-search&enc=utf-8",
    top: [
      "#header_wrap { top: 30px !important; }"
    ].join('\n')
  },
  {
    pattern: "\\/\\/search\\.suning\\.com",
    flags: "",
    probe: "https://search.suning.com/all-search/",
    top: [
      "div.fix-banner { top: 30px !important; }"
    ].join('\n')
  },
  {
    pattern: "\\/\\/github\\.com\\/search",
    flags: "",
    probe: "https://github.com/search?q=all-search",
    top: [
      "div.prc-PageLayout-PaneWrapper-pHPop { top: 30px !important; }"
    ].join('\n')
  }
]
