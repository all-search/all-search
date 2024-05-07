export default [
  {
    nameZh: '百度',
    url: 'https://www.baidu.com/s?wd=%s&ie=utf-8'
  },
  {
    nameZh: '百度翻译',
    url: 'https://fanyi.baidu.com/#auto/zh/%s'
  }
].map(item => ({
  ...item,
  data: {
    visible: true
  }
}))
