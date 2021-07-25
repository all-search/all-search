<template>
  <div class="as-container"
       :class="classList"
       style="display: none">
    <logo :mode="mode"/>
    <as-menu
      :mode="mode"/>
    <side-bar/>
  </div>
  <hoverButton
    :show="!show"
    @show="showMenu"/>
</template>

<script>
import { computed } from 'vue'
import { siteInfo } from '../config/loadList'
import useMode from '../components/useMode.js'
import logo from '../components/logo.vue'
import asMenu from '../components/menu.vue'
import sideBar from '../components/side-bar.vue'
import hoverButton from '../components/hover-button'
import { initStyle } from '../util/initStyle.js'
import useScroll from '../util/useScroll'

export default {
  name: 'all-search',
  components: {
    logo,
    asMenu,
    sideBar,
    hoverButton
  },
  setup () {
    const currentSite = siteInfo()
    const { x, direction } = useScroll()
    const show = computed(() => direction.value === -1 && x.value > 50)
    const classList = computed(() => [
      `as-${mode.value}`,
      { show: direction.value === -1 && x.value > 50 }
    ])
    const { mode } = useMode()
    const showMenu = () => {
      direction.value = -1
      x.value = 51
    }
    initStyle()
    return {
      currentSite,
      mode,
      classList,
      showMenu,
      show
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

  body, #all-search {
    --as-primary-color: #1890ff;
    --as-bg-color: #ffffff;
    --as-primary-text-color: #606266;
    --as-secondary-background-color: #f5f7fa;
    --as-border-color: #e8e8e8;
  }

  #all-search {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  }

  /*@media (prefers-color-scheme: dark) {
    #all-search {
      --as-primary-color: #3d9be9;
      --as-bg-color: #212121;
      --as-primary-text-color: #e0e0e0;
      --as-secondary-background-color: #444;
      --as-border-color: #212121;
    }
  }*/

  .as-horizontal {
    height: $height;
    width: 100%;
    top: 0;
    border-bottom: 1px var(--as-border-color) solid;
    flex-direction: row;
    transition: transform 0.38s;
    transform: translateY(-100%);
  }

  .as-horizontal.show {
    transform: translateY(0);
  }

  .as-vertical {
    height: 100%;
    width: $verticalWidth;
    top: 0;
    left: 0;
    border-right: 1px var(--as-border-color) solid;
    flex-direction: column;
  }

  .as-container {
    position: fixed;
    display: flex !important;
    background-color: var(--as-bg-color);
    z-index: $mainZIndex;
  }
</style>
