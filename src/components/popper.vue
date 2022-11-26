<template>
  <slot ref="trigger"
        name="trigger"
        v-bind="{ show, hide }"/>
  <transition name="slide-fade">
    <Teleport
      to="#all-search">
      <div
        v-show="visible"
        :class="popperClass"
        ref="popover"
        :data-show="visible"
        :data-initialized="popperInstance !== null"
        class="popover-content"
        style="display: none"
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
import { createPopper } from '@popperjs/core'
import useTimeout from '../util/useTimeout.js'
import { onClickOutside } from '../util/onClickOutside'

export default {
  props: {
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
    const popperInstance = ref(null)
    const { registerTimeout, cancelTimeout } = useTimeout()

    function createPopover (target) {
      if (popperInstance.value) {
        visible.value = true
        return
      }
      popperInstance.value = createPopper(
        target,
        popover.value,
        {
          strategy: props.strategy,
          placement: props.placement
        }
      )
    }

    function destroyPopover () {
      if (popperInstance.value) {
        popperInstance.value.destroy()
        popperInstance.value = null
      }
    }

    let stopFn

    function handleClickOutside (target) {
      if (!stopFn) {
        stopFn = onClickOutside(target, hide, {
          ignore: [
            popover.value
          ]
        })
      }
    }

    onUnmounted(() => {
      stopFn()
    })

    function show (target) {
      loaded.value = true
      visible.value = true
      createPopover(target)
      cancelTimeout()
      handleClickOutside(target)
    }

    function hide () {
      registerTimeout(() => {
        visible.value = false
        destroyPopover()
      }, 100)
    }

    return {
      visible,
      loaded,
      trigger,
      popover,
      popperInstance,
      show,
      hide
    }
  }
}
</script>

<style lang="scss">
.popover-content {
  --background-color: white;
  --border-color: lightgray;
  display: none;
  pointer-events: none;
  opacity: 0;
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

.popover-content[data-show="true"] {
  opacity: 1;
  pointer-events: initial;
}

.popover-content[data-initialized="true"] {
  display: block;
}

/* 可以为进入和离开动画设置不同的持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
