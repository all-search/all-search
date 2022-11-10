<template>
  <div class="as-overlay"
       @mousedown="onMouseDown"
       @mouseup="onMouseUp"
       @click="onMaskClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'overlay',
  setup (props, { emit }) {
    let mouseDownTarget = false
    let mouseUpTarget = false
    const onMaskClick = (e) => {
      if (mouseDownTarget && mouseUpTarget) {
        emit('click', e)
      }
      mouseDownTarget = mouseUpTarget = false
    }
    const onMouseDown = (e) => {
      mouseDownTarget = e.target === e.currentTarget
    }
    const onMouseUp = (e) => {
      mouseUpTarget = e.target === e.currentTarget
    }

    return {
      onMouseDown,
      onMouseUp,
      onMaskClick
    }
  }
}
</script>

<style lang="scss">
@import "../assets/common.scss";

.as-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: $overlayZIndex;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  overflow: auto;
  backdrop-filter: saturate(180%) blur(3px);
}
</style>
