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
  window.addEventListener('pointerdown', listener, { passive: true })
  return () => {
    window.removeEventListener('click', listener)
    window.removeEventListener('pointerdown', listener)
  }
}
