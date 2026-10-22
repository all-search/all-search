<template>
  <div class="edit-page">
    <section class="panel">
      <header class="panel-head">
        <div class="head-text">
          <h2 class="panel-title">
            JSON 编辑
          </h2>
          <p class="panel-desc">
            直接编辑站点配置（分类含 name / nameZh / list，站点含 nameZh / url / icon / data）。保存前会做字段校验。
          </p>
        </div>
      </header>
      <json-editor
        :value="localSites"
        @reset="reset"
        @save="save"
        @change="change" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import jsonEditor from '@src/components/json-editor.vue'
import { setStorage } from '@src/util/storage'
import defaultSites from '@src/config/sites'
import useSites, { reloadSites } from '@src/components/useSites'
import useUnsavedGuard from '../composables/use-unsaved-guard'

const localSites = ref<any[]>([])
const savedSnapshot = ref('[]')
/** 共享的站点数据：存储异步读回来后会更新，这里跟着走 */
const { sites } = useSites()

const dirty = computed(() => JSON.stringify(localSites.value) !== savedSnapshot.value)

useUnsavedGuard(dirty)

function clone<T> (value: T): T {
  return JSON.parse(JSON.stringify(value))
}

function apply (value: any[]) {
  localSites.value = clone(value || [])
  savedSnapshot.value = JSON.stringify(localSites.value)
}

// 存储是异步的：线下页面要等 WebBridge 超时才读到用户数据。
// 之前只在 setup 里读一次，于是编辑器里永远是内置默认值，一保存就把用户数据盖掉。
watch(sites, (value) => {
  if (dirty.value) return
  apply(value)
}, { immediate: true })

function reset () {
  localSites.value = clone(defaultSites)
  ElMessage.success('已恢复为内置默认数据，记得保存')
}

async function save (val: any[]) {
  localSites.value = val
  await setStorage('sites', val)
  // 让站点列表页和其它持有者读到新数据
  await reloadSites()
  savedSnapshot.value = JSON.stringify(val)
  ElMessage.success('保存成功')
}

function change (val: any[]) {
  localSites.value = val
}
</script>

<style lang="scss">
.edit-page {
  display: flex;
  flex: 1;
  min-height: 0;

  .panel {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    padding: 16px 20px 0;
    border: 1px solid var(--el-border-color-lighter);
    border-radius: 12px;
    background: var(--el-bg-color);
    box-shadow: 0 1px 2px rgba(0, 0, 0, .04);
  }

  .panel-head {
    flex: none;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--el-border-color-lighter);
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
}
</style>
