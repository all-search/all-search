<template>
  <div v-show="!site.invisible"
       class="as-container"
       :class="classList">
    <logo :mode="mode"/>
    <as-menu
      :mode="mode"/>
    <side-bar/>
  </div>
  <!--  <hoverButton :show="!show"/>-->
</template>

<script>
import { computed, watch, ref, reactive } from 'vue'
import { initStyle, addStyleForCurrentSite } from '../util/initStyle'
import { siteInfo } from '../config/loadList'
import { routerChange } from '../util/routerChange'
import useMode from '../components/useMode'
import logo from '../components/logo'
import asMenu from '../components/menu'
import sideBar from '../components/side-bar'
// import hoverButton from '../components/hover-button'
// import useScroll from '../util/useScroll'
// import { setSession } from '../util/index'
// import { toggleCustomStyle } from '../util/initStyle'

export default {
  name: 'all-search',
  components: {
    logo,
    asMenu,
    sideBar
  },
  setup () {
    const show = ref(false)
    const { mode } = useMode()
    let site = reactive({
      url: '',
      invisible: false,
      disabled: false,
      style: {},
      keyword: null
    })
    const classList = computed(() => ({
      [`as-${mode.value}`]: true
    }))
    initStyle()
    updateSite()
    watch(mode, newMode => {
      addStyleForCurrentSite(newMode, site)
    }, {
      immediate: true
    })
    function updateSite () {
      const curSite = siteInfo()
      site.url = curSite.url
      site.invisible = curSite.invisible
      site.disabled = curSite.disabled
      site.style = curSite.style
      site.keyword = curSite.keyword
    }
    routerChange(() => {
      updateSite()
      addStyleForCurrentSite(mode, site)
    })
    return {
      site,
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
  display: flex;
  background-color: var(--as-bg-color);
  z-index: $mainZIndex;
}
</style>
