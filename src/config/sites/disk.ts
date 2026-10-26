import { Site } from '../../types/site'

const sites: Partial<Site>[] = [
  {
    nameZh: '百度网盘',
    url: 'https://pan.baidu.com/disk/main#/index?category=all&search=%s'
  },
  {
    nameZh: '小白盘',
    url: 'https://www.xiaobaipan.com/list-%s.html?from=1'
  },
  {
    nameZh: '56网盘',
    url: 'https://www.56wangpan.com/search/kw%s'
  }
]

export default sites
