import useConfig from './useConfig'
import { ref, computed, ComputedRef, WritableComputedRef } from 'vue'
import { getStorage, watchStorage } from '../util/storage'
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

// 与 useSites 同理：别的上下文改了工具栏，已打开的页面跟着更新
watchStorage('toolbar', (value) => {
  sites.value = JSON.parse(JSON.stringify(getList(value)))
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
