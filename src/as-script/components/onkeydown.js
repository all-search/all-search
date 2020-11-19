import { onMounted, onUnmounted, ref } from 'vue'

export function onKeyDown () {
  const visible = ref(false)

  onMounted(() => {
    document.onkeydown = (e) => {
      // const ctrlKey = e.ctrlKey || e.metaKey
      if (e.altKey && e.key === 'a') {
        visible.value = !visible.value
      }
      // e.preventDefault()
      // return false
    }
  })

  onUnmounted(() => {
    document.onkeydown = null
  })

  return { visible }
}
