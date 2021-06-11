import { onMounted, ref } from 'vue'
import { getSession } from '../util'

const primaryColor = ref('')
const bgColor = ref('')

const changePrimaryColor = e => {
  setCssValue('--as-primary-color', e.target.value)
  primaryColor.value = e.target.value
}

const changeBgColor = e => {
  setCssValue('--as-bg-color', e.target.value)
  bgColor.value = e.target.value
}

const getCssValue = name => {
  const el = document.getElementById('all-search')
  return getComputedStyle(el).getPropertyValue(name).trim()
}

const setCssValue = (name, value) => {
  const el = document.getElementById('all-search')
  el.style.setProperty(name, value)
}

export default function useColor () {
  onMounted(() => {
    const primaryColorDefault = getCssValue('--as-primary-color')
    const bgColorDefault = getCssValue('--as-bg-color')
    const session1 = getSession('primary-color') || primaryColorDefault
    const session2 = getSession('bg-color') || bgColorDefault
    primaryColor.value = session1
    bgColor.value = session2
    setCssValue('--as-primary-color', session1)
    setCssValue('--as-bg-color', session2)
  })
  return {
    changePrimaryColor,
    changeBgColor,
    primaryColor,
    bgColor
  }
}
