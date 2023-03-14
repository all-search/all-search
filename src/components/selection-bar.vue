<template>
  <div class="bar-container"
       v-if="show === 1"
       v-show="visible"
       ref="toolbarEle"
       :style="style">
    <favicon
      class="tool-bar-item"
      v-for="(item, i) in list"
      :key="i"
      :url="item.url"
      :title="item.nameZh"
      @click.exact="handleClick(item, true)"
      @click.ctrl.exact="handleClick(item, false)"
      @click.middle.exact="handleClick(item, false)"/>
    <div
      class="tool-bar-item"
      @click="openMainDialog">
      <icon
        class="as-more-icon"
        name="more"
      />
    </div>
  </div>
</template>

<script>
import { reactive, ref, unref, computed, nextTick } from 'vue'
import { getAsRoot } from '../util'
import { selection } from './selection'
import { initToolbar } from '../util/sites'
import useToolbar from './useToolbar'
import favicon from './favicon'
import icon from './icon'

function getSelection () {
  return window.getSelection().toString().trim()
}

function getSelectionRect () {
  const selection = window.getSelection()
  if (selection.rangeCount) {
    return selection.getRangeAt(0).getBoundingClientRect()
  }
  return null
}

function scrollTop () {
  return document.documentElement.scrollTop || document.body.scrollTop
}

function scrollLeft () {
  return document.documentElement.scrollLeft || document.body.scrollLeft
}

export default {
  name: 'selection-bar',
  components: {
    favicon,
    icon
  },
  setup (props, ctx) {
    const { toolbar: show } = useToolbar()
    const list = reactive(initToolbar('tm'))
    const visible = ref(false)
    const toolbarEle = ref(null)
    const styleObj = reactive({
      top: 0,
      left: 0
    })

    const style = computed(() => ({
      top: `${styleObj.top - 20}px`,
      left: `${styleObj.left}px`
    }))

    const selectionShort = computed(() => {
      if (selection.value.length > 12) {
        return `${selection.value.substr(0, 12)}...`
      } else {
        return selection.value
      }
    })
    let selectStart = false

    function changeVisible (val) {
      visible.value = Boolean(val)
      nextTick(() => {
        if (!val) {
          return
        }
        if (!unref(toolbarEle)) {
          return
        }
        const toolbarClientRect = unref(toolbarEle).getBoundingClientRect()
        const height = toolbarClientRect.bottom - toolbarClientRect.top
        const selectionRect = getSelectionRect()
        if (selectionRect) {
          const { x, right, left, top } = selectionRect
          styleObj.top = scrollTop() + top - height
          styleObj.left = scrollLeft() + x + ((right - left) / 2) - (toolbarClientRect.width / 2)
        }
      })
    }

    function isToolbarContains (el) {
      const toolbarEleValue = unref(toolbarEle)
      if (toolbarEleValue) {
        return toolbarEleValue.contains(el)
      } else {
        return false
      }
    }

    window.addEventListener('mousedown', function (e) {
      const include = e.target && getAsRoot().contains(e.target)
      if (!include) {
        changeVisible(false)
      }
    }, true)

    window.addEventListener('mouseup', function (e) {
      const include = e.target && getAsRoot().contains(e.target)
      const isToolbar = e.target && isToolbarContains(e.target)
      if (!include) {
        selection.value = getSelection()
        changeVisible(!!selection.value && selectStart)
      } else if (!isToolbar) {
        selection.value = ''
      } else if (isToolbar) {
        changeVisible(false)
      }
      selectStart = false
    }, true)

    document.addEventListener('selectionchange', function () {
      // selection.value = getSelection()
      // if (!selection.value) {
      //   changeVisible(false)
      // }
    }, true)

    document.addEventListener('selectstart', function () {
      selectStart = true
    }, false)

    function handleClick (item, newWin) {
      const keyword = selection.value
      if (newWin) {
        window.open(item.url.replace('%s', keyword))
      } else {
        window.location.href = item.url.replace('%s', keyword)
      }
    }

    function openMainDialog () {
      ctx.emit('open-dialog', selection.value)
    }

    return {
      show,
      list,
      visible,
      toolbarEle,
      style,
      selectionShort,
      handleClick,
      openMainDialog
    }
  }
}
</script>

<style lang="scss" scoped>
.bar-container {
  display: flex;
  padding: 2px;
  max-width: 300px;
  position: absolute;
  z-index: 99999;
  background-color: #fff;
  color: #444;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 3px 0 rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  cursor: pointer;
  white-space: nowrap;
}

.tool-bar-item {
  margin: 0;
  padding: 2px;
  width: 20px;
  height: 20px;
  border: 1px solid #FFF;
  cursor: pointer;
  box-sizing: content-box;

  &:hover {
    border-color: var(--as-border-color);
  }
}

.as-more-icon {
  display: block;
  font-size: 20px;
}
</style>
