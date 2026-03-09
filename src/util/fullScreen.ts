import { ref, onUnmounted, Ref } from 'vue'

const isFullScreenRef = ref(false)

/**
 * 开启全屏
 */
export function openFullScreen (el: any): Promise<void> | void {
  if (el.requestFullscreen) {
    return el.requestFullscreen()
  } else if (el.mozRequestFullScreen) {
    /* Firefox */
    return el.mozRequestFullScreen()
  } else if (el.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    return el.webkitRequestFullscreen()
  } else if (el.msRequestFullscreen) {
    /* IE/Edge */
    return el.msRequestFullscreen()
  }
}

/**
 * 退出全屏
 */
export function exitFullScreen (): Promise<void> | void {
  const doc = document as any
  if (doc.exitFullscreen) {
    return doc.exitFullscreen()
  } else if (doc.mozExitFullscreen) {
    /* Firefox */
    return doc.mozExitFullscreen()
  } else if (doc.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    return doc.webkitExitFullscreen()
  } else if (doc.msExitFullscreen) {
    /* IE/Edge */
    return doc.msExitFullscreen()
  }
}

/**
 * 判断是否处于全屏状态
 */
export function isFullScreen (): boolean {
  const doc = document as any
  return (
    doc.fullscreen ||
    doc.webkitIsFullScreen ||
    doc.mozFullScreen ||
    doc.msFullscreenElement
  )
}

/**
 * 全屏状态变化监听
 */
export function onFullScreenChange (handler: () => void): () => void {
  const handleResize = function () {
    if (!isFullScreen()) {
      handler()
    }
  }
  document.addEventListener('fullscreenchange', handler)
  document.addEventListener('webkitfullscreenchange', handler)
  document.addEventListener('mozfullscreenchange', handler)
  document.addEventListener('MSFullscreenChange', handler)
  document.addEventListener('resize', handleResize)

  return () => {
    document.removeEventListener('fullscreenchange', handler)
    document.removeEventListener('webkitfullscreenchange', handler)
    document.removeEventListener('mozfullscreenchange', handler)
    document.removeEventListener('MSFullscreenChange', handler)
    document.removeEventListener('resize', handleResize)
  }
}

/**
 * 全屏状态 Hook
 */
export function useFullScreen (): { isFullScreen: Ref<boolean> } {
  const removeListener = onFullScreenChange(() => {
    isFullScreenRef.value = isFullScreen()
  })
  onUnmounted(() => {
    removeListener()
  })
  return {
    isFullScreen: isFullScreenRef
  }
}
