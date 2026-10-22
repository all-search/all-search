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
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import jsonEditor from '@src/components/json-editor.vue'
import { setStorage } from '@src/util/storage'
import defaultSites from '@src/config/sites'
import useSites, { reloadSites } from '@src/components/useSites'

const localSites = ref<any[]>([])

function clone<T> (value: T): T {
  return JSON.parse(JSON.stringify(value))
}

function init () {
  const { sites } = useSites()
  // 拷一份再编辑，避免未保存的改动影响菜单条正在用的数据
  localSites.value = clone(sites.value)
}

function reset () {
  localSites.value = clone(defaultSites)
  ElMessage.success('已恢复为内置默认数据，记得保存')
}

async function save (val: any[]) {
  localSites.value = val
  await setStorage('sites', val)
  // 让站点列表页和其它持有者读到新数据
  await reloadSites()
  ElMessage.success('保存成功')
}

function change (val: any[]) {
  localSites.value = val
}

init()
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
