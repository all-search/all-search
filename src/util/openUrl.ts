import { isPlugin } from '../env'

export type OpenMode = 'same' | 'new'

/**
 * 交给后台 worker 用 tabs.create 打开；插件版之外返回 false（调用方退回 window.open）。
 *
 * 为什么插件版要走后台：内容脚本里的 `window.open` 在无头 / 被拦截的场景下会返回一个
 * 停在 about:blank 的窗口，既不导航、也不受页面控制（e2e 里表现为「点了没反应」）。
 * 后台 tabs.create 不受弹窗拦截器限制，行为稳定。
 *
 * @param active 打开后是否切过去。单个链接要切（等价于 window.open 的行为），
 *               批量打开不切（一次抢 N 个焦点没法用）。
 */
function openInBackground (urls: string[], active: boolean): boolean {
  const runtime = (globalThis as any).chrome?.runtime
  if (!isPlugin || !runtime || typeof runtime.sendMessage !== 'function') return false
  try {
    const result = runtime.sendMessage({ type: 'all-search:open-tabs', urls, active })
    // 后台被回收 / 扩展刚重载时 sendMessage 会 reject：这时退回 window.open，别让点击没反应
    if (result && typeof result.catch === 'function') {
      result.catch(() => {
        urls.forEach(url => window.open(url, '_blank'))
      })
    }
    return true
  } catch {
    return false
  }
}

/**
 * 按配置打开链接。
 * - 'new'  ：新标签页（不打断当前页）
 * - 'same' ：当前页跳转
 */
export function openUrl (url: string, mode: OpenMode): void {
  if (mode === 'new') {
    if (openInBackground([url], true)) return
    window.open(url, '_blank')
  } else {
    window.location.href = url
  }
}

/** 取另一种打开方式（供 Ctrl / 中键使用，保证两个入口都可用） */
export function otherOpenMode (mode: OpenMode): OpenMode {
  return mode === 'new' ? 'same' : 'new'
}

/**
 * 一次打开多个链接（「点分类全开」用）。
 *
 * 为什么不全用 window.open：一次用户点击里连开多个窗口会被弹窗拦截器砍掉大半
 * （实测内容脚本里 6 个只放过 2 个）。插件版交给后台 worker 用 tabs.create，
 * 后台打开且不受拦截；油猴 / 网页版没有这个能力，只能退回 window.open，
 * 浏览器放行几个就是几个。
 */
export function openUrls (urls: string[]): void {
  const list = urls.filter(url => typeof url === 'string' && !!url)
  if (!list.length) return

  // 批量打开固定后台标签页：一次抢 N 个焦点没法用
  if (openInBackground(list, false)) return

  list.forEach(url => window.open(url, '_blank'))
}
