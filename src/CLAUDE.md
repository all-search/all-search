[根目录](../CLAUDE.md) > **src**

# Src 模块 - 核心源码库

## 变更记录 (Changelog)

### 2025-12-30 14:24:51 - 初始化模块文档
- 创建模块级 CLAUDE.md
- 记录核心组件、配置和工具函数

---

## 模块职责

**核心源码库**，包含 All-Search 的所有共享代码，被 Tampermonkey 脚本、浏览器插件和配置页面三个模块复用。提供 Vue 组件、配置管理、工具函数等核心功能。

## 入口与启动

### 主入口组件
- **文件**: `src/index.vue`
- **作用**: All-Search 的根组件，负责初始化和渲染整个应用
- **组件名**: `all-search`

**核心逻辑**:
```vue
<template>
  <div class="as-container" :class="classList">
    <logo :direction="direction"/>
    <as-menu :direction="direction" :mode="mode"/>
    <side-bar/>
  </div>
  <hoverBtn/>
  <selection-bar @openDialog="openDialog"/>
  <search-dialog v-model:visible="dialogVisible" :keyword="keyword"/>
  <iconfont/>
</template>
```

**职责**:
1. 初始化样式保护（`protectStyle()`）
2. 注入特殊样式（`initSpecialStyle()`）
3. 管理布局模式和方向
4. 控制显示/隐藏状态
5. 处理全屏检测

## 对外接口

### Vue 组件

#### 基础 UI 组件
- `button.vue` - 自定义按钮
- `dialog.vue` - 对话框
- `favicon.vue` - 网站图标显示
- `logo.vue` - All-Search Logo
- `icon.vue` - 图标组件
- `radio.vue` - 单选框
- `color.vue` - 颜色选择器
- `overlay.vue` - 遮罩层

#### 功能组件
- `menu.vue` - 搜索引擎菜单（核心组件）
- `menu-item.vue` - 菜单项
- `side-bar.vue` - 侧边栏（设置入口）
- `search-dialog.vue` - 搜索对话框
- `version-alert.vue` - 版本更新提示

#### 交互组件
- `hover-btn.vue` - 悬停按钮（用于显示/隐藏菜单）
- `selection-bar.vue` - 文本选择工具栏
- `popper.vue` - 浮层定位组件
- `scrollbar/` - 自定义滚动条

#### 表单组件
- `form-item.vue` - 表单项
- `json-editor.vue` - JSON 编辑器封装

### Composables（组合式函数）

#### 1. `useConfig.js` - 配置管理
```javascript
export default function useConfig() {
  return {
    config: reactive({
      mode: 1,        // 布局模式: 1-水平, 2-垂直
      direction: 1,   // 方向: 1-顶部/左侧, 2-底部/右侧
      color: '#1890ff',
      show: 1         // 显示状态: 0-隐藏, 1-显示, 2-移除
    })
  }
}
```

#### 2. `useSites.js` - 搜索引擎数据
```javascript
export default function useSites() {
  return {
    sites: ref([]),
    loadSites: async () => {},
    saveSites: async (data) => {},
    resetSites: () => {}
  }
}
```

#### 3. `useToolbar.js` - 工具栏状态
```javascript
export default function useToolbar(env) {
  return {
    visible: ref(1),
    toggle: () => {}
  }
}
```

#### 4. `useMode.js` - 布局模式
```javascript
export default function useMode() {
  return {
    value: computed(() => config.mode),
    direction: computed(() => config.direction)
  }
}
```

#### 5. `useSwitchShow.js` - 显示切换
```javascript
export default function useSwitchShow() {
  return {
    show: ref(1),
    toggle: () => {}
  }
}
```

#### 其他 Composables
- `useAlign.js` - 对齐方式
- `useColor.js` - 颜色管理
- `useFavicon.js` - 网站图标处理

### 配置数据

#### 1. 搜索引擎配置 (`config/sites/`)
**主索引**: `config/sites/index.js`
- 导出 12 个分类，每个分类包含多个搜索引擎
- 数据结构:
  ```javascript
  {
    nameZh: "搜索",
    name: "search",
    list: [
      {
        nameZh: "百度",
        url: "https://www.baidu.com/s?wd=%s",
        data: { visible: true }
      }
    ],
    data: { visible: true }
  }
  ```

**分类文件**:
- `search.js` - 通用搜索（百度、Google、Bing 等）
- `translate.js` - 翻译工具
- `video.js` - 视频搜索
- `shopping.js` - 购物搜索
- `music.js` - 音乐搜索
- `developer.js` - 开发工具
- `news.js` - 新闻搜索
- `social.js` - 社交网络
- `knowledge.js` - 百科知识
- `image.js` - 图片搜索
- `disk.js` - 网盘搜索
- `scholar.js` - 学术搜索

