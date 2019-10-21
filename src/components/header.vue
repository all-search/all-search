<template>
  <header class="menu-header">
    <logo class="logo" />
    <el-tabs
      :value="value"
      @tab-click="handleClick">
      <el-tab-pane
        v-for="item in sites"
        :key="item.name"
        :label="item.nameZh"
        :name="item.name" />
    </el-tabs>
  </header>
</template>

<script>
import sites from '../config/sites'
import logo from '../components/logo'

export default {
  name: 'tab-header',
  components: {
    logo
  },
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
    handleClick (tab) {
      this.$emit('menu-click', tab)
    },
    handleSearch () {
      this.$emit('search', this.localKeyword)
    }
  }
}
</script>

<style lang="scss">
  .menu-header {
    display: flex;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: #E4E7ED;
      z-index: 1;
    }
  }
</style>
<style lang="scss">
  .logo {
    width: 130px;
    min-width: 130px;
  }
  .el-tabs {
    .el-tabs__header {
      margin-bottom: 0;
    }

    .el-tabs__nav-wrap::after {
      height: 0;
    }
  }

  .el-tabs__nav {
    margin: 0 10px;
  }

  .el-main {
    padding: 0;
  }
</style>
