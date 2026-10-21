import { onMounted, onUnmounted, ref, watch } from 'vue'
import {
  loadTheme,
  saveTheme,
  resolveTheme,
  onSystemThemeChange,
  ThemePreference
} from '../util/theme'

/**
 * 主题偏好（auto / light / dark）。
 *
 * `isDark` 是解析后的最终结果，调用方据此给容器加类：
 * - 配置页：`document.documentElement.classList.toggle('dark', isDark)`
 * - 菜单条：宿主元素加 `as-theme-dark`
 */
export function useTheme () {
  const preference = ref<ThemePreference>('auto')
  const isDark = ref(false)
  /** 用户主动切换后才写存储，避免初始化时把默认值覆盖回去 */
  let ready = false
  let dispose = () => {}

  const apply = () => {
    isDark.value = resolveTheme(preference.value) === 'dark'
  }

  onMounted(async () => {
    preference.value = await loadTheme()
    apply()
    ready = true
    dispose = onSystemThemeChange(() => {
      if (preference.value === 'auto') {
        apply()
      }
    })
  })

  watch(preference, async (value) => {
    apply()
    if (ready) {
      await saveTheme(value)
    }
  })

  onUnmounted(() => dispose())

  return { preference, isDark }
}
