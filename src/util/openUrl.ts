import { isPlugin } from '../env'

export type OpenMode = 'same' | 'new'

/**
 * 按配置打开链接。
 * - 'new'  ：新标签页（不打断当前页）
 * - 'same' ：当前页跳转
 */
export function openUrl (url: string, mode: OpenMode): void {
  if (mode === 'new') {
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

  const runtime = (globalThis as any).chrome?.runtime
  if (isPlugin && runtime && typeof runtime.sendMessage === 'function') {
    runtime.sendMessage({ type: 'all-search:open-tabs', urls: list })
    return
  }

  list.forEach(url => window.open(url, '_blank'))
}
