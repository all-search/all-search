import { onUnmounted, ref } from 'vue'
import { throttle } from './debounce'

const getScrollTop = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

export default function () {
  const x = ref(getScrollTop())
  let previous = 0
  const direction = ref(-1)
  const fn = throttle(() => {
    x.value = getScrollTop()
    const direct = x.value - previous
    if (direct > 0) {
      direction.value = 1
    } else if (direct < 0) {
      direction.value = -1
    } else {
      direction.value = 0
    }
    previous = x.value
  }, 200)
  window.addEventListener('scroll', fn)
  onUnmounted(() => {
    window.removeEventListener('scroll', fn)
  })
  return {
    x,
    direction
  }
}
