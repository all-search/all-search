import { onMounted, ref, watch } from 'vue'
import { getSession, setSession } from '../util/index'

const primaryColor = ref('')
const bgColor = ref('')
const primaryTextColor = ref('')

watch(primaryColor, value => {
  setCssValue('primary-color', value)
  setSession('primary-color', value)
})

watch(bgColor, value => {
  setCssValue('bg-color', value)
  setSession('bg-color', value)
})

watch(primaryTextColor, value => {
  setCssValue('primary-text-color', value)
  setSession('primary-text-color', value)
})

const getCssValue = name => {
  const el = document.getElementById('all-search')
  return getComputedStyle(el).getPropertyValue(`--as-${name}`).trim()
}

const setCssValue = (name, value) => {
  const el = document.getElementById('all-search')
  el.style.setProperty(`--as-${name}`, value)
  document.body.style.setProperty(`--as-${name}`, value)
}

const map = {
  'primary-color': primaryColor,
  'bg-color': bgColor,
  'primary-text-color': primaryTextColor
}

const initColor = (name, defaultValue) => {
  const colorDefault = getCssValue(name) || defaultValue
  const session = getSession(name) || colorDefault
  const colorVal = map[name]
  colorVal.value = session
}

export default function useColor () {
  onMounted(() => {
    initColor('primary-color', '#1890ff')
    initColor('bg-color', '#ffffff')
    initColor('primary-text-color', '#606266')
  })
  return {
    primaryColor,
    bgColor,
    primaryTextColor
  }
}
