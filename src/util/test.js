import { mergeSites } from './index'
import search from '../config/sites/search'
import translate from '../config/sites/translate'

const oldList = [
  {
    nameZh: '搜索',
    name: 'search',
    list: [
      {
        'nameZh': '必应',
        'url': 'https://cn.bing.com/search?q=%s',
        'id': 'search-cn.bing.com',
        data: {
          'visible': false
        }
      },
      {
        'nameZh': '谷歌',
        'url': 'https://www.google.com/search?q=%s&ie=utf-8&oe=utf-8',
        'id': 'search-www.google.com',
        data: {
          'visible': false
        }
      },
      {
        'nameZh': '百度',
        'url': 'https://www.baidu.com/s?wd=%s&ie=utf-8',
        'id': 'search-www.baidu.com',
        data: {
          'visible': false
        }
      }
    ]
  }
]

const list = [
  {
    nameZh: '搜索',
    name: 'search',
    list: search
  },
  {
    nameZh: '翻译',
    name: 'translate',
    list: translate
  }
]

const newList = mergeSites(oldList, list)
console.log(JSON.parse(JSON.stringify(newList)))
