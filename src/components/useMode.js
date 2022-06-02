import { ref, watch } from 'vue'
import { getSession, setSession } from '../util/index'
const session = getSession('mode')

const getMode = val => {
  if (val !== 'vertical' && val !== 'horizontal') {
    return 'horizontal'
  }
  return val
}

const mode = ref(getMode(session))

watch(mode, (value) => {
  const formatVal = getMode(value)
  setSession('mode', formatVal)
})

export default function useMode () {
  return {
    mode
  }
}


