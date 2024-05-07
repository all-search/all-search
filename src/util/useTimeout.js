export default function useTimeout () {
  let timeoutHandle
  const registerTimeout = (fn, delay) => {
    cancelTimeout()
    timeoutHandle = window.setTimeout(fn, delay)
  }
  const cancelTimeout = () => window.clearTimeout(timeoutHandle)
  return {
    registerTimeout,
    cancelTimeout
  }
}
