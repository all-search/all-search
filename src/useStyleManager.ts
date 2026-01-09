import { watch, watchEffect, toValue, Ref, ComputedRef, WritableComputedRef } from 'vue'
import { initSpecialStyle } from './util/addSpecialStyle'
import { addCustomStyle, syncHostLayout } from './util/initStyle'
import { site } from './config/siteInfo'
import { Direction, Mode } from './components/useMode'
import { SHOW_STATUS, ShowStatus } from './components/useSwitchShow'
import { useFullScreen } from './util/fullScreen'

export function useStyleManager(
  mode: WritableComputedRef<Mode> | Ref<Mode> | ComputedRef<Mode>,
  direction: ComputedRef<Direction>,
  show: Ref<ShowStatus>
) {
  let isInit = false
  const { isFullScreen } = useFullScreen()

  /**
   * 初始化样式适配
   */
  const init = (currentSite: typeof site) => {
    if (isInit || currentSite.disabled) {
      return
    }
    initSpecialStyle()
    addCustomStyle(toValue(mode), currentSite as any)
    isInit = true
  }

  // 监听站点变化进行初始化
  watch(site, newSite => {
    init(newSite)
  }, { immediate: true })

  // 监听各种状态，合成最终的宿主布局可见性
  watchEffect(() => {
    // 只有在：非隐身、非禁用、非全屏 且 用户设置为显示(1) 时，才物理占据页面空间
    const isLayoutVisible = !site.invisible &&
      !site.disabled &&
      !toValue(isFullScreen) &&
      toValue(show) === SHOW_STATUS.VISIBLE
    syncHostLayout(toValue(mode), toValue(direction), isLayoutVisible)
  })

  // 模式变化时重新应用自定义样式
  watch(mode, (newMode) => {
    addCustomStyle(newMode, site as any)
  })

  return {
    reApplyCustomStyle: () => addCustomStyle(toValue(mode), site as any)
  }
}
