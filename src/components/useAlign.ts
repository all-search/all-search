import useConfig from './useConfig'
import { WritableComputedRef } from 'vue'

const value = useConfig({
  name: 'align',
  defaultVal: 'flex-start',
  reg: /^(flex-start|center|flex-end)$/
})

const list = new Map<string, string>([
  ['flex-start', '开始'],
  ['center', '居中'],
  ['flex-end', '末尾']
])

export default function useAlign (): {
  list: Map<string, string>;
  value: WritableComputedRef<string>;
} {
  return {
    list,
    value
  }
}
