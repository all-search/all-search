<template>
  <div class="hover-button"
       :class="{hide: show}"
       @mouseenter="handleMouseEnter"
       @click="handleClick">
    All Search
  </div>
</template>

<script>
import { watch } from 'vue'
import { isMobile } from '../util/index'
import useScroll from '../util/useScroll'

export default {
  name: 'hover-button',
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  setup (props, ctx) {
    const useClick = isMobile()
    const handleMouseEnter = () => {
      if (!useClick) {
        ctx.emit('change', true)
      }
    }
    const handleClick = () => {
      if (useClick) {
        ctx.emit('change', true)
      }
    }
    const { direction } = useScroll()
    watch(direction, value => {
      if (props.show && value === 'top') {
        ctx.emit('change', false)
      }
    })
    return {
      handleMouseEnter,
      handleClick
    }
  }
}
</script>

<style scoped>
.hover-button {
  position: fixed;
  z-index: 99999;
  top: 0;
  padding: 0 16px;
  height: 28px;
  line-height: 28px;
  font-weight: 600;
  font-size: 17px;
  color: var(--as-primary-color);
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  border: 1px var(--as-border-color) solid;
  left: 50%;
  transition: transform 0.2s;
  transform: translateY(0) translateX(-50%);
  opacity: 0.6;
}

.hover-button.hide {
  transition: transform 0.2s;
  transform: translateY(-100%) translateX(-50%);
}
</style>
