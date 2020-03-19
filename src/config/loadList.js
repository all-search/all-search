const list = [
  {
    url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^?]+\?(?!tbm=)(?:&?q=|(?:[^#](?!&tbm=))+?&q=)(?:.(?!&tbm=))*$/,
    enabled: true,
    style: '.srp #searchform:not(.minidiv){top: 56px !important;} .srp .minidiv{top: 36px !important;}'
  },
  {
    url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^#]*#(?:&?q=|.+?&q=).+/,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/www\.baidu\.com\/(?:s|baidu)/,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/[^.]*\.bing\.com\/search/,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/duckduckgo\.com\/*/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/search\.yahoo\.com\/search/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/tw\.search\.yahoo\.com\/search/i,
    enabled: true,
    style: ''
  },
  {

    url: /^https?:\/\/searx\.me\/\?q/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/www\.sogou\.com\/(?:web|s)/,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/yandex\.com\/search/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/www\.startpage\.com\/do\/asearch/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/mijisou.com\/\?q/i,
    enabled: true,
    style: '.search-page{top: 36px} .searx-navbar{top: 48px!important;}'
  },
  {
    url: /^https?:\/\/google\.infinitynewtab\.com\/\?q/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/www\.dogedoge\.com\/results\?q/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/baike\.baidu\.com\/item/,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/baike\.baidu\.com\/search/,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/wenku\.baidu\.com\/search/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/zhidao\.baidu\.com\/search/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/\D{2,5}\.wikipedia\.org\/wiki/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/www\.zhihu\.com\/search\?/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/so\.baike\.com\/doc/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/www\.baike\.com\/wiki/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/www\.docin\.com\/search\.do/,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/zhihu\.sogou\.com\/zhihu/,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/weixin\.sogou\.com\/weixin\?/,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/www\.quora\.com\/search\?/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/stackoverflow\.com\/search\?/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/www\.soku\.com\/search_video\//,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/www\.soku\.com\/t\/nisearch\//,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/search\.bilibili\.com\/all/,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/www\.acfun\.cn\/search/,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/www\.youtube\.com\/results/,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/www\.nicovideo\.jp\/search\//,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/so\.iqiyi\.com\/so\/q/,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/v\.qq\.com\/x\/search/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/music\.baidu\.com\/search/,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/so\.1ting\.com\/all\.do/,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/www\.xiami\.com\/search/,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/s\.music\.qq\.com/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/music\.163\.com\/.*?#\/search/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/so\.yinyuetai\.com\/\?keyword/,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/image\.baidu\.com\/search/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/\w{2,10}\.google(?:\.\D{1,3}){1,2}\/[^?]+\?.*&tbm=isch/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/.*\.bing\.com\/images\/search/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/www\.flickr\.com\/search\//,
    enabled: true,
    style: ''
  },
  {
    url: /^http:\/\/www\.pixiv\.net\/search\.php/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/huaban\.com\/search\/\?/,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/www\.pinterest\.com\/search\//,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/thepiratebay\.org\/search/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/share\.dmhy\.org\/topics\/list\?keyword=/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/www\.ed2000\.com\/filelist\.asp/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/www\.zimuzu\.tv\/search\//,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/so\.cqp\.cc\/search/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/subhd\.com\/search/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/translate\.google(?:\.\D{1,4}){1,2}/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/fanyi\.baidu\.com/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/.*\.bing\.com\/dict\/search\?q=/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/dict\.youdao\.com\/search/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/dict\.youdao\.com\/w/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/dict\.cn\/./,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/s\.taobao\.com\/search/,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/list\.tmall\.com\/search_product\.htm.*from=chaoshi/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/list\.tmall\.com\/search_product\.htm/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/search\.jd\.com\/Search/,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/search\.suning\.com/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/search\.yhd\.com\/c0-0\/k/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/search\.smzdm\.com\/\?/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/s\.weibo\.com\/weibo\//i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/tieba\.baidu\.com\/f\/search/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/(movie|music|book)\.douban\.com\/subject_search?/,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/www\.douban\.com\/search/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/xueshu\.baidu\.com\/(?:s|baidu)/,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/scholar\.google(?:\.\D{1,3}){1,2}\/scholar\?/,
    enabled: true,
    style: ''
  },
  {
    url: /^http:\/\/search\.cnki\.net\/search\.aspx/i,
    enabled: true,
    style: ''
  },
  {
    url: /^http:\/\/epub\.cnki\.net\/kns\/brief\/default_result\.aspx/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/s\.g\.wanfangdata\.com\.cn\/Paper\.aspx/i,
    enabled: true,
    style: ''
  },
  {
    url: /^http:\/\/.*?ebscohost\.com\/.*?results/i,
    enabled: true,
    style: ''
  },
  {
    url: /^http:\/\/link\.springer\.com\/search\?query=/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:.*?jstor.org\/action\/doAdvancedSearch/i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:.*?runoob\.com\//i,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/github\.com\/search/,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/developer\.mozilla\.org\/.{2,5}\/search/,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/google\.infinitynewtab\.com\/\?q/,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/www\.startpage\.com\/do\/search/,
    enabled: true,
    style: ''
  },
  {
    url: /^https?:\/\/127\.0\.0\.1:8090\/./,
    enabled: true,
    style: ''
  }
]

const item = {
  url: '',
  enabled: false,
  style: ''
}

const target = list.find(item => {
  return item.url.test(window.location.href)
})

if (target) {
  item.url = target.url
  item.enabled = target.enabled
  item.style = target.style
}

export default item
