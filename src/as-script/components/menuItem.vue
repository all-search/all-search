<template>
  <li
    @mouseenter="handleMouseEnter($event)"
    @mouseleave="handleMouseLeave($event)">
    <slot></slot>
  </li>
</template>

<script>

export default {
  name: 'menuItem',
  props: {
    showTimeout: {
      type: Number,
      default: 100
    },
    hideTimeout: {
      type: Number,
      default: 200
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup (props, context) {
    let timeout = null
    const clear = () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
    const handleMouseEnter = (e) => {
      if (props.disabled) {
        return
      }
      clear()
      timeout = setTimeout(() => {
        context.emit('show', true)
      }, props.showTimeout)
    }
    const handleMouseLeave = (e) => {
      if (props.disabled) {
        return
      }
      clear()
      timeout = setTimeout(() => {
        context.emit('show', false)
      }, props.hideTimeout)
    }
    return {
      handleMouseEnter,
      handleMouseLeave
    }
  }
}
</script>

<style>

</style>
