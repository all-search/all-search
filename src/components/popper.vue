<template>
  <slot name="trigger" v-bind="{ show, hide }" />
  <transition name="slide-fade">
    <Teleport
      to="body">
      <div
        :class="popperClass"
        ref="popover"
        :data-show="isVisible"
        :data-initialized="popperInstance !== null"
        class="popover-content"
        @mouseenter="show"
        @mouseleave="hide">
<!--        <div class="arrow" data-popper-arrow />-->
        <slot />
      </div>
    </Teleport>
  </transition>
</template>

<script>
import { createPopper } from '@popperjs/core'
import useTimeout from '../util/useTimeout.js'
import {
  defineComponent,
  ref
} from 'vue'

export default defineComponent({
  props: {
    placement: {
      type: String,
      default: 'auto'
    },
    strategy: {
      type: String,
      default: 'absolute'
    },
    popperClass: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const isVisible = ref(false)
    const popover = ref(null)
    const popperInstance = ref(null)
    const { registerTimeout, cancelTimeout } = useTimeout()

    function createPopover (target) {
      if (popperInstance.value) {
        return
      }
      popperInstance.value = createPopper(
        target,
        popover.value,
        {
          strategy: props.strategy,
          placement: props.placement,
          modifiers: [
            /*{
              name: 'arrow',
              options: {
                padding: 24
              }
            },*/
            {
              name: 'offset',
              options: {
                offset: [0, 10]
              }
            }
          ]
        }
      )
    }

    function destroyPopover () {
      if (popperInstance.value) {
        popperInstance.value.destroy()
        popperInstance.value = null
      }
    }

    function show (target) {
      isVisible.value = true
      createPopover(target)
      cancelTimeout()
    }

    function hide () {
      registerTimeout(() => {
        isVisible.value = false
        destroyPopover()
      }, 200)
    }

    return {
      isVisible,
      popover,
      popperInstance,
      show,
      hide
    }
  }
})
</script>

<style lang="scss">
.popover-content {
  --background-color: white;
  --border-color: lightgray;
  display: none;
  pointer-events: none;
  opacity: 0;
  z-index: 999;
}

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

.popover-content[data-show="true"] {
  opacity: 1;
  pointer-events: initial;
}

.popover-content[data-initialized="true"] {
  display: block;
}

.popover-content[data-popper-placement^="bottom"] {
  .arrow {
    top: -10px;
    border-width: 0 8px 10px 8px;
    border-color: transparent transparent var(--border-color) transparent;
    margin-left: -8px;

    &::before {
      top: 1px;
      left: -7px;
      border-width: 0 7px 9px 7px;
      border-color: transparent transparent var(--background-color) transparent;
    }
  }
}

.popover-content[data-popper-placement^="top"] {
  .arrow {
    bottom: -10px;
    border-width: 10px 8px 0 8px;
    border-color: var(--border-color) transparent transparent transparent;
    margin-left: -8px;

    &::before {
      bottom: 1px;
      left: -7px;
      border-width: 9px 7px 0 7px;
      border-color: var(--background-color) transparent transparent transparent;
    }
  }
}

.popover-content[data-popper-placement^="left"] {
  .arrow {
    right: -10px;
    margin-top: -8px;
    border-width: 8px 0 8px 10px;
    border-color: transparent transparent transparent var(--border-color);

    &::before {
      right: 1px;
      top: -7px;
      border-width: 7px 0 7px 9px;
      border-color: transparent transparent transparent var(--background-color);
    }
  }
}

.popover-content[data-popper-placement^="right"] {
  .arrow {
    left: -10px;
    margin-top: -8px;
    border-width: 8px 10px 8px 0;
    border-color: transparent var(--border-color) transparent transparent;

    &::before {
      left: 1px;
      top: -7px;
      border-width: 7px 9px 7px 0;
      border-color: transparent var(--background-color) transparent transparent;
    }
  }
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
