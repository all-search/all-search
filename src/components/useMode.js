import useConfig from './useConfig'

const value = useConfig({
  name: 'mode',
  defaultVal: 'horizontal',
  reg: /[vertical|horizontal]/
})

export default function useMode () {
  return {
    value
  }
}


