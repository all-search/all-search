import { ref, computed } from 'vue'
import { getSession, setSession } from '../util/index'

const name = 'favicon'
const session = getSession(name)

const getValue = val => {
  return val || 1
}

const valRef = ref(getValue(session))

const favicon = computed({
  get: () => valRef.value,
  set: val => {
    valRef.value = val
    setSession(name, getValue(val))
  }
})

export default function useFavicon () {
  return {
    favicon
  }
}


