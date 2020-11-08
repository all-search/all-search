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
    tmScriptLink: 'https://greasyfork.org/scripts/397993/code/all-search.user.js'
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
