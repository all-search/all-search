<template>
  <li
    @click="handleMenuClick($event)"
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
  data: () => ({
    timeout: null
  }),
  methods: {
    clear () {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
    },
    handleMenuClick (e) {
      this.clear()
      this.$emit('show', true)
    },
    handleMouseEnter (e) {
      if (this.disabled) {
        return
      }
      this.clear()
      this.timeout = setTimeout(() => {
        this.$emit('show', true)
      }, this.showTimeout)
    },
    handleMouseLeave (e) {
      if (this.disabled) {
        return
      }
      this.clear()
      this.timeout = setTimeout(() => {
        this.$emit('show', false)
      }, this.hideTimeout)
    }
  }
}
</script>

<style>

</style>
