import { isPlugin, isWeb } from '@src/env'
import { TmAdapter } from './tm'
import { ExtensionAdapter } from './extension'
import { WebBridgeAdapter } from './bridge'
import { StorageAdapter } from './types'

// 重新导出桥接初始化方法，供 script 入口使用
export { initTmMethods } from './bridge'

// --- 存储管理器 ---

/**
 * 适配器按**构建期身份**选，不看运行时 URL。
 *
 * 以前是靠 `location.pathname.includes('options')` / `github.io` 猜的，后果是：
 * 用户脚本跑在任何一个路径含 options 的页面（或 github.io 子页）会被当成配置站，
 * 走 WebBridge → 5 秒超时 → 降级写 localStorage，GM 里的配置读不到，改动还写到别处。
 *
 * 身份来自各包的 `.env`：plugin → `VITE_TARGET=plugin`，
 * options → `web`，script → `script`（或未设置，默认按脚本处理）。
 */
function createAdapter(): StorageAdapter {
  if (isPlugin) return new ExtensionAdapter()
  if (isWeb) return new WebBridgeAdapter()
  return new TmAdapter()
}

let activeAdapter: StorageAdapter = createAdapter()

/**
 * 切换当前使用的存储适配器
 */
export function useStorage(adapter: StorageAdapter): void {
  activeAdapter = adapter
}

export const getStorage = <T = any>(name: string): Promise<T | null> => activeAdapter.get<T>(name)
export const setStorage = <T = any>(name: string, value: T): Promise<T> => activeAdapter.set<T>(name, value)
export const delStorage = (name: string): Promise<boolean> => activeAdapter.remove(name)

/**
 * 订阅某个 key 的变化，返回取消订阅函数。
 * 只有插件版（chrome.storage）实现了真正的跨上下文监听；
 * 油猴的 GM 存储没有变更事件，配置站走桥接也不订阅，都会退化成 noop。
 */
export function watchStorage<T = any>(name: string, callback: (value: T | null) => void): () => void {
  return activeAdapter.watch ? activeAdapter.watch<T>(name, callback) : () => {}
}

// 兼容旧代码的空导出
export function getTmMethods(): void {}
