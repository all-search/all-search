import { ref, computed } from 'vue'
import { getStorage, setStorage } from '../util/storage'

async function initVal (name, defaultVal, reg = '') {
  try {
    const session = await getStorage(name)
    if (reg && reg.test(session)) {
      return session
    } else {
      return defaultVal
    }
  } catch (e) {
    return defaultVal
  }
}

const isDef = val => val !== undefined && val !== null

export default function useConfig (params) {
  const { name, defaultVal, reg } = params
  const valRef = ref(defaultVal || '')

  initVal(name, defaultVal, reg).then(val => {
    valRef.value = val
  })
  return computed({
    get: () => valRef.value,
    set: val => {
      setStorage(name, isDef(val) ? val : defaultVal).then(val => {
        valRef.value = val
      })
    }
  })
}

