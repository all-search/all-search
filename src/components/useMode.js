import { computed } from 'vue'
import useConfig from './useConfig'

const value = useConfig({
  name: 'mode',
  defaultVal: 'top',
  reg: /^(top|bottom|right|left)$/
})

const obj = {
  'top': 'horizontal',
  'bottom': 'horizontal',
  'left': 'vertical',
  'right': 'vertical'
}

export default function useMode () {
  return {
    value,
    direction: computed(() => obj[value.value])
  }
}


