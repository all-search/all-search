import sites from '../config/sites'
import toolbar from '../config/toolbar'
import { getSession } from './index'

export function initSites (type) {
  let sitesData = getSession('sites') || sites
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

export function initToolbar (opt = {
  type: '',
  reset: false
}) {
  const toolbarClone = JSON.parse(JSON.stringify(toolbar))
  const list = opt.reset
    ? toolbarClone
    : getSession('toolbar') || toolbarClone
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
