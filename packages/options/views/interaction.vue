<template>
  <div class="interaction-page">
    <section class="card">
      <header class="card-head">
        <h3 class="card-title">
          点击打开方式
        </h3>
        <p class="card-desc">
          控制左键点击链接时，是在当前页跳转还是新标签页打开。两组互不影响，改完即时生效。
        </p>      </header>

      <div class="row">
        <div class="row-label">
          <span class="row-name">主菜单</span>
          <span class="row-hint">顶部菜单条上的搜索引擎</span>
        </div>
        <el-radio-group v-model="menuOpenMode">
          <el-radio value="same">
            当前页
          </el-radio>
          <el-radio value="new">
            新标签页
          </el-radio>
        </el-radio-group>
      </div>

      <div class="row">
        <div class="row-label">
          <span class="row-name">划词</span>
          <span class="row-hint">选中文字后弹出的工具栏</span>
        </div>
        <el-radio-group v-model="selectionOpenMode">
          <el-radio value="same">
            当前页
          </el-radio>
          <el-radio value="new">
            新标签页
          </el-radio>
        </el-radio-group>
      </div>

      <div class="row">
        <div class="row-label">
          <span class="row-name">点击分类一次性打开</span>
          <span class="row-hint">
            点顶部分类时，把该分类下所有站点各开一个新标签页；Ctrl / 中键仍只开一个
          </span>
        </div>
        <el-switch
          v-model="openAllInCategory"
          active-text="开"
          inactive-text="关" />
      </div>

      <footer class="card-foot">
        <openModeTip compact />
      </footer>
    </section>
  </div>
</template>

<script setup lang="ts">
import openModeTip from '@src/components/open-mode-tip.vue'
import useOpenMode from '@src/components/useOpenMode'

// 与条上的设置抽屉共用同一份配置（__allSearch__openModeMenu / openModeSelection /
// openAllInCategory），改完即时生效
const { menuOpenMode, selectionOpenMode, openAllInCategory } = useOpenMode()
</script>

<style lang="scss">
.interaction-page {
  .card {
    max-width: 760px;
    padding: 20px 24px 8px;
    border: 1px solid var(--el-border-color-lighter);
    border-radius: 12px;
    background: var(--el-bg-color);
    box-shadow: 0 1px 2px rgba(0, 0, 0, .04);
  }

  .card-head {
    padding-bottom: 16px;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }

  .card-title {
    margin: 0 0 6px;
    font-size: 15px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }

  .card-desc {
    margin: 0;
    font-size: 13px;
    line-height: 1.6;
    color: var(--el-text-color-secondary);
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 16px 0;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }

  .row-label {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .row-name {
    font-size: 14px;
    color: var(--el-text-color-primary);
  }

  .row-hint {
    font-size: 12px;
    color: var(--el-text-color-secondary);
  }

  .card-foot {
    padding: 12px 0 8px;
    font-size: 12px;
    color: var(--el-text-color-secondary);
  }

  @media (max-width: 767px) {
    .row {
      align-items: flex-start;
      flex-direction: column;
      gap: 10px;
    }
  }
}
</style>
