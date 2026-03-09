<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  labelWidth?: string | number
  label?: string | number
}>(), {
  labelWidth: 80,
  label: ''
})

const labelStyle = computed(() => ({
  width: `${props.labelWidth}px`
}))
const contentStyle = computed(() => ({
  marginLeft: `${props.labelWidth}px`
}))
</script>

<template>
  <div>
    <label
      class="as-label"
      :style="labelStyle"
      v-text="label">
    </label>
    <div class="as-content" :style="contentStyle">
      <slot/>
    </div>
  </div>
</template>

<style lang="scss">
  .as-label {
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: var(--as-primary-text-color);
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }

  .as-content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
  }
</style>
