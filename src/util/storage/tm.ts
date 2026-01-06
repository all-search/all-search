import { toValue } from 'vue'
import { GM_getValue, GM_setValue, GM_deleteValue } from 'vite-plugin-monkey/dist/client'
import { getName, parseJson } from '../common'
import { StorageAdapter } from './types'

export class TmAdapter implements StorageAdapter {
  async get<T = any>(name: string): Promise<T | null> {
    if (!GM_getValue) throw new Error('GM_getValue not found')
    const key = getName(name)
    if (!key) return null
    return parseJson(GM_getValue(key))
  }

  async set<T = any>(name: string, value: T): Promise<T> {
    if (!GM_setValue) throw new Error('GM_setValue not found')
    const key = getName(name)
    if (!key) throw new Error('Invalid storage key')
    const val = toValue(value) as T
    GM_setValue(key, val)
    return val
  }

  async remove(name: string): Promise<boolean> {
    if (!GM_deleteValue) throw new Error('GM_deleteValue not found')
    const key = getName(name)
    if (!key) return false
    GM_deleteValue(key)
    return true
  }
}
