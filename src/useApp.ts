import { computed, watch, ref, unref, toValue, watchEffect } from 'vue'
import { initSpecialStyle } from './util/addSpecialStyle'
import { addCustomStyle, changeBodyStyle, protectStyle } from './util/initStyle'
import { site } from './config/siteInfo'
import { useFullScreen } from './util/fullScreen'
import useMode from './components/useMode'
import useSwitchShow from './components/useSwitchShow'
import useAutoHide from './components/useAutoHide'
import useToolbar from './components/useToolbar'

export function useApp () {
  const { isFullScreen } = useFullScreen()
  const { value: mode, direction } = useMode()
  const { show } = useSwitchShow()
  useAutoHide()
  const { visible: toolbarVisible } = useToolbar('tm')

  const classList = computed(() => ([
    `as-${toValue(direction)}`,
    `as-${toValue(mode)}`,
    toValue(show) === 1 ? 'as-show' : 'as-hide'
  ]))

  const visible = computed(() => {
    return !site.invisible && !unref(isFullScreen)
  })

  // 同步 Body 样式状态
  watchEffect(() => {
    const remove = site.invisible || site.disabled || toValue(show) === 2
    changeBodyStyle(toValue(mode), toValue(direction), remove)
  })

  let isInit = false

  /**
   * 初始化样式保护与站点适配
   */
  function init (currentSite: typeof site) {
    if (isInit || currentSite.disabled) {
      return
    }
    protectStyle()
    initSpecialStyle()
    addCustomStyle(toValue(mode), currentSite as any)
    isInit = true
  }

  watch(site, newSite => {
    init(newSite)
  }, {
    immediate: true
  })

  // 搜索弹窗逻辑
  const dialogVisible = ref(false)
  const keyword = ref('')

  function openDialog (text: string) {
    keyword.value = text
    dialogVisible.value = true
  }

  const disabled = computed(() => site.disabled)

  return {
    disabled,
    mode,
    classList,
    visible,
    dialogVisible,
    openDialog,
    keyword,
    toolbarVisible,
    direction
  }
}
