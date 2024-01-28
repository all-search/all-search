<template>
  <template v-if="!disabled">
    <div
      v-show="visible"
      style="opacity: 0"
      class="as-container"
      :class="classList">
      <logo :mode="mode"/>
      <as-menu :mode="mode"/>
      <side-bar/>
    </div>
    <hoverBtn v-show="visible"/>
    <iconfont/>
    <selection-bar @openDialog="openDialog"/>
    <search-dialog
      :keyword="keyword"
      v-model:visible="dialogVisible"/>
  </template>
</template>

<script>
import { computed, watch, unref, ref, toRefs, toValue, watchEffect } from 'vue'
import { initSpecialStyle } from '../util/addSpecialStyle'
import { addCustomStyle, changeBodyStyle, protectStyle } from '../util/initStyle'
import { site } from '../config/siteInfo'
import { useFullScreen } from '../util/fullScreen'
import useMode from '../components/useMode'
import useSwitchShow from '../components/useSwitchShow'
import logo from '../components/logo'
import asMenu from '../components/menu'
import sideBar from '../components/side-bar'
import hoverBtn from '../components/hover-btn'
import iconfont from '../components/iconfont'
import selectionBar from '../components/selection-bar'
import searchDialog from '../components/search-dialog'

export default {
  name: 'all-search',
  components: {
    logo,
    asMenu,
    sideBar,
    hoverBtn,
    iconfont,
    selectionBar,
    searchDialog
  },
  setup () {
    const { isFullScreen } = useFullScreen()
    const { value: mode } = useMode()
    const { show } = useSwitchShow()

    const classList = computed(() => ([
      `as-${toValue(mode)}`,
      toValue(show) ? 'as-show' : 'as-hide'
    ]))

    const visible = computed(() => {
      return !site.invisible && !unref(isFullScreen)
    })

    watchEffect(() => {
      const remove = site.invisible || site.disabled || !toValue(show)
      changeBodyStyle(toValue(mode), remove)
    })

    let isInit = false

    function init (site) {
      if (isInit || site.disabled) {
        return
      }
      protectStyle()
      initSpecialStyle()
      addCustomStyle(toValue(mode), site)
      isInit = true
    }

    watch(site, newSite => {
      init(newSite)
    }, {
      immediate: true
    })

    const dialogVisible = ref(false)
    const keyword = ref('')

    function openDialog (text) {
      keyword.value = text
      dialogVisible.value = true
    }

    const { disabled } = toRefs(site)

    return {
      disabled,
      mode,
      classList,
      visible,
      dialogVisible,
      openDialog,
      keyword
    }
  }
}
</script>

<style lang="scss">
@import "../assets/common.scss";

.body-horizontal {
  height: $height;
  width: 100%;
}

.body-horizontal + body {
  //margin-top: $height !important;
  //position: relative !important;

  [data-as-margin-top] {
    margin-top: $height !important;
  }

  [data-as-transform] {
    transform: translateY($height);
  }

  [data-as-border-top] {
    border-top: rgba(0, 0, 0, 0) $height solid;
    box-sizing: content-box;
  }

  [data-as-has-set] {
    transition-duration: 0s;
  }
}

.body-vertical {
  height: 100%;
  width: $verticalWidth;
  position: fixed;
  z-index: 999999;
}

.body-vertical + body {
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
  transition: transform 0.1s;

  &.as-hide {
    transform: translateY(-100%);
  }

  &.as-show {
    transform: translateY(0);
  }
}

.as-vertical {
  height: 100%;
  width: $verticalWidth;
  top: 0;
  left: 0;
  border-right: 1px var(--as-border-color) solid;
  flex-direction: column;
  transition: transform 0.1s;

  &.as-hide {
    transform: translateX(-100%);
  }

  &.as-show {
    transform: translateX(0);
  }
}

.as-container {
  opacity: 1 !important;
  position: fixed;
  display: flex;
  background-color: var(--as-bg-color);
  z-index: $mainZIndex;
}
</style>
