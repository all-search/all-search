import { isScript, isPlugin } from '../env'

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
  style.className = 'all-search-style'
  const head = document.getElementsByTagName('head')[0]
  if (head) {
    head.appendChild(style)
  }
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
 * 获取宿主节点 (Host / Anchor)
 */
export function getAsRoot (): HTMLElement | null {
  if (isScript) {
    return document.getElementById('all-search')
  }
  if (isPlugin) {
    return document.querySelector('all-search-ui') as HTMLElement
  }
  return document.getElementById('all-search') || document.querySelector('all-search-ui') as HTMLElement
}

/**
 * 获取影子根 (ShadowRoot)
 */
export function getAsShadowRoot (): ShadowRoot | null {
  return getAsRoot()?.shadowRoot || null
}

/**
 * 获取影子内部的挂载锚点 (用于 Vue 挂载和 Teleport)
 */
export function getAsMountAnchor (): HTMLElement | null {
  const shadow = getAsShadowRoot()
  if (!shadow) return null
  
  // 脚本版：使用我们手动创建的 id
  const anchor = shadow.getElementById('as-mount-anchor')
  if (anchor) return anchor
  
  // 插件版 (WXT) 或回退：使用第一个子节点
  return shadow.firstElementChild as HTMLElement
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
      // 默认注入到影子根
      addTo = getAsShadowRoot() || document.body || document.head || document.documentElement || document
    }

    if (typeof addToTarget === 'undefined' || (addToTarget !== undefined && document.querySelector(addToTarget) !== null)) {
      if (isReload && className) {
        removeNode('.' + className)
      } else if (!isReload && className && (addTo as HTMLElement).querySelector?.('.' + className)) {
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
export function addStyleResource (name: string): void {
  let styleContent: string | undefined
  // @ts-ignore
  if (isScript && typeof GM_getResourceText !== 'undefined') {
    // @ts-ignore
    styleContent = GM_getResourceText(name)
  }
  if (styleContent) {
    addStyleContent(styleContent, name)
  } else {
    // 这里暂时保持原样，Link 无法注入 ShadowRoot
  }
}