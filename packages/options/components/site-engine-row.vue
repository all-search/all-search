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
        decoding="async"
        @error="handleIconError">
      <span
        v-else
        class="engine-icon engine-icon--letter"
        :style="letterStyle"
        aria-hidden="true">{{ letter }}</span>

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
      <span
        v-else-if="probeState === 'dead'"
        class="engine-badge engine-badge--dead"
        title="检测不到响应：可能已下线，或被浏览器拦住了跨域请求">不可达</span>
      <span
        v-else-if="probeState === 'checking'"
        class="engine-badge engine-badge--checking">检测中</span>

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
            <el-dropdown-item command="fetch-icon">
              抓取图标
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
        ref="nameInput"
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
import { computed, nextTick, reactive, ref, watch } from 'vue'
import { MoreFilled, Picture, Rank } from '@element-plus/icons-vue'
import parseUrl from '@src/util/parseUrl'
import { iconLetter, iconPalette } from '@src/util/favicon'

const props = defineProps<{
  item: any
  index: number
  lastIndex: number
  editing: boolean
  iconCache: Record<string, string>
  sortingDisabled: boolean
  canAddPersonal: boolean
  /** 「检测可达性」的结果：dead 显示红色徽标，checking 显示进行中 */
  probeState?: 'checking' | 'ok' | 'dead' | 'skipped'
}>()

const emit = defineEmits<{
  (e: 'edit'): void
  (e: 'done', value: { nameZh: string, url: string }): void
  (e: 'cancel'): void
  (e: 'draft-dirty', dirty: boolean): void
  (e: 'icon', value: { nameZh: string, url: string }): void
  (e: 'command', command: string): void
}>()

/** 编辑态用本地草稿，避免直接改 props；点「完成」才回传 */
const draft = reactive({
  nameZh: props.item.nameZh || '',
  url: props.item.url || ''
})

const nameInput = ref()

watch(() => props.editing, (editing) => {
  if (!editing) {
    emit('draft-dirty', false)
    return
  }
  draft.nameZh = props.item.nameZh || ''
  draft.url = props.item.url || ''
  emit('draft-dirty', false)
  // 进入编辑态时原按钮被卸载，焦点会掉到 body；主动聚焦名称输入框
  nextTick(() => nameInput.value?.focus?.())
})

/** 草稿一改就告诉父组件，保存条才有「未保存」提示，切分类时也不会悄悄丢 */
watch(draft, () => {
  const dirty = draft.nameZh !== (props.item.nameZh || '') || draft.url !== (props.item.url || '')
  emit('draft-dirty', dirty)
}, { deep: true })

function confirm () {
  emit('done', { nameZh: draft.nameZh, url: draft.url })
}

const parsed = computed(() => parseUrl(props.item.url || ''))
const hostname = computed(() => parsed.value.hostname)
const failed = ref(false)

const letter = computed(() => iconLetter(props.item.nameZh || hostname.value))
const letterStyle = computed(() => {
  const palette = iconPalette(hostname.value || props.item.nameZh || '?')
  return { background: palette.bg, color: palette.fg }
})

/**
 * 只认「用户上传的图标」和「已经缓存到本地的图标」。
 * 配置页默认不请求任何外部服务：本地没有就显示首字母色块，要真实图标用 ⋯ 菜单里的「抓取图标」。
 */
const iconSrc = computed(() => {
  if (failed.value) return ''
  const cached = props.iconCache?.[hostname.value]
  if (cached) return cached
  return props.item.icon || ''
})

function handleIconError () {
  failed.value = true
}

/** 换了图标或域名就重新尝试一次 */
watch([() => props.item.icon, hostname], () => {
  failed.value = false
})

function handleCommand (command: string) {
  if (command === 'up') emit('command', 'up')
  else if (command === 'down') emit('command', 'down')
  else if (command === 'remove') emit('command', 'remove')
  else if (command === 'visible') emit('command', 'visible')
  else if (command === 'personal') emit('command', 'personal')
  else if (command === 'fetch-icon') emit('command', 'fetch-icon')
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

/* 没有图标时的首字母色块：不发任何请求，颜色由域名哈希决定 */
.engine-icon--letter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  user-select: none;
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

.engine-badge--dead {
  color: var(--el-color-danger);
  background: var(--el-color-danger-light-9);
}

.engine-badge--checking {
  color: var(--el-color-primary);
  background: var(--el-color-primary-light-9);
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
