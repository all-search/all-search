<template>
  <button
    class="as-button"
    :class="`as-button__${type}`">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'xButton',
  props: {
    type: {
      type: String,
      default: 'primary'
    }
  }
}
</script>

<style lang="scss">
  .as-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: $color;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }

  .as-button.as-button__text {
    border-color: transparent;
    color: var(--as-primary-color);
    background: transparent;
    padding-left: 0;
    padding-right: 0;
  }

  .as-button.as-button__primary {
    color: #fff;
    background-color: var(--as-primary-color);
    border-color: var(--as-primary-color);
  }

</style>
