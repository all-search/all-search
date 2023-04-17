import useConfig from './useConfig'

const toolbar = useConfig({
  name: 'showToolbar',
  defaultVal: 1,
  reg: /[1|2]/
})

export default function useToolbar () {
  return {
    toolbar
  }
}


