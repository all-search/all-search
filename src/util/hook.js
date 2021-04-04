export function withHookBefore (originalFn, hookFn) {
  return function () {
    if (hookFn.apply(this, arguments) === false) {
      return
    }
    return originalFn.apply(this, arguments)
  }
}

export function withHookAfter (originalFn, hookFn) {
  return function () {
    const output = originalFn.apply(this, arguments)
    hookFn.apply(this, arguments)
    return output
  }
}
