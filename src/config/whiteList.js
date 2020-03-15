const whiteList = [
  'endday.github.io',
  'endday.gitee.io',
  'localhost'
]
export default function () {
  return whiteList.findIndex(url => url === window.location.hostname) > -1
}
