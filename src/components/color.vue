<template>
  <div class="color-set">
    <label class="label">
      <input
        class="input—color"
        type="color"
        :default-value="model"
        v-model="model"
      />
    </label>
    <p class="reset-btn">重置</p>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'color',
  props: {
    modelValue: {
      type: [String, Number]
    },
    default: {
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

  .color-set {
    display: flex;
    align-items: center;
  }

  .reset-btn {
    margin: 0;
    padding: 0 20px;
    color: var(--as-primary-text-color);
  }
</style>
