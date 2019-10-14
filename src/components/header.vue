<template>
  <header>
    <el-tabs
      :value="value"
      @tab-click="handleClick">
      <el-tab-pane
        v-for="item in sites"
        :key="item.name"
        :label="item.nameZh"
        :name="item.name"/>
    </el-tabs>
  </header>
</template>

<script>
import sites from '../config/sites'

export default {
  name: 'tab-header',
  props: {
    value: {
      type: String,
      default: ''
    },
    isCollapse: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      sites,
      localKeyword: ''
    }
  },
  methods: {
    handleClick (tab, event) {
      this.$emit('menu-click', tab)
    },
    handleSearch () {
      this.$emit('search', this.localKeyword)
    }
  }
}
</script>

<style lang="scss">
  .el-tabs__header {
    margin-bottom: 0;
  }

  .el-tabs__nav {
    margin: 0 30px;
  }

  .el-main {
    padding: 0;
  }
</style>
