import { computed, ComputedRef, WritableComputedRef } from 'vue'
import useConfig from './useConfig'
import { LayoutService } from '../util/layoutService'
import type { MountMode as Mode } from '../util/mount'

export type { Mode }
export type Direction = 'horizontal' | 'vertical'

const value = useConfig<Mode>({
  name: 'mode',
  defaultVal: 'top',
  reg: /^(top|bottom|right|left)$/,
  set: (newMode, next) => {
    LayoutService.refresh(newMode)
    next()
  }
})

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
