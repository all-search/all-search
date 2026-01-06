<script setup lang="ts">
import { computed } from 'vue'
import asButton from './button.vue'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const model = computed({
  get () {
    return props.modelValue || ''
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

const reset = () => {
  model.value = ''
}
</script>

<template>
  <div class="as-color-set">
    <label class="as-color-label">
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

<style lang="scss">
.as-color-set {
  .as-color-label {
    line-height: 1;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    outline: none;
    vertical-align: middle;
  }

  .input—color {
    width: 30px;
    height: 30px;
    padding: 4px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    background-color: var(--as-secondary-background-color);
    box-sizing: border-box;
  }

  .input—color::-webkit-color-swatch {
    border: 0;
  }

  .input—color::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  .reset-btn {
    margin-left: 20px;
  }
}
</style>
