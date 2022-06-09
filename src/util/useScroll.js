import { ref } from 'vue'
import { throttle } from '../util/debounce'

// const getScrollTop = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

const y = ref(0)
const direction = ref(0)

export default function () {
  const scrollHandler = throttle(function (e) {
    const eventTarget = (e.target === document ? e.target.documentElement : e.target)
    const scrollTop = eventTarget.scrollTop
    direction.value = y.value - scrollTop
    y.value = scrollTop
  }, 50)
  if (window) {
    window.addEventListener('scroll', scrollHandler)
  }
  return {
    y,
    direction
  }
}
