<template>
  <header>
    <a class="title"
       href="https://github.com/endday/all-search">
      <h1 class="title-inner">
        All Search
      </h1>
    </a>
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
  header {
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

  .title {
    border-bottom: 1px #e8e8e8 solid;
    text-decoration: none;
    .title-inner {
      font-size: 16px;
      width: 120px;
      height: 40px;
      line-height: 40px;
      font-weight: 600;
      color: #1990fc;
      margin: 0;
      text-align: center;
      cursor: pointer;
    }
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
