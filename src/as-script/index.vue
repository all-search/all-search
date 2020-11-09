<template>
  <div
    id="all-search"
    style="display: none"
    :class="asClass">
    <logo :mode="mode"/>
    <as-menu
      :sites="sites"
      :mode="mode"/>
    <div class="as-setting"
         @click="openSet">
      设置
    </div>
    <searchDialog/>
  </div>
</template>

<script>
import { computed, reactive, ref, watch } from 'vue'
import { initSites } from '../util'
import { siteInfo } from '../config/loadList'
import logo from './components/logo.vue'
import asMenu from './components/menu.vue'
import searchDialog from './components/search-dialog.vue'

export default {
  name: 'all-search',
  components: {
    logo,
    asMenu,
    searchDialog
  },
  setup () {
    const currentSite = siteInfo()
    const mode = ref('horizontal')
    const sites = reactive(initSites('tm'))
    const openSet = () => {
      window.open('https://endday.github.io/all-search/')
    }
    const changeMode = (val, oldVal) => {
      if (currentSite.invisible) {
        return
      }
      document.body.classList.remove(`body-${oldVal}`)
      document.body.classList.add(`body-${val}`)
    }

    watch(mode, changeMode)

    const asClass = computed(() => ({
      'as-horizontal': mode.value === 'horizontal',
      'as-vertical': mode.value === 'vertical'
    }))

    changeMode()

    return {
      currentSite,
      sites,
      mode,
      openSet,
      asClass
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/common.scss";

  .body-horizontal {
    margin-top: $height;
  }

  .body-vertical {
    margin-left: $verticalWidth;
  }

  #all-search {
    --as-primary-color: #1890ff;
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
      color: var(--as-primary-color);
    }
  }
</style>
