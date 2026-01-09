<script setup lang="ts">
import { computed } from 'vue'
import logo from './logo.vue'
import asMenu from './menu.vue'
import sideBar from './side-bar.vue'
import hoverBtn from './hover-btn.vue'
import type { Mode, Direction } from './useMode'
import { SHOW_STATUS, type ShowStatus } from './useSwitchShow'

const props = defineProps<{
  mode: Mode
  direction: Direction
  show: ShowStatus | boolean
  visible: boolean
}>()

const isExpanded = computed(() => props.show === true || props.show === SHOW_STATUS.VISIBLE)

const classList = computed(() => [
  `as-${props.direction}`,
  `as-${props.mode}`,
  isExpanded.value ? 'as-show' : 'as-hide'
])
</script>

<template>
  <div
    v-show="visible"
    class="as-container"
    :class="classList">
    <logo :direction="direction"/>
    <as-menu
      :direction="direction"
      :mode="mode"
    />
    <side-bar/>
  </div>
  <hover-btn v-show="visible"/>
</template>
