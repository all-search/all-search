const el = document.createElement('a')

const replaceUrl = function (val: string): string {
  const lowerCaseVal = val.toLowerCase()
  const list = ['http://', 'https://', 'ftp://', 'files://']
  for (let i = 0; i < list.length; i++) {
    if (lowerCaseVal.indexOf(list[i]) === 0) {
      return val.replace(/.*\/\//, '//')
    }
  }
  return val
}

interface ParsedUrl {
  href: string;
  origin: string;
  protocol: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
}

/**
 * 解析 URL
 * @param url URL 字符串
 */
export default function parseUrl (url: string): ParsedUrl {
  let val = url
  if (val.indexOf('//') < 0) {
    val = `//${val}`
  } else if (val.indexOf('//') > -1) {
    val = replaceUrl(val)
  }
  
  el.href = val
  
  return {
    href: el.href,
    origin: el.origin,
    protocol: el.protocol,
    host: el.host,
    hostname: el.hostname,
    port: el.port,
    pathname: el.pathname,
    search: el.search,
    hash: el.hash
  }
}
