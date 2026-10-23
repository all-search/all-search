import parseUrl from './parseUrl'

/**
 * 站点图标的统一来源与处理。
 *
 * 运行时（菜单条）和配置页共用这里，避免两边各写一套回退顺序。
 * 配置页默认**不联网**：只有显式「抓取图标」时才走 faviconCandidates。
 */

/** 抓取/展示时的候选顺序：用户指定 > 第三方 favicon 服务 > 站点自己的 favicon.ico */
export function faviconCandidates (url?: string, icon?: string): string[] {
  const { hostname, origin } = parseUrl(url || '')
  if (!hostname) return icon ? [icon] : []
  return [
    icon,
    `https://favicon.yandex.net/favicon/v2/${encodeURIComponent(hostname)}?size=32`,
    `https://invisible-scarlet-centipede.faviconkit.com/${encodeURIComponent(hostname)}`,
    `${origin}/favicon.ico`
  ].filter((item): item is string => !!item)
}

/**
 * 这张图能不能带 crossorigin 加载。
 * 只有明确带 `Access-Control-Allow-Origin` 的服务才加：加错了连图都显示不出来
 * （站点的 /favicon.ico 和 faviconkit 都没有 CORS 头）。
 */
export function isCorsFriendly (url: string): boolean {
  return url.includes('favicon.yandex.net')
}

/** 首字母兜底色块：没有图标时用它，零网络请求 */
export function iconPalette (seed: string): { bg: string, fg: string } {
  let hash = 0
  const text = seed || '?'
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) % 360
  }
  return {
    bg: `hsl(${hash}, 68%, 93%)`,
    fg: `hsl(${hash}, 42%, 36%)`
  }
}

export function iconLetter (name?: string): string {
  const text = (name || '').trim()
  return text ? text.slice(0, 1).toUpperCase() : '?'
}

/**
 * 把图片压到固定尺寸再转 dataURL。
 * - 跨域图片（没带 Access-Control-Allow-Origin）会污染 canvas，toDataURL 抛 SecurityError，
 *   这里吞掉并返回空串，调用方据此决定「只能看、不能缓存」
 * - 统一 32×32，一条 1–2KB，126 个站点也就一两百 KB，不会把 localStorage 撑爆
 */
export function toIconDataUrl (img: HTMLImageElement, size = 32): string {
  try {
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const context = canvas.getContext('2d')
    if (!context) return ''
    const width = img.naturalWidth || img.width || size
    const height = img.naturalHeight || img.height || size
    const scale = Math.min(size / width, size / height) || 1
    const drawWidth = Math.max(1, Math.round(width * scale))
    const drawHeight = Math.max(1, Math.round(height * scale))
    context.drawImage(
      img,
      Math.round((size - drawWidth) / 2),
      Math.round((size - drawHeight) / 2),
      drawWidth,
      drawHeight
    )
    return canvas.toDataURL('image/png')
  } catch {
    return ''
  }
}

/** 用 <img> 拉一次图片；失败/超时返回 null。crossOrigin 必须先设，否则缓存时 canvas 会被污染 */
export function loadImage (url: string, timeout = 6000): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    if (!url) {
      resolve(null)
      return
    }
    const img = document.createElement('img')
    let settled = false
    const done = (value: HTMLImageElement | null) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      resolve(value)
    }
    const timer = setTimeout(() => done(null), timeout)
    img.crossOrigin = 'anonymous'
    img.onload = () => done(img)
    img.onerror = () => done(null)
    img.src = url
  })
}

/**
 * 按候选顺序抓一张能缓存的图标。
 * 返回空串表示「没抓到，或抓到了但跨域不让缓存」。
 */
export async function fetchIconDataUrl (url?: string, icon?: string): Promise<string> {
  for (const candidate of faviconCandidates(url, icon)) {
    const img = await loadImage(candidate)
    if (!img) continue
    const dataUrl = toIconDataUrl(img)
    if (dataUrl) return dataUrl
  }
  return ''
}

/** 上传的图片先过一遍压缩，超过 20KB 的不收，避免把存储塞满 */
export function normalizeUploadedIcon (dataUrl: string, maxBytes = 20 * 1024): Promise<string> {
  return new Promise((resolve) => {
    const img = document.createElement('img')
    img.onload = () => {
      const normalized = toIconDataUrl(img) || dataUrl
      resolve(normalized.length > maxBytes ? '' : normalized)
    }
    img.onerror = () => resolve('')
    img.src = dataUrl
  })
}

/**
 * 图标缓存上限。浏览过程中内容脚本会不断往里加 host，
 * 不设上限的话 localStorage 迟早被撑爆；超了就丢最早的一批（下次访问再抓）。
 */
export function trimIconCache (
  cache: Record<string, string>,
  limit = 300
): Record<string, string> {
  const keys = Object.keys(cache || {})
  if (keys.length <= limit) return cache
  const next: Record<string, string> = {}
  keys.slice(keys.length - limit).forEach((key) => {
    next[key] = cache[key]
  })
  return next
}
