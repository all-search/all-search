<template>
  <div class="as-menu-container">
    <ul class="as-menu">
      <li class="as-submenu"
          v-for="(item, i) in menus"
          :key="i"
          @click="handleClick(item)">
        <div class="as-submenu-title"
             v-text="item.nameZh">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getKeyword } from '../util'

export default {
  name: 'site-menu',
  props: {
    menus: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    handleClick (item) {
      this.$emit('click', item)
      let keyword = ''
      if (this.$root.currentSite.keyword) {
        keyword = this.$root.currentSite.keyword()
      } else {
        keyword = getKeyword()
      }
      window.location.href = item.url.replace('%s', keyword)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/common";

  .as-menu-container {
    display: flex;
  }

  .as-menu {
    line-height: $height;
    width: 100%;
    height: 100%;
    padding: 0;
    margin-top: -1px;
    margin-bottom: 0;
    white-space: nowrap;
    border: 0;
    box-shadow: none;
    background-color: #fff;
  }

  .as-submenu {
    position: relative;
    top: 1px;
    display: inline-block;
    vertical-align: bottom;
  }

  .as-submenu-selected {
    color: #1890ff;
    border-bottom: 2px solid #1890ff;
  }

  .as-submenu-title {
    position: relative;
    display: block;
    margin: 0;
    padding: 0 20px;
    white-space: nowrap;
    cursor: pointer;
    font-size: 14px;
  }
</style>
