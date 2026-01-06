import { unref, watch, onUnmounted, Ref } from 'vue'

/**
 * 监听 Tap 事件（移动端点击优化）
 * @param target 目标元素或 Ref
 * @param callback 触发回调
 */
export const onTap = (target: Ref<HTMLElement | null> | HTMLElement, callback: (event: TouchEvent) => void): void => {
  let tapStartTime = 0
  let tapEndTime = 0
  const tapTime = 200 // tap 等待时间，在此事件下松开可触发方法
  let tapStartClientX = 0
  let tapStartClientY = 0
  let tapEndClientX = 0
  let tapEndClientY = 0
  const tapLimit = 15 // 水平或垂直方向移动超过 15px 判定为取消
  let cancelClick = false

  let hasListener = false

  function handleTouchStart (event: TouchEvent) {
    tapStartTime = event.timeStamp
    const touch = event.changedTouches[0]
    tapStartClientX = touch.clientX
    tapStartClientY = touch.clientY
    cancelClick = false
  }

  function handleTouchMove (event: TouchEvent) {
    const touch = event.changedTouches[0]
    tapEndClientX = touch.clientX
    tapEndClientY = touch.clientY
    if ((Math.abs(tapEndClientX - tapStartClientX) > tapLimit) || (Math.abs(tapEndClientY - tapStartClientY) > tapLimit)) {
      cancelClick = true
    }
  }

  function handleTouchEnd (event: TouchEvent) {
    tapEndTime = event.timeStamp
    if (!cancelClick && (tapEndTime - tapStartTime) <= tapTime) {
      callback(event)
    }
  }

  watch(() => unref(target), el => {
    if (el && !hasListener) {
      el.addEventListener('touchstart', handleTouchStart as any)
      el.addEventListener('touchmove', handleTouchMove as any)
      el.addEventListener('touchend', handleTouchEnd as any)
      hasListener = true
    }
  }, { immediate: true })

  onUnmounted(() => {
    const el = unref(target)
    if (el) {
      el.removeEventListener('touchstart', handleTouchStart as any)
      el.removeEventListener('touchmove', handleTouchMove as any)
      el.removeEventListener('touchend', handleTouchEnd as any)
    }
  })
}
