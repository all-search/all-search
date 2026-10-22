<template>
  <div
    class="engine-row"
    :class="{ 'is-hidden': !item.data.visible, 'is-editing': editing }">
    <span
      v-if="!sortingDisabled"
      class="engine-drag"
      title="拖拽排序"
      aria-hidden="true">
      <el-icon><Rank/></el-icon>
    </span>

    <template v-if="!editing">
      <img
        v-if="iconSrc"
        class="engine-icon"
        :src="iconSrc"
        alt=""
        loading="lazy"
        @error="handleIconError">
      <span
        v-else
        class="engine-icon engine-icon--empty"
        aria-hidden="true">{{ (item.nameZh || '?').slice(0, 1) }}</span>

      <button
        type="button"
        class="engine-main"
        :aria-label="`编辑 ${item.nameZh}`"
        @click="$emit('edit')">
        <span class="engine-name">{{ item.nameZh || '未命名' }}</span>
        <span class="engine-host">{{ hostname }}</span>
      </button>

      <span
        v-if="!item.data.visible"
        class="engine-badge">已隐藏</span>

      <el-dropdown
        trigger="click"
        @command="handleCommand">
        <el-button
          text
          class="engine-more"
          aria-label="更多操作">
          <el-icon><MoreFilled/></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="edit">
              编辑
            </el-dropdown-item>
            <el-dropdown-item command="icon">
              更换图标
            </el-dropdown-item>
            <el-dropdown-item
              v-if="canAddPersonal"
              command="personal">
              加入常用
            </el-dropdown-item>
            <el-dropdown-item command="visible">
              {{ item.data.visible ? '隐藏' : '显示' }}
            </el-dropdown-item>
            <el-dropdown-item
              command="up"
              :disabled="index === 0">
              上移
            </el-dropdown-item>
            <el-dropdown-item
              command="down"
              :disabled="index === lastIndex">
              下移
            </el-dropdown-item>
            <el-dropdown-item
              command="remove"
              divided>
              删除
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>

    <div
      v-else
      class="engine-editor">
      <el-input
        v-model="draft.nameZh"
        class="editor-name"
        placeholder="名称"
        @keyup.enter="confirm" />
      <el-input
        v-model="draft.url"
        class="editor-url"
        placeholder="网址，%s 代表关键词"
        @keyup.enter="confirm" />
      <el-button
        aria-label="上传图标"
        @click="$emit('icon', { ...draft })">
        <el-icon><Picture/></el-icon>
      </el-button>
      <el-button
        type="primary"
        @click="confirm">
        完成
      </el-button>
      <el-button
        @click="$emit('cancel')">
        取消
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { MoreFilled, Picture, Rank } from '@element-plus/icons-vue'
import parseUrl from '@src/util/parseUrl'

const props = defineProps<{
  item: any
  index: number
  lastIndex: number
  editing: boolean
  iconCache: Record<string, string>
  sortingDisabled: boolean
  canAddPersonal: boolean
}>()

const emit = defineEmits<{
  (e: 'edit'): void
  (e: 'done', value: { nameZh: string, url: string }): void
  (e: 'cancel'): void
  (e: 'icon', value: { nameZh: string, url: string }): void
  (e: 'command', command: string): void
}>()

/** 编辑态用本地草稿，避免直接改 props；点「完成」才回传 */
const draft = reactive({
  nameZh: props.item.nameZh || '',
  url: props.item.url || ''
})

watch(() => props.editing, (editing) => {
  if (!editing) return
  draft.nameZh = props.item.nameZh || ''
  draft.url = props.item.url || ''
})

function confirm () {
  emit('done', { nameZh: draft.nameZh, url: draft.url })
}

const parsed = computed(() => parseUrl(props.item.url || ''))
const hostname = computed(() => parsed.value.hostname)
const origin = computed(() => parsed.value.origin)
const failed = ref(false)

/** 优先用上传过的图标，其次用接口，最后回落到站点自己的 favicon.ico */
const iconSrc = computed(() => {
  const host = hostname.value
  const cached = props.iconCache?.[host]
  if (cached) return cached
  if (props.item.icon) return props.item.icon
  if (failed.value) return host ? `${origin.value}/favicon.ico` : ''
  return host ? `https://favicon.yandex.net/favicon/v2/${encodeURIComponent(host)}?size=32` : ''
})

function handleIconError () {
  failed.value = true
}

/** 换了域名就重新尝试一次图标接口 */
watch(hostname, () => {
  failed.value = false
})

function handleCommand (command: string) {
  if (command === 'up') emit('command', 'up')
  else if (command === 'down') emit('command', 'down')
  else if (command === 'remove') emit('command', 'remove')
  else if (command === 'visible') emit('command', 'visible')
  else if (command === 'personal') emit('command', 'personal')
  else if (command === 'icon') emit('icon', { nameZh: props.item.nameZh, url: props.item.url })
  else emit('edit')
}
</script>

<style scoped lang="scss">
.engine-row {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 46px;
  padding: 6px 8px 6px 4px;
  border-radius: 8px;
  transition: background-color .15s ease;

  &:hover {
    background: var(--el-fill-color-light);
  }

  &.is-hidden {
    .engine-name,
    .engine-host {
      color: var(--el-text-color-disabled);
    }

    .engine-icon {
      filter: grayscale(1);
      opacity: .6;
    }
  }

  &.is-editing {
    background: var(--el-fill-color-lighter);
  }
}

.engine-drag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  color: var(--el-text-color-placeholder);
  cursor: grab;

  &:hover {
    color: var(--el-color-primary);
  }
}

.engine-icon {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  object-fit: contain;
  flex: none;
  background: var(--el-fill-color-light);
}

.engine-icon--empty {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: var(--el-text-color-secondary);
}

.engine-main {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;

  &:hover .engine-name {
    color: var(--el-color-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--el-color-primary);
    outline-offset: 2px;
    border-radius: 4px;
  }
}

.engine-name {
  font-size: 14px;
  color: var(--el-text-color-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.engine-host {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.engine-badge {
  flex: none;
  font-size: 12px;
  padding: 1px 8px;
  border-radius: 10px;
  color: var(--el-text-color-secondary);
  background: var(--el-fill-color);
}

.engine-more {
  flex: none;
  opacity: .45;

  &:hover,
  &:focus-visible {
    opacity: 1;
  }
}

.engine-editor {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;

  .editor-name {
    width: 160px;
    flex: none;
  }

  .editor-url {
    flex: 1;
    min-width: 0;
  }
}

@media (max-width: 767px) {
  .engine-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }

  .engine-editor {
    flex-wrap: wrap;

    .editor-name,
    .editor-url {
      width: 100%;
    }
  }
}
</style>
