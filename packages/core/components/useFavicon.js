import useConfig from './useConfig'
import { delStorage } from '../util/storage'

const favicon = useConfig({
  name: 'favicon',
  defaultVal: 1,
  reg: /[1|2]/
})

function clearIconCache () {
  if (window.confirm('确认要清除图标的缓存吗')) {
    delStorage('iconCache', 'sync').then(() => {
      console.log('清除成功')
    })
  }
}

export default function useFavicon () {
  return {
    favicon,
    clearIconCache
  }
}


