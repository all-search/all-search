[根目录](../../CLAUDE.md) > [packages](../) > **options**

# Options 模块 - 配置页面

## 变更记录 (Changelog)

### 2025-12-30 14:24:51 - 初始化模块文档
- 创建模块级 CLAUDE.md
- 记录模块职责、入口和配置

---

## 模块职责

**配置页面模块**，一个独立的 Vue 3 + Vue Router 应用，提供搜索引擎和工具栏的可视化配置界面。支持拖拽排序、导入导出配置等功能。可部署为独立网站或嵌入到浏览器插件的 Options Page。

## 入口与启动

### 主入口
- **文件**: `packages/options/main.js`
- **HTML**: `packages/options/index.html`
- **作用**: 应用的启动入口，初始化 Vue、Router 和 Element Plus

**核心逻辑**:
```javascript
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './route'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')

// 注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
```

### 应用根组件
- **文件**: `packages/options/App.vue`
- **作用**: 简单的路由视图容器
- **结构**: `<router-view>` + 全局样式

### 路由配置
- **文件**: `packages/options/route/index.js`
- **模式**: `createWebHistory('/all-search/')`
- **基础路径**: `/all-search/` - 适配 GitHub Pages 部署

**路由表**:
```javascript
{
  path: '/',
  redirect: '/config/sites'
},
{
  path: '/config/',
  component: config.vue,
  children: [
    { path: 'sites', component: sites.vue },      // 搜索引擎配置
    { path: 'edit', component: edit.vue },        // 编辑页面
    { path: 'toolbar', component: toolbar.vue }   // 工具栏配置
  ]
}
```

## 对外接口

### 页面路由

#### 1. `/config/sites` - 搜索引擎配置
- **组件**: `packages/options/views/sites.vue`
- **功能**:
  - 查看所有搜索引擎分类
  - 拖拽排序搜索引擎
  - 显示/隐藏搜索引擎
  - 添加自定义搜索引擎

#### 2. `/config/edit` - 编辑页面
- **组件**: `packages/options/views/edit.vue`
- **功能**:
  - 使用 JsonEditor 编辑原始配置
  - 导入/导出配置 JSON
  - 重置为默认配置

#### 3. `/config/toolbar` - 工具栏配置
- **组件**: `packages/options/views/toolbar.vue`
- **功能**:
  - 配置工具栏显示/隐藏
  - 设置工具栏选项

### 视图组件

#### 配置主页面 (`config.vue`)
- 侧边栏导航
- 内容区域（嵌套路由）
- 统一的布局和样式

#### 搜索引擎配置 (`sites.vue`)
- 使用 `vue-draggable-next` 实现拖拽排序
- 使用 `useSites` Composable 管理数据
- Element Plus 组件（Table、Switch、Button 等）

#### 编辑页面 (`edit.vue`)
- 使用 `jsoneditor` 提供 JSON 编辑器
- 支持语法高亮和验证
- 导入/导出功能

#### 工具栏配置 (`toolbar.vue`)
- 简单的开关配置
- 使用 `useToolbar` Composable

## 关键依赖与配置

### 核心依赖
- `vue` 3.3.4 - 核心框架
- `vue-router` 4.0.5 - 路由管理
- `element-plus` 2.2.22 - UI 组件库
- `@element-plus/icons-vue` - Element Plus 图标
- `vue-draggable-next` 2.0.1 - 拖拽排序
- `jsoneditor` 9.9.0 - JSON 编辑器

### 构建工具
- `vite` 5.2.7 - 构建工具
- `@vitejs/plugin-vue` - Vue 插件

### 样式依赖
- `element-plus/dist/index.css` - Element Plus 样式
- `src/assets/normalize.css` - CSS 重置
- `src/assets/common.scss` - 共享样式

### 开发脚本
```json
{
  "dev": "vite",
  "build": "vite build"
}
```

## 开发流程

### 开发模式
```bash
pnpm run dev:options
```
- 启动 Vite 开发服务器
- 默认地址: `http://localhost:5173/all-search/`
- 支持热模块替换（HMR）
- 自动刷新

### 开发流程
1. 运行 `pnpm run dev:options`
2. 打开浏览器访问 `http://localhost:5173/all-search/`
3. 修改代码，页面自动刷新
4. 使用 Vue DevTools 调试

### 生产构建
```bash
pnpm run build:options
```
- 生成优化后的静态文件到 `packages/options/dist/`
- 代码分割和 Tree Shaking
- CSS 提取和压缩
- 资源优化

### 部署

#### GitHub Pages 部署
1. 构建: `pnpm run build:options`
2. 将 `packages/options/dist/` 内容推送到 `gh-pages` 分支
3. 配置 GitHub Pages 指向该分支

#### 插件集成
- 在 `packages/plugin/entries/options/main.js` 中引用
- 共享相同的路由和视图组件
- 通过插件的 Options Page 访问

## 数据模型

### Composables 数据管理

#### 1. `useSites` - 搜索引擎数据
- **文件**: `src/components/useSites.js`
- **数据结构**:
  ```javascript
  {
    list: [...], // 搜索引擎分类列表
    loading: false,
    error: null
  }
  ```

#### 2. `useConfig` - 用户配置
- **文件**: `src/components/useConfig.js`
- **数据结构**:
  ```javascript
  {
    mode: 1,        // 布局模式
    direction: 1,   // 方向
    color: '#1890ff', // 主题色
    show: 1         // 显示状态
  }
  ```

