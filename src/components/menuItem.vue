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
      default: 200
    },
    hideTimeout: {
      type: Number,
      default: 200
    }
  },
  data: () => ({
    timeout: null
  }),
  methods: {
    handleMenuClick (e) {
      clearTimeout(this.timeout)
      this.$emit('show', true)
    },
    handleMouseEnter (e) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.$emit('show', true)
      }, this.showTimeout)
    },
    handleMouseLeave (e, item) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.$emit('show', false)
      }, this.hideTimeout)
    }
  }
}
</script>

<style>

</style>
