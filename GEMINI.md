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
- **其他**: 使用 `@floating-ui/vue` 处理定位，`jsoneditor` 用于配置编辑。

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
