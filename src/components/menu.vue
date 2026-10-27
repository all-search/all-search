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
  /* 不给 0 的话 flex 子项会把内容压到容器宽度，横向滚动就失效了 */
  min-width: 0;

  /* 窄屏：13 个分类在 375px 里只放得下 5 个，靠横向滑动看剩下的 */
  @media screen and (max-width: 750px) {
    .as-scrollbar__wrap {
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-x: contain;
    }
  }
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

.as-menu .as-menu-item {
  /* 分类按内容宽度排开，不参与压缩 */
  flex: 0 0 auto;
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
