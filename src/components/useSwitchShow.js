import useConfig from './useConfig'
import { reactive, watch } from 'vue'
import useScroll from '../util/useScroll'

const options = reactive(new Map([
  ['none', '关闭'],
  ['top', '向上'],
  ['bottom', '向下'],
  ['all', '滚动']
]))

const show = useConfig({
  name: 'switchShow',
  defaultVal: 1,
  initVal: 2,
  reg: /[1|2]/
})

const scrollHide = useConfig({
  name: 'scrollHide',
  defaultVal: 'none',
  reg: /[none|top|bottom|all]/
})

const { direction } = useScroll(100)

watch([direction, scrollHide], ([newDirection, newScrollHide]) => {
  if (
    (show.value && newScrollHide !== 'none') &&
    (newDirection === newScrollHide || newScrollHide === 'all')
  ) {
    show.value = 2
  }
})

export default function useSwitchShow () {
  return {
    show,
    scrollHide,
    options
  }
}


