import type { Site } from '../types/site'

/**
 * 分类点击时真正要打开的站点。
 *
 * 规则和「点分类直接跳一个引擎」时保持一致：
 * - 只收 `url` 是字符串的项：正则形式的是站点匹配规则，不是可点击的地址
 *   （调用方会对 url 做 `.replace('%s', keyword)`，把正则传进去会直接抛错）
 * - 只看 `data.visible` 为真的项（隐藏项不参与）
 * - 跳过指向当前站点自己的入口（已经在这个站点了，再开一个同样的搜索页没意义）
 */
export function pickCategoryTargets (
  list: Site[] | undefined | null,
  hostname: string = typeof window === 'undefined' ? '' : window.location.hostname
): Site[] {
  if (!Array.isArray(list) || !list.length) {
    return []
  }
  return list.filter(item => {
    if (!item || !item.data?.visible) {
      return false
    }
    if (typeof item.url !== 'string') {
      return false
    }
    if (!hostname) {
      return true
    }
    return item.url.indexOf(hostname) === -1
  })
}
