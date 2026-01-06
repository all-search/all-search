# 项目重构与优化 TODO

## 1. 架构与工程化 (High Priority)
- [ ] **引入 TypeScript (渐进式重构)**:
    - [x] **阶段 1：基础设施搭建**：安装 TS 依赖，配置 `tsconfig.json`（开启 `allowJs`），更新 ESLint 配置支持 TS。
    - [x] **阶段 2：核心配置类型化**：定义搜索引擎配置（Sites）、存储数据结构（Storage）的全局类型声明（`.d.ts`）。
    - [x] **阶段 3：工具函数迁移**：将 `src/util/` 下的基础工具函数（已完成 `common.ts`, `dom.ts`, `debounce.ts`, `raf.ts` 等）重构为 `.ts`。
    - [x] **阶段 4：组件按需迁移**：先从简单组件（Button, Icon）开始，逐步迁移核心组件（Menu, SearchDialog）到 `<script setup lang="ts">`。（已完成大部分组件迁移）
    - [ ] **阶段 5：全量类型检查**：逐步收紧 `tsconfig` 校验规则，消除 `any`，最终实现全量类型覆盖。
- [x] **统一路径别名**: 目前在所有 package 中统一配置 `@src/` 指向 `src/`（避开 WXT 默认别名冲突）。
- [ ] **合并 Vite 配置**: `packages/script` 和 `packages/options` 的 `vite.config` 存在重复逻辑，建议提取公共配置到根目录。
- [x] **优化环境变量管理**: 创建了 `src/env.js` 统一管理 `VITE_TARGET` 及 Feature Flags，已在 `storage.js` 中应用。

## 2. 核心逻辑重构 (Medium Priority)
- [ ] **解耦 "上帝组件" `src/index.vue`**: 
    - 拆分样式初始化逻辑到专门的 `StyleManager` 类或 Hook。
    - 将布局模式逻辑（Top/Bottom/Left/Right）抽离为独立的布局组件。
- [x] **重构 `src/util/storage.js`**:
    - 使用适配器模式封装了 TM、插件和网页桥接三种存储实现，移除了硬编码的环境判断。
- [x] **改进 `src/util/index.js`**:
    - 该文件包含了大量 DOM 操作和工具函数（如 `RAFInterval`, `addStyleContent`），建议按功能拆分为 `dom.js`, `string.js`, `timer.js` 等小模块。
    - 移除已废弃或冗余的 `delSession` 等函数。

## 3. 样式与性能优化 (Medium Priority)
- [ ] **标准化样式注入**: `protectStyle` 通过劫持 `removeChild` 来防止样式被删除，这是一种比较 Hack 的做法。考虑使用 `Shadow DOM`（在插件环境下）来彻底隔离样式干扰。
- [ ] **按需加载 Element Plus**: 检查 `packages/options` 的打包体积，确保 UI 组件库是按需引入而非全量。
- [ ] **优化图标加载**: `iconfont.vue` 目前似乎是全量加载，可以考虑转换为内联 SVG 或使用 `unplugin-icons` 以减少资源体积。

## 4. 功能增强 (Low Priority)
- [ ] **配置同步机制**: 实现用户脚本和插件版本之间的配置同步功能（例如通过 WebDAV 或简单的导入导出）。
- [ ] **完善国际化 (i18n)**: 移除硬编码的中文字符串，使用 `vue-i18n` 或简单的 key-value 映射来实现 README 中提到的多语言支持。
- [ ] **单元测试**: 为 `src/util/` 下的工具函数编写 Jest/Vitest 测试，确保逻辑重构后的稳定性。

## 5. 代码清理
- [x] **手动删除旧文件**:
    - [x] `src/components/menuItem.vue` 和 `src/components/jsonEditor.vue`
    - [x] `src/util/storage.js`, `src/util/storage-tm.js`, `src/util/storage-ext.js`, `src/util/storage-bridge.js`
- [x] **统一组件命名规范**：目前已统一为 kebab-case。
- [x] 清理 `src/util/index.js` 中未使用的变量和 `console.log`。
