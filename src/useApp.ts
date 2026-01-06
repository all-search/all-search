import { computed, ref, unref, toValue } from 'vue'
import { site } from './config/siteInfo'
import { useFullScreen } from './util/fullScreen'
import useMode from './components/useMode'
import useSwitchShow from './components/useSwitchShow'
import useAutoHide from './components/useAutoHide'
import useToolbar from './components/useToolbar'
import { useStyleManager } from './useStyleManager'

export function useApp () {
  const { isFullScreen } = useFullScreen()
  const { value: mode, direction } = useMode()
  const { show } = useSwitchShow()
  const { visible: toolbarVisible } = useToolbar('tm')

  // 自动化隐藏逻辑
  useAutoHide()

  // 样式管理解耦
  useStyleManager(mode, direction, show)

  const classList = computed(() => ([
    `as-${toValue(direction)}`,
    `as-${toValue(mode)}`,
    toValue(show) === 1 ? 'as-show' : 'as-hide'
  ]))

  const visible = computed(() => {
    return !site.invisible && !unref(isFullScreen)
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
