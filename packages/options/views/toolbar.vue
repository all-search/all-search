<template>
  <div class="toolbar-page">
    <section class="panel">
      <header class="panel-head">
        <div class="head-text">
          <h2 class="panel-title">
            划词工具栏
          </h2>
          <p class="panel-desc">
            选中网页文字后弹出的工具栏，顺序即展示顺序；%s 会被替换成选中的文字。
          </p>
        </div>
        <div class="head-actions">
          <el-button @click="openPicker">
            <el-icon><Menu /></el-icon>
            从菜单选择
          </el-button>
          <el-button
            type="primary"
            @click="addItem">
            <el-icon><Plus /></el-icon>
            添加网址
          </el-button>
        </div>
      </header>

      <draggable
        v-model="list"
        class="item-list"
        handle=".item-drag"
        :animation="150">
        <div
          v-for="(item, index) in list"
          :key="item.__uid"
          class="item-row"
          :class="{ 'is-hidden': item.data?.visible === false }">
          <span
            class="item-drag"
            title="拖拽排序"
            aria-hidden="true">
            <el-icon><Rank /></el-icon>
          </span>

          <el-input
            v-model="item.nameZh"
            class="item-name"
            placeholder="名称" />
          <el-input
            v-model="item.url"
            class="item-url"
            placeholder="网址，%s 代表选中的文字" />

          <el-tooltip
            :content="item.data?.visible === false ? '显示' : '隐藏'"
            placement="top">
            <el-button
              text
              class="item-action item-visible"
              :aria-label="item.data?.visible === false ? '显示' : '隐藏'"
              @click="toggleVisible(item)">
              <el-icon>
                <View v-if="item.data?.visible !== false" />
                <Hide v-else />
              </el-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip
            content="删除"
            placement="top">
            <el-button
              text
              class="item-action item-remove"
              aria-label="删除"
              @click="removeItem(index)">
              <el-icon><Delete /></el-icon>
            </el-button>
          </el-tooltip>
        </div>
      </draggable>

      <div
        v-if="!list.length"
        class="empty-state">
        <p class="empty-title">
          还没有工具栏项
        </p>
        <div class="empty-actions">
          <el-button
            text
            type="primary"
            @click="openPicker">
            从菜单选择
          </el-button>
          <el-button
            text
            type="primary"
            @click="addItem">
            手动添加一项
          </el-button>
        </div>
      </div>
    </section>

    <el-dialog
      v-model="pickerVisible"
      title="从菜单选择"
      width="720px"
      append-to-body
      class="picker-dialog">
      <div class="picker-body">
        <nav
          class="picker-nav"
          aria-label="分类">
          <button
            v-for="cate in categories"
            :key="cate.name"
            type="button"
            class="picker-nav-item"
            :class="{ 'is-active': cate.name === activeCategory }"
            @click="activeCategory = cate.name">
            <span class="picker-nav-name">{{ cate.nameZh }}</span>
            <span class="picker-nav-count">{{ cate.list.length }}</span>
          </button>
        </nav>
        <div class="picker-list">
          <el-checkbox-group v-model="picked">
            <el-checkbox
              v-for="item in activeItems"
              :key="item.url"
              :value="item.url"
              :disabled="isExisting(item.url)"
              border>
              {{ item.nameZh }}
              <span class="picker-host">{{ hostOf(item.url) }}</span>
              <span
                v-if="item.hidden"
                class="picker-hidden">菜单里已隐藏</span>
            </el-checkbox>
          </el-checkbox-group>
          <p
            v-if="!activeItems.length"
            class="picker-empty">
            这个分类还没有站点
          </p>
        </div>
      </div>
      <template #footer>
        <el-button @click="pickerVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          :disabled="!picked.length"
          @click="addPicked">
          添加所选{{ picked.length ? `（${picked.length}）` : '' }}
        </el-button>
      </template>
    </el-dialog>

    <save-bar
      :dirty="dirty"
      reset-text="重置"
      @save="save"
      @revert="revert"
      @reset="reset" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Delete, Hide, Menu, Plus, Rank, View } from '@element-plus/icons-vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { getStorage, setStorage } from '@src/util/storage'
import { initToolbar } from '@src/util/toolbar'
import useSites from '@src/components/useSites'
import saveBar from '../components/save-bar.vue'
import useUnsavedGuard from '../composables/use-unsaved-guard'
import confirmReset from '../composables/confirm-reset'

const draggable = VueDraggableNext

interface ToolbarItem {
  nameZh: string
  url: string
  icon?: string
  data?: { visible?: boolean }
  __uid?: string
}

let uidSeed = 0

function withUid (item: ToolbarItem): ToolbarItem {
  uidSeed += 1
  return { ...item, data: { ...item.data }, __uid: `t${uidSeed}` }
}

/** 只保留要存盘的字段，顺序也会体现在结果里 */
function formatList (source: ToolbarItem[]) {
  return source.map(item => ({
    nameZh: item.nameZh,
    url: item.url,
    icon: item.icon || '',
    data: { visible: item.data?.visible !== false }
  }))
}

