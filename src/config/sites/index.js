import search from './search'
import translate from './translate'
import developer from './developer'
import video from './video'
import music from './music'
import news from './news'
import social from './social'
import knowledge from './knowledge'
import image from './image'
import shopping from './shopping'
import disk from './disk'
import scholar from './scholar'

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
  },
  {
    nameZh: '视频',
    name: 'video',
    list: video
  },
  {
    nameZh: '购物',
    name: 'shopping',
    list: shopping
  },
  {
    nameZh: '音乐',
    name: 'music',
    list: music
  },
  {
    nameZh: '开发',
    name: 'developer',
    list: developer
  },
  {
    nameZh: '新闻',
    name: 'news',
    list: news
  },
  {
    nameZh: '社交',
    name: 'social',
    list: social
  },
  {
    nameZh: '百科',
    name: 'knowledge',
    list: knowledge
  },
  {
    nameZh: '图片',
    name: 'image',
    list: image
  },
  {
    nameZh: '网盘',
    name: 'disk',
    list: disk
  },
  {
    nameZh: '学术',
    name: 'scholar',
    list: scholar
  },
  {
    nameZh: '常用',
    name: 'personal',
    list: []
  }
].map(item => ({
  ...item,
  data: {
    visible: true
  },
  list: item.list.map(child => ({
    ...child,
    data: {
      visible: true
    }
  }))
}))

export default list
