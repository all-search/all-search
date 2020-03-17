export default [
  {
    name: 'baidu',
    nameZh: '百度',
    url: 'https://www.baidu.com/s?wd=%s&ie=utf-8'
  },
  {
    name: 'google',
    nameZh: '谷歌',
    url: 'https://www.google.com/search?q=%s&ie=utf-8&oe=utf-8',
    styleString: '.srp #searchform:not(.minidiv){top: 56px !important;} .srp .minidiv{top: 36px !important;}'
  },
  {
    name: 'bing',
    nameZh: '必应',
    url: 'https://cn.bing.com/search?q=%s'
  },
  {
    name: 'DDG',
    nameZh: 'DDG',
    url: 'https://duckduckgo.com/?q=%s',
    disable: true
  },
  {
    name: '360',
    nameZh: '360',
    url: 'https://www.so.com/s?ie=utf-8&q=%s'
  },
  {
    name: 'yahoo',
    nameZh: '雅虎',
    url: 'https://search.yahoo.com/search;?p=%s',
    disable: true
  },
  {
    name: 'sogou',
    nameZh: '搜狗',
    url: 'https://www.sogou.com/web?query=%s',
    disable: false
  },
  {
    name: 'startpage',
    nameZh: 'Startpage',
    url: 'https://www.startpage.com/do/asearch$post$query',
    disable: true
  },
  {
    name: 'mijisou',
    nameZh: '秘迹搜索',
    url: 'https://mijisou.com/?q=%s&category_general=on&time_range=&language=zh-CN',
    styleString: '.search-page{top: 36px} .searx-navbar{top: 48px!important;}'
  },
  {
    name: 'Yandex',
    nameZh: 'Yandex',
    url: 'https://yandex.com/search/?text=%s',
    disabled: true
  }
]
