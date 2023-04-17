import { GM_getValue, GM_setValue, GM_getResourceText } from '$';
import pkg from '../../package.json'

export const version = pkg.version

export function getQueryString (name, url) {
  url = url || window.location.href
  const r = new RegExp('(\\?|#|&)' + name + '=([^&#]*)(&|#|$)')
  const m = url.match(r)
  return decodeURIComponent(!m ? '' : m[2])
}

export function checkBody () {
  let time = 0
  return new Promise((resolve, reject) => {
    if (document && document.body) {
      resolve()
    } else {
      const id = setInterval(function () {
        time += 1
        if (document && document.body) {
          clearInterval(id)
          resolve()
        }
        if (time === 50) {
          clearInterval(id)
          reject(new Error('timeOut'))
        }
      }, 200)
      if (['complete', 'loaded', 'interactive'].includes(document.readyState)) {
        if (document && document.body) {
          clearInterval(id)
          resolve()
        }
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          if (document && document.body) {
            clearInterval(id)
            resolve()
          }
        })
      }
    }
  })
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

export let getSession = async function (name) {
  const formatName = getName(name)
  let item
  if (GM_getValue) {
    item = GM_getValue(formatName)
  } else {
    return Error('getSession没有找到GM_getValue')
  }
  if (item) {
    return parseJson(item)
  }
  return null
}

export let setSession = function (name, value) {
  const formatName = getName(name)
  if (GM_setValue) {
    GM_setValue(formatName, value)
    return Promise.resolve()
  } else {
    return Promise.reject(Error('setSession没有找到GM_getValue'))
  }
}

export let delSession = function (name) {
  const formatName = getName(name)
  // eslint-disable-next-line
  if (GM_deleteValue) {
    // eslint-disable-next-line
    GM_deleteValue(formatName)
  } else {
    window.localStorage.removeItem(formatName)
  }
}

export function addStyle (styleContent) {
  if (!styleContent) {
    return
  }
  const style = document.createElement('style')
  style.innerHTML = styleContent
  style.class = 'all-search-style'
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(style)
}

function addLink (url, name) {
  if (!url) {
    return
  }
  if (name) {
    const list = document.styleSheets
    for (let i = 0; i < list.length; i++) {
      if (list[i].ownerNode.className === name) {
        return
      }
    }
  }
  const link = document.createElement('link')
  link.href = url
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.crossorigin = 'anonymous'
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}

export function addStyleResource (name, link) {
  let styleContent
  if (GM_getResourceText) {
    styleContent = GM_getResourceText(name)
  }
  if (styleContent) {
    addStyleContent(styleContent, name)
  } else {
    addLink(link, name)
  }
}

export function RAFInterval (callback, period, runNow) {
  // 一秒60次，对应1秒1000ms
  const needCount = period / 1000 * 60
  let times = 0 // 已经计数的数量

  if (runNow === true) { // 对于立即执行函数的立即判定，否则进行
    const shouldFinish = callback()
    if (shouldFinish) {
      return
    }
  }

  function step () {
    if (times < needCount) {
      // 计数未结束-继续计数
      times++
      requestAnimationFrame(step)
    } else {
      // 计数结束-停止计数，判定结果
      const shouldFinish = callback() || false
      if (!shouldFinish) {
        // 返回值为false，重启计数器
        times = 0
        requestAnimationFrame(step)
      }
    }
  }

  requestAnimationFrame(step)
}

export function removeNode (cssSelectorOrFunction) {
  try {
    if (typeof (cssSelectorOrFunction) === 'string') {
      let removeNodes = document.querySelectorAll(cssSelectorOrFunction)
      for (let i = 0; i < removeNodes.length; i++) {
        removeNodes[i].remove()
      }
    } else if (typeof (cssSelectorOrFunction) === 'function') {
      cssSelectorOrFunction()
    } else {
      console.log('未知命令：' + cssSelectorOrFunction)
    }
  } catch (e) {
    console.log(e)
  }
}

export function addStyleContent (css, className, addToTarget, isReload = false) {
  // 添加CSS代码，不考虑文本载入时间，只执行一次-无论成功与否，带有className
  RAFInterval(function () {
    /**
     * addToTarget这里不要使用head标签,head标签的css会在html载入时加载，
     * html加载后似乎不会再次加载，body会自动加载
     * **/
    let addTo = document.querySelector(addToTarget)
    if (typeof (addToTarget) === 'undefined') {
      addTo = (document.body || document.head || document.documentElement || document)
    }
    // 如果没有目标节点(则直接加) || 有目标节点且找到了节点(进行新增)
    if (typeof (addToTarget) === 'undefined' ||
      (typeof (addToTarget) !== 'undefined' &&
        document.querySelector(addToTarget) !== null)
    ) {
      // 如果true 强行覆盖，不管有没有--先删除
      // 如果false，不覆盖，但是如果有的话，要退出，不存在则新增--无需删除
      if (isReload) {
        removeNode('.' + className)
      } else if (!isReload && document.querySelector('.' + className) !== null) {
        // 节点存在 && 不准备覆盖
        return true
      }
      let cssNode = document.createElement('style')
      if (className) {
        cssNode.className = className
      }
      cssNode.setAttribute('type', 'text/css')
      cssNode.innerHTML = css
      try {
        addTo.appendChild(cssNode)
      } catch (e) {
        console.log(e.message)
      }
      return true
    }
  }, 20, true)
}

export function getAsRoot () {
  return document.getElementById('all-search')
}

export function createAsRoot () {
  const el = document.createElement('div')
  el.id = 'all-search'
  return el
}

export const isMobile = function () {
  return /mobile|android|webos|iphone|ipod|blackberry|iphone os|ipad/i.test(navigator.userAgent)
}
