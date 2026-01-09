import { getName, version, parseJson } from '../common'
import { TmAdapter } from './tm'
import { StorageAdapter } from './types'

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
    this.ready = this.initConnection()
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
          this.cleanup()
          this.enableFallback()
          resolve()
        }
      }, 5000)

      this.onScriptLoadedHandler = (event: Event) => {
        const customEvent = event as CustomEvent<BridgeMethods>
        clearTimeout(timeout)
        this.methods = customEvent.detail
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
