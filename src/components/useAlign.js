import { reactive, ref, computed } from 'vue'
import { getSession, setSession } from '../util/index'

const NAME = 'align'
const session = getSession(NAME)
const list = new Map([
  ['flex-start', '开始'],
  ['center', '居中'],
  ['flex-end', '末尾']
])
const getVal = val => {
  if (list.has(val)) {
    return val
  }
  return 'flex-start'
}
const alignRef = ref(getVal(session))
const alignList = reactive(list)
const align = computed({
  get: () => alignRef.value,
  set: val => {
    alignRef.value = val
    setSession(NAME, getVal(val))
  }
})

export default function useAlign () {
  return {
    alignList,
    align
  }
}
