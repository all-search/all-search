<template>
  <label>
    <input
      class="input—color"
      type="color"
      :default-value="model"
      v-model="model"
    />
  </label>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'color',
  props: {
    modelValue: {
      type: [String, Number]
    }
  },
  setup (props, ctx) {
    const model = computed({
      get () {
        return props.modelValue
      },
      set (value) {
        ctx.emit('update:modelValue', value)
      }
    })
    return {
      model
    }
  }
}
</script>

<style scoped>
  label {
    line-height: 1;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    outline: none;
    vertical-align: middle;
  }

  .input—color {
    width: 20px;
    height: 20px;
    padding: 4px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    background-color: var(--as-secondary-background-color);
  }

  .input—color::-webkit-color-swatch {
    border: 0;
  }

  .input—color::-webkit-color-swatch-wrapper {
    padding: 0;
  }
</style>
