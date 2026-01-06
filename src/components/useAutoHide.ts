import { watch } from 'vue'
import useScroll from '../util/useScroll'
import useSwitchShow from './useSwitchShow'

/**
 * 自动隐藏 Hook
 */
export default function useAutoHide (): void {
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