#### 3. `useToolbar` - 工具栏配置
- **文件**: `src/components/useToolbar.js`
- **数据结构**:
  ```javascript
  {
    visible: 1 // 可见性
  }
  ```

### 搜索引擎分类
来自 `src/config/sites/index.js`，包含 12 个分类：
1. 搜索 (search)
2. 翻译 (translate)
3. 视频 (video)
4. 购物 (shopping)
5. 音乐 (music)
6. 开发 (developer)
7. 新闻 (news)
8. 社交 (social)
9. 百科 (knowledge)
10. 图片 (image)
11. 网盘 (disk)
12. 学术 (scholar)
13. 常用 (personal) - 用户自定义

## 测试与质量

### 测试策略
- **无自动化测试**: 当前模块没有单元测试
- **手动测试**: 功能测试和 UI 测试

### 测试场景
1. **基本功能**:
   - 页面是否正常加载
   - 路由跳转是否正常
   - 数据是否正确显示

2. **交互功能**:
   - 拖拽排序是否生效
   - 开关按钮是否正常
   - 保存配置是否成功

3. **数据持久化**:
   - 配置是否正确保存
   - 刷新页面后配置是否保留
   - 导入/导出是否正常

### 代码质量工具
- **ESLint**: 继承根配置
- **格式化**: 无独立配置

## 常见问题 (FAQ)

### Q: 开发服务器启动失败？
A:
1. 检查端口 5173 是否被占用
2. 确认依赖已安装：`pnpm install`
3. 删除 `node_modules/.vite` 缓存重试

### Q: 样式不正确？
A:
1. 确认 Element Plus CSS 已引入
2. 检查 `src/assets/common.scss` 是否加载
3. 清除浏览器缓存

### Q: 拖拽功能不工作？
A:
1. 检查 `vue-draggable-next` 是否正确安装
2. 确认组件使用正确的 `v-model` 绑定
3. 查看控制台是否有错误

### Q: JsonEditor 不显示？
A:
1. 检查 `jsoneditor` 是否正确安装
2. 确认 CSS 文件已引入
3. 查看是否有 JavaScript 错误

### Q: 如何修改基础路径？
A:
在 `route/index.js` 中修改：
```javascript
createWebHistory('/your-base-path/')
```

### Q: 如何添加新的配置页面？
A:
1. 在 `views/` 中创建新组件
2. 在 `route/index.js` 中添加路由
3. 在 `config.vue` 侧边栏中添加导航

## 相关文件清单

### 核心文件
- `packages/options/main.js` - 应用入口
- `packages/options/index.html` - HTML 模板
- `packages/options/App.vue` - 根组件
- `packages/options/route/index.js` - 路由配置
- `packages/options/package.json` - 模块配置

### 视图组件
- `packages/options/views/config.vue` - 配置主页面
- `packages/options/views/sites.vue` - 搜索引擎配置
- `packages/options/views/edit.vue` - 编辑页面
- `packages/options/views/toolbar.vue` - 工具栏配置
- `packages/options/views/index.vue` - 首页（未使用）

### 共享代码（来自 `src/`）
- `src/components/useSites.js` - 搜索引擎数据管理
- `src/components/useConfig.js` - 配置管理
- `src/components/useToolbar.js` - 工具栏管理
- `src/config/sites/` - 搜索引擎配置
- `src/util/storage.js` - 存储适配层

### 构建产物
- `packages/options/dist/` - 构建后的静态文件
  - `index.html` - 入口 HTML
  - `assets/` - 打包后的 JS 和 CSS

### 开发文件
- `packages/options/node_modules/.vite/` - Vite 缓存
- `packages/options/.vite/` - Vite 临时文件

## 目录结构
```
packages/options/
├── views/               # 视图组件
│   ├── config.vue      # 配置主页面
│   ├── sites.vue       # 搜索引擎配置
│   ├── edit.vue        # 编辑页面
│   ├── toolbar.vue     # 工具栏配置
│   └── index.vue       # 首页（未使用）
├── route/              # 路由配置
│   └── index.js
├── App.vue             # 根组件
├── main.js             # 应用入口
├── index.html          # HTML 模板
├── package.json
├── dist/               # 构建产物
└── CLAUDE.md           # 本文档
```

## UI 组件使用

### Element Plus 组件
- `el-table` - 表格（搜索引擎列表）
- `el-switch` - 开关（显示/隐藏）
- `el-button` - 按钮
- `el-input` - 输入框
- `el-form` - 表单
- `el-dialog` - 对话框
- `el-menu` - 菜单（侧边栏）

### 第三方组件
- `Draggable` (vue-draggable-next) - 拖拽排序
- `JsonEditor` (jsoneditor) - JSON 编辑器

### 自定义组件
- 来自 `src/components/` 的共享组件
- 如 `button.vue`, `dialog.vue` 等

## 下一步建议

1. **添加单元测试**: 使用 Vitest 测试组件和逻辑
2. **E2E 测试**: 使用 Playwright 或 Cypress 测试用户流程
3. **响应式优化**: 改进移动端体验
4. **国际化**: 添加多语言支持
5. **主题切换**: 支持深色模式
6. **性能优化**: 虚拟滚动、懒加载等
7. **文档完善**: 添加用户使用文档
8. **错误处理**: 改进错误提示和边界情况处理
