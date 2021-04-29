<template>
  <div class="as-container"
       :class="classList"
       style="display: none">
    <logo :mode="mode"/>
    <as-menu
      :mode="mode"/>
    <div class="as-setting"
         @click="openSet">
      设置
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { getSession } from '../util'
import { debounce } from '../util/debounce'
import { siteInfo } from '../config/loadList'
import logo from './components/logo.vue'
import asMenu from './components/menu.vue'

export default {
  name: 'all-search',
  components: {
    logo,
    asMenu
  },
  setup () {
    const currentSite = siteInfo()
    const mode = ref(getSession('mode') || 'horizontal')
    const visible = ref(false)
    const classList = computed(() => [
      `as-${mode.value}`,
      {
        [`as-${mode.value}-hidden`]: !visible.value
      }
    ])
    const openSet = () => {
      window.open('https://endday.gitee.io/all-search/')
    }

    function initBody () {
      const body = document.body
      const map = new Map([
        ['body-horizontal', 'body-vertical'],
        ['body-vertical', 'body-horizontal']
      ])
      const newValue = `body-${mode.value}`
      const oldValue = map.get(newValue)
      console.log(newValue, oldValue)
      body.classList.toggle(oldValue, false)
      body.classList.toggle(newValue, true)
    }

    function showBar () {
      visible.value = true
    }

    onMounted(() => {
      initBody()
    })

    window.addEventListener('resize', debounce(() => {
      initBody()
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
