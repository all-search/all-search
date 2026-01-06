import useConfig from './useConfig'
import { reactive, WritableComputedRef } from 'vue'

const options = reactive(new Map<string, string>([
  ['none', '关闭'],
  ['top', '向上'],
  ['bottom', '向下'],
  ['all', '滚动']
]))

const show = useConfig({
  name: 'switchShow',
  defaultVal: 1,
  initVal: 2,
  reg: /^[12]$/
})

const scrollHide = useConfig({
  name: 'scrollHide',
  defaultVal: 'none',
  reg: /^(none|top|bottom|all)$/
})

export default function useSwitchShow (): {
  show: WritableComputedRef<number>;
  scrollHide: WritableComputedRef<string>;
  options: Map<string, string>;
} {
  return {
    show,
    scrollHide,
    options
  }
}
