<script setup lang="ts">
import { watch } from 'vue'
import { useApp } from './useApp'
import { useTheme } from './components/useTheme'
import { getAsMountAnchor } from './util/dom'
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

// 深色模式：挂在影子根里的锚点上（CSS 变量在该子树内生效）
const { isDark } = useTheme()
const applyTheme = () => {
  getAsMountAnchor()?.classList.toggle('as-theme-dark', isDark.value)
}
watch(isDark, applyTheme, { immediate: true, flush: 'post' })
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
