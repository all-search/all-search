<template>
  <span class="as-menu-item-icon">
    <svg aria-hidden="true">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
  </span>
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
    font-size: 20px;
    display: inline-block;
    font-style: normal;
    line-height: 0;
    text-align: center;
    text-transform: none;

    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: rgba(0, 0, 0, 0.65);
    svg {
      width: 1em;
      height: 1em;
      fill: currentColor;
      overflow: hidden;
      vertical-align: -.125em;
    }
  }
</style>
