import { ref, onBeforeUnmount, nextTick, Ref } from 'vue'
import { throttle } from './debounce'

const y = ref(0)
const direction = ref('')

function getDirection (newVal: number, oldVal: number, limit: number): string {
  if (newVal < oldVal - limit) {
    return 'top'
  } else if (newVal > oldVal + limit) {
    return 'bottom'
  } else {
    return 'mid'
  }
}

export default function (triggerLimit: number = 0): { y: Ref<number>, direction: Ref<string> } {
  const scrollHandler = throttle(function (e: Event) {
    const eventTarget = (e.target === document ? (e.target as Document).documentElement : (e.target as HTMLElement))
    const scrollTop = eventTarget.scrollTop
    const distance = getDirection(scrollTop, y.value, triggerLimit)
    nextTick().then(() => {
      direction.value = distance
    })
    y.value = scrollTop
  }, 200)

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', scrollHandler)
  }

  onBeforeUnmount(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', scrollHandler)
    }
  })

  return {
    y,
    direction
  }
}
