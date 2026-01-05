import { watch } from 'vue'
import useScroll from '../util/useScroll'
import useSwitchShow from './useSwitchShow'

export default function useAutoHide () {
  const { direction } = useScroll(100)
  const { show, scrollHide } = useSwitchShow()

  watch([direction, scrollHide], ([newDirection, newScrollHide]) => {
    if (
      (show.value && newScrollHide !== 'none') &&
      (newDirection === newScrollHide || newScrollHide === 'all')
    ) {
      show.value = 2
    }
  })
}
