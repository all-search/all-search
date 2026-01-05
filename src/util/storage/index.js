import { isPlugin } from '../../env'
import { TmAdapter } from './tm'
import { ExtensionAdapter } from './extension'
import { WebBridgeAdapter } from './bridge'

// 重新导出桥接初始化方法，供 script 入口使用
export { initTmMethods } from './bridge'

// --- 存储管理器 ---

let activeAdapter = null

// 自动根据构建目标选择初始适配器
const isOptionsPage = window.location.pathname.includes('options') || 
                     window.location.hostname.includes('github.io') || 
                     window.location.hostname.includes('gitee.io')

if (isPlugin) {
  activeAdapter = new ExtensionAdapter()
} else if (isOptionsPage) {
  activeAdapter = new WebBridgeAdapter()
} else {
  // 默认为油猴环境
  activeAdapter = new TmAdapter()
}

export function useStorage(adapter) {
  activeAdapter = adapter
}

export const getStorage = (name) => activeAdapter.get(name)
export const setStorage = (name, value) => activeAdapter.set(name, value)
export const delStorage = (name) => activeAdapter.remove(name)

// 兼容旧代码的空导出
export function getTmMethods() {}
