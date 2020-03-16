<template>
  <header id="all-search">
    <logo/>
    <category :value="categoryName"
              @change="changeCategory"/>
    <site-menu :menus="menus"/>
  </header>
</template>

<script>
import logo from './components/logo.vue'
import category from './components/category.vue'
import siteMenu from './components/menu.vue'
import engines from './config/engines/index.js'
import { getSession, setSession } from './util'

export default {
  name: 'all-search',
  components: {
    logo,
    category,
    siteMenu
  },
  data () {
    return {
      engines,
      categoryName: 'search'
    }
  },
  computed: {
    menus () {
      const i = this.engines.findIndex(item => item.name === this.categoryName)
      if (i > -1) {
        return this.engines[i].list
      }
      return this.engines[0].list
    }
  },
  created () {
    this.categoryName = getSession('__allSearch__categoryName') || this.categoryName
  },
  methods: {
    handleClick (tab) {
      this.$emit('menu-click', tab)
    },
    changeCategory (name) {
      setSession('__allSearch__categoryName', name)
      this.categoryName = name
    }
  }
}
</script>

<style lang="scss">
  @import "./assets/common";

  body {
    margin-top: $height;
  }

  #all-search {
    height: $height;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 999999;
    display: flex;
    border-bottom: 1px #e8e8e8 solid;
    background-color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  }

  .el-tabs {
    .el-tabs__header {
      margin-bottom: 0;
    }

    .el-tabs__nav-wrap::after {
      height: 0;
    }

    .el-tabs__nav {
      margin: 0 20px;
    }
    .el-tabs__item {
      height: $height;
      line-height: $height;
    }
  }
</style>
