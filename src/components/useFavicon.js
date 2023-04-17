import useConfig from './useConfig'

const favicon = useConfig({
  name: 'favicon',
  defaultVal: 1,
  reg: /[1|2]/
})

export default function useFavicon () {
  return {
    favicon
  }
}


