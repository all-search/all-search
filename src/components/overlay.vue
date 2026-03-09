<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

let mouseDownTarget = false
let mouseUpTarget = false

const onMaskClick = (e: MouseEvent) => {
  if (mouseDownTarget && mouseUpTarget) {
    emit('click', e)
  }
  mouseDownTarget = mouseUpTarget = false
}

const onMouseDown = (e: MouseEvent) => {
  mouseDownTarget = e.target === e.currentTarget
}

const onMouseUp = (e: MouseEvent) => {
  mouseUpTarget = e.target === e.currentTarget
}
</script>

<template>
  <div class="as-overlay"
       @mousedown="onMouseDown"
       @mouseup="onMouseUp"
       @click="onMaskClick">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@use "../assets/common" as *;

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
}
</style>
