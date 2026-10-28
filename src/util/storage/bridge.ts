import { getName, version, parseJson } from '../common'
import store from '../store'
import { TmAdapter } from './tm'
import { StorageAdapter } from './types'

/** 记录「上次确认没有油猴脚本」的 localStorage key（存的是 getName 后的名字） */
const MISS_MARKER = 'bridge-miss'

export interface BridgeMethods {
  getStorage: <T>(name: string) => Promise<T | null>;
  setStorage: <T>(name: string, value: T) => Promise<T>;
  delStorage: (name: string) => Promise<boolean>;
  version: string;
}

export class WebBridgeAdapter implements StorageAdapter {
  private methods: BridgeMethods | null = null
  private ready: Promise<void>
  private onScriptLoadedHandler: ((event: Event) => void) | null = null

  constructor() {
    // 上次访问已经确认「没有油猴脚本」：直接走 localStorage，不再干等 5 秒。
    // 仍然保留监听——用户中途装了脚本也能接上（见 listenLate）。
    if (this.hasMissedBefore()) {
      this.enableFallback()
      this.ready = Promise.resolve()
      this.listenLate()
      return
    }
    this.ready = this.initConnection()
  }

  /** 上次握手是否已经确认失败过 */
  private hasMissedBefore(): boolean {
    try {
      const key = getName(MISS_MARKER)
      return !!key && localStorage.getItem(key) === '1'
    } catch {
      return false
    }
  }

  private markMissed(missed: boolean): void {
    try {
      const key = getName(MISS_MARKER)
      if (!key) return
      if (missed) localStorage.setItem(key, '1')
      else localStorage.removeItem(key)
    } catch {
      // localStorage 不可用（隐私模式）时忽略
    }
  }

  /**
   * 快速路径下仍然监听 script-loaded：脚本晚到时切到真实 API，
   * 并广播 `as-bridge-up` 让页面重新读一遍数据。
   */
  private listenLate(): void {
    const scriptLoaded = getName('script-loaded')
    if (!scriptLoaded) return
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<BridgeMethods>).detail
      if (!detail) return
      this.methods = detail
      if (detail.version) store.tmVersion = detail.version
      this.markMissed(false)
      document.removeEventListener(scriptLoaded, handler)
      window.dispatchEvent(new Event('as-bridge-up'))
    }
    document.addEventListener(scriptLoaded, handler)
  }

  private initConnection(): Promise<void> {
    return new Promise((resolve) => {
      const scriptLoaded = getName('script-loaded')
      const pageLoaded = getName('page-loaded')

      if (!scriptLoaded || !pageLoaded) {
        this.enableFallback()
        resolve()
        return
      }

      // 5秒超时
      const timeout = setTimeout(() => {
        if (!this.methods) {
          console.warn('WebBridgeAdapter: connection timeout, falling back to localStorage')
          this.markMissed(true)
          this.cleanup()
          this.enableFallback()
          resolve()
        }
      }, 5000)

      this.onScriptLoadedHandler = (event: Event) => {
        const customEvent = event as CustomEvent<BridgeMethods>
        clearTimeout(timeout)
        this.markMissed(false)
        this.methods = customEvent.detail
        // 记录油猴脚本版本，供配置页判断“是否已安装/是否需要升级”
        if (this.methods && this.methods.version) {
          store.tmVersion = this.methods.version
        }
        this.cleanup()
        resolve()
      }

      document.addEventListener(scriptLoaded!, this.onScriptLoadedHandler)
      // 触发脚本端发送 API
      document.dispatchEvent(new Event(pageLoaded!))
    })
  }

  private cleanup(): void {
    if (this.onScriptLoadedHandler) {
      const scriptLoaded = getName('script-loaded')
      if (scriptLoaded) {
        document.removeEventListener(scriptLoaded, this.onScriptLoadedHandler)
      }
      this.onScriptLoadedHandler = null
    }
  }

  private enableFallback(): void {
    this.methods = {
      version: 'fallback',
      getStorage: async <T>(n: string) => {
        const key = getName(n)
        if (!key) return null
        const val = localStorage.getItem(key)
        return parseJson(val) as T
      },
      setStorage: async <T>(n: string, v: T) => {
        const key = getName(n)
        if (key) {
          localStorage.setItem(key, typeof v === 'string' ? v : JSON.stringify(v))
        }
        return v
      },
      delStorage: async (n: string) => {
        const key = getName(n)
        if (key) {
          localStorage.removeItem(key)
        }
        return true
      }
    }
  }

  async get<T = any>(name: string): Promise<T | null> {
    await this.ready
    return this.methods!.getStorage<T>(name)
  }

  async set<T = any>(name: string, value: T): Promise<T> {
    await this.ready
    return this.methods!.setStorage<T>(name, value)
  }

  async remove(name: string): Promise<boolean> {
    await this.ready
    return this.methods!.delStorage(name)
  }

  /**
   * 销毁适配器，清理监听器
   */
  destroy(): void {
    this.cleanup()
  }
}

/**
 * 暴露油猴 API 给网页端 (Host端调用)
 */
export function initTmMethods(): void {
  const tm = new TmAdapter()
  const scriptLoaded = getName('script-loaded')
  const pageLoaded = getName('page-loaded')

  if (!scriptLoaded || !pageLoaded) return

  const emit = function () {
    document.dispatchEvent(new CustomEvent(scriptLoaded, {
      detail: {
        version,
        getStorage: (n: string) => tm.get<any>(n),
        setStorage: (n: string, v: any) => tm.set<any>(n, v),
        delStorage: (n: string) => tm.remove(n)
      }
    }))
  }
  document.addEventListener(pageLoaded, emit)
  emit()
}
