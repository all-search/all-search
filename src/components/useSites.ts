import { computed, ref, ComputedRef } from 'vue'
import sites from '../config/sites'
import { getStorage, delStorage } from '../util/storage'
import { SiteCategory } from '../types/site'

const sitesData = ref<SiteCategory[]>([])

function getSites (val: SiteCategory[] | null): SiteCategory[] {
  if (Array.isArray(val) && val.length > 0) {
    return val
  } else {
    return sites as SiteCategory[]
  }
}

function initSites (sites: SiteCategory[], type?: string): SiteCategory[] {
  if (type === 'tm') {
    return sites
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
  return sites
}

getStorage<SiteCategory[]>('sites').then(val => {
  sitesData.value = getSites(val)
}).catch(() => {
  sitesData.value = sites as SiteCategory[]
})

function resetSites (): void {
  if (window.confirm('确认要重置所有网址吗')) {
    delStorage('sites')
  }
}

export default function useSites (type?: string): {
  sites: ComputedRef<SiteCategory[]>;
  resetSites: () => void;
} {
  return {
    sites: computed(() => initSites(sitesData.value, type)),
    resetSites
  }
}
