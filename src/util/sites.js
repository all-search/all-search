import sites from '../config/sites'
import { getSession, setSession, version } from './index'

export function mergeSites (a, b) {
  const oldSites = JSON.parse(JSON.stringify(a))
  let newSites = JSON.parse(JSON.stringify(b.filter(item => item.name !== 'personal')))

  newSites.forEach(newCate => {
    const oldCate = oldSites.find(oldCate => oldCate.name === newCate.name)
    if (oldCate) {
      newCate.list.forEach(newSite => {
        const i = oldCate.list.findIndex(oldSite => oldSite.id === newSite.id)
        if (i > -1) {
          Object.keys(newSite).forEach(key => {
            if (key !== 'data') {
              oldCate.list[i][key] = newSite[key]
            }
          })
          newSite.isAdd = true
        }
      })
      newCate.list = newCate.list.filter(item => !item.isAdd)
      if (newCate.list.length) {
        oldCate.list = oldCate.list.concat(newCate.list)
      }
      newCate.isAdd = true
    }
  })

  newSites = newSites.filter(item => !item.isAdd)
  if (newSites.length) {
    oldSites.push(...newSites)
  }
  return oldSites
}

export function initSites (type) {
  let sitesData = sites
  const localSites = getSession('sites')
  const sitesVersion = getSession('sites-version')
  if (localSites) {
    sitesData = localSites
    if (
      localSites &&
      sitesVersion &&
      // 当版本有更新，或者是在设置页面调用，才会进行合并数组
      (sitesVersion !== version || type !== 'tm')
    ) {
      sitesData = mergeSites(localSites, sites)
      setSession('sites', sitesData)
      setSession('sites-version', version)
    }
  }
  if (type === 'tm') {
    sitesData = sitesData
      .filter(item =>
        item.list &&
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
