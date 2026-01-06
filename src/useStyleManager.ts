import { watch, watchEffect, toValue, Ref, ComputedRef } from 'vue'
import { initSpecialStyle } from './util/addSpecialStyle'
import { addCustomStyle, changeBodyStyle, protectStyle } from './util/initStyle'
import { site } from './config/siteInfo'
import { Direction, Mode } from './components/useMode'

export function useStyleManager(
  mode: WritableComputedRef<Mode> | Ref<Mode> | ComputedRef<Mode>,
  direction: ComputedRef<Direction>,
  show: Ref<number>
) {
  let isInit = false

  /**
   * 初始化样式保护与基础适配
   */
  const init = (currentSite: typeof site) => {
    if (isInit || currentSite.disabled) {
      return
    }
    protectStyle()
    initSpecialStyle()
    addCustomStyle(toValue(mode), currentSite as any)
    isInit = true
  }

  // 监听站点变化进行初始化
  watch(site, newSite => {
    init(newSite)
  }, { immediate: true })

  // 监听模式和显示状态，同步根节点（模拟Body）样式
  watchEffect(() => {
    const isRemove = site.invisible || site.disabled || toValue(show) === 2
    changeBodyStyle(toValue(mode), toValue(direction), isRemove)
  })

  // 模式变化时重新应用自定义样式
  watch(mode, (newMode) => {
    addCustomStyle(newMode, site as any)
  })

  return {
    reApplyCustomStyle: () => addCustomStyle(toValue(mode), site as any)
  }
}

// 补全类型导入（如果需要）
import { WritableComputedRef } from 'vue'
