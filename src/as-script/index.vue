<template>
  <div
    id="all-search"
    :style="{display: 'none'}"
    :class="asClass">
    <logo :mode="mode"/>
    <as-menu
      :sites="sites"
      :mode="mode"
      :inline="inline"/>
    <div class="as-setting"
         @click="openSet">
      设置
    </div>
    <as-dialog v-model="dialog">
      123
    </as-dialog>
  </div>
</template>

<script>
import { initSites } from '../util'
import logo from './components/logo.vue'
import asMenu from './components/menu.vue'
import asDialog from './components/dialog'

export default {
  name: 'all-search',
  components: {
    logo,
    asMenu,
    asDialog
  },
  data () {
    return {
      sites: [],
      categoryName: 'search',
      mode: 'horizontal',
      inline: true,
      dialog: false
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
    this.initSites()
    this.listenKey()
  },
  methods: {
    initSites () {
      this.sites = initSites('tm')
    },
    openSet () {
      window.open('https://endday.github.io/all-search/')
    },
    showDialog () {
      this.dialog = !this.dialog
    },
    listenKey () {
      document.onkeyup = (e) => {
        // const ctrlKey = e.ctrlKey || e.metaKey
        if (e.altKey && e.key === 'a') {
          this.showDialog()
        }
        e.preventDefault()
        return false
      }
      this.$once('hook:beforeDestroy', function () {
        document.onkeypress = null
      })
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
