<script setup lang="ts">
import { reactive, ref, unref, computed, nextTick } from 'vue'
import { getAsRoot } from '../util'
import { openUrl, otherOpenMode, type OpenMode } from '../util/openUrl'
import { selection } from './selection'
import { selectionOpenMode } from './useOpenMode'
import useToolbar from './useToolbar'
import favicon from './favicon.vue'
import icon from './icon.vue'
import { Site } from '../types/site'

const emit = defineEmits<{
  (e: 'open-dialog', keyword: string): void
}>()

const {
  visible: toolbarVisible,
  list
} = useToolbar('tm')
const visible = ref(false)
const toolbarEle = ref<HTMLElement | null>(null)
const styleObj = reactive({
  top: 0,
  left: 0
})

const style = computed(() => ({
  top: `${styleObj.top - 20}px`,
  left: `${styleObj.left}px`
}))

function getSelectionText() {
  return window.getSelection()?.toString().trim() || ''
}

/**
 * 输入框（<input>/<textarea>）里的选区不归 window.getSelection() 管，
 * 单独取一下，顺带解决「搜索框里选词不出工具栏」（issue #88）
 */
function getInputSelection(): { text: string; rect: DOMRect | null } {
  const el = document.activeElement
  const isField = el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement
  if (!el || !isField) {
    return { text: '', rect: null }
  }
  const start = el.selectionStart
  const end = el.selectionEnd
  if (typeof start !== 'number' || typeof end !== 'number' || start === end) {
    return { text: '', rect: null }
  }
  const text = el.value.slice(Math.min(start, end), Math.max(start, end)).trim()
  if (!text) {
    return { text: '', rect: null }
  }
  return { text, rect: el.getBoundingClientRect() }
}

function getSelectionRect() {
  const selection = window.getSelection()
  if (selection && selection.rangeCount) {
    return selection.getRangeAt(0).getBoundingClientRect()
  }
  return null
}

/** 当前要展示的选区：页面划词优先，其次输入框内选区 */
function readSelection(): { text: string; rect: DOMRect | null } {
  const text = getSelectionText()
  if (text) {
    return { text, rect: getSelectionRect() }
  }
  return getInputSelection()
}

function scrollTop() {
  return document.documentElement.scrollTop || document.body.scrollTop
}

function scrollLeft() {
  return document.documentElement.scrollLeft || document.body.scrollLeft
}

let selectStart = false
let lastRect: DOMRect | null = null

function changeVisible(val: boolean) {
  visible.value = val
  nextTick(() => {
    if (!val) {
      return
    }
    const toolbarEleValue = unref(toolbarEle)
    if (!toolbarEleValue) {
      return
    }
    const toolbarClientRect = toolbarEleValue.getBoundingClientRect()
    const height = toolbarClientRect.bottom - toolbarClientRect.top
    if (lastRect) {
      const { x, right, left, top } = lastRect
      // 取整：半像素定位会让工具栏整体发虚
      styleObj.top = Math.round(scrollTop() + top - height)
      styleObj.left = Math.round(scrollLeft() + x + ((right - left) / 2) - (toolbarClientRect.width / 2))
    }
  })
}

/**
 * 影子 DOM 内的事件冒泡到 window 时，e.target 会被重定向成宿主元素（<all-search-ui>），
 * 用它做 contains 判断会把“点在工具栏上”误判成“点在外面”。
 * 这里统一改用 composedPath() 判断真实路径。
 */
function eventPath (e: Event): EventTarget[] {
  return typeof e.composedPath === 'function' ? e.composedPath() : []
}

function isInApp (e: Event): boolean {
  const root = getAsRoot()
  if (!root) return false
  if (eventPath(e).includes(root)) return true
  return e.target instanceof Node && root.contains(e.target)
}

function isInToolbar (e: Event): boolean {
  const el = unref(toolbarEle)
  return !!el && eventPath(e).includes(el)
}

window.addEventListener('mousedown', function (e) {
  if (!isInApp(e)) {
    changeVisible(false)
  }
  // 输入框里双击 / 拖选时，部分浏览器不会派发 selectstart，这里补上
  const target = e.target
  if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
    selectStart = true
  }
}, true)

window.addEventListener('mouseup', function (e) {
  const include = isInApp(e)
  const isToolbar = isInToolbar(e)
  if (!include) {
    const { text, rect } = readSelection()
    selection.value = text
    lastRect = rect
    changeVisible(!!selection.value && selectStart)
  } else if (!isToolbar) {
    selection.value = ''
  } else if (isToolbar) {
    changeVisible(false)
  }
  selectStart = false
}, true)

document.addEventListener('selectstart', function () {
  selectStart = true
}, false)

/** Ctrl / 中键固定走“另一侧”的打开方式 */
const altMode = computed(() => otherOpenMode(selectionOpenMode.value))

function handleClick (item: Site, mode?: OpenMode) {
  const keyword = selection.value
  const url = (item.url as string).replace('%s', keyword)
  openUrl(url, mode || selectionOpenMode.value)
}

function openMainDialog() {
  emit('open-dialog', selection.value)
}
</script>

<template>
  <div
    v-if="toolbarVisible === 1"
    v-show="visible"
    class="bar-container"
    ref="toolbarEle"
    :style="style">
    <favicon
      class="tool-bar-item"
      v-for="(item, i) in list"
      :key="i"
      :url="(item.url as string)"
      :title="item.nameZh"
      @click.exact="handleClick(item)"
      @click.ctrl.exact="handleClick(item, altMode)"
      @click.middle.exact="handleClick(item, altMode)"/>
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
