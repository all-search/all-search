/**
 * 防抖函数
 * @param fn 执行函数
 * @param delay 延迟时间
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number = 500): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return function (this: any, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 节流函数
 * @param fn 执行函数
 * @param delay 间隔时间
 */
export function throttle<T extends (...args: any[]) => any>(fn: T, delay: number = 500): (...args: Parameters<T>) => void {
  let canRun = true
  return function (this: any, ...args: Parameters<T>) {
    if (!canRun) return
    canRun = false
    setTimeout(() => {
      fn.apply(this, args)
      canRun = true
    }, delay)
  }
}
