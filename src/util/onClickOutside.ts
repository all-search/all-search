import { ref } from 'vue'

interface OnClickOutsideOptions {
  ignore?: HTMLElement[];
  capture?: boolean;
}

/**
 * 监听点击元素外部的事件
 * @param target 目标元素
 * @param handler 触发回调
 * @param options 配置项
 */
export function onClickOutside (
  target: HTMLElement | null,
  handler: (event: MouseEvent | PointerEvent) => void,
  options: OnClickOutsideOptions = {}
): (() => void) | undefined {
  const { ignore, capture = true } = options

  if (typeof window === 'undefined') return

  const shouldListen = ref(true)
  let fallback: number | undefined

  const listener = (event: MouseEvent | PointerEvent) => {
    if (fallback) window.clearTimeout(fallback)

    const el = target
    const composedPath = event.composedPath()

    if (!el || el === event.target || composedPath.includes(el) || !shouldListen.value) {
      return
    }

    if (ignore && ignore.length > 0) {
      if (ignore.some((targetEl) => {
        return targetEl && (event.target === targetEl || composedPath.includes(targetEl))
      })) {
        return
      }
    }

    handler(event)
  }

  window.addEventListener('click', listener, { passive: true, capture })
  window.addEventListener('pointerdown', listener, { passive: true })

  return () => {
    window.removeEventListener('click', listener)
    window.removeEventListener('pointerdown', listener)
  }
}
