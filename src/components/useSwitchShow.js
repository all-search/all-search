import useConfig from './useConfig'
import { reactive } from 'vue'

const options = reactive(new Map([
  [false, '关闭'],
  ['top', '向上'],
  ['bottom', '向下'],
  ['all', '滚动']
]))

const show = useConfig({
  name: 'switchShow',
  defaultVal: true
})

const scrollHide = useConfig({
  name: 'scrollHide',
  defaultVal: false,
  reg: /[false|top|bottom|all]/
})

export default function useSwitchShow () {
  return {
    show,
    scrollHide,
    options
  }
}


