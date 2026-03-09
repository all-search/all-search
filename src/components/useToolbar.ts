import useConfig from './useConfig'
import { ref, computed, ComputedRef, WritableComputedRef } from 'vue'
import { getStorage } from '../util/storage'
import toolbar from '../config/toolbar'

const sites = ref<any[]>([])

function getList (val: any): any[] {
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

function initToolBar (list: any[], type?: string): any[] {
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
  reg: /^[12]$/
})

export default function useToolbar (type?: string): {
  visible: WritableComputedRef<number>;
  list: ComputedRef<any[]>;
} {
  return {
    visible,
    list: computed(() => initToolBar(sites.value, type))
  }
}
