import { reactive, ref, watch } from 'vue'
import { getSession, setSession } from '../util'

const session = getSession('align')
const list = new Map([
  ['flex-start', '开始'],
  ['center', '居中'],
  ['flex-end', '末尾']
])
const formatVal = val => {
  const has = list.has(val)
  if (has) {
    return val
  }
  return 'flex-start'
}
const align = ref(formatVal(session))
const alignList = reactive(list)
watch(align, (value) => {
  setSession('align', formatVal(value))
})

export default function useAlign () {
  return {
    alignList,
    align
  }
}
