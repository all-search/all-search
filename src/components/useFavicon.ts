import useConfig from './useConfig'
import { delStorage } from '../util/storage'
import { WritableComputedRef } from 'vue'

const favicon = useConfig({
  name: 'favicon',
  defaultVal: 1,
  reg: /^[12]$/
})

function clearIconCache (): void {
  if (window.confirm('确认要清除图标的缓存吗')) {
    delStorage('iconCache').then(() => {
      console.log('清除成功')
    })
  }
}

export default function useFavicon (): {
  favicon: WritableComputedRef<number>;
  clearIconCache: () => void;
} {
  return {
    favicon,
    clearIconCache
  }
}