function snapshotOf (source: ToolbarItem[]) {
  return JSON.stringify(formatList(source))
}

const list = ref<ToolbarItem[]>(initToolbar().map(withUid))
const savedSnapshot = ref(snapshotOf(list.value))

const dirty = computed(() => snapshotOf(list.value) !== savedSnapshot.value)

useUnsavedGuard(dirty)

// 存储是异步的：首屏先用内置默认值渲染，读到用户数据后再替换（避免空白闪一下）
onMounted(async () => {
  let stored: ToolbarItem[] | null = null
  try {
    stored = await getStorage<ToolbarItem[]>('toolbar')
  } catch {
    stored = null
  }
  if (!Array.isArray(stored) || !stored.length) return
  // 线下配置站连不上油猴时要等满 WebBridge 的 5 秒才降级；
  // 这期间用户可能已经点「从菜单选择」加了几项，别用旧数据把它们冲掉
  if (dirty.value) return
  list.value = stored.map(withUid)
  savedSnapshot.value = snapshotOf(list.value)
})

function toggleVisible (item: ToolbarItem) {
  item.data = { ...item.data, visible: item.data?.visible === false }
}

function addItem () {
  list.value.push(withUid({
    nameZh: '新网址',
    url: 'https://www.baidu.com/s?wd=%s&ie=utf-8',
    data: { visible: true }
  }))
}

function removeItem (index: number) {
  list.value.splice(index, 1)
}

/**
 * 「从菜单选择」：把站点配置里的引擎直接勾进工具栏，不用逐个手填网址（issue #67）。
 * 勾选状态按 url 记，所以可以跨分类挑；已经在工具栏里的项显示为禁用。
 */
interface PickerItem {
  nameZh?: string
  url: string
  icon?: string
  /** 在站点配置里被隐藏了（菜单里不显示），加进来时给个角标 */
  hidden?: boolean
}

interface PickerCategory {
  name: string
  nameZh?: string
  list: PickerItem[]
}

const { sites } = useSites()

/** 只保留能直接打开的条目（url 是字符串），正则匹配器不是可点击的地址 */
const categories = computed<PickerCategory[]>(() =>
  (sites.value || []).reduce<PickerCategory[]>((acc, cate) => {
    const list = (cate.list || [])
      .filter(item => typeof item.url === 'string')
      .map(item => ({
        nameZh: item.nameZh,
        url: item.url as string,
        icon: item.icon,
        hidden: item.data?.visible === false
      }))
    if (list.length) {
      acc.push({ name: cate.name, nameZh: cate.nameZh, list })
    }
    return acc
  }, [])
)

/**
 * 判断两个地址是不是同一个引擎。
 *
 * 只做「严格相等」不够：大小写、末尾斜杠、`%s` 之外的参数（`?wd=%s` vs `?wd=%s&ie=utf-8`）
 * 都会被当成不同条目，同一个引擎能重复加两次。
 */
function urlKey (url: string): string {
  const raw = String(url || '').trim()
  if (!raw) return ''
  try {
    // 占位符先换成一个不会出现在真实 URL 里的串，避免被 URL 解析吞掉
    const marker = '__QUERY__'
    const parsed = new URL(raw.replace('%s', marker))
    const host = parsed.hostname.toLowerCase().replace(/^www\./, '')
    const path = parsed.pathname.replace(/\/+$/, '')
    // 查询串里的占位符与参数都归一：同一个 host+path 视为同一个引擎
    return `${parsed.protocol.toLowerCase()}//${host}${path}`
  } catch {
    return raw.toLowerCase().replace(/\/+$/, '')
  }
}

const activeCategory = ref('')
const activeItems = computed(() => categories.value.find(c => c.name === activeCategory.value)?.list || [])
const allItems = computed(() => categories.value.flatMap(c => c.list))
const pickerVisible = ref(false)
const picked = ref<string[]>([])
const usedUrls = computed(() => new Set(list.value.map(item => urlKey(item.url))))

function isExisting (url: string): boolean {
  return usedUrls.value.has(urlKey(url))
}

