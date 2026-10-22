import { Ref, onBeforeUnmount, onMounted } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { ElMessageBox } from 'element-plus'

/**
 * 有未保存修改时的离开提醒：
 * - 关标签/刷新走 `beforeunload`
 * - 站内路由切换走路由守卫（确认框）
 */
export default function useUnsavedGuard (
  dirty: Ref<boolean>,
  message = '有未保存的修改，离开后会丢失，确定离开吗？'
) {
  function handleBeforeUnload (event: BeforeUnloadEvent) {
    if (!dirty.value) return
    event.preventDefault()
    event.returnValue = ''
  }

  onMounted(() => window.addEventListener('beforeunload', handleBeforeUnload))
  onBeforeUnmount(() => window.removeEventListener('beforeunload', handleBeforeUnload))

  onBeforeRouteLeave(() => {
    if (!dirty.value) return true
    return ElMessageBox.confirm(message, '未保存的修改', {
      confirmButtonText: '离开',
      cancelButtonText: '留下',
      type: 'warning'
    }).then(() => true).catch(() => false)
  })
}
