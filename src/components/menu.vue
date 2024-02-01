<template>
  <scrollbar
    class="as-menu-container"
    :class="menuClass"
    :style="{justifyContent: align}"
    noresize>
    <ul
      class="as-menu">
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
import scrollbar from './scrollbar/src/scrollbar'
import menuItem from './menuItem'
import useAlign from './useAlign'
import useSites from './useSites'

export default {
  name: 'as-menu',
  components: {
    scrollbar,
    menuItem
  },
  props: {
    mode: {
      type: String,
      default: 'horizontal',
      validator: val => ['horizontal', 'vertical'].indexOf(val) > -1
    }
  },
  setup (props) {
    const { sites } = useSites('tm')
    const { value: align } = useAlign()

    const data = reactive({
      showTimeout: 50,
      hideTimeout: 200
    })

    const menuClass = computed(() => ({
      'as-horizontal': props.mode === 'horizontal',
      'as-vertical': props.mode === 'vertical'
    }))

    return {
      sites,
      data,
      align,
      menuClass
    }
  }
}
</script>

<style lang="scss">
@import "../assets/common";

.as-menu-container {
  flex: 1;
  display: flex;
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

.as-horizontal{
  .as-menu {
    flex-direction: row;
  }
}

.as-vertical {
  .as-menu {
    flex-direction: column;
  }

  .as-scrollbar__wrap {
    height: auto;
  }
}
</style>
