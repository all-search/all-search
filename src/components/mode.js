import { ref, watch, onMounted } from 'vue'
import { getSession, setSession, addStyleContent } from '../util'
import { debounce } from '../util/debounce'
import { siteInfo } from '../config/loadList'

const session = getSession('mode')

const getMode = val => {
  if (['vertical', 'horizontal'].indexOf(session) === -1) {
    return 'horizontal'
  }
  return val
}

export const mode = ref(getMode(session))

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

export const initStyle = (value = 'horizontal') => {
  addBodyClass(value)
  addCustomStyle(value)
}

window.addEventListener('resize', debounce(() => {
  initStyle(mode.value)
}), false)

watch(mode, (value) => {
  const formatVal = getMode(value)
  initStyle(formatVal)
  setSession('mode', formatVal)
})


