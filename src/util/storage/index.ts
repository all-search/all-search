import { isPlugin } from '@src/env'
import { TmAdapter } from './tm'
import { ExtensionAdapter } from './extension'
import { WebBridgeAdapter } from './bridge'
import { StorageAdapter } from './types'

// 重新导出桥接初始化方法，供 script 入口使用
export { initTmMethods } from './bridge'

// --- 存储管理器 ---

let activeAdapter: StorageAdapter = new TmAdapter()

// 自动根据构建目标选择初始适配器
const hostname = typeof window !== 'undefined' ? window.location.hostname : ''
const isOptionsPage = typeof window !== 'undefined' && (
  window.location.pathname.includes('options') ||
  hostname.includes('github.io') ||
  hostname.includes('gitee.io') ||
  // 本地 dev（pnpm dev:options）也走配置站逻辑，否则会落到 TmAdapter 上报 GM API 不可用
  hostname === 'localhost' ||
  hostname === '127.0.0.1' ||
  hostname === '[::1]'
)

if (isPlugin) {
  activeAdapter = new ExtensionAdapter()
} else if (isOptionsPage) {
  activeAdapter = new WebBridgeAdapter()
}
// 默认为 TmAdapter，已经在声明时初始化

/**
 * 切换当前使用的存储适配器
 */
export function useStorage(adapter: StorageAdapter): void {
  activeAdapter = adapter
}

export const getStorage = <T = any>(name: string): Promise<T | null> => activeAdapter.get<T>(name)
export const setStorage = <T = any>(name: string, value: T): Promise<T> => activeAdapter.set<T>(name, value)
export const delStorage = (name: string): Promise<boolean> => activeAdapter.remove(name)

// 兼容旧代码的空导出
export function getTmMethods(): void {}
