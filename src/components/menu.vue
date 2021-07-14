<template>
  <scrollbar
    class="as-menu-container">
    <ul
      class="as-menu"
      :class="menuClass"
      :style="{justifyContent: align}">
      <menu-item
        v-for="item in sites"
        :key="item.name"
        :item="item"
        :mode="mode">
      </menu-item>
    </ul>
  </scrollbar>
</template>

<script>
import { computed, reactive } from 'vue'
import scrollbar from 'element-plus/lib/el-scrollbar'
import 'element-plus/lib/theme-chalk/el-scrollbar.css'
import { initSites } from '../util/sites'
import menuItem from './menuItem.vue'
import icon from '../components/icon.vue'
import useAlign from '../components/align.js'

export default {
  name: 'as-menu',
  components: {
    scrollbar,
    menuItem,
    icon
  },
  props: {
    mode: {
      type: String,
      default: 'horizontal',
      validator: val => ['horizontal', 'vertical'].indexOf(val) > -1
    }
  },
  setup (props) {
    const sites = reactive(initSites('tm'))
    const { align } = useAlign()

    const data = reactive({
      showTimeout: 50,
      hideTimeout: 200
    })

    const transition = computed(() => props.mode === 'horizontal' ? 'drop' : 'fade')
    const menuClass = computed(() => ({
      'as-horizontal-menu': props.mode === 'horizontal',
      'as-vertical-menu': props.mode === 'vertical'
    }))

    return {
      sites,
      data,
      align,
      transition,
      menuClass
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/common";

  .as-menu-container {
    flex: 1;
  }

  .as-menu {
    padding: 0;
    margin: 0;
    white-space: nowrap;
    border: 0;
    box-shadow: none;
    background-color: var(--as-bg-color);
    display: flex;
  }

  .as-horizontal-menu {
    flex-direction: row;
  }

  .as-vertical-menu {
    flex-direction: column;
  }

  .drop-enter-active, .drop-leave-active {
    transition: all 0.2s cubic-bezier(.645, .045, .355, 1);
  }

  .drop-enter, .drop-leave-to {
    opacity: 0;
    transform: scaleY(0.0001);
  }

  .fade-enter-active, .fade-leave-active {
    transition: all 0.2s cubic-bezier(.645, .045, .355, 1);
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
