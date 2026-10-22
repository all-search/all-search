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
    v-show="data.notInstall"
    class="version-alert"
    title="未连接油猴脚本"
    description="当前显示的是内置默认站点，修改会保存在本地。想同步到脚本，请先安装并启用 All-Search 用户脚本。"
    type="info"
    show-icon
    :closable="false" />
</template>

<style scoped>
.version-alert {
  margin: 0 0 16px;
  border-radius: 10px;
}
</style>
