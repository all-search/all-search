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
}
