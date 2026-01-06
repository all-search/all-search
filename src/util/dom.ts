import { GM_getResourceText } from 'vite-plugin-monkey/dist/client'

/**
 * 检查 body 是否已加载
 */
export function checkBody (): Promise<void> {
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

/**
 * 添加简单的样式节点
 */
export function addStyle (styleContent: string): void {
  if (!styleContent) {
    return
  }
  const style = document.createElement('style')
  style.innerHTML = styleContent
  // 注意：className 是标准的，class 是非标准的
  style.className = 'all-search-style'
  const head = document.getElementsByTagName('head')[0]
  if (head) {
    head.appendChild(style)
  }
}

/**
 * 添加外部链接样式
 */
function addLink (url: string, name?: string): void {
  if (!url) {
    return
  }
  if (name) {
    const list = document.styleSheets
    for (let i = 0; i < list.length; i++) {
      const node = list[i].ownerNode as HTMLElement
      if (node && node.className === name) {
        return
      }
    }
  }
  const link = document.createElement('link')
  link.href = url
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.setAttribute('crossorigin', 'anonymous')
  const head = document.getElementsByTagName('head')[0]
  if (head) {
    head.appendChild(link)
  }
}

/**
 * 基于 requestAnimationFrame 的定时执行
 */
export function RAFInterval (callback: () => boolean | void, period: number, runNow?: boolean): void {
  const needCount = period / 1000 * 60
  let times = 0

  if (runNow === true) {
    const shouldFinish = callback()
    if (shouldFinish) {
      return
    }
  }

  function step () {
    if (times < needCount) {
      times++
      requestAnimationFrame(step)
    } else {
      const shouldFinish = callback() || false
      if (!shouldFinish) {
        times = 0
        requestAnimationFrame(step)
      }
    }
  }

  requestAnimationFrame(step)
}

/**
 * 移除指定的 DOM 节点或运行移除逻辑
 */
export function removeNode (cssSelectorOrFunction: string | (() => void)): void {
  try {
    if (typeof (cssSelectorOrFunction) === 'string') {
      const removeNodes = document.querySelectorAll(cssSelectorOrFunction)
      removeNodes.forEach(node => node.remove())
    } else if (typeof (cssSelectorOrFunction) === 'function') {
      cssSelectorOrFunction()
    }
  } catch (e) {
    // ignore
  }
}

/**
 * 添加 CSS 内容到指定容器
 */
export function addStyleContent (css: string, className?: string, addToTarget?: string, isReload = false): void {
  RAFInterval(() => {
    let addTo: Node | null = null
    if (typeof addToTarget !== 'undefined') {
      addTo = document.querySelector(addToTarget)
    } else {
      addTo = document.body || document.head || document.documentElement || document
    }

    if (typeof addToTarget === 'undefined' || (addToTarget !== undefined && document.querySelector(addToTarget) !== null)) {
      if (isReload && className) {
        removeNode('.' + className)
      } else if (!isReload && className && document.querySelector('.' + className) !== null) {
        return true
      }

      const cssNode = document.createElement('style')
      if (className) {
        cssNode.className = className
      }
      cssNode.setAttribute('type', 'text/css')
      cssNode.innerHTML = css
      
      try {
        if (addTo) {
          addTo.appendChild(cssNode)
        }
      } catch (e) {
        // ignore
      }
      return true
    }
  }, 20, true)
}

/**
 * 从资源中载入样式
 */
export function addStyleResource (name: string, link: string): void {
  let styleContent: string | undefined
  if (GM_getResourceText) {
    styleContent = GM_getResourceText(name)
  }
  if (styleContent) {
    addStyleContent(styleContent, name)
  } else {
    addLink(link, name)
  }
}

/**
 * 获取根节点
 */
export function getAsRoot (): HTMLElement | null {
  return document.getElementById('all-search')
}

/**
 * 创建根节点
 */
export function createAsRoot (): HTMLElement {
  const el = document.createElement('div')
  el.id = 'all-search'
  return el
}
