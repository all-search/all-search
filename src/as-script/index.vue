<template>
  <div class="as-container"
       :class="classList"
       style="display: none">
    <logo :mode="mode"/>
    <as-menu
      :mode="mode"/>
    <side-bar/>
  </div>
</template>

<script>
import { computed } from 'vue'
import { siteInfo } from '../config/loadList'
import useMode from '../components/mode.js'
import logo from '../components/logo.vue'
import asMenu from '../components/menu.vue'
import sideBar from '../components/side-bar.vue'
import { initStyle } from '../util/initStyle.js'

export default {
  name: 'all-search',
  components: {
    logo,
    asMenu,
    sideBar
  },
  setup () {
    const currentSite = siteInfo()
    const classList = computed(() => `as-${mode.value}`)
    const { mode } = useMode()
    initStyle()
    return {
      currentSite,
      mode,
      classList
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/common.scss";

  .body-horizontal {
    margin-top: $height;
  }

  .body-vertical {
    margin-left: $verticalWidth;
  }

  #all-search {
    --as-primary-color: #1890ff;
    --as-bg-color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  }

  .as-horizontal {
    height: $height;
    width: 100%;
    top: 0;
    border-bottom: 1px #e8e8e8 solid;
    flex-direction: row;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .as-horizontal-hidden {
    // transform: translateY(-30px);
  }

  .as-vertical {
    height: 100%;
    width: $verticalWidth;
    top: 0;
    left: 0;
    border-right: 1px #e8e8e8 solid;
    flex-direction: column;
  }

  .as-container {
    position: fixed;
    display: flex !important;
    background-color: var(--as-bg-color);
    z-index: $mainZIndex;
  }

  .as-setting {
    line-height: $height;
    padding: 0 16px;
    position: relative;
    margin: 0;
    white-space: nowrap;
    cursor: pointer;
    font-size: 14px;
    color: $color;

    &:hover {
      color: var(--as-primary-color);
    }
  }
</style>
