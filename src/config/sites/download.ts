import { Site } from '../../types/site'

const sites: Partial<Site>[] = [
  {
    nameZh: 'BTSOW',
    url: 'https://btso.pw/search/%s'
  },
  {
    nameZh: '谷歌搜索',
    url: 'https://cse.google.com/?q=%s&newwindow=1&cx=006100883259189159113%3Atwgohm0sz8q'
  },
  {
    nameZh: '动漫花园',
    url: 'https://share.dmhy.org/topics/list?keyword=%s'
  },
  {
    nameZh: '海盗湾',
    url: 'https://thepiratebay.org/search/%s'
  },
  {
    nameZh: 'veryCD',
    url: 'http://www.verycd.com/search/folders/%s'
  },
  {
    nameZh: 'ED2000',
    url: 'http://www.ed2000.com/FileList.asp?PageIndex=1&SearchWord=%s&searchMethod=ED2000'
  },
  {
    nameZh: '人人影视',
    url: 'http://www.zimuzu.tv/search/index?keyword=%s'
  },
  {
    nameZh: 'subHD字幕',
    url: 'http://subhd.com/search0/%s'
  }
]

export default sites
