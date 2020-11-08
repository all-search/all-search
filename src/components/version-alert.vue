<template>
  <div>
    <v-alert
      class="align-center"
      v-show="!tmLoading && !store.tmVersion"
      text
      type="error"
    >
      <v-row align="center" no-gutters>
        <v-col class="grow">
          检测到您 未安装 或者 未启用 全搜 all-search
        </v-col>
        <v-col class="shrink">
          <v-btn color="error" outlined @click="openLink">安装</v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <v-alert
      class="align-center"
      v-show="!tmLoading && store.tmVersion && store.tmVersion !== version"
      text
      type="info"
    >
      <v-row align="center" no-gutters>
        <v-col class="grow">
          检测到您 全搜 all-search 不是最新的版本，请及时更新
        </v-col>
        <v-col class="shrink">
          <v-btn color="info" outlined @click="openLink">更新</v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>

<script>
import store from '../util/store'
import pkg from '../../package.json'

export default {
  name: 'version-alert',
  data: () => ({
    store,
    version: pkg.version,
    tmLoading: true,
    tmScriptLink: 'https://greasyfork.org/zh-CN/scripts/397993-all-search-%E5%85%A8%E6%90%9C-%E4%B8%80%E4%B8%AA%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E%E5%BF%AB%E6%8D%B7%E8%B7%B3%E8%BD%AC%E8%8F%9C%E5%8D%95-%E6%94%AF%E6%8C%81%E5%9B%BE%E5%BD%A2%E7%95%8C%E9%9D%A2%E8%87%AA%E5%AE%9A%E4%B9%89'
  }),
  mounted () {
    setTimeout(() => {
      this.tmLoading = false
    }, 2000)
  },
  methods: {
    openLink () {
      window.open(this.tmScriptLink)
    }
  }
}
</script>

<style scoped>

</style>
