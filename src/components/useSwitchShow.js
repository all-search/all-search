import useConfig from './useConfig'
import { reactive, watch } from 'vue'
import useScroll from '../util/useScroll'

const options = reactive(new Map([
  [false, '关闭'],
  ['top', '向上'],
  ['bottom', '向下'],
  ['all', '滚动']
]))

const show = useConfig({
  name: 'switchShow',
  defaultVal: true,
  initVal: false
})

const scrollHide = useConfig({
  name: 'scrollHide',
  defaultVal: false,
  reg: /[false|top|bottom|all]/
})

const { direction } = useScroll(100)

watch([direction, scrollHide], ([newDirection, newScrollHide]) => {
  if (
    (show.value && newScrollHide) &&
    (newDirection === newScrollHide || newScrollHide === 'all')
  ) {
    show.value = false
  }
})

export default function useSwitchShow () {
  return {
    show,
    scrollHide,
    options
  }
}


