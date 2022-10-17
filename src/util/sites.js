import sites from '../config/sites'
import { getSession } from './index'

export function initSites (type) {
  let sitesData = sites
  const localSites = getSession('sites')
  if (localSites) {
    sitesData = localSites
  }
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
