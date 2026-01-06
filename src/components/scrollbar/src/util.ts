import ResizeObserver from 'resize-observer-polyfill'

export const isArray = Array.isArray
export const isString = (val: any): val is string => typeof val === 'string'

export const toObject = (arr: any[]): Record<string, any> => {
  const obj: Record<string, any> = {}
  arr.forEach(item => {
    obj[item.key] = item.value
  })
  return obj
}

export const SCOPE = 'MElScrollbar'
export const GAP = 4 // top 2 + bottom 2 of bar instance

export const isNumber = (val: any): val is number => {
  return typeof val === 'number' && !isNaN(val)
}

export const debugWarn = (...args: any[]): void => {
  console.error(...args)
}

interface ResizeElement extends HTMLElement {
  __resizeListeners__?: Array<() => void>;
  __ro__?: ResizeObserver;
}

export const resizeHandler = (entries: ResizeObserverEntry[]): void => {
  for (const entry of entries) {
    const target = entry.target as ResizeElement
    const listeners = target.__resizeListeners__ || []
    if (listeners.length) {
      listeners.forEach(fn => {
        fn()
      })
    }
  }
}

export const addResizeListener = (element: ResizeElement, fn: () => void): void => {
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = []
    element.__ro__ = new ResizeObserver(resizeHandler as any)
    element.__ro__.observe(element)
  }
  element.__resizeListeners__.push(fn)
}

export const removeResizeListener = (element: ResizeElement, fn: () => void): void => {
  if (!element || !element.__resizeListeners__) return
  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1)
  if (!element.__resizeListeners__.length && element.__ro__) {
    element.__ro__.disconnect()
  }
}

export const addUnit = (value: string | number): string => {
  if (isString(value)) {
    return value
  } else if (isNumber(value)) {
    return value + 'px'
  }
  debugWarn(SCOPE, '属性 value 必须是 string 或 number 类型')
  return ''
}

export const on = (
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture: boolean = false
): void => {
  if (element && event && handler) {
    element.addEventListener(event, handler, useCapture)
  }
}

export const off = (
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture: boolean = false
): void => {
  if (element && event && handler) {
    element.removeEventListener(event, handler, useCapture)
  }
}

export interface BarMapItem {
  offset: 'offsetHeight' | 'offsetWidth';
  scroll: 'scrollTop' | 'scrollLeft';
  scrollSize: 'scrollHeight' | 'scrollWidth';
  size: 'height' | 'width';
  key: 'vertical' | 'horizontal';
  axis: 'Y' | 'X';
  client: 'clientY' | 'clientX';
  direction: 'top' | 'left';
}

export const BAR_MAP: Record<'vertical' | 'horizontal', BarMapItem> = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top'
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left'
  }
}

export const renderThumbStyle = ({ move, size, bar }: { move: number, size: string, bar: BarMapItem }): Record<string, string> => {
  const style: Record<string, string> = {}
  const translate = `translate${bar.axis}(${move}%)`

  style[bar.size] = size
  style.transform = translate
  // @ts-ignore
  style.msTransform = translate
  // @ts-ignore
  style.webkitTransform = translate

  return style
}
