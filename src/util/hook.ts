/**
 * 在原始函数执行前执行 Hook
 * @param originalFn 原始函数
 * @param hookFn Hook 函数，返回 false 则阻止原始函数执行
 */
export function withHookBefore<T extends (...args: any[]) => any> (
  originalFn: T,
  hookFn: (...args: Parameters<T>) => boolean | void
): (...args: Parameters<T>) => ReturnType<T> | void {
  return function (this: any, ...args: Parameters<T>) {
    if (hookFn.apply(this, args) === false) {
      return
    }
    return originalFn.apply(this, args)
  }
}

/**
 * 在原始函数执行后执行 Hook
 * @param originalFn 原始函数
 * @param hookFn Hook 函数
 */
export function withHookAfter<T extends (...args: any[]) => any> (
  originalFn: T,
  hookFn: (...args: Parameters<T>) => void
): (...args: Parameters<T>) => ReturnType<T> {
  return function (this: any, ...args: Parameters<T>) {
    const output = originalFn.apply(this, args)
    hookFn.apply(this, args)
    return output
  }
}
