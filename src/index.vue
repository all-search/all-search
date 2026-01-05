<template>
  <template
    v-if="!disabled && mode">
    <div
      v-show="visible"
      style="opacity: 0"
      class="as-container"
      :class="classList">
      <logo :direction="direction"/>
      <as-menu
        :direction="direction"
        :mode="mode"
      />
      <side-bar/>
    </div>
    <hoverBtn v-show="visible"/>
  </template>
  <template
    v-if="toolbarVisible === 1">
    <selection-bar
      @openDialog="openDialog"/>
    <search-dialog
      :keyword="keyword"
      v-model:visible="dialogVisible"/>
  </template>
  <iconfont v-if="!disabled || toolbarVisible === 1"/>
</template>

<script>
import { computed, watch, unref, ref, toRefs, toValue, watchEffect } from 'vue'
import { initSpecialStyle } from './util/addSpecialStyle'
import { addCustomStyle, changeBodyStyle, protectStyle } from './util/initStyle'
import { site } from './config/siteInfo'
import { useFullScreen } from './util/fullScreen'
import useMode from './components/useMode'
import useSwitchShow from './components/useSwitchShow'
import useAutoHide from './components/useAutoHide'
import logo from './components/logo'
import asMenu from './components/menu'
import sideBar from './components/side-bar'
import hoverBtn from './components/hover-btn'
import iconfont from './components/iconfont'
import selectionBar from './components/selection-bar'
import searchDialog from './components/search-dialog'
import useToolbar from './components/useToolbar'

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
  setup() {
    const { isFullScreen } = useFullScreen()
    const { value: mode, direction } = useMode()
    const { show } = useSwitchShow()
    useAutoHide()
    const { visible: toolbarVisible } = useToolbar('tm')

    const classList = computed(() => ([
      `as-${toValue(direction)}`,
      `as-${toValue(mode)}`,
      toValue(show) === 1 ? 'as-show' : 'as-hide'
    ]))

    const visible = computed(() => {
      return !site.invisible && !unref(isFullScreen)
    })

    watchEffect(() => {
      const remove = site.invisible || site.disabled || toValue(show) === 2
      changeBodyStyle(toValue(mode), toValue(direction), remove)
    })

    let isInit = false

    function init(site) {
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

    function openDialog(text) {
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
      keyword,
      toolbarVisible,
      direction
    }
  }
}
</script>

<style lang="scss">
@use "./assets/common" as *;

.body-horizontal {
  height: $height;
  width: 100%;
}

.body-horizontal + body {
  [data-as-has-set] {
    transition-duration: 0s;
  }
}

.body-top + body {
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
}

.body-bottom + body {
  [data-as-margin-bottom] {
    margin-bottom: $height !important;
  }

  [data-as-transform] {
    transform: translateY(-$height);
  }

  [data-as-border-top] {
    border-bottom: rgba(0, 0, 0, 0) $height solid;
    box-sizing: content-box;
  }
}

.body-vertical {
  height: 100%;
  width: $verticalWidth;
  position: fixed;
  z-index: 99990;
}

.body-left + body {
  margin-left: $verticalWidth !important;
}

.body-right + body {
  margin-right: $verticalWidth !important;
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
  position: relative;
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
  flex-direction: row;
  transition: transform 0.1s;
  &.as-show {
    transform: translateY(0);
  }
}

.as-top {
  top: 0;
  border-bottom: 1px var(--as-border-color) solid;
  &.as-hide {
    transform: translateY(-100%);
  }
}

.as-bottom {
  bottom: 0;
  border-top: 1px var(--as-border-color) solid;
  &.as-hide {
    transform: translateY(100%);
  }
}

.as-vertical {
  height: 100%;
  width: $verticalWidth;
  top: 0;
  flex-direction: column;
  transition: transform 0.1s;

  &.as-show {
    transform: translateX(0);
  }
}

.as-left {
  left: 0;
  border-right: 1px var(--as-border-color) solid;
  &.as-hide {
    transform: translateX(-100%);
  }
}

.as-right {
  right: 0;
  border-left: 1px var(--as-border-color) solid;
  &.as-hide {
    transform: translateX(100%);
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
