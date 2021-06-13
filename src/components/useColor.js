import { onMounted, ref, watch } from 'vue'
import { getSession, setSession } from '../util'

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
}

const map = {
  'primary-color': primaryColor,
  'bg-color': bgColor,
  'primary-text-color': primaryTextColor
}

const initColor = (name) => {
  const colorDefault = getCssValue(name)
  const session = getSession(name) || colorDefault
  const colorVal = map[name]
  colorVal.value = session
}

const resetColor = (name) => {

}

export default function useColor () {
  onMounted(() => {
    initColor('primary-color')
    initColor('bg-color')
    initColor('primary-text-color')
  })
  return {
    primaryColor,
    bgColor,
    primaryTextColor
  }
}
