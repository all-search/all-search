<script setup lang="ts">
import { useApp } from './useApp'
import layoutManager from './components/layout-manager.vue'
import iconfont from './components/iconfont.vue'
import selectionBar from './components/selection-bar.vue'
import searchDialog from './components/search-dialog.vue'

const {
  disabled,
  mode,
  show,
  visible,
  dialogVisible,
  openDialog,
  keyword,
  toolbarVisible,
  direction
} = useApp()
</script>

<template>
  <layout-manager
    v-if="!disabled && mode"
    :mode="mode"
    :direction="direction"
    :show="show"
    :visible="visible"
  />
  
  <template v-if="toolbarVisible === 1">
    <selection-bar @open-dialog="openDialog"/>
    <search-dialog
      :keyword="keyword"
      v-model:visible="dialogVisible"/>
  </template>
  
  <iconfont v-if="!disabled || toolbarVisible === 1"/>
</template>
