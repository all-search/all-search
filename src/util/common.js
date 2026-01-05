import pkg from '../../package.json'
import { debounce } from './debounce'

export const version = pkg.version

export { debounce }

export function getQueryString (name, url) {
  url = url || window.location.href
  const r = new RegExp('(?|#|&)' + name + '=([^&#]*)(&|#|$)')
  const m = url.match(r)
  return decodeURIComponent(!m ? '' : m[2])
}

export function getName (name) {
  if (name) {
    return `__allSearch__${name}`
  }
  return null
}

function isJson (str) {
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

export function parseJson (val) {
  if (isJson(val)) {
    try {
      return JSON.parse(val)
    } catch (e) {
      return val
    }
  }
  return val
}

export const isMobile = function () {
  return /mobile|android|webos|iphone|ipod|blackberry|iphone os|ipad/i.test(navigator.userAgent)
}

