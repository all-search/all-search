# all-search 项目概览

`all-search` 是一个功能丰富的搜索引擎快捷跳转菜单，允许用户在不同的搜索引擎之间轻松切换。该项目同时提供浏览器脚本（Tampermonkey/ScriptCat）和浏览器扩展（Chrome/Firefox）两种形式。

## 项目架构

本项目采用 `pnpm` workspace 管理的 Monorepo 架构：

- **`packages/script`**: 用户脚本版本，使用 `Vite` 和 `vite-plugin-monkey` 构建。
- **`packages/plugin`**: 浏览器扩展版本，使用 `WXT` (Web Extension Toolbox) 构建。
- **`packages/options`**: 设置/配置页面，使用 `Vite` 和 `Vue 3` 构建。
- **`src/`**: 核心共享代码，包含 Vue 组件、工具函数和配置逻辑，被上述所有包引用。

### 核心技术栈
- **前端框架**: Vue 3 (Composition API)
- **UI 组件库**: Element Plus
- **构建工具**: Vite, WXT, pnpm
- **样式**: SCSS
- **隔离技术**: Shadow DOM (仅用于注入脚本/插件 Content Script)
- **其他**: 使用 `@floating-ui/vue` 处理定位，`jsoneditor` 用于配置编辑。

## Shadow DOM & 样式隔离

本项目在注入脚本（Content Script）中全面采用 Shadow DOM 技术，以实现与原网页的完全样式隔离。

### 1. 核心 DOM 获取函数 (Unified DOM Access)
为了兼容脚本版和插件版不同的 DOM 结构，必须统一使用 `src/util/dom.ts` 提供的获取函数：

| 函数名 | 返回内容 | 作用 |
| :--- | :--- | :--- |
| **`getAsRoot()`** | **宿主元素 (Host)** | 即 `#all-search` 或 `<all-search-ui>`。用于操作类名（如布局切换 `body-top`）。 |
| **`getAsShadowRoot()`** | **影子根 (ShadowRoot)** | 隔离层的根节点。用于查询影子内部的样式或节点。 |
| **`getAsMountAnchor()`** | **挂载锚点 (MountAnchor)** | 影子根内部的 `div#as-mount-anchor`。用于 Vue 应用挂载和 `Teleport` 目标。 |

### 2. 样式隔离与注入逻辑
- **样式作用域**: 脚本版和插件版均在 Shadow DOM 中运行。
- **布局切换**: 通过 `getAsRoot().classList.add('body-top')` 修改宿主类名，内部 CSS 使用 `:host(.body-top)` 进行响应。
- **样式注入**: 
  - 静态样式由各构建工具（WXT/Monkey）自动注入影子根。
  - 动态样式使用 `injectStyle(css)`，它会自动通过 `getAsShadowRoot()` 寻找注入目标。
- **自动注入**: 插件版由 WXT 自动处理。脚本版由 `vite-plugin-monkey` 的 `cssSideEffects` 钩子处理。
- **动态注入**: 若需动态添加样式，使用 `injectStyle(css)` 函数，它会自动定位当前环境的影子根。
- **注意**: 影子根内部无法直接继承原网页的 CSS。若需使用全局图标或字体，需在 `common.scss` 中包含相关定义。

### 3. Vue Teleport 使用
- **严禁** 直接传送至 `body` 或 `#all-search`。
- **推荐做法**: 
  ```typescript
  import { getAsRoot } from '@src/util'
  const teleportTarget = getAsRoot()
  // <teleport v-if="teleportTarget" :to="teleportTarget">
  ```

## 环境适配逻辑

项目通过 `src/env.ts` 区分不同的运行平台，开发时应优先使用以下变量：

- **`isScript`**: 是否为油猴脚本环境（基于 `VITE_TARGET=script`）。
- **`isPlugin`**: 是否为浏览器扩展环境（基于 `VITE_TARGET=plugin`）。
- **`features.useShadowDom`**: 全局 Shadow DOM 开关，目前默认开启。

### 开发规范
- **组件风格**: 使用 Vue 3 `<script setup>` 或标准组合式 API。
- **样式**: 优先使用 SCSS，变量统一定义在 `src/assets/common.scss`。
- **存储适配**: 统一使用 `src/util/storage.js` 中的抽象层，以兼容用户脚本（GM storage）和扩展程序（browser storage）环境。

## 快速开始

### 前置要求
- Node.js
- pnpm

### 安装
```bash
pnpm install
```

### 开发指令

| 任务 | 指令 | 描述 |
| :--- | :--- | :--- |
| 用户脚本开发 | `pnpm dev:script` | 启动 Vite 进行脚本开发 |
| 扩展程序开发 | `pnpm dev:plugin` | 启动 WXT 开发模式 |
| 设置页面开发 | `pnpm dev:options` | 启动设置页面的本地服务器 |
| 代码校验 | `pnpm lint` | 运行 ESLint 检查 |

### 编译指令

| 任务 | 指令 | 输出路径 |
| :--- | :--- | :--- |
| 编译用户脚本 | `pnpm build:script` | `packages/script/dist/index.user.js` |
| 编译扩展程序 | `pnpm build:plugin` | `packages/plugin/.output/` |
| 编译设置页面 | `pnpm build:options` | `packages/options/dist/` |

## 项目结构与开发约定

### 共享逻辑 (`src/`)
- **`src/components/`**: 可复用的 Vue 组件（如 `menu.vue`, `search-dialog.vue`）。
- **`src/util/`**: 存储管理、DOM 操作和跨上下文通信的工具函数。
- **`src/config/`**: 默认搜索引擎配置及站点适配逻辑。

### 开发规范
- **组件风格**: 使用 Vue 3 `<script setup>` 或标准组合式 API。
- **样式**: 优先使用 SCSS，变量统一定义在 `src/assets/common.scss`。
- **存储适配**: 统一使用 `src/util/storage.js` 中的抽象层，以兼容用户脚本（GM storage）和扩展程序（browser storage）环境。
- **提交规范**: 项目使用 Husky 和 commitlint 强制执行常规提交（Conventional Commits）规范。

## 使用与部署
- 用户脚本可从 GreasyFork 或 ScriptCat 安装。
- 扩展程序在开发阶段可直接从 `.output` 目录加载。
- 设置页面托管于 GitHub Pages 或 Gitee Pages。
