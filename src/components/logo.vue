<template>
  <a
    v-if="!isMobile"
    class="as-title"
    href="https://github.com/endday/all-search"
    target="_blank"
    :class="`as-title-${mode}`">
    <p class="as-title-inner">
      All Search
    </p>
  </a>
</template>

<script>
import useUa from '../components/useUa'

export default {
  name: 'logo',
  props: {
    mode: {
      type: String,
      default: 'horizontal',
      validator: val => ['horizontal', 'vertical'].indexOf(val) > -1
    }
  },
  setup () {
    const { isMobile } = useUa()
    return {
      isMobile
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/common";

  @media screen and (max-width: 768px) {
    .as-title-vertical {
      display: none;
    }
  }

  .as-title-horizontal {
    min-width: 100px;
    margin: 0 10px;
  }

  .as-title-vertical {
    width: 100%;
  }

  .as-title {
    text-decoration: none !important;
    padding: 0;
    margin: 0;
    color: var(--as-primary-color);

    .as-title-inner {
      padding: 0;
      font-size: 18px;
      height: $height;
      line-height: $height;
      font-weight: 600;
      color: var(--as-primary-color);
      margin: 0 auto;
      text-align: center;
      cursor: pointer;
    }
  }


</style>
