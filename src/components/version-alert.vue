<script setup lang="ts">
import { reactive } from 'vue'
import store from '../util/store'
import { isPlugin } from '@src/env'

const data = reactive({
  notInstall: false,
  notLatest: false
})

setTimeout(() => {
  // 扩展自身带有 options 页，数据直接走 chrome.storage，不依赖油猴脚本
  if (isPlugin) {
    return
  }
  if (!store.tmVersion) {
    data.notInstall = true
  }
}, 2000)
</script>

<template>
  <el-alert
    class="version-alert"
    v-show="data.notInstall"
    title="错误"
    description="检测到您 未安装 或者 未启用 全搜 all-search"
    type="error"
    show-icon
    :closable="false"/>
</template>

<style>
  .version-alert {
    margin-bottom: 20px;
  }
</style>
