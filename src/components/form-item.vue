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

<script>
import { computed } from 'vue'

export default {
  name: 'form-item',
  props: {
    labelWidth: {
      type: [String, Number],
      default: 60
    },
    label: {
      type: [String, Number],
      default: ''
    }
  },
  setup (props) {
    const labelStyle = computed(() => ({
      width: `${props.labelWidth}px`
    }))
    const contentStyle = computed(() => ({
      marginLeft: `${props.labelWidth}px`
    }))

    return {
      labelStyle,
      contentStyle
    }
  }
}
</script>

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
