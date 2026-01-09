import useConfig from './useConfig'
import { reactive, WritableComputedRef } from 'vue'

export const SHOW_STATUS = {
  VISIBLE: 1,
  COLLAPSED: 2
} as const

export type ShowStatus = typeof SHOW_STATUS[keyof typeof SHOW_STATUS]

const options = reactive(new Map<string, string>([
  ['none', '关闭'],
  ['top', '向上'],
  ['bottom', '向下'],
  ['all', '滚动']
]))

const show = useConfig<ShowStatus>({
  name: 'switchShow',
  defaultVal: SHOW_STATUS.VISIBLE,
  initVal: SHOW_STATUS.COLLAPSED,
  reg: /^[12]$/
})

const scrollHide = useConfig({
  name: 'scrollHide',
  defaultVal: 'none',
  reg: /^(none|top|bottom|all)$/
})

export default function useSwitchShow (): {
  show: WritableComputedRef<ShowStatus>;
  scrollHide: WritableComputedRef<string>;
  options: Map<string, string>;
} {
  return {
    show,
    scrollHide,
    options
  }
}
