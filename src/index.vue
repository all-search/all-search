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
  <template v-if="!disabled && mode">
    <div
      v-show="visible"
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
  
  <template v-if="toolbarVisible === 1">
    <selection-bar @open-dialog="openDialog"/>
    <search-dialog
      :keyword="keyword"
      v-model:visible="dialogVisible"/>
  </template>
  
  <iconfont v-if="!disabled || toolbarVisible === 1"/>
</template>

<style lang="scss">
@use "./assets/host";
</style>
