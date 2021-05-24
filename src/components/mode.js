import { onMounted, onUnmounted, ref, watch } from 'vue'
import { addStyleContent, getSession, setSession } from '../util'
import { debounce } from '../util/debounce'
import { siteInfo } from '../config/loadList'

const session = getSession('mode')

const getMode = val => {
  if(val !== 'vertical' && val !== 'horizontal') {
    return 'horizontal'
  }
  return val
}

const mode = ref(getMode(session))

const map = new Map([
  ['body-horizontal', 'body-vertical'],
  ['body-vertical', 'body-horizontal']
])

const addBodyClass = (value) => {
  const body = document.body
  const newValue = `body-${value}`
  const oldValue = map.get(newValue)
  body.classList.toggle(oldValue, false)
  body.classList.toggle(newValue, true)
}

const addCustomStyle = (value) => {
  const currentSite = siteInfo()
  if (currentSite && currentSite.style) {
    let styleContent = ''
    if (currentSite.style[1] && value === 'horizontal') {
      styleContent = currentSite.style[1]
    } else if (currentSite.style[2] && value === 'vertical') {
      styleContent = currentSite.style[2]
    }
    addStyleContent(styleContent, 'as-custom-style', undefined, true)
  }
}

const initStyle = (value = 'horizontal') => {
  addBodyClass(value)
  addCustomStyle(value)
}

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


