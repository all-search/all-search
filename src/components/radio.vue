<template>
  <label
    class="as-radio as-radio-animate">
    <input
      type="radio"
      :value="label"
      v-model="model"/>
    <i
      class="as-radio-icon">
    </i>
    <span
      class="as-radio-label">
      <slot/>
    </span>
  </label>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'as-radio',
  props: {
    modelValue: {
      type: [String, Number, Boolean]
    },
    label: {
      type: [String, Number, Boolean],
      default: ''
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

<style lang="scss">
  /* radio */
  label.as-radio {
    color: var(--as-primary-text-color);
    font-weight: 500;
    line-height: 1;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    outline: none;
    font-size: 14px;
    user-select: none;
    & + & {
      margin-left: 14px;
    }
    input {
      position: absolute;
      opacity: 0;
      visibility: hidden;
    }
    .as-radio-icon {
      display: inline-block;
      position: relative;
      width: 12px;
      height: 12px;
      background: var(--as-bg-color);
      border: 1px solid #979797;
      border-radius: 50%;
      vertical-align: -2px;
    }
    input:checked + .as-radio-icon:after {
      position: absolute;
      content: "";
      width: 6px;
      height: 6px;
      background-color: var(--as-bg-color);
      border-radius: 50%;
      top: 3px;
      left: 3px;
    }
    input:checked + .as-radio-icon {
      background: var(--as-primary-color);
      border: 1px solid var(--as-primary-color);

    }
    input:disabled + .as-radio-icon {
      background-color: #e8e8e8;
      border: solid 1px #979797;
    }
    input:disabled:checked + .as-radio-icon:after {
      background-color: #c1c1c1;
    }
    &.as-radio-animate .as-radio-icon {
      transition: background-color ease-out .3s;
    }

    .as-radio-label {
      margin-left: 6px;
      font-size: 14px;
    }
  }
</style>
