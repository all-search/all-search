<template>
  <component
    :is="tag"
    ref="triggerRef">
    <slot
      name="trigger"
      v-bind="{ show, hide }"
    />
  </component>
  <transition name="slide-fade">
    <Teleport
      v-if="visible"
      name="teleport"
      to="#all-search">
      <div
        v-show="isPositioned"
        :class="popperClass"
        ref="popoverRef"
        class="as-popover-content"
        :style="floatingStyles"
        @mouseenter="show"
        @mouseleave="hide">
        <template v-if="loaded">
          <slot/>
        </template>
      </div>
    </Teleport>
  </transition>
</template>

<script>
import { ref, watch, computed, onUnmounted } from 'vue'
import { useFloating } from '@floating-ui/vue'
import useTimeout from '../util/useTimeout.js'
import { onClickOutside } from '../util/onClickOutside'

export default {
  props: {
    tag: {
      default: 'div'
    },
    placement: {
      type: String,
      default: 'auto'
    },
    strategy: {
      type: String,
      default: 'fixed'
    },
    popperClass: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const visible = ref(false)
    const loaded = ref(false)
    const triggerRef = ref(null)
    const popoverRef = ref(null)
    const { registerTimeout, cancelTimeout } = useTimeout()

    function init () {
      return useFloating(triggerRef, popoverRef, {
        open: visible,
        transform: false,
        strategy: 'fixed',
        placement: props.placement// props.placement
      })
    }

    let ctx = init()

    const floatingStyles = computed(() => ctx.floatingStyles.value)
    const isPositioned = computed(() => ctx.isPositioned.value)

    watch(() => props.placement, () => {
      ctx = init()
    })

    function show () {
      loaded.value = true
      // trigger.value = target
      // floating.value = popover.value
      // floatingStyles.value = init().floatingStyles.value
      cancelTimeout()
      handleClickOutside(triggerRef.value)
      visible.value = true
    }

    function hide () {
      registerTimeout(() => {
        visible.value = false
      }, 50)
    }

    let stopFn

    function handleClickOutside (target) {
      if (!stopFn) {
        stopFn = onClickOutside(target, hide, {
          ignore: [
            popoverRef.value
          ]
        })
      } else {
        stopFn()
        stopFn = onClickOutside(target, hide, {
          ignore: [
            popoverRef.value
          ]
        })
      }
    }

    onUnmounted(() => {
      stopFn && stopFn()
    })

    return {
      visible,
      loaded,
      isPositioned,
      triggerRef,
      popoverRef,
      floatingStyles,
      show,
      hide
    }
  }
}
</script>

<style lang="scss">
@use "../assets/common" as *;

.as-popover-content {
  --background-color: white;
  --border-color: lightgray;
  z-index: $overlayZIndex;
  position: relative;

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

/* 可以为进入和离开动画设置不同的持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
