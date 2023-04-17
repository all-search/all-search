import { GM_getValue, GM_setValue, GM_deleteValue } from '$'
import { getName, parseJson } from './index'

export function getStorage (name) {
  const formatName = getName(name)
  return new Promise((resolve,reject) => {
    if(!GM_getValue) {
      return reject(Error('没有找到GM_getValue'))
    }
    const item = GM_getValue(formatName)
    if (item === void 0) {
      return reject(`GM_getValue没有获取到key:${name}的变量`)
    }
    return resolve(parseJson(item))
  })
}

export function setStorage (name, value) {
  const formatName = getName(name)
  return new Promise((resolve,reject) => {
    if(value === void 0) {
      reject(Error('setStorage'))
    } else if (!GM_setValue) {
      reject(Error('没有找到GM_setValue'))
    } else {
      GM_setValue(formatName, value)
      resolve(value)
    }
  })
}

export function delStorage (name) {
  const formatName = getName(name)
  return new Promise((resolve,reject) => {
    if(!GM_deleteValue) {
      return reject(Error('没有找到GM_deleteValue'))
    }
    GM_deleteValue(formatName)
    return resolve(true)
  })
}

