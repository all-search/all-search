import { toValue } from 'vue'
import { storage as wxtStorage } from '@wxt-dev/storage'
import { getName, parseJson } from '../index'

export class ExtensionAdapter {
  async get(name) {
    const result = await wxtStorage.getItem(`local:${getName(name)}`)
    if (result === undefined) throw new Error(`Key not found: ${name}`)
    return parseJson(result)
  }
  async set(name, value) {
    const val = toValue(value)
    await wxtStorage.setItem(`local:${getName(name)}`, val)
    return val
  }
  async remove(name) {
    await wxtStorage.removeItem(`local:${getName(name)}`)
    return true
  }
}
