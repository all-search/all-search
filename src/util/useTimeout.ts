/**
 * 定时器 Hook
 */
export default function useTimeout (): {
  registerTimeout: (fn: () => void, delay: number) => void;
  cancelTimeout: () => void;
} {
  let timeoutHandle: number
  const registerTimeout = (fn: () => void, delay: number) => {
    cancelTimeout()
    timeoutHandle = window.setTimeout(fn, delay)
  }
  const cancelTimeout = () => window.clearTimeout(timeoutHandle)
  return {
    registerTimeout,
    cancelTimeout
  }
}
