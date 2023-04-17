import store from './store'
import {
  getName,
  version
} from './index'
import {
  getStorage as gStorage,
  setStorage as sStorage,
  delStorage as dStorage
} from './storage'

export let getStorage = gStorage
export let setStorage = sStorage
export let delStorage = dStorage

const scriptLoaded = getName('script-loaded')
const pageLoaded = getName('page-loaded')

export function initTmMethods () {
  const emit = function () {
    document.dispatchEvent(new CustomEvent(scriptLoaded, {
      detail: {
        version,
        getStorage,
        setStorage,
        delStorage
      }
    }))
  }
  document.addEventListener(pageLoaded, emit)
  emit()
}

export function getTmMethods () {
  document.addEventListener(scriptLoaded, (event) => {
    store.tmVersion = event.detail.version
    getStorage = event.detail.getStorage
    setStorage = event.detail.setStorage
    delStorage = event.detail.delStorage
  })
  document.dispatchEvent(new Event(pageLoaded))
}
