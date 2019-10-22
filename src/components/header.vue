<template>
  <header class="menu-header">
    <logo class="logo"/>
    <el-tabs
      :value="value"
      @tab-click="handleClick">
      <el-tab-pane
        v-for="item in tabs"
        :key="item.name"
        :label="item.nameZh"
        :name="item.name"/>
    </el-tabs>
  </header>
</template>

<script>
import { tabs } from '../config/sites'
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
      tabs,
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
    .logo {
      width: 130px;
      min-width: 130px;
    }

    .el-dropdown-link {
      padding: 0 20px;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      color: #1990fc;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
</style>
<style lang="scss">
  .el-tabs {
    .el-tabs__header {
      margin-bottom: 0;
    }

    .el-tabs__nav-wrap::after {
      height: 0;
    }

    .el-tabs__nav {
      margin: 0 10px;
    }
  }
</style>
