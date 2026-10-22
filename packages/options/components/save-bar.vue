<template>
  <footer class="save-bar">
    <span
      class="save-status"
      :class="{ 'is-dirty': dirty }">
      <el-icon
        v-if="dirty"
        class="status-icon">
        <WarningFilled />
      </el-icon>
      {{ dirty ? dirtyText : cleanText }}
    </span>
    <el-button
      :disabled="!dirty"
      @click="$emit('revert')">
      {{ revertText }}
    </el-button>
    <el-button @click="$emit('reset')">
      {{ resetText }}
    </el-button>
    <el-button
      type="primary"
      :disabled="!dirty"
      @click="$emit('save')">
      保存
    </el-button>
  </footer>
</template>

<script setup lang="ts">
import { WarningFilled } from '@element-plus/icons-vue'

withDefaults(defineProps<{
  dirty: boolean
  revertText?: string
  resetText?: string
  dirtyText?: string
  cleanText?: string
}>(), {
  revertText: '撤销修改',
  resetText: '恢复默认',
  dirtyText: '有未保存的修改',
  cleanText: '所有修改已保存'
})

defineEmits<{
  (e: 'save'): void
  (e: 'revert'): void
  (e: 'reset'): void
}>()
</script>

<style lang="scss">
.save-bar {
  position: sticky;
  bottom: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  padding: 10px 16px;
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 12px;
  background: var(--el-bg-color);

  .save-status {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 1;
    font-size: 13px;
    color: var(--el-text-color-secondary);

    &.is-dirty {
      color: var(--el-color-warning);
    }
  }

  .status-icon {
    font-size: 14px;
  }
}

@media (max-width: 767px) {
  .save-bar {
    flex-wrap: wrap;

    .save-status {
      width: 100%;
      flex: none;
    }

    .el-button {
      flex: 1;
    }
  }
}
</style>
