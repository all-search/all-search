import { ref, computed } from 'vue'
import { getStorage, setStorage } from '../util/storage'

const isDef = val => val !== undefined && val !== null

async function init (name, defaultVal, reg = '') {
  try {
    const session = await getStorage(name)
    if (reg && reg.test(session)) {
      return session
    } else if (isDef(session)) {
      return session
    } else {
      return defaultVal
    }
  } catch (e) {
    return defaultVal
  }
}


export default function useConfig (params) {
  const { name, initVal, defaultVal, reg } = params
  let val = ''
  if (isDef(initVal)) {
    val = initVal
  } else if (isDef(defaultVal)) {
    val = defaultVal
  }
  const valRef = ref(val)
  init(name, defaultVal, reg).then(val => {
    valRef.value = val
  })
  return computed({
    get: () => valRef.value,
    set: val => {
      valRef.value = val
      setStorage(name, isDef(val) ? val : defaultVal)
    }
  })
}