#### 2. 网站适配配置 (`config/loadList.js`)
214+ 网站的特殊处理规则:
```javascript
{
  url: /\/\/www\.baidu\.com\/(s|baidu)\?/,
  style: {
    1: '.selected-search-box { transform: translateY(-30px);}'
  },
  selectors: '#kw' // 输入框选择器
}
```

**配置项**:
- `url` - URL 匹配正则
- `style` - 特殊样式注入（按布局模式）
- `selectors` - 关键词输入框选择器
- `invisible` - 是否隐藏菜单

#### 3. 工具栏配置 (`config/toolbar.js`)
默认工具栏配置:
```javascript
[
  {
    nameZh: "百度",
    url: "https://www.baidu.com/s?wd=%s&ie=utf-8"
  },
  {
    nameZh: "百度翻译",
    url: "https://fanyi.baidu.com/#auto/zh/%s"
  }
]
```

### 工具函数 (`util/`)

#### 核心工具
- `index.js` - 通用工具函数（`getName`, `parseJson`, `version` 等）
- `storage.js` - 存储适配层（自动适配 GM API 和 chrome.storage）
- `hook.js` - 钩子函数
- `store.js` - 全局状态管理

#### 样式处理
- `initStyle.js` - 初始化样式和样式保护
  - `protectStyle()` - 防止样式被覆盖
  - `changeBodyStyle()` - 调整 body 样式（适配布局）
  - `addCustomStyle()` - 添加自定义样式
- `addSpecialStyle.js` - 注入特殊网站样式
- `injectStyle.js` - 通用样式注入函数

#### 交互功能
- `getKeyword.js` - 提取网页关键词
- `fullScreen.js` - 全屏检测
- `clipboard.js` - 剪贴板操作
- `onClickOutside.js` - 点击外部检测
- `tap.js` - 触摸事件处理

#### 兼容性
- `routerChange.js` - SPA 路由变化监听
- `addScript.js` - 动态添加脚本
- `sites.js` - 网站匹配工具

#### 性能优化
- `debounce.js` - 防抖
- `raf.js` - requestAnimationFrame 封装
- `useTimeout.js` - 超时处理
- `useScroll.js` - 滚动处理

#### URL 处理
- `parseUrl.js` - URL 解析

## 关键依赖与配置

### Vue 相关
- `vue` 3.3.4 - 核心框架
- Composition API - 使用 `ref`, `reactive`, `computed`, `watch` 等

### 第三方库
- `@floating-ui/vue` - Popper 浮层定位
- `resize-observer-polyfill` - 响应式观察器 polyfill

### 样式
- `assets/normalize.css` - CSS 重置
- `assets/common.scss` - 共享 SCSS 变量和混入
- SCSS 变量:
  ```scss
  $height: 40px;           // 水平布局高度
  $verticalWidth: 100px;   // 垂直布局宽度
  $mainZIndex: 99990;      // 主容器 z-index
  ```

### CSS 变量（运行时）
```css
--as-horizontal-height: 40px;
--as-primary-color: #1890ff;
--as-bg-color: #ffffff;
--as-primary-text-color: #606266;
--as-secondary-background-color: #f5f7fa;
--as-border-color: #e8e8e8;
```

## 数据模型

### 1. 站点信息 (`siteInfo.js`)
```javascript
export const site = reactive({
  url: '',          // 当前网站 URL
  name: '',         // 网站名称
  keyword: '',      // 提取的关键词
  disabled: false,  // 是否禁用
  invisible: false, // 是否隐藏
  style: {},        // 特殊样式
  selectors: ''     // 输入框选择器
})
```

### 2. 全局状态 (`store.js`)
```javascript
export default reactive({
  tmVersion: '',    // Tampermonkey 版本
  // 其他全局状态...
})
```

### 3. 配置对象
```javascript
{
  mode: 1,          // 1-水平, 2-垂直
  direction: 1,     // 1-顶部/左侧, 2-底部/右侧
  color: '#1890ff', // 主题色
  show: 1,          // 0-隐藏, 1-显示, 2-移除
  // 其他配置...
}
```

### 4. 搜索引擎数据结构
```javascript
{
  nameZh: "搜索",           // 中文名称
  name: "search",           // 英文标识
  list: [                   // 搜索引擎列表
    {
      nameZh: "百度",
      url: "https://www.baidu.com/s?wd=%s",
      data: { visible: true }
    }
  ],
  data: { visible: true }   // 分类可见性
}
```

## 架构设计

### 组件层次结构
```
index.vue (根组件)
├── logo.vue (Logo)
├── menu.vue (菜单)
│   └── menuItem.vue (菜单项)
│       └── favicon.vue (图标)
├── side-bar.vue (侧边栏)
│   ├── button.vue (按钮)
│   ├── dialog.vue (对话框)
│   └── color.vue (颜色选择器)
├── hover-btn.vue (悬停按钮)
├── selection-bar.vue (选择工具栏)
│   └── popper.vue (浮层)
├── search-dialog.vue (搜索对话框)
└── iconfont.vue (图标字体)
```

