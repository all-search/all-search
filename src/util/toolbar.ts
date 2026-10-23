import toolbar from '../config/toolbar'
import { getStorage } from './storage'

/**
 * 划词工具栏的默认项 / 已存数据。
 *
 * 存储是异步读的，这里在模块加载时预热一次：配置页拿它渲染首屏和「重置」，
 * 运行时（selection-bar）走 useToolbar，不依赖这个文件。
 */

let toolbarSession: any[] | null = null

getStorage('toolbar').then((val) => {
  toolbarSession = (val as any[]) || null
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
