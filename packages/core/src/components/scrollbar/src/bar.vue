<template>
  <transition name="as-scrollbar-fade">
    <div
      v-show="always || visible"
      ref="instance"
      :class="['as-scrollbar__bar', 'is-' + bar.key]"
      @mousedown="clickTrackHandler"
    >
      <div
        ref="thumb"
        class="as-scrollbar__thumb"
        :style="thumbStyle"
        @mousedown="clickThumbHandler"
      />
    </div>
  </transition>
</template>
<script>
import {
  getCurrentInstance,
  defineComponent,
  ref,
  reactive,
  computed,
  onBeforeUnmount,
  nextTick,
  onMounted
} from 'vue'
import { BAR_MAP, on, off, renderThumbStyle } from './util'

export default defineComponent({
  props: {
    vertical: Boolean,
    size: {
      type: String,
      default: ''
    },
    move: {
      type: Number,
      default: 0
    },
    ratio: {
      type: Number,
      default: 0
    },
    always: Boolean

  },
  setup (props) {
    const visible = ref(false)
    const barStore = reactive({})
    let cursorDown = false
    let cursorLeave = false
    const thumb = ref(null) //elem元素
    const instance = ref(null)//elem元素
    let onselectstartStore = null
    const { proxy } = getCurrentInstance()
    const scrollbar = proxy.$parent
    const bar = computed(() => {
      return BAR_MAP[props.vertical ? 'vertical' : 'horizontal']
    })
    const offsetRatio = computed(() => {
      return instance.value[bar.value.offset] ** 2 /
        scrollbar.wrap[bar.value.scrollSize] /
        props.ratio /
        thumb.value[bar.value.offset]

    })
    const thumbStyle = computed(() => {
      return renderThumbStyle({
        size: props.size,
        move: props.move,
        bar: bar.value
      })
    })
    const mouseMoveDocumentHandler = e => {
      if (cursorDown === false) return
      const prevPage = barStore[bar.value.axis]

      if (!prevPage) return

      const offset = (
        instance.value.getBoundingClientRect()[bar.value.direction]
        - e[bar.value.client]) * -1

      const thumbClickPosition = thumb.value[bar.value.offset] - prevPage
      const thumbPositionPercentage =
        (offset - thumbClickPosition) * 100 * offsetRatio.value /
        instance.value[bar.value.offset]
      scrollbar.wrap[bar.value.scroll] =
        thumbPositionPercentage * scrollbar.wrap[bar.value.scrollSize] / 100
    }
    const mouseUpDocumentHandler = () => {
      cursorDown = false
      barStore[bar.value.axis] = 0
      off(document, 'mousemove', mouseMoveDocumentHandler)
      off(document, 'mouseup', mouseUpDocumentHandler)
      document.onselectstart = onselectstartStore
      if (cursorLeave) {
        visible.value = false
      }
    }
    const startDrag = e => {
      e.stopImmediatePropagation()
      cursorDown = true
      on(document, 'mousemove', mouseMoveDocumentHandler)
      on(document, 'mouseup', mouseUpDocumentHandler)
      onselectstartStore = document.onselectstart
      document.onselectstart = () => false
    }
    const clickThumbHandler = e => {
      // prevent click event of middle and right button
      e.stopPropagation()
      if (e.ctrlKey || [1, 2].includes(e.button)) {
        return
      }
      window.getSelection().removeAllRanges()
      startDrag(e)
      barStore[bar.value.axis] =
        e.currentTarget[bar.value.offset] -
        (e[bar.value.client] -
          e.currentTarget.getBoundingClientRect()[
            bar.value.direction
            ])
    }

    const clickTrackHandler = e => {
      const offset = Math.abs(
        e.target.getBoundingClientRect()[bar.value.direction] -
        e[bar.value.client]
      )
      const thumbHalf = thumb[bar.value.offset] / 2
      const thumbPositionPercentage =
        (offset - thumbHalf) * 100 * offsetRatio.value /
        instance[bar.value.offset]

      scrollbar.wrap[bar.value.scroll] =
        thumbPositionPercentage * scrollbar.wrap[bar.value.scrollSize] / 100
    }

    const mouseMoveScrollbarHandler = () => {
      cursorLeave = false
      visible.value = !!props.size
    }

    const mouseLeaveScrollbarHandler = () => {
      cursorLeave = true
      visible.value = cursorDown
    }
    onMounted(() => {
      nextTick(() => {
        on(scrollbar.scrollbar, 'mousemove', mouseMoveScrollbarHandler)
        on(scrollbar.scrollbar, 'mouseleave', mouseLeaveScrollbarHandler)
      })
    })

    onBeforeUnmount(() => {
      off(document, 'mouseup', mouseUpDocumentHandler)
      off(scrollbar.scrollbar, 'mousemove', mouseMoveScrollbarHandler)
      off(scrollbar.scrollbar, 'mouseleave', mouseLeaveScrollbarHandler)
    })
    return {
      clickThumbHandler,
      clickTrackHandler,
      thumbStyle,
      bar,
      visible,
      instance,
      thumb
    }
  }
})
</script>
