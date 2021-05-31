let el = document.createElement('a')

const replaceUrl = function (val) {
  const lowerCaseVal = val.toLowerCase()
  const list = ['http://', 'https://', 'ftp://', 'files://']
  for (let i = 0; i < list.length; i++) {
    if (lowerCaseVal.indexOf(list[i]) === 0) {
      return val.replace(/.*\/\//, '//')
    }
  }
  return val
}

export default function parseUrl (url) {
  let val = url
  if (val.indexOf('//') < 0) {
    val = `//${val}`
  } else if (val.indexOf('//') > -1) {
    val = replaceUrl(val)
  } else {
    return el
  }
  el.href = val
  return {
    href: el.href, // '包含完整的url'
    origin: el.origin, // '包含协议到pathname之前的内容'
    protocol: el.protocol, //  'url使用的协议，包含末尾的:'
    host: el.host, //  '完整主机名，包含:和端口'
    hostname: el.hostname, //  '主机名，不包含端口'
    port: el.port, //  '端口号'
    pathname: el.pathname, //  '服务器上访问资源的路径/开头'
    search: el.search, //  'query string，?开头'
    hash: el.hash //  '#开头的fragment identifier'
  }
}
