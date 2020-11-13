<template>
  <a
    class="as-title"
    href="https://endday.github.io/all-search/"
    target="_blank"
    :class="`as-title-${mode}`"
  >
    <p class="as-title-inner">
      All Search
    </p>
  </a>
</template>

<script>
export default {
  name: 'logo',
  props: {
    mode: {
      type: String,
      default: 'horizontal',
      validator: val => ['horizontal', 'vertical'].includes(val)
    }
  },
  data: () => ({
    widthMap: {
      horizontal: {
        width: '90px',
        margin: '0 10px'
      },
      vertical: {
        width: '100%'
      }
    }
  }),
  computed: {
    style () {
      return this.widthMap[this.mode]
    }
  }
}
</script>

<style lang="scss">
  @import "../../assets/common";

  @media screen and (max-width: 768px) {
    .as-title {
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