### 数据流
```
用户交互
  ↓
组件事件
  ↓
Composables (useSites, useConfig, etc.)
  ↓
Storage API (storage.js)
  ↓
GM API / chrome.storage
```

### 样式隔离策略
1. **命名空间**: 所有样式使用 `#all-search` 或 `.as-` 前缀
2. **Shadow DOM**: 未使用（为了兼容性）
3. **!important**: 关键样式使用 `!important` 防止覆盖
4. **样式保护**: `protectStyle()` 动态添加保护样式

## 测试与质量

### 测试策略
- **无自动化测试**: 当前没有单元测试或 E2E 测试
- **手动测试**: 在多个网站上测试

### 测试场景
1. **组件测试**:
   - 各组件是否正常渲染
   - 交互是否正常工作
   - 样式是否正确

2. **工具函数测试**:
   - 存储读写是否正确
   - 关键词提取是否准确
   - URL 匹配是否正确

3. **兼容性测试**:
   - 214+ 支持网站
   - 特殊样式是否生效
   - 不同浏览器兼容性

### 代码质量
- **ESLint**: 使用根配置
- **Vue 规范**: 遵循 Vue 3 组合式 API 最佳实践
- **代码组织**: 按功能模块划分目录

## 常见问题 (FAQ)

### Q: 如何添加新的搜索引擎？
A:
1. 找到对应分类文件（如 `config/sites/search.js`）
2. 在数组中添加新对象：
   ```javascript
   {
     nameZh: "搜索引擎名称",
     url: "https://example.com/search?q=%s",
     data: { visible: true }
   }
   ```
3. `%s` 会被替换为关键词

### Q: 如何适配新网站？
A:
在 `config/loadList.js` 中添加：
```javascript
{
  url: /\/\/example\.com\//,
  selectors: '#search-input', // 关键词输入框
  style: {
    1: '.header { margin-top: 40px; }' // 水平布局样式
  }
}
```

### Q: 如何修改主题色？
A:
1. 用户可在侧边栏设置中修改
2. 或者修改 CSS 变量 `--as-primary-color`

### Q: 为什么有些网站菜单不显示？
A:
1. 检查 `loadList.js` 中是否标记为 `invisible: true`
2. 检查该网站是否在特殊处理列表中
3. 可能被全屏检测隐藏（`fullScreen.js`）

### Q: 如何禁用某个组件？
A:
在 `index.vue` 中注释掉对应组件：
```vue
<!-- <selection-bar/> --> <!-- 禁用选择工具栏 -->
```

### Q: 存储数据丢失怎么办？
A:
1. 检查 `storage.js` 中的环境检测是否正确
2. 确认 GM API 或 chrome.storage 可用
3. 查看控制台是否有错误信息

## 相关文件清单

### 组件 (`components/`)
- **UI 组件**: 22 个 `.vue` 文件
- **Composables**: 8 个 `.js` 文件
- **其他**: `selection.js`, `onkeydown.js`

### 配置 (`config/`)
- `loadList.js` - 网站适配配置
- `siteInfo.js` - 站点信息
- `toolbar.js` - 工具栏配置
- `sites/` - 13 个搜索引擎配置文件

### 工具 (`util/`)
- 20 个 `.js` 文件
- 覆盖存储、样式、交互、兼容性、性能等

### 样式 (`assets/`)
- `normalize.css` - CSS 重置
- `common.scss` - SCSS 变量和混入

### 入口
- `index.vue` - 根组件

## 目录结构
```
src/
├── components/           # Vue 组件
│   ├── *.vue            # 22 个组件
│   ├── use*.js          # 8 个 Composables
│   ├── scrollbar/       # 滚动条组件
│   └── *.js             # 其他 JS 文件
├── config/              # 配置
│   ├── sites/           # 搜索引擎配置
│   │   └── *.js        # 13 个分类文件
│   ├── loadList.js      # 网站适配
│   ├── siteInfo.js      # 站点信息
│   └── toolbar.js       # 工具栏配置
├── util/                # 工具函数
│   └── *.js            # 20 个工具文件
├── assets/              # 样式资源
│   ├── normalize.css
│   └── common.scss
├── index.vue            # 根组件
└── CLAUDE.md            # 本文档
```

## 下一步建议

1. **添加单元测试**: 使用 Vitest 测试 Composables 和工具函数
2. **组件测试**: 使用 @vue/test-utils 测试组件
3. **TypeScript**: 逐步迁移到 TypeScript
4. **文档**: 为每个 Composable 和工具函数添加 JSDoc
5. **性能优化**:
   - 虚拟滚动（菜单项过多时）
   - 懒加载组件
   - 优化 `loadList.js` 匹配性能
6. **代码拆分**: 将大文件拆分为更小的模块
7. **国际化**: 添加 i18n 支持
8. **无障碍**: 改进键盘导航和屏幕阅读器支持
