import useConfig from './useConfig'
import { watchEffect } from 'vue'

const reg = /^#([a-fA-F\d]{6}|[a-fA-F\d]{3})$/

function setCssValue (name, value, defaultVal) {
  const el = document.getElementById('all-search')
  const formatVal = reg.test(value) ? value : defaultVal
  el.style.setProperty(`--as-${name}`, formatVal)
}

const primaryColor = useConfig({
  name: 'primaryColor',
  defaultVal: '#1890ff',
  reg
})

const bgColor = useConfig({
  name: 'bgColor',
  defaultVal: '#ffffff',
  reg
})

const primaryTextColor = useConfig({
  name: 'primaryTextColor',
  defaultVal: '#606266',
  reg
})

export default function useColor () {
  watchEffect(() => {
    setCssValue('primary-color', primaryColor.value, '#1890ff')
  })
  watchEffect(() => {
    setCssValue('bg-color', bgColor.value, '#ffffff')
  })
  watchEffect(() => {
    setCssValue('primary-text-color', primaryTextColor.value, '#606266')
  })
  return {
    primaryColor,
    bgColor,
    primaryTextColor
  }
}
