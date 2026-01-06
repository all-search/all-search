<script setup lang="ts">
import { useApp } from './useApp'
import logo from './components/logo.vue'
import asMenu from './components/menu.vue'
import sideBar from './components/side-bar.vue'
import hoverBtn from './components/hover-btn.vue'
import iconfont from './components/iconfont.vue'
import selectionBar from './components/selection-bar.vue'
import searchDialog from './components/search-dialog.vue'

const {
  disabled,
  mode,
  classList,
  visible,
  dialogVisible,
  openDialog,
  keyword,
  toolbarVisible,
  direction
} = useApp()
</script>

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
    <hover-btn v-show="visible"/>
  </template>
  <template
    v-if="toolbarVisible === 1">
    <selection-bar
      @open-dialog="openDialog"/>
    <search-dialog
      :keyword="keyword"
      v-model:visible="dialogVisible"/>
  </template>
  <iconfont v-if="!disabled || toolbarVisible === 1"/>
</template>

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