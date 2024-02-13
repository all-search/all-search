import { unref, watch, onUnmounted } from 'vue'

export const onTap = (target, callback) => {
  let tapStartTime = 0
  let tapEndTime = 0
  const tapTime = 200 //tap等待时间，在此事件下松开可触发方法
  let tapStartClientX = 0
  let tapStartClientY = 0
  let tapEndClientX = 0
  let tapEndClientY = 0
  const tapLimit = 15 //水平或垂直方向移动超过15px测判定为取消（根据chrome浏览器默认的判断取消点击的移动量)
  let cancelClick = false

  let hasListener = false

  function handleTouchStart (event) {
    tapStartTime = event.timeStamp
    const touch = event.changedTouches[0]
    tapStartClientX = touch.clientX
    tapStartClientY = touch.clientY
    cancelClick = false
  }

  function handleTouchMove (event) {
    const touch = event.changedTouches[0]
    tapEndClientX = touch.clientX
    tapEndClientY = touch.clientY
    if ((Math.abs(tapEndClientX - tapStartClientX) > tapLimit) || (Math.abs(tapEndClientY - tapStartClientY) > tapLimit)) {
      cancelClick = true
    }
  }

  function handleTouchEnd (event) {
    tapEndTime = event.timeStamp
    if (!cancelClick && (tapEndTime - tapStartTime) <= tapTime) {
      callback(event)
    }
  }

  watch(target, el => {
    if (el && !hasListener) {
      el.addEventListener('touchstart', handleTouchStart)
      el.addEventListener('touchmove', handleTouchMove)
      el.addEventListener('touchend', handleTouchEnd)
      hasListener = true
    }
  })

  onUnmounted(() => {
    const el = unref(target)
    if (el) {
      el.removeEventListener('touchstart', handleTouchStart)
      el.removeEventListener('touchmove', handleTouchMove)
      el.removeEventListener('touchend', handleTouchEnd)
    }
  })
}

