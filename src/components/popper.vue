<template>
  <component
    :is="tag"
    ref="trigger">
    <slot
      name="trigger"
      v-bind="{ show, hide }"
    />
  </component>
  <transition name="slide-fade">
    <Teleport
      name="teleport"
      to="#all-search">
      <div
        v-show="visible"
        :class="popperClass"
        ref="popover"
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
import { ref, onUnmounted } from 'vue'
import { useFloating, flip, shift } from '@floating-ui/vue'
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
    const trigger = ref(null)
    const popover = ref(null)
    const { registerTimeout, cancelTimeout } = useTimeout()

    function initFloat () {
      // console.log(trigger.value)
      return useFloating(trigger, popover, {
        middleware: [
          shift(2),
          flip()
        ],
        placement: props.placement,
        strategy: props.strategy
      })
    }

    function show (target) {
      loaded.value = true
      // trigger.value = target
      // floating.value = popover.value
      cancelTimeout()
      handleClickOutside(trigger.value)
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
            popover.value
          ]
        })
      } else {
        stopFn()
        stopFn = onClickOutside(target, hide, {
          ignore: [
            popover.value
          ]
        })
      }
    }

    onUnmounted(() => {
      stopFn && stopFn()
    })

    const { floatingStyles } = initFloat()

    return {
      visible,
      loaded,
      trigger,
      popover,
      floatingStyles,
      show,
      hide
    }
  }
}
</script>

<style lang="scss">
.as-popover-content {
  --background-color: white;
  --border-color: lightgray;
  z-index: 99999;
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
  transform: translateX(20px);
  opacity: 0;
}
</style>
