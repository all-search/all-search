const listeners = new Set<() => void>()
let prevHref = window.location.href
let rafId: number | null = null
let eventsBound = false

function notifyListeners(): void {
  const current = window.location.href
  if (current === prevHref) return
  prevHref = current

  listeners.forEach(listener => {
    try {
      listener()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[routerChange] listener error', error)
    }
  })
}

function tick(): void {
  notifyListeners()
  rafId = window.requestAnimationFrame(tick)
}

function ensurePolling(): void {
  if (rafId !== null) return
  rafId = window.requestAnimationFrame(tick)
}

function stopPolling(): void {
  if (rafId === null) return
  window.cancelAnimationFrame(rafId)
  rafId = null
}

function ensureEvents(): void {
  if (eventsBound) return
  eventsBound = true
  baseEvents.forEach(([event, handler]) => window.addEventListener(event, handler))
}

function cleanupEvents(): void {
  if (!eventsBound) return
  baseEvents.forEach(([event, handler]) => window.removeEventListener(event, handler))
  eventsBound = false
}

const baseEvents: Array<[string, EventListener]> = [
  ['popstate', notifyListeners],
  ['hashchange', notifyListeners],
  ['yt-navigate-finish', notifyListeners],
  ['wxt:locationchange', notifyListeners]
]

/**
 * 路由变化监听
 * 用于适配单页应用 (SPA) 的 URL 变化
 */
export function routerChange(callback: () => void): () => void {
  listeners.add(callback)
  ensurePolling()
  ensureEvents()

  return () => {
    listeners.delete(callback)
    if (listeners.size === 0) {
      stopPolling()
      cleanupEvents()
    }
  }
}
