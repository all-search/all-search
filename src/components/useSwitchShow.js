import { reactive, computed } from 'vue'
import { getSession, setSession } from '../util/index'

const defaultOpt = {
  show: true,
  // scrollBottomHide: false,
  // scrollTopHide: false
}

const session = getSession('switchShow') || defaultOpt

const getOpt = val => {
  return Object.assign({}, defaultOpt, {
    show: !!val.show,
    // scrollBottomHide: !!val.scrollBottomHide,
    // scrollTopHide: !!val.scrollTopHide
  })
}

let data = reactive(getOpt(session))

const show = computed({
  get: ()=> data.show,
  set: val => {
    data.show = val
    setSession('switchShow', data)
  }
})

export default function useSwitchShow () {
  return {
    show
  }
}


