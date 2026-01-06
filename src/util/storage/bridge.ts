import { getName, version } from '../common'
import { TmAdapter } from './tm'
import { StorageAdapter } from './types'

export class WebBridgeAdapter implements StorageAdapter {
  private methods: any = null
  private ready: Promise<void>

  constructor() {
    this.ready = new Promise((resolve) => {
      const scriptLoaded = getName('script-loaded')
      const pageLoaded = getName('page-loaded')

      if (!scriptLoaded || !pageLoaded) return

      const onScriptLoaded = (event: any) => {
        this.methods = event.detail
        resolve()
      }

      document.addEventListener(scriptLoaded, onScriptLoaded)
      // 触发脚本端发送 API
      document.dispatchEvent(new Event(pageLoaded))
    })
  }

  async get<T = any>(name: string): Promise<T | null> {
    await this.ready
    return this.methods.getStorage(name)
  }

  async set<T = any>(name: string, value: T): Promise<T> {
    await this.ready
    return this.methods.setStorage(name, value)
  }

  async remove(name: string): Promise<boolean> {
    await this.ready
    return this.methods.delStorage(name)
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
