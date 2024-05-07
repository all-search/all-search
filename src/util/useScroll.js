import { ref, onBeforeUnmount, nextTick } from 'vue'
import { throttle } from './debounce'

// const getScrollTop = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

const y = ref(0)
const direction = ref('')

function getDirection (newVal, oldVal, limit) {
  if (newVal < oldVal - limit) {
    return 'top'
  } else if (newVal > oldVal + limit) {
    return 'bottom'
  } else {
    return 'mid'
  }
}

export default function (triggerLimit = 0) {
  const scrollHandler = throttle(function (e) {
    const eventTarget = (e.target === document ? e.target.documentElement : e.target)
    const scrollTop = eventTarget.scrollTop
    const distance = getDirection(scrollTop, y.value, triggerLimit)
    nextTick().then(() => {
      direction.value = distance
    })
    y.value = scrollTop
  }, 200)
  if (window) {
    window.addEventListener('scroll', scrollHandler)
  }
  onBeforeUnmount(() => {
    if (window) {
      window.removeEventListener('scroll', scrollHandler)
    }
  })
  return {
    y,
    direction
  }
}
