<template>
  <div class="as-container"
       :class="classList"
       style="display: none">
    <logo :mode="mode"/>
    <as-menu
      :mode="mode"/>
    <side-bar/>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { addStyleContent } from '../util'
import { debounce } from '../util/debounce'
import { siteInfo } from '../config/loadList'
import mode from '../components/mode.js'
import logo from './components/logo.vue'
import asMenu from './components/menu.vue'
import sideBar from './components/side-bar'

export default {
  name: 'all-search',
  components: {
    logo,
    asMenu,
    sideBar
  },
  setup () {
    const currentSite = siteInfo()
    const visible = ref(false)
    const classList = computed(() => [
      `as-${mode.value}`
    ])
    const openSet = () => {
      window.open('https://endday.gitee.io/all-search/')
    }

    function addBodyClass () {
      const body = document.body
      const map = new Map([
        ['body-horizontal', 'body-vertical'],
        ['body-vertical', 'body-horizontal']
      ])
      const newValue = `body-${mode.value}`
      const oldValue = map.get(newValue)
      body.classList.toggle(oldValue, false)
      body.classList.toggle(newValue, true)
    }

    function addCustomStyle () {
      const currentSite = siteInfo()
      if (currentSite && currentSite.style) {
        let styleContent = ''
        if (currentSite.style[1] && mode.value === 'horizontal') {
          styleContent = currentSite.style[1]
        } else if (currentSite.style[2] && mode.value === 'vertical') {
          styleContent = currentSite.style[2]
        }
        addStyleContent(styleContent, 'as-custom-style', undefined, true)
      }
    }

    function showBar () {
      visible.value = true
    }

    onMounted(() => {
      addBodyClass()
      addCustomStyle()
    })

    window.addEventListener('resize', debounce(() => {
      addBodyClass()
    }), false)

    return {
      currentSite,
      mode,
      classList,
      openSet,
      showBar
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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  }

  .as-horizontal {
    height: $height;
    width: 100%;
    top: 0;
    border-bottom: 1px #e8e8e8 solid;
    flex-direction: row;
  }

  .as-horizontal-hidden {
    // transform: translateY(-30px);
  }

  .as-vertical {
    height: 100%;
    width: $verticalWidth;
    top: 0;
    left: 0;
    border-right: 1px #e8e8e8 solid;
    flex-direction: column;
  }

  .as-container {
    position: fixed;
    display: flex !important;
    background-color: #fff;
    z-index: $mainZIndex;
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
