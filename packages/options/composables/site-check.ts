/**
 * 站点可达性检测（issue #35）。
 *
 * 为什么用 `mode: 'no-cors'`：
 * 配置页是静态站，没有任何站点的 CORS 授权，普通 fetch 会直接失败（读不到响应）。
 * no-cors 只要求「浏览器能把这个请求发出去」——拿不到状态码，但能区分
 * 「域名没了 / 连不上 / 超时」和「有响应」。对「这个引擎还能不能用」这个问题，
 * 这个粒度是够的：404 的搜索引擎通常也会正常返回一个页面。
 *
 * 已知局限（UI 里要说清）：
 * - 需要登录 / 有反爬验证的站点可能误判
 * - https 页面里检测 http 站点会被浏览器当混合内容拦掉，直接标「跳过」
 */

export type ProbeState = 'checking' | 'ok' | 'dead' | 'skipped'

/** 探测用的关键词：换成 `%s` 后发一次真实搜索请求 */
const PROBE_KEYWORD = 'all-search'
const DEFAULT_TIMEOUT = 8000

function withKeyword (url: string): string {
  return url.includes('%s') ? url.replace(/%s/g, PROBE_KEYWORD) : url
}

/**
 * 探测单个站点。
 *
 * @returns ok：有响应；dead：请求失败（DNS / 连接 / 超时）；skipped：环境不允许探测
 */
export async function probeSite (url: string, timeout = DEFAULT_TIMEOUT): Promise<Exclude<ProbeState, 'checking'>> {
  if (typeof url !== 'string' || !url) return 'skipped'
  const target = withKeyword(url)

  // https 页面里请求 http 资源会被当成混合内容拦掉，这类直接跳过，别误报
  if (typeof location !== 'undefined' && location.protocol === 'https:' && target.startsWith('http://')) {
    return 'skipped'
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  try {
    await fetch(target, {
      mode: 'no-cors',
      cache: 'no-store',
      credentials: 'omit',
      redirect: 'follow',
      signal: controller.signal
    })
    return 'ok'
  } catch {
    return 'dead'
  } finally {
    clearTimeout(timer)
  }
}

/**
 * 批量探测：并发上限 4，避免一次打出几十个请求把页面拖死。
 *
 * @param onResult 每完成一个回调一次，便于边测边渲染
 */
export async function probeSites (
  urls: string[],
  onResult: (url: string, state: Exclude<ProbeState, 'checking'>) => void,
  concurrency = 4,
  timeout = DEFAULT_TIMEOUT
): Promise<void> {
  const queue = urls.filter((url, index, list) => typeof url === 'string' && list.indexOf(url) === index)
  let cursor = 0

  const workers = Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
    while (cursor < queue.length) {
      const url = queue[cursor++]
      const state = await probeSite(url, timeout)
      onResult(url, state)
    }
  })

  await Promise.all(workers)
}
