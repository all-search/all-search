<template>
  <header id="header"
          class="menu-header">
    <logo class="logo"/>
    <div class="search-input">
      <el-input
        placeholder="搜索"
        v-model="localKeyword"
        @keyup.enter.native="handleSearch"
      >
        <i slot="prefix"
           class="el-input__icon el-icon-search"
           @click="handleSearch">
        </i>
      </el-input>
    </div>
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
import { getQueryString } from '../util/index'

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
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.localKeyword = getQueryString('k')
    },
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
    width: calc(100vw - 280px);
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

  .search-input {
    width: 180px;
    min-width: 180px;
    .el-input__inner {
      border-top: none;
      border-left: none;
      border-right: none;
      border-radius: 0;
    }
  }
</style>
