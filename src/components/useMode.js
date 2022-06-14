import { ref, computed } from 'vue'
import { getSession, setSession } from '../util/index'

const session = getSession('mode')

const getMode = val => {
  if (!['vertical', 'horizontal'].includes(val)) {
    return 'horizontal'
  }
  return val
}

const modeRef = ref(getMode(session))

const mode = computed({
  get: () => modeRef.value,
  set: val => {
    modeRef.value = val
    setSession('mode', getMode(val))
  }
})

export default function useMode () {
  return {
    mode
  }
}


