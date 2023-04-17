import useConfig from './useConfig'

const value = useConfig({
  name: 'align',
  defaultVal: 'flex-start',
  reg: /[flex\-start|center|flex\-end]/
})


const list = new Map([
  ['flex-start', '开始'],
  ['center', '居中'],
  ['flex-end', '末尾']
])

export default function useAlign () {
  return {
    list,
    value
  }
}
