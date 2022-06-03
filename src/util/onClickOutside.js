import { ref } from 'vue'

export function onClickOutside (
  target,
  handler,
  options
) {
  const { ignore, capture = true } = options

  if (!window)
    return

  const shouldListen = ref(true)

  let fallback

  const listener = (event) => {
    window.clearTimeout(fallback)

    const el = target
    const composedPath = event.composedPath()

    if (!el || el === event.target || composedPath.includes(el) || !shouldListen.value)
      return

    if (ignore && ignore.length > 0) {
      if (ignore.some((target) => {
        const el = target
        return el && (event.target === el || composedPath.includes(el))
      }))
        return
    }

    handler(event)
  }
  window.addEventListener('click', listener, {
    passive: true, capture
  })
  window.addEventListener('pointermove', listener, {
    passive: true, capture
  })
  const pointerdownFn = (e) => {
    const el = target
    shouldListen.value = !!el && !e.composedPath().includes(el)
  }
  window.addEventListener('pointerdown', pointerdownFn, { passive: true })
  const pointerupFn = (e) => {
    fallback = window.setTimeout(() => listener(e), 50)
  }
  window.addEventListener('pointerup', pointerupFn, { passive: true })
  return () => {
    window.removeEventListener('click', listener)
    window.removeEventListener('pointermove', listener)
    window.removeEventListener('pointerdown', pointerdownFn)
    window.removeEventListener('pointerup', pointerupFn)
  }
}
