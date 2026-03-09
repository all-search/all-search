import { ref, computed, WritableComputedRef, Ref, nextTick } from 'vue'
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

interface NextOptions<T> {
  value?: T;
  rollback?: boolean;
}

interface UseConfigParams<T> {
  name: string;
  initVal?: T;
  defaultVal: T;
  reg?: RegExp;
  get?: (val: T) => T;
  set?: (val: T, next: (options?: NextOptions<T>) => void) => void;
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
    get: () => params.get ? params.get(valRef.value) : valRef.value,
    set: (v: T) => {
      const next = (options?: NextOptions<T>) => {
        if (options?.rollback === true) {
          const oldVal = valRef.value
          // 通过先清空再恢复，强制触发 Vue 的响应式更新以回滚 UI
          valRef.value = undefined as any
          nextTick(() => {
            valRef.value = oldVal
          })
          return
        }

        const finalVal = (options && 'value' in options) ? options.value : v
        valRef.value = finalVal as T
        setStorage<T>(name, isDef(finalVal) ? (finalVal as T) : defaultVal)
      }

      if (params.set) {
        params.set(v, next)
      } else {
        next()
      }
    }
  })
}
