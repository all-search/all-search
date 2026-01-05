import { toValue } from 'vue'
import { GM_getValue, GM_setValue, GM_deleteValue } from 'vite-plugin-monkey/dist/client'
import { getName, parseJson } from '../index'

export class TmAdapter {
  async get(name) {
    if (!GM_getValue) throw new Error('GM_getValue not found')
    return parseJson(GM_getValue(getName(name)))
  }
  async set(name, value) {
    if (!GM_setValue) throw new Error('GM_setValue not found')
    GM_setValue(getName(name), toValue(value))
    return toValue(value)
  }
  async remove(name) {
    if (!GM_deleteValue) throw new Error('GM_deleteValue not found')
    GM_deleteValue(getName(name))
    return true
  }
}
