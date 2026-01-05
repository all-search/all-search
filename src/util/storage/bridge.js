import { getName, version } from '../index'
import { TmAdapter } from './tm'

export class WebBridgeAdapter {
  constructor() {
    this.methods = null
    this.ready = new Promise((resolve) => {
      const scriptLoaded = getName('script-loaded')
      const pageLoaded = getName('page-loaded')

      const onScriptLoaded = (event) => {
        this.methods = event.detail
        resolve()
      }

      document.addEventListener(scriptLoaded, onScriptLoaded)
      // 触发脚本端发送 API
      document.dispatchEvent(new Event(pageLoaded))
    })
  }

  async get(name) {
    await this.ready
    return this.methods.getStorage(name)
  }
  async set(name, value) {
    await this.ready
    return this.methods.setStorage(name, value)
  }
  async remove(name) {
    await this.ready
    return this.methods.delStorage(name)
  }
}

/**
 * 暴露油猴 API 给网页端 (Host端调用)
 */
export function initTmMethods() {
  const tm = new TmAdapter()
  const scriptLoaded = getName('script-loaded')
  const pageLoaded = getName('page-loaded')

  const emit = function () {
    document.dispatchEvent(new CustomEvent(scriptLoaded, {
      detail: {
        version,
        getStorage: (n) => tm.get(n),
        setStorage: (n, v) => tm.set(n, v),
        delStorage: (n) => tm.remove(n)
      }
    }))
  }
  document.addEventListener(pageLoaded, emit)
  emit()
}
