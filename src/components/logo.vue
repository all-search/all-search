<template>
  <a
    class="as-title"
    href="https://github.com/endday/all-search"
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
  @import "../assets/common";

  @media screen and (max-width: 768px) {
    .as-title {
      display: none;
    }
  }

  .as-title-horizontal {
    width: 100px;
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
      font-size: 18px;
      height: $height;
      line-height: $height;
      font-weight: 600;
      color: #1990fc;
      margin: 0 auto;
      text-align: center;
      cursor: pointer;
    }
  }
</style>
