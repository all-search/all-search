<template>
  <div class="as-container"
       :class="classList"
       style="display: none">
    <logo :mode="mode"/>
    <as-menu
      :mode="mode"/>
    <side-bar/>
  </div>
  <!--  <hoverButton :show="!show"/>-->
</template>

<script>
import { computed, watch, ref } from 'vue'
import { siteInfo } from '../config/loadList'
import { initStyle } from '../util/initStyle.js'
import useMode from '../components/useMode.js'
import logo from '../components/logo.vue'
import asMenu from '../components/menu.vue'
import sideBar from '../components/side-bar.vue'
// import hoverButton from '../components/hover-button.vue'
// import useScroll from '../util/useScroll'
// import { setSession } from '../util'
// import { toggleCustomStyle } from '../util/initStyle'

export default {
  name: 'all-search',
  components: {
    logo,
    asMenu,
    sideBar,
    // hoverButton
  },
  setup () {
    const show = ref(false)
    const currentSite = siteInfo()
    const { mode } = useMode()
    // const { direction } = useScroll()
    const classList = computed(() => {
      return {
        [`as-${mode.value}`]: true
        // show: direction.value > 0
      }
    })
/*    watch(direction, (item) => {
      toggleCustomStyle(item.value > 0)
    })*/
    initStyle()
    return {
      currentSite,
      mode,
      classList,
      show
    }
  }
}
</script>

<style lang="scss">
@import "../assets/common.scss";

.body-horizontal {
  margin-top: $height !important;
}

.body-vertical {
  margin-left: $verticalWidth !important;
}

body, #all-search {
  --as-horizontal-height: $height;
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
  //transform: translateY(-100%);
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
