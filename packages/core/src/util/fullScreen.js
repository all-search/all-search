import { ref, onUnmounted } from 'vue'

const isFullScreenRef = ref(false)

export function openFullScreen (el) {
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

export function exitFullScreen () {
  if (document.exitFullscreen) {
    return document.exitFullscreen()
  } else if (document.mozExitFullscreen) {
    /* Firefox */
    return document.mozExitFullscreen()
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    return document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    return document.msExitFullscreen()
  }
}

export function isFullScreen () {
  return (
    document.fullscreen ||
    document.webkitIsFullScreen ||
    document.mozFullScreen ||
    document.msFullscreenElement
  )
}

export function onFullScreenChange (handler) {
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

export function useFullScreen () {
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
