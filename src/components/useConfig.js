import { ref, computed } from 'vue'
import { getStorage, setStorage } from '../util/storage'

const isDef = val => val !== undefined && val !== null

async function init (name, defaultVal, reg = '') {
  try {
    const session = await getStorage(name)
    if (isDef(session) && reg && reg.test(session)) {
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
  }
  const valRef = ref(val)
  init(name, defaultVal, reg).then(val => {
    valRef.value = val
  }).catch(() => {
    if (isDef(defaultVal)) {
      valRef.value = defaultVal
    }
  })
  return computed({
    get: () => valRef.value,
    set: val => {
      valRef.value = val
      setStorage(name, isDef(val) ? val : defaultVal)
    }
  })
}

