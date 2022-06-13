import { ref } from 'vue'
import { throttle } from '../util/debounce'

// const getScrollTop = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

const y = ref(0)
const direction = ref(0)

export default function () {
  const scrollHandler = throttle(function (e) {
    const eventTarget = (e.target === document ? e.target.documentElement : e.target)
    const scrollTop = eventTarget.scrollTop
    if(scrollTop < y.value) {
      direction.value = 'top'
    } else if(scrollTop > y.value) {
      direction.value = 'bottom'
    } else {
      direction.value = 'mid'
    }
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
