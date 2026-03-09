import sites from '../config/sites'
import toolbar from '../config/toolbar'
import { getStorage } from './storage'
import { SiteCategory } from '../types/site'

let sitesData: SiteCategory[] = []

function getSites (val: SiteCategory[] | null): SiteCategory[] {
  if (Array.isArray(val) && val.length > 0) {
    return val
  } else {
    return sites as SiteCategory[]
  }
}

getStorage<SiteCategory[]>('sites').then(val => {
  sitesData = getSites(val || [])
}).catch(() => {
  sitesData = sites as SiteCategory[]
})

export function initSites (type: string): SiteCategory[] {
  if (type === 'tm') {
    return sitesData
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

let toolbarSession: any[] | null = null

getStorage('toolbar').then(val => {
  toolbarSession = val
}).catch(() => {
  toolbarSession = null
})

export function initToolbar (opt: {
  type?: string;
  reset?: boolean;
} = {
  type: '',
  reset: false
}): any[] {
  const toolbarClone = JSON.parse(JSON.stringify(toolbar))
  const list = opt.reset
    ? toolbarClone
    : toolbarSession || toolbarClone
    
  if (opt.type === 'tm') {
    return list
      .filter((item: any) =>
        item.data &&
        item.data.visible)
      .map((item: any) => ({
        nameZh: item.nameZh,
        url: item.url
      }))
  }
  return list.map((item: any) => ({
    nameZh: item.nameZh,
    url: item.url,
    data: item.data
  }))
}
