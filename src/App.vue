<template>
  <header id="all-search">
    <logo />
    <category :value="categoryName"
              @change="changeCategory" />
    <site-menu :menus="menus" />
  </header>
</template>

<script>
import logo from './components/logo.vue'
import category from './components/category.vue'
import siteMenu from './components/menu.vue'
import engines from './config/engines/index.js'

export default {
  name: 'all-search',
  components: {
    logo,
    category,
    siteMenu
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      engines,
      categoryName: 'web'
    }
  },
  computed: {
    menus () {
      const item = this.engines.find(item => item.name === this.categoryName)
      return item.list
    }
  },
  mounted () {

  },
  methods: {
    handleClick (tab) {
      this.$emit('menu-click', tab)
    },
    handleSearch () {
      this.$emit('search')
    },
    changeCategory (name) {
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
