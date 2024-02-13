<template>
  <div class="as-hover-btn"
       :class="className"
       @mouseenter="handleMouseEnter"
       @click="handleClick">
    All Search
  </div>
</template>

<script>
import { computed, toValue } from 'vue'
import { isMobile } from '../util/index'
import useSwitchShow from './useSwitchShow'
import useMode from '../components/useMode'

export default {
  name: 'hover-btn',
  setup () {
    const { show } = useSwitchShow()
    const isMobileVal = isMobile()
    const handleMouseEnter = () => {
      if (!isMobileVal) {
        show.value = true
      }
    }
    const handleClick = () => {
      if (isMobileVal) {
        show.value = true
      }
    }

    const { value: mode } = useMode()
    const className = computed(() => ({
      'as-hide': !show.value,
      [`as-hover-btn-${toValue(mode)}`]: true
    }))

    return {
      handleMouseEnter,
      handleClick,
      className
    }
  }
}
</script>

<style scoped>
.as-hover-btn {
  position: fixed;
  z-index: 99999;
  font-weight: 600;
  font-size: 17px;
  color: var(--as-primary-color);
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  border: 1px var(--as-border-color) solid;
  opacity: 0.6;
  cursor: pointer;
}

.as-hover-btn-horizontal {
  top: 0;
  left: 50%;
  transform: translateY(0) translateX(-50%);
  padding: 0 16px;
  height: 28px;
  line-height: 28px;
}

.as-hover-btn-vertical {
  left: 0;
  top: 50%;
  transform: translateY(-200%) translateX(0) rotate(90deg);
  transform-origin: 0 100%;
  padding: 0 16px;
  height: 28px;
  line-height: 28px;
}

.hover-btn.as-hide {
  transition: transform 0.2s;
  transform: translateY(-100%) translateX(-50%);
}
</style>
