import { onUnmounted, watchEffect, toValue, Ref, ComputedRef, WritableComputedRef } from 'vue'
import { initSpecialStyle, disconnectSpecialStyle } from './util/addSpecialStyle'
import { addCustomStyle, syncHostLayout, isGeneratedStyleAlive } from './util/initStyle'
import { site } from './config/siteInfo'
import { Direction, Mode } from './components/useMode'
import { SHOW_STATUS, ShowStatus } from './components/useSwitchShow'
import { useFullScreen } from './util/fullScreen'

export function useStyleManager(
  mode: WritableComputedRef<Mode> | Ref<Mode> | ComputedRef<Mode>,
  direction: ComputedRef<Direction>,
  show: Ref<ShowStatus>
) {
  const { isFullScreen } = useFullScreen()
  /** 运行时采样是否已启动，和站点/可见性一起变化，避免重复 init 或残留 */
  let samplingActive = false

  const syncSampling = (shouldSample: boolean) => {
    if (shouldSample && !samplingActive) {
      initSpecialStyle()
      samplingActive = true
    } else if (!shouldSample && samplingActive) {
      disconnectSpecialStyle()
      samplingActive = false
    }
  }

  /**
   * 统一的状态同步入口。
   *
   * 这里刻意不用 `isInit` 之类的「只跑一次」开关：宿主是 SPA，路由切换后
   * `site` 会变成 disabled，注入过的样式必须跟着撤掉，否则会残留在新页面上。
   */
  watchEffect(() => {
    const currentSite = site
    const currentMode = toValue(mode)

    // 只有在：非隐身、非禁用、非全屏 且 用户设置为显示(1) 时，才物理占据页面空间
    const isLayoutVisible = !currentSite.invisible &&
      !currentSite.disabled &&
      !toValue(isFullScreen) &&
      toValue(show) === SHOW_STATUS.VISIBLE

    syncHostLayout(currentMode, toValue(direction), isLayoutVisible)

    // 条不可见时站点头部不该再让位：撤掉静态规则与已做的内联调整
    addCustomStyle(currentMode, currentSite as any, !isLayoutVisible || currentSite.disabled)

    // 有构建时扫描规则就不跑运行时采样：静态 CSS 已经处理了压在条上的固定元素，
    // 两者同时生效会把同一元素推两次（CSS 与内联样式都会命中）。
    // 但站点改版后规则可能全部失效（CSS 变空操作），这时必须退回采样兜底。
    const staticAlive = !currentSite.generatedStyle ||
      isGeneratedStyleAlive(String(currentSite.generatedStyle))
    syncSampling(isLayoutVisible && (!currentSite.generatedStyle || !staticAlive))
  })

  // 应用卸载（SPA 重新挂载 / 扩展重载）时回收监听并还原被调整过的元素
  onUnmounted(() => {
    disconnectSpecialStyle()
    samplingActive = false
  })

  return {
    reApplyCustomStyle: () => addCustomStyle(toValue(mode), site as any)
  }
}
