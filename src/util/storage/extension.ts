import { toValue } from 'vue'
import { storage as wxtStorage } from '@wxt-dev/storage'
import { getName, parseJson } from '../common'
import { StorageAdapter } from './types'

export class ExtensionAdapter implements StorageAdapter {
  async get<T = any>(name: string): Promise<T | null> {
    const key = getName(name)
    if (!key) return null
    const result = await wxtStorage.getItem(`local:${key}`)
    return parseJson(result)
  }

  async set<T = any>(name: string, value: T): Promise<T> {
    const key = getName(name)
    if (!key) throw new Error('Invalid storage key')
    const val = toValue(value) as T
    await wxtStorage.setItem(`local:${key}`, val)
    return val
  }

  async remove(name: string): Promise<boolean> {
    const key = getName(name)
    if (!key) return false
    await wxtStorage.removeItem(`local:${key}`)
    return true
  }

  /**
   * 监听 storage 变化：设置页保存后，已经打开的页面里的菜单条能立刻更新，
   * 不用等用户刷新（以前只有模块加载时读一次，用户会以为没保存）。
   */
  watch<T = any>(name: string, callback: (value: T | null) => void): () => void {
    const key = getName(name)
    if (!key) return () => {}
    return wxtStorage.watch(`local:${key}`, (newValue) => {
      callback(parseJson(newValue) as T | null)
    })
  }
}
