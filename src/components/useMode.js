import { onMounted, onUnmounted, ref, watch } from 'vue'
import { getSession, setSession } from '../util'
import { onFullScreenChange } from '../util/fullScreen'
import { debounce } from '../util/debounce'
import { initBodyClass, addCustomStyle } from '../util/initStyle'
const session = getSession('mode')

const getMode = val => {
  if (val !== 'vertical' && val !== 'horizontal') {
    return 'horizontal'
  }
  return val
}

const mode = ref(getMode(session))

const initStyle = (value = 'horizontal') => {
  initBodyClass(value)
  addCustomStyle(value)
}

onFullScreenChange(() => {
  initStyle(mode.value)
})

watch(mode, (value) => {
  const formatVal = getMode(value)
  initStyle(formatVal)
  setSession('mode', formatVal)
})

const resizeHandle = debounce(() => initStyle(mode.value))

export default function useMode () {
  onMounted(() => {
    initStyle(mode.value)
    window.addEventListener('resize', resizeHandle, false)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resizeHandle, false)
  })

  return {
    mode
  }
}


