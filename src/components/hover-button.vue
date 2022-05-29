<template>
  <div class="hover-button"
       :class="{hide: !show}"
       @mouseenter="handleMouseEnter"
       @click="handleClick">
    All Search
  </div>
</template>

<script>
import { isMobile } from '../util/index'

export default {
  name: 'hover-button',
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  setup (props, context) {
    const useClick = isMobile()
    const handleMouseEnter = () => {
      if (!useClick) {
        context.emit('show', true)
      }
    }
    const handleClick = () => {
      if (useClick) {
        context.emit('show', true)
      }
    }
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
    padding: 0px 16px;
    height: 28px;
    line-height: 28px;
    font-weight: 600;
    font-size: 17px;
    color: var(--as-primary-color);
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    border: 1px var(--as-border-color) solid;
    left: 50%;
    transition: transform 0.38s;
    transform: translateY(0) translateX(-50%);
  }

  .hover-button.hide {
    transform: translateY(-100%) translateX(-50%);
  }
</style>
