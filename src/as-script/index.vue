<template>
  <div
    id="all-search"
    :style="{display: 'none'}"
    :class="asClass">
    <logo :mode="mode"/>
    <as-menu
      :sites="sites"
      :mode="mode"
      :inline="inline"
      :value="categoryName"
      @change="changeCategory"/>
    <div class="as-setting"
         @click="changeMode">
      切换模式
    </div>
  </div>
</template>

<script>
import { getSession, setSession } from '../util'
import sites from '../config/sites'
import logo from './components/logo.vue'
import asMenu from './components/menu.vue'

export default {
  name: 'all-search',
  components: {
    logo,
    asMenu
  },
  data () {
    return {
      sites: [],
      categoryName: 'search',
      mode: 'horizontal',
      inline: false
    }
  },
  watch: {
    mode: {
      handler (val, oldVal) {
        document.body.classList.remove(`body-${oldVal}`)
        document.body.classList.add(`body-${val}`)
      },
      immediate: true
    }
  },
  computed: {
    asClass () {
      return {
        'as-horizontal': this.mode === 'horizontal',
        'as-vertical': this.mode === 'vertical'
      }
    }
  },
  created () {
    this.sites = sites
      .filter(item => {
        return item.list &&
          item.list.length > 0 &&
          item.data.visible
      })
      .map(item => ({
        ...item,
        show: false
      }))
    this.categoryName = getSession('categoryName') || this.categoryName
    this.mode = getSession('mode') || this.mode
  },
  methods: {
    changeCategory (name) {
      setSession('categoryName', name)
      this.categoryName = name
    },
    changeMode () {
      if (this.mode === 'horizontal') {
        this.mode = 'vertical'
      } else {
        this.mode = 'horizontal'
      }
      setSession('mode', this.mode)
      window.location.reload()
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/common";

  .body-horizontal {
    margin-top: $height;
  }

  .body-vertical {
    margin-left: $verticalWidth;
  }

  #all-search {
    position: fixed;
    display: flex !important;
    background-color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  }

  .as-horizontal {
    height: $height;
    width: 100%;
    top: 0;
    z-index: 999999;
    border-bottom: 1px #e8e8e8 solid;
    flex-direction: row;
  }

  .as-vertical {
    height: 100%;
    width: $verticalWidth;
    top: 0;
    left: 0;
    z-index: 999999;
    border-right: 1px #e8e8e8 solid;
    flex-direction: column;
  }

  .as-setting {
    line-height: $height;
    padding: 0 16px;
    position: relative;
    margin: 0;
    white-space: nowrap;
    cursor: pointer;
    font-size: 14px;
    color: $color;
    &:hover {
      color: $active-color;
    }
  }
</style>
