<template>
  <div
    class="as-setting"
    @click="open">
    设置
  </div>
  <teleport to="html">
    <div class="as-overlay"
         v-show="visible"
         @mousedown="onMouseDown"
         @mouseup="onMouseUp"
         @click="onMaskClick">
      <div class="as-side-bar">
        <header></header>
        <section></section>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'side-bar',
  setup () {


    const visible = ref(false)
    const open = () => {
      visible.value = true
    }
    // const close = () => {
    //   visible.value = false
    // }
    let mousedownTarget = false
    let mouseupTarget = false
    const onMaskClick = (e) => {
      if (mousedownTarget && mouseupTarget) {
        visible.value = false
      }
      mousedownTarget = mouseupTarget = false
    }
    const onMouseDown = (e) => {
      mousedownTarget = e.target === e.currentTarget
    }
    const onMouseUp = (e) => {
      mouseupTarget = e.target === e.currentTarget
    }
    return {
      visible,
      open,
      onMouseDown,
      onMouseUp,
      onMaskClick
    }
  }
}

</script>

<style lang="scss">
  @import "../../assets/common.scss";

  .as-overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: $overlayZIndex;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    overflow: auto;
  }

  .as-side-bar {
    width: 30%;
    right: 0;
    height: 100%;
    top: 0;
    bottom: 0;
    position: absolute;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 10px -5px rgba(0, 0, 0, .2), 0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12);
    overflow: hidden;
  }
</style>
