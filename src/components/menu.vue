<script setup lang="ts">
import { computed } from 'vue'
import scrollbar from './scrollbar/src/scrollbar.vue'
import menuItem from './menu-item.vue'
import useAlign from './useAlign'
import useSites from './useSites'

const props = withDefaults(defineProps<{
  direction?: 'horizontal' | 'vertical'
  mode?: string
}>(), {
  direction: 'horizontal',
  mode: 'top'
})

const { sites } = useSites('tm')
const { value: align } = useAlign()

const menuClass = computed(() => ({
  'as-horizontal': props.mode === 'horizontal',
  'as-vertical': props.mode === 'vertical'
}))
</script>

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
        :direction="direction"
        :mode="mode">
      </menu-item>
    </ul>
  </scrollbar>
</template>

<style lang="scss">
@use "../assets/common" as *;

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
  list-style: none;
}

.as-horizontal {
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
    width: 100%;
  }
}
</style>
