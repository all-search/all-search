<template>
  <component :is="tag" ref="triggerRef">
    <slot name="trigger" v-bind="{ show, hide }"/>
  </component>
  <transition name="slide-fade">
    <div v-if="visible"
         :class="popperClass"
         ref="popoverRef"
         class="as-popover-content"
         :style="floatingStyles"
         :data-placement="placement"
         @mouseenter="show"
         @mouseleave="hide">
      <template v-if="loaded">
        <slot v-bind="{ isPositioned }"/>
      </template>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onUnmounted, toRef } from 'vue'
import { useFloating, shift, flip, offset, autoUpdate } from '@floating-ui/vue'
import useTimeout from '../util/useTimeout'
import { onClickOutside } from '../util/onClickOutside'

const props = withDefaults(defineProps<{
  tag?: string
  placement?: any
  strategy?: 'fixed' | 'absolute'
  popperClass?: string
}>(), {
  tag: 'div',
  placement: 'auto',
  strategy: 'fixed',
  popperClass: ''
})

const visible = ref(false)
const loaded = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const popoverRef = ref<HTMLElement | null>(null)
const { registerTimeout, cancelTimeout } = useTimeout()
const placementRef = toRef(props, 'placement')


function show () {
  loaded.value = true
  cancelTimeout()
  if (triggerRef.value) {
    handleClickOutside(triggerRef.value)
  }
  visible.value = true
}

function hide () {
  registerTimeout(() => {
    visible.value = false
  }, 50)
}

let stopFn: (() => void) | undefined

function handleClickOutside (target: HTMLElement) {
  if (stopFn) {
    stopFn()
  }
  stopFn = onClickOutside(target, hide, {
    ignore: [
      popoverRef.value as HTMLElement
    ]
  })
}

const {
  placement,
  isPositioned,
  floatingStyles
} = useFloating(triggerRef, popoverRef, {
  transform: false,
  placement: placementRef,
  strategy: props.strategy,
  whileElementsMounted: autoUpdate,
  middleware: [
    offset(5),
    flip(),
    shift({ padding: 5 })
  ]
})

onUnmounted(() => {
  stopFn && stopFn()
})
</script>

<style lang="scss">
@use "../assets/common" as *;

.as-popover-content {
  z-index: $overlayZIndex;
  position: relative;
  /* 性能优化：启用硬件加速 */
  will-change: transform, opacity;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;

  .arrow,
  .arrow::before {
    width: 0;
    height: 0;
    border-style: solid;
  }

  .arrow::before {
    content: '';
    position: absolute;
  }
}

/* 统一的动画设置，提供更好的视觉一致性 */
.slide-fade-enter-active {
  transition: transform 0.15s cubic-bezier(.645, .045, .355, 1),
              opacity 0.15s cubic-bezier(.645, .045, .355, 1);
}

.slide-fade-leave-active {
  transition: transform 0.1s cubic-bezier(.645, .045, .355, 1),
              opacity 0.1s cubic-bezier(.645, .045, .355, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

/* 处理带有-start后缀的placement值 */
.slide-fade-enter-from[data-placement='bottom-start'],
.slide-fade-leave-to[data-placement='bottom-start'] {
  transform: translateY(-100%);
  transform-origin: top center;
}

.slide-fade-enter-from[data-placement='top-start'],
.slide-fade-leave-to[data-placement='top-start'] {
  transform: translateY(100%);
  transform-origin: bottom center;
}

.slide-fade-enter-from[data-placement='left-start'],
.slide-fade-leave-to[data-placement='left-start'] {
  transform: translateX(100%);
  transform-origin: center right;
}

.slide-fade-enter-from[data-placement='right-start'],
.slide-fade-leave-to[data-placement='right-start'] {
  transform: translateX(-100%);
  transform-origin: center left;
}
</style>
