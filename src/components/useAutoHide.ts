import { watch, WatchStopHandle } from 'vue'
import useScroll from '../util/useScroll'
import useSwitchShow, { SHOW_STATUS } from './useSwitchShow'

/**
 * 自动隐藏 Hook
 */
export default function useAutoHide (): () => void {
  const { direction } = useScroll(100)
  const { show, scrollHide } = useSwitchShow()

  const stop: WatchStopHandle = watch([direction, scrollHide], ([newDirection, newScrollHide]) => {
    if (
      show.value === SHOW_STATUS.VISIBLE &&
      newScrollHide !== 'none' &&
      (newDirection === newScrollHide || newScrollHide === 'all')
    ) {
      show.value = SHOW_STATUS.COLLAPSED
    }
  })

  return () => {
    stop()
  }
}
