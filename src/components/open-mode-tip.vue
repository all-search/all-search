<template>
  <p class="as-open-mode-tip">
    「主菜单」= 顶部菜单里的分类和网址；「划词」= 选中文字后的工具栏与「更多」弹窗。<br>
    按住 Ctrl 或用鼠标中键点击，会以上面所选的<strong>另一种</strong>方式打开。
  </p>
</template>

<style lang="scss">
/**
 * 「点击打开方式」的说明文案。
 * 同时用于条上的设置抽屉（Shadow DOM）和配置站，所以颜色都带 fallback。
 */
.as-open-mode-tip {
  margin: 8px 0 16px;
  padding: 8px 10px;
  font-size: 12px;
  line-height: 1.65;
  color: var(--as-primary-text-color, #606266);
  background: rgba(0, 0, 0, .035);
  border-radius: 4px;
  opacity: .85;

  strong {
    font-weight: 600;
    color: var(--as-primary-color, #1890ff);
  }
}
</style>
