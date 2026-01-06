import { computed, ComputedRef, WritableComputedRef } from 'vue'
import useConfig from './useConfig'

const value = useConfig({
  name: 'mode',
  defaultVal: 'top',
  reg: /^(top|bottom|right|left)$/
})

const obj: Record<string, string> = {
  'top': 'horizontal',
  'bottom': 'horizontal',
  'left': 'vertical',
  'right': 'vertical'
}

export default function useMode (): {
  value: WritableComputedRef<string>;
  direction: ComputedRef<string>;
} {
  return {
    value,
    direction: computed(() => obj[value.value] || 'horizontal')
  }
}
