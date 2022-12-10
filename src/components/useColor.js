import { onMounted, computed, ref } from 'vue'
import { getSession, setSession } from '../util/index'

const reg = /^#([a-fA-F\d]{6}|[a-fA-F\d]{3})$/
const defaultVal = {
  'primary-color': '#1890ff',
  'bg-color': '#ffffff',
  'primary-text-color': '#606266'
}

function setCssValue (name, value) {
  const el = document.getElementById('all-search')
  el.style.setProperty(`--as-${name}`, value)
}

function getValue (name) {
  const session = getSession(name)
  if (reg.test(session)) {
    return session
  } else {
    return defaultVal[name]
  }
}

const valMap = {
  'primary-color': ref(getValue('primary-color')),
  'bg-color': ref(getValue('bg-color')),
  'primary-text-color': ref(getValue('primary-text-color'))
}


function setValue (name, value) {
  const formatVal = reg.test(value) ? value : defaultVal[name]
  setCssValue(name, formatVal)
  setSession(name, formatVal)
  valMap[name].value = formatVal
}

const primaryColor = computed({
  get: () => valMap['primary-color'].value,
  set: val => {
    setValue('primary-color', val)
  }
})

const bgColor = computed({
  get: () => valMap['bg-color'].value,
  set: val => {
    setValue('bg-color', val)
  }
})

const primaryTextColor = computed({
  get: () => valMap['primary-text-color'].value,
  set: val => {
    setValue('primary-text-color', val)
  }
})

function initColor (name) {
  const value = getSession(name)
  if (reg.test(value)) {
    const formatVal = reg.test(value) ? value : defaultVal[name]
    setCssValue(name, formatVal)
  }
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
