import { ref, computed, WritableComputedRef, Ref } from 'vue'
import { getStorage, setStorage } from '../util/storage'

const isDef = (val: any) => val !== undefined && val !== null

async function init<T> (name: string, defaultVal: T, reg?: RegExp): Promise<T> {
  try {
    const session = await getStorage<T>(name)
    if (isDef(session) && reg && reg.test(String(session))) {
      return session as T
    } else {
      return (isDef(session) && !reg) ? session as T : defaultVal
    }
  } catch (e) {
    return defaultVal
  }
}

interface UseConfigParams<T> {
  name: string;
  initVal?: T;
  defaultVal: T;
  reg?: RegExp;
}

export default function useConfig<T> (params: UseConfigParams<T>): WritableComputedRef<T> {
  const { name, initVal, defaultVal, reg } = params
  const val = isDef(initVal) ? initVal : defaultVal
  const valRef = ref(val) as Ref<T>
  
  init<T>(name, defaultVal, reg).then(val => {
    valRef.value = val
  }).catch(() => {
    if (isDef(defaultVal)) {
      valRef.value = defaultVal
    }
  })

  return computed({
    get: () => valRef.value,
    set: (val: T) => {
      valRef.value = val
      setStorage<T>(name, isDef(val) ? val : defaultVal)
    }
  })
}
