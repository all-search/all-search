import pkg from '../../package.json'
import { debounce } from './debounce'

export const version: string = pkg.version

export { debounce }

/**
 * 获取 URL 中的查询参数
 * @param name 参数名
 * @param url 可选 URL，默认取当前页面 URL
 */
export function getQueryString (name: string, url?: string): string {
  const targetUrl = url || window.location.href
  const r = new RegExp('(?|#|&)' + name + '=([^&#]*)(&|#|$)')
  const m = targetUrl.match(r)
  return decodeURIComponent(!m ? '' : m[2])
}

/**
 * 获取带有项目前缀的名称
 * @param name 原始名称
 */
export function getName (name: string | null): string | null {
  if (name) {
    return `__allSearch__${name}`
  }
  return null
}

function isJson (str: any): boolean {
  if (typeof str !== 'string') {
    return false
  }
  const char = str.charAt(0)
  if (char !== '[' && char !== '{') {
    return false
  }
  try {
    return typeof JSON.parse(str) === 'object'
  } catch (e) {
    return false
  }
}

/**
 * 尝试解析 JSON 字符串
 * @param val 要解析的值
 */
export function parseJson (val: any): any {
  if (isJson(val)) {
    try {
      return JSON.parse(val)
    } catch (e) {
      return val
    }
  }
  return val
}

/**
 * 判断是否为移动端环境
 */
export const isMobile = function (): boolean {
  return /mobile|android|webos|iphone|ipod|blackberry|iphone os|ipad/i.test(navigator.userAgent)
}
