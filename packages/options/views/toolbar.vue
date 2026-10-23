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
        <el-button
          type="primary"
          @click="addItem">
          <el-icon><Plus /></el-icon>
          添加网址
        </el-button>
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
        <el-button
          text
          type="primary"
          @click="addItem">
          添加第一项
        </el-button>
      </div>
    </section>

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
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete, Hide, Plus, Rank, View } from '@element-plus/icons-vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { getStorage, setStorage } from '@src/util/storage'
import { initToolbar } from '@src/util/toolbar'
import saveBar from '../components/save-bar.vue'
import useUnsavedGuard from '../composables/use-unsaved-guard'

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

async function save () {
  await setStorage('toolbar', formatList(list.value))
  savedSnapshot.value = snapshotOf(list.value)
  ElMessage.success('保存成功')
}

function revert () {
  list.value = JSON.parse(savedSnapshot.value).map(withUid)
  ElMessage.info('已撤销未保存的修改')
}

function reset () {
  ElMessageBox.confirm('会清空自定义的工具栏项，恢复为内置默认数据。确定继续吗？', '重置', {
    confirmButtonText: '重置',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const defaults = initToolbar({ reset: true }).map(withUid)
    await setStorage('toolbar', formatList(defaults))
    list.value = defaults
    savedSnapshot.value = snapshotOf(list.value)
    ElMessage.success('已恢复默认数据')
  }).catch(() => {})
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
</style>
