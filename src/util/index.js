import engines from '../config/engines'

export function getQueryString (name, url) {
  url = url || window.location.href
  const r = new RegExp('(\\?|#|&)' + name + '=([^&#]*)(&|#|$)')
  const m = url.match(r)
  return decodeURIComponent(!m ? '' : m[2])
}

export function getKeyword () {
  const el = document.querySelector('input[type=\'search\'],input[type=\'text\'][autocomplete=\'off\'],input[autocomplete=\'off\']:not([type])') ||
    document.querySelector('input[type=\'text\'][name][value],input[name][value]:not([type])')
  if (el) {
    if (el.nodeName === 'INPUT' || el.localName === 'textarea') {
      return el.value
    } else {
      return el.textContent
    }
  }
  return ''
}

const el = document.createElement('a')

export function parseUrl (url) {
  let val = url
  val = val.toLowerCase()
  if (val.indexOf('//') < 0) {
    val = `//${val}`
  } else if (val.indexOf('//') > -1) {
    if (
      !val.startsWith('http://') &&
      !val.startsWith('https://') &&
      !val.startsWith('ftp://') &&
      !val.startsWith('files://')
    ) {
      val = val.replace(/.*\/\//, '//')
    }
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

export function getCurrentSite () {
  let currentSite = null
  for (const module of engines) {
    if (!currentSite) {
      currentSite = module.list.find(item => {
        const urlObj = parseUrl(item.url)
        return window.location.hostname === urlObj.hostname &&
          window.location.pathname === urlObj.pathname
      })
    }
  }
  return currentSite
}

export function checkBody () {
  let time = 0
  return new Promise((resolve, reject) => {
    if (document.body) {
      resolve()
    } else {
      const id = setInterval(function () {
        time += 1
        if (document.body) {
          clearInterval(id)
          resolve()
        }
        if (time === 20) {
          clearInterval(id)
          reject(new Error('timeOut'))
        }
      }, 100)
    }
  })
}

export function getSession (name) {
  if (window.location.hostname === 'localhost') {
    return null
  }
  // eslint-disable-next-line
  return GM_getValue(name)
}

export function setSession (name, value) {
  if (window.location.hostname !== 'localhost') {
    // eslint-disable-next-line
    GM_setValue(name, value)
  }
}
