# 项目重构与优化 TODO

## 1. 架构与工程化 (High Priority)
- [ ] **引入 TypeScript**: 目前项目主要使用 JS，缺乏类型约束。引入 TS 可以显著降低维护成本，尤其是在处理复杂的搜索引擎配置和存储逻辑时。
- [x] **统一路径别名**: 目前在所有 package 中统一配置 `@src/` 指向 `src/`（避开 WXT 默认别名冲突）。
- [ ] **合并 Vite 配置**: `packages/script` 和 `packages/options` 的 `vite.config` 存在重复逻辑，建议提取公共配置到根目录。
- [ ] **优化环境变量管理**: 目前使用 `VITE_TARGET === 'plugin'` 来区分环境。建议利用 Vite 的 `define` 或插件注入更优雅的 Provider，而不是在业务代码中到处写 `if (isPlugin)`。

## 2. 核心逻辑重构 (Medium Priority)
- [ ] **解耦 "上帝组件" `src/index.vue`**: 
    - 拆分样式初始化逻辑到专门的 `StyleManager` 类或 Hook。
    - 将布局模式逻辑（Top/Bottom/Left/Right）抽离为独立的布局组件。
- [ ] **重构 `src/util/storage.js`**:
    - 目前的 `initTmMethods` 和 `getTmMethods` 依赖于 DOM 事件分发，逻辑较为零散。建议封装一个统一的 `StorageAdapter` 接口，在入口处根据环境注入具体的实现。
- [ ] **改进 `src/util/index.js`**:
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
- [ ] **手动删除旧文件**: `src/components/menuItem.vue` 和 `src/components/jsonEditor.vue`（已创建新文件并更新引用，需手动删除旧文件）。
- [ ] 统一组件命名规范（目前存在 `menuItem.vue` 和 `form-item.vue` 混合使用的情况，建议统一为 kebab-case 或 PascalCase）。
- [x] 清理 `src/util/index.js` 中未使用的变量和 `console.log`。
