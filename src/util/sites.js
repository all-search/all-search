import sites from '../config/sites'
import toolbar from '../config/toolbar'
import { getStorage } from './storage'

let sitesData = []

function getSites (val) {
  if (Array.isArray(val) && val.length > 0) {
    return val
  } else {
    return sites
  }
}

getStorage('sites').then(val => {
  sitesData = getSites(val)
}).catch(() => {
  sitesData = sites
})

export function initSites (type) {
  if (type === 'tm') {
    sitesData = sitesData
      .filter(item =>
        Array.isArray(item.list) &&
        item.list.length > 0 &&
        item.data &&
        item.data.visible)
      .map(item => ({
        ...item,
        show: false
      }))
  }
  return sitesData
}

let toolbarSession

getStorage('toolbar').then(val => {
  toolbarSession = val
}).catch(() => {
  toolbarSession = null
})

export function initToolbar (opt = {
  type: '',
  reset: false
}) {
  const toolbarClone = JSON.parse(JSON.stringify(toolbar))
  const list = opt.reset
    ? toolbarClone
    : toolbarSession || toolbarClone
  if (opt.type === 'tm') {
    return list
      .filter(item =>
        item.data &&
        item.data.visible)
      .map(item => ({
        nameZh: item.nameZh,
        url: item.url
      }))
  }
  return list.map(item => ({
    nameZh: item.nameZh,
    url: item.url,
    data: item.data
  }))
}