function hostOf (url: string): string {
  try {
    return new URL(url.replace('%s', '')).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

function openPicker () {
  picked.value = []
  activeCategory.value = categories.value[0]?.name || ''
  pickerVisible.value = true
}

function addPicked () {
  const seen = new Set(list.value.map(item => urlKey(item.url)))
  let added = 0
  allItems.value
    .filter(item => picked.value.includes(item.url))
    .forEach(item => {
      const key = urlKey(item.url)
      if (seen.has(key)) return
      seen.add(key)
      list.value.push(withUid({
        nameZh: item.nameZh || '',
        url: item.url,
        icon: item.icon || '',
        data: { visible: true }
      }))
      added += 1
    })

  picked.value = []
  pickerVisible.value = false
  if (added) {
    ElMessage.success(`已添加 ${added} 项`)
  } else {
    ElMessage.info('这些站点已经在工具栏里了')
  }
}

async function save () {
  await setStorage('toolbar', formatList(list.value))
  savedSnapshot.value = snapshotOf(list.value)
  ElMessage.success('保存成功')
}

function revert () {
  list.value = JSON.parse(savedSnapshot.value).map(withUid)
  ElMessage.info('已撤销未保存的修改')
}

async function reset () {
  const ok = await confirmReset({
    title: '重置',
    message: '会清空自定义的工具栏项，恢复为内置默认数据。确定继续吗？',
    action: '重置'
  })
  if (!ok) return
  const defaults = initToolbar({ reset: true }).map(withUid)
  await setStorage('toolbar', formatList(defaults))
  list.value = defaults
  savedSnapshot.value = snapshotOf(list.value)
  ElMessage.success('已恢复默认数据')
}
</script>

<style lang="scss">
.toolbar-page {
  display: flex;
  flex-direction: column;
  flex: 1;

  /* 撑开剩余空间，保存条贴住视口底部 */
  > .panel {
    flex: none;
    margin-bottom: 16px;
  }

  > .save-bar {
    margin-top: auto;
  }

  .panel {
    padding: 16px 20px 20px;
    border: 1px solid var(--el-border-color-lighter);
    border-radius: 12px;
    background: var(--el-bg-color);
    box-shadow: 0 1px 2px rgba(0, 0, 0, .04);
  }

  .panel-head {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }

  .head-text {
    flex: 1;
    min-width: 0;
  }

  .panel-title {
    margin: 0 0 4px;
    font-size: 16px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }

  .panel-desc {
    margin: 0;
    font-size: 12px;
    line-height: 1.6;
    color: var(--el-text-color-secondary);
  }

  .item-list {
    min-height: 8px;
  }

  .item-row {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 46px;
    padding: 6px 4px;
    border-radius: 8px;
    transition: background-color .15s ease;

    &:hover {
      background: var(--el-fill-color-light);
    }

    &.is-hidden {
      .item-name,
      .item-url {
        opacity: .55;
      }
    }
  }

  .item-drag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    flex: none;
    color: var(--el-text-color-placeholder);
    cursor: grab;

    &:hover {
      color: var(--el-color-primary);
    }
  }

  .item-name {
    width: 160px;
    flex: none;
  }

  .item-url {
    flex: 1;
    min-width: 0;
  }

  .item-action {
    flex: none;
    font-size: 15px;
    color: var(--el-text-color-secondary);

    &:hover {
      background: var(--el-fill-color);
      color: var(--el-color-primary);
    }
  }

  .item-remove:hover {
    color: var(--el-color-danger);
  }

  .empty-state {
    padding: 40px 0;
    text-align: center;

    .empty-title {
      margin: 0 0 8px;
      font-size: 14px;
      color: var(--el-text-color-secondary);
    }

    .empty-actions {
      display: flex;
      gap: 8px;
      justify-content: center;
    }
  }

  .head-actions {
    display: flex;
    flex: none;
    gap: 8px;
  }

  @media (max-width: 767px) {
    .head-actions {
      flex-wrap: wrap;
    }
  }

  @media (max-width: 767px) {
    .item-row {
      flex-wrap: wrap;
      padding: 8px 4px;

      .item-name,
      .item-url {
        order: 2;
        width: 100%;
        flex: 1 1 100%;
      }

      .item-visible {
        order: 1;
        margin-left: auto;
      }

      .item-remove {
        order: 1;
      }
    }
  }
}

/* 选择弹窗 teleport 到 body，不在 .toolbar-page 里，用全局选择器 */
.picker-dialog {
  .picker-body {
    display: flex;
    gap: 12px;
    min-height: 240px;
  }

  .picker-nav {
    display: flex;
    flex: none;
    flex-direction: column;
    gap: 2px;
    width: 148px;
    max-height: 360px;
    overflow: auto;
    padding-right: 4px;
  }

  .picker-nav-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    padding: 8px 10px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: var(--el-text-color-regular);
    font-size: 13px;
    text-align: left;
    cursor: pointer;

    &:hover {
      background: var(--el-fill-color-light);
    }

    &.is-active {
      background: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
      font-weight: 600;
    }
  }

  .picker-nav-count {
    font-size: 12px;
    color: var(--el-text-color-secondary);
  }

  .picker-list {
    flex: 1;
    min-width: 0;
    max-height: 360px;
    overflow: auto;
  }

  .el-checkbox-group {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .el-checkbox {
    width: calc(50% - 4px);
    margin: 0;
    box-sizing: border-box;
  }

  .picker-host {
    margin-left: 6px;
    font-size: 12px;
    color: var(--el-text-color-secondary);
  }

  /* 站点配置里被隐藏的引擎：仍然可以加进工具栏，但要标出来 */
  .picker-hidden {
    margin-left: 6px;
    padding: 0 4px;
    border-radius: 4px;
    font-size: 11px;
    line-height: 16px;
    color: var(--el-text-color-secondary);
    background: var(--el-fill-color);
  }

  .picker-empty {
    margin: 24px 0 0;
    font-size: 13px;
    color: var(--el-text-color-secondary);
  }
}
</style>
