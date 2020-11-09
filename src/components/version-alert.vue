<template>
  <el-alert
    class="version-alert"
    v-show="data.notInstall"
    title="错误"
    description="检测到您 未安装 或者 未启用 全搜 all-search"
    type="error"
    show-icon
    :closable="false"/>
  <el-alert
    class="version-alert"
    v-show="data.notLatest"
    title="提示"
    description="检测到您 全搜 all-search 不是最新的版本，请及时更新"
    type="warning"
    show-icon
    :closable="false"/>
</template>

<script>
import { reactive } from 'vue'
import store from '../util/store'
import pkg from '../../package.json'

export default {
  name: 'version-alert',
  setup () {
    const tmScriptLink = 'https://greasyfork.org/zh-CN/scripts/397993-all-search-%E5%85%A8%E6%90%9C-%E4%B8%80%E4%B8%AA%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E%E5%BF%AB%E6%8D%B7%E8%B7%B3%E8%BD%AC%E8%8F%9C%E5%8D%95-%E6%94%AF%E6%8C%81%E5%9B%BE%E5%BD%A2%E7%95%8C%E9%9D%A2%E8%87%AA%E5%AE%9A%E4%B9%89'
    const version = pkg.version
    const data = reactive({
      notInstall: false,
      notLatest: false
    })

    setTimeout(() => {
      if (!store.tmVersion) {
        data.notInstall = true
      } else if (store.tmVersion && store.tmVersion !== version) {
        data.notLatest = true
      }
    }, 2000)

    return {
      data
    }
  }
}
</script>

<style>
  .version-alert {
    margin-bottom: 20px;
  }
</style>
