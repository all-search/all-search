import { computed, ComputedRef, WritableComputedRef } from 'vue'
import useConfig from './useConfig'
import { getAsRoot } from '../util'

export type Mode = 'top' | 'bottom' | 'right' | 'left'
export type Direction = 'horizontal' | 'vertical'

const moveAnchor = (newMode: Mode) => {
  const anchor = getAsRoot()
  if (!anchor) return

  if (newMode === 'bottom') {
    if (document.documentElement.lastElementChild !== anchor) {
      document.documentElement.appendChild(anchor)
    }
  } else {
    if (document.body && document.body.previousElementSibling !== anchor) {
      document.documentElement.insertBefore(anchor, document.body)
    }
  }
}

const value = useConfig<Mode>({
  name: 'mode',
  defaultVal: 'top',
  reg: /^(top|bottom|right|left)$/,
  set: (newMode, next) => {
    moveAnchor(newMode)
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
