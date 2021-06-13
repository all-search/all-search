<template>
  <div class="color-set">
    <label class="label">
      <input
        class="input—color"
        type="color"
        v-model="model"
      />
    </label>
    <asButton
      class="reset-btn"
      type="text"
      @click="reset">
      重置
    </asButton>
  </div>
</template>

<script>
import { computed } from 'vue'
import asButton from './button.vue'

export default {
  name: 'color',
  components: {
    asButton
  },
  props: {
    modelValue: {
      type: [String, Number]
    },
    defaultValue: {
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
    const reset = () => {
      model.value = props.defaultValue
    }
    return {
      model,
      reset
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

  }

  .reset-btn {
    margin-left: 20px;
  }
</style>
