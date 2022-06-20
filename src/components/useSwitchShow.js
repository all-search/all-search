import { reactive, computed } from 'vue'
import { getSession, setSession } from '../util/index'

const options = new Map([
  [false, '关闭'],
  ['top', '向上'],
  ['bottom', '向下'],
  ['all', '滚动']
])

const defaultOpt = {
  show: true,
  scrollHide: false
}

const session = getSession('switchShow') || defaultOpt

const getOpts = val => options.has(val) ? val : false

const getOpt = val => {
  return Object.assign({}, defaultOpt, {
    show: Boolean(val.show),
    scrollHide: getOpts(val.scrollHide)
  })
}

let data = reactive(getOpt(session))

const show = computed({
  get: () => data.show,
  set: val => {
    data.show = val
    setSession('switchShow', data)
  }
})

const scrollHide = computed({
  get: () => data.scrollHide,
  set: val => {
    data.scrollHide = val
    setSession('switchShow', data)
  }
})

export default function useSwitchShow () {
  return {
    show,
    scrollHide,
    options
  }
}


