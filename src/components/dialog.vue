<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  visible?: boolean
  title?: string
  width?: string
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

const style = computed(() => {
  const obj: Record<string, string> = {}
  if (props.width) {
    obj.width = props.width
  }
  return obj
})

const localVisible = computed({
  get: () => !!props.visible,
  set: value => {
    emit('update:visible', value)
  }
})

const handleClose = () => {
  localVisible.value = false
}
</script>

<template>
  <div class="as-dialog"
       v-show="localVisible">
    <div class="as-dialog-container"
         :style="style">
      <div class="as-dialog__header">
        <slot name="header"></slot>
      </div>
      <div class="as-dialog__body">
        <slot></slot>
      </div>
    </div>
    <div class="as-dialog__mask"
         @click="handleClose"/>
  </div>
</template>

<style lang="scss">
.as-dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  z-index: 99999;

  &__mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
  }

  &-container {
    position: relative;
    background: rgba(243, 243, 243, .85);
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    box-sizing: border-box;
    min-width: 50%;
    max-width: 80%;
    z-index: 99;
    margin: 40vh auto 50px;
    transform: translateY(-40%);
    overflow: hidden;
    backdrop-filter: saturate(3) blur(20px);
  }

  &__header {
    position: relative;
  }

  &__body {
    color: #666;
    font-size: 14px;
    word-break: break-all;
  }

  &__footer {
    padding: 10px 20px 20px;
    text-align: right;
    box-sizing: border-box;
  }

  &__close {
    display: inline-block;
    position: absolute;
    top: 16px;
    right: 24px;
    padding: 0;
    background: transparent;
    cursor: pointer;
    font-size: 16px;
    color: #909399;

    &:before {
      content: "\2716";
    }
  }
}
</style>
