<template>
  <i class="as-menu-item-icon"
     :class="`icon-${name}`">
  </i>
</template>

<script>
export default {
  name: 'icon',
  props: {
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
  .as-menu-item-icon {
    font-family: "iconfont" !important;
    font-size: 20px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
