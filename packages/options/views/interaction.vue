<template>
  <div class="interaction-page">
    <section class="card">
      <h3 class="card-title">点击打开方式</h3>
      <p class="card-desc">控制左键点击链接时，是在当前页跳转还是新标签页打开。两组互不影响。</p>

      <div class="row">
        <span class="row-label">主菜单</span>
        <el-radio-group v-model="menuOpenMode">
          <el-radio value="same">当前页</el-radio>
          <el-radio value="new">新标签页</el-radio>
        </el-radio-group>
      </div>

      <div class="row">
        <span class="row-label">划词</span>
        <el-radio-group v-model="selectionOpenMode">
          <el-radio value="same">当前页</el-radio>
          <el-radio value="new">新标签页</el-radio>
        </el-radio-group>
      </div>

      <openModeTip/>
    </section>
  </div>
</template>

<script setup lang="ts">
import openModeTip from '@src/components/open-mode-tip.vue'
import useOpenMode from '@src/components/useOpenMode'

// 与条上的设置抽屉共用同一份配置（__allSearch__openModeMenu / openModeSelection），改完即时生效
const { menuOpenMode, selectionOpenMode } = useOpenMode()
</script>

<style lang="scss">
.interaction-page {
  padding: 20px;

  .card {
    background: #fff;
    border-radius: 4px;
    padding: 20px 24px 24px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .06);
  }

  .card-title {
    margin: 0 0 6px;
    font-size: 16px;
    color: #303133;
  }

  .card-desc {
    margin: 0 0 18px;
    font-size: 13px;
    color: #909399;
  }

  .row {
    display: flex;
    align-items: center;
    margin-bottom: 14px;
  }

  .row-label {
    width: 72px;
    font-size: 14px;
    color: #606266;
  }
}
</style>
