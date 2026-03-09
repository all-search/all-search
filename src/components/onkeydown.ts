import { onMounted, onUnmounted, ref, Ref } from 'vue'

/**
 * 按键监听 Hook
 */
export function onKeyDown (): { visible: Ref<boolean> } {
  const visible = ref(false)

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.altKey && e.key === 'a') {
      visible.value = !visible.value
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown)
  })

  return { visible }
}
