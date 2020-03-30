<template>
  <header id="all-search">
    <logo/>
    <category :value="categoryName"
              @change="changeCategory"/>
    <site-menu :menus="menus"/>
    <div class="setting" @click="openSetDialog">设置</div>
    <x-dialog :visible.sync="visible"></x-dialog>
  </header>
</template>

<script>
import engines from './config/engines/index.js'
import { getSession, setSession } from './util'
import logo from './components/logo.vue'
import category from './components/category.vue'
import siteMenu from './components/menu.vue'
import xDialog from './components/dialog.vue'

export default {
  name: 'all-search',
  components: {
    logo,
    category,
    siteMenu,
    xDialog
  },
  data () {
    return {
      engines,
      categoryName: 'search',
      visible: false
    }
  },
  computed: {
    menus () {
      const i = this.engines.findIndex(item => item.name === this.categoryName)
      if (i > -1) {
        return this.engines[i].list.filter(item => !item.disabled)
      }
      return this.engines[0].list.filter(item => !item.disabled)
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
    },
    openSetDialog () {
      this.visible = true
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

  .setting {
    padding: 0 20px;
    /*display: flex;*/
    align-items: center;
    white-space: nowrap;
    cursor: pointer;
    font-size: 14px;
    display: none;
  }
</style>
