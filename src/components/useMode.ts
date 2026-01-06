import { computed, ComputedRef, WritableComputedRef } from 'vue'
import useConfig from './useConfig'

export type Mode = 'top' | 'bottom' | 'right' | 'left'
export type Direction = 'horizontal' | 'vertical'

const value = useConfig({
  name: 'mode',
  defaultVal: 'top',
  reg: /^(top|bottom|right|left)$/
}) as WritableComputedRef<Mode>

const obj: Record<Mode, Direction> = {
  'top': 'horizontal',
  'bottom': 'horizontal',
  'left': 'vertical',
  'right': 'vertical'
}

export default function useMode (): {
  value: WritableComputedRef<Mode>;
  direction: ComputedRef<Direction>;
} {
  return {
    value,
    direction: computed(() => obj[value.value] || 'horizontal')
  }
}
