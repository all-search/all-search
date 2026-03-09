import { createApp } from 'vue'
import { getStorage } from './storage'
import { LayoutService } from './layoutService'

export type MountMode = 'top' | 'bottom' | 'left' | 'right'

export interface MountOptions {
  id: string
  tag: string
}

/**
 * 应用初始化工厂 (主要用于用户脚本环境)
 */
export async function setupApp(options: {
  rootComponent: any,
  hostId: string,
  hostTag: string,
}) {
  const { rootComponent, hostId, hostTag } = options
  
  // 1. 获取模式和宿主
  const mode = await getMountMode()
  const host = ensureHost({ id: hostId, tag: hostTag })
  
  // 2. 初始挂载
  LayoutService.refresh(mode, host)
  
  // 3. 初始化 Shadow DOM 结构
  const { shadowRoot, container } = initShadow(host)
  
  // 4. 开发模式：同步 Vite 样式
  syncDevStyles(shadowRoot)
  
  // 5. 抛出事件通知（主要用于用户脚本环境注入样式）
  window.dispatchEvent(new CustomEvent('as-inject-style'))

  // 6. 挂载 Vue 应用
  const app = createApp(rootComponent)
  app.mount(container)
  ;(host as any).__vue_app__ = app
  
  return { app, host, shadowRoot, container }
}

/**
 * 获取挂载模式 (从存储中读取)
 */
export async function getMountMode(): Promise<MountMode> {
  return await getStorage<MountMode>('mode') || 'top'
}

/**
 * 创建或获取宿主元素
 */
export function ensureHost(options: MountOptions): HTMLElement {
  const { id, tag } = options
  let host = document.querySelector(tag) as HTMLElement || document.getElementById(id)
  
  if (!host) {
    host = document.createElement(tag)
    host.id = id
  }
  
  return host
}

/**
 * 执行物理挂载逻辑
 */
export function mountToPage(host: HTMLElement, mode: MountMode): void {
  const root = document.documentElement
  const body = document.body || root.firstElementChild
  
  if (mode === 'bottom') {
    // 挂载在 html 底部 (确保它是 html 的最后一个子元素)
    if (root.lastElementChild !== host) {
      root.appendChild(host)
    }
  } else {
    // top, left, right 默认挂载在 body 之前 (html 的顶部)
    if (body && body.previousElementSibling !== host) {
      root.insertBefore(host, body)
    } else if (!body && !root.contains(host)) {
      root.appendChild(host)
    }
  }
}

/**
 * 初始化 Shadow Root 并返回挂载点
 */
export function initShadow(host: HTMLElement): { shadowRoot: ShadowRoot, container: HTMLElement } {
  const shadowRoot = host.shadowRoot || host.attachShadow({ mode: 'open' })
  
  // 模拟一个内部容器结构，支持样式注入 (head) 和 Vue 挂载 (body)
  // 统一使用原生 html/head/body 标签，与 WXT (plugin 模式) 保持一致
  let mockHtml = shadowRoot.querySelector('html')
  if (!mockHtml) {
    mockHtml = document.createElement('html')
    mockHtml.style.display = 'block'
    
    const mockHead = document.createElement('head')
    mockHead.style.display = 'none'
    
    const mockBody = document.createElement('body')
    mockBody.id = 'as-mount-anchor'
    mockBody.style.display = 'block'
    mockBody.style.height = '100%'
    mockBody.style.width = '100%'
    
    mockHtml.appendChild(mockHead)
    mockHtml.appendChild(mockBody)
    shadowRoot.appendChild(mockHtml)
  }
  
  const container = shadowRoot.getElementById('as-mount-anchor')
  return { shadowRoot, container: container as HTMLElement }
}

/**
 * 开发模式补丁：迁移 Vite 的热更新样式到 Shadow DOM
 * 使用 Map 记录已同步的样式，避免重复克隆导致的内存堆积
 */
const syncedStyles = new Map<string, HTMLElement>()
let devStyleObserver: MutationObserver | null = null

export function syncDevStyles(shadowRoot: ShadowRoot): void {
  if (process.env.NODE_ENV !== 'development') return

  const migrate = () => {
    const mockHead = shadowRoot.querySelector('head')
    if (!mockHead) return

    // 仅搬运带有 vite-dev-id 且包含项目标识的样式
    const styles = document.querySelectorAll('style[data-vite-dev-id]')
    styles.forEach(style => {
      const devId = style.getAttribute('data-vite-dev-id') || ''
      if (devId.includes('all-search')) {
        const existing = syncedStyles.get(devId)
        if (existing) {
          // 如果内容变了（热更新），更新内容
          if (existing.textContent !== style.textContent) {
            existing.textContent = style.textContent
          }
        } else {
          // 新样式，克隆并存入 Map
          const clone = style.cloneNode(true) as HTMLElement
          mockHead.appendChild(clone)
          syncedStyles.set(devId, clone)
        }
      }
    })
  }

  migrate()
  
  if (devStyleObserver) {
    devStyleObserver.disconnect()
  }
  
  devStyleObserver = new MutationObserver(migrate)
  devStyleObserver.observe(document.head, { childList: true, subtree: true, characterData: true })
}