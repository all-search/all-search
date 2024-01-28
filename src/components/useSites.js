import { computed, ref } from 'vue'
import sites from '../config/sites'
import { getStorage } from '../util/storage'

const sitesData = ref([])

function getSites (val) {
  if (Array.isArray(val) && val.length > 0) {
    return val
  } else {
    return sites
  }
}

function initSites (sites, type) {
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

getStorage('sites').then(val => {
  sitesData.value = getSites(val)
}).catch(() => {
  sitesData.value = sites
})

export default function useSites (type) {
  return {
    sites: computed(() => initSites(sitesData.value, type))
  }
}
