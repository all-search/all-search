import { GM_getValue, GM_setValue, GM_deleteValue } from 'vite-plugin-monkey/dist/client'
import browser from 'webextension-polyfill'
import { getName, parseJson, version } from './index'
import store from './store'

function getStorageFn (name, type = 'sync') {
  const formatName = getName(name)
  return new Promise((resolve, reject) => {
    if (browser && browser.storage) {
      browser.storage[type].get(formatName).then((result) => {
        if (result[formatName] === void 0) {
          reject(`没有获取到key:${name}的变量`)
        } else {
          resolve(parseJson(result[formatName]))
        }
      }).catch(() => {
        reject(`没有获取到key:${name}的变量`)
      })
    } else {
      if (!GM_getValue) {
        return reject(Error('没有找到GM_getValue'))
      }
      const item = GM_getValue(formatName)
      if (item === void 0) {
        return reject(`GM_getValue没有获取到key:${name}的变量`)
      }
      return resolve(parseJson(item))
    }
  })
}

function setStorageFn (name, value, type = 'sync') {
  const formatName = getName(name)
  return new Promise((resolve, reject) => {
    if (value === void 0) {
      reject(Error('setStorage'))
    } else {
      if (browser && browser.storage) {
        browser.storage[type].set({ [formatName]: value }).then(() => {
          resolve(value)
        }).catch(() => {
          reject(false)
        })
      } else if (!GM_setValue) {
        reject(Error('没有找到GM_setValue'))
      } else {
        GM_setValue(formatName, value)
        resolve(value)
      }
    }
  })
}

function delStorageFn (name, type = 'sync') {
  const formatName = getName(name)
  return new Promise((resolve, reject) => {
    if (browser && browser.storage) {
      browser.storage[type].remove(formatName).then(() => {
        resolve(true)
      }).catch(() => {
        reject(false)
      })
    } else if (!GM_deleteValue) {
      return reject(Error('没有找到GM_deleteValue'))
    }
    GM_deleteValue(formatName)
    return resolve(true)
  })
}

export let getStorage = getStorageFn
export let setStorage = setStorageFn
export let delStorage = delStorageFn

const scriptLoaded = getName('script-loaded')
const pageLoaded = getName('page-loaded')

export function initTmMethods () {
  const emit = function () {
    document.dispatchEvent(new CustomEvent(scriptLoaded, {
      detail: {
        version,
        getStorage: getStorageFn,
        setStorage: setStorageFn,
        delStorage: delStorageFn
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
