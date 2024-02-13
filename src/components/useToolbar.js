import useConfig from './useConfig'
import { ref, computed } from 'vue'
import { getStorage } from '../util/storage'
import toolbar from '../config/toolbar'

const sites = ref([])

function getList (val) {
  if (Array.isArray(val) && val.length > 0) {
    return val
  } else {
    return toolbar
  }
}

getStorage('toolbar').then(val => {
  sites.value = getList(val)
}).catch(() => {
  sites.value = toolbar
})

function initToolBar (list, type) {
  if (type === 'tm') {
    return list
      .filter(item =>
        item.data &&
        item.data.visible)
      .map(item => ({
        nameZh: item.nameZh,
        url: item.url
      }))
  }
  return list
}

const visible = useConfig({
  name: 'showToolbar',
  defaultVal: 1,
  reg: /[1|2]/
})

export default function useToolbar (type) {
  return {
    visible,
    list: computed(() => initToolBar(sites.value, type))
  }
}


