# All-Search AGENT 指南

本指南聚合 `CLAUDE.md`、`GEMINI.md` 与 `TODO.md` 的关键信息，帮助代理快速理解仓库、遵循约束并推进未完成事项。

## 项目速览
- **定位**：All-Search（全搜）是一个 Vue 3 + Vite 打造的搜索引擎跳转工具，同一套核心代码可输出 Tampermonkey 用户脚本与多浏览器插件，并提供独立配置页面。
- **特性**：Shadow DOM 样式隔离、可拖拽的搜索引擎分类管理、跨环境统一存储、快捷键/触摸交互、214+ 站点的定制适配。
- **目标人群**：追求高效检索体验的重度搜索用户与开发者。

## 仓库结构（Monorepo，pnpm workspace）

| 路径 | 角色 | 说明 |
| --- | --- | --- |
| `src/` | 共享核心 | Vue 组件、配置、工具函数与 Shadow DOM 挂载逻辑，是 script/plugin/options 的公共依赖。 |
| `packages/script/` | Tampermonkey 包 | 通过 `vite-plugin-monkey` 构建；入口 `index.js`，包含油猴元数据与 Shadow DOM 宿主创建流程。 |
| `packages/plugin/` | 浏览器扩展 | 基于 WXT，入口 `entries/content.js` 和 `entries/options/main.js`，负责注入搜索 UI 及插件选项页。 |
| `packages/options/` | 配置页面 | 独立 Vue 应用，使用 Element Plus 与 Vue Router 提供站点/工具栏配置界面。 |
| `lib/` | 外部库 | 例如 `popper-lite`。 |
| `.claude/` | 上下文索引 | 包含扫描数据与各子模块的 `CLAUDE.md`。 |

常用路径别名：所有包统一以 `@src/` 引用根目录 `src/` 内容，避免 WXT 默认别名冲突。

## 核心技术与约束
- **Shadow DOM & 宿主控制**  
  - 严格使用 `src/util/dom.ts`/`mount.ts` 提供的 `getAsRoot()`、`getAsShadowRoot()`、`getAsMountAnchor()`，以及 `syncHostLayout` 维护宿主类名（`as-host-*`）。  
  - Shadow DOM 内外采用拆分样式（`global.scss` 作用宿主、`internal.scss` 作用影子根），禁止组件自行注入宿主样式。  
  - Teleport 目标必须来自统一的宿主查询，不可直接指向 `body`。
- **跨环境存储**：只能经 `src/util/storage.js` 的适配层读写数据，自动切换 GM API、chrome.storage 或桥接实现。
- **配置加载**：所有站点配置、工具栏默认值在 `src/config/`，新增站点需同步更新分类索引及 `loadList.js` 匹配规则。
- **代码规范**：遵循 Vue 3 组合式 API、SCSS 变量集中定义（`src/assets/common.scss`）、Conventional Commits、ESLint + lint-staged 检查。
- **类型演进**：已完成 TS 基础设施与大部分组件迁移，`tsconfig.json` 当前仍宽松（允许 JS），未来需要收紧校验直至无 `any`。
- **类名系统**：宿主使用 `as-host-*`，内部仍存在 `body-*` 旧类名，后续将全部替换为新的 `as-internal-*` 命名，修改前需考虑双系统共存影响。

## 开发与构建
- **初始化**：`pnpm install` → `pnpm run prepare`（安装 Husky 钩子）。
- **开发脚本**：
  | 任务 | 命令 | 备注 |
  | --- | --- | --- |
  | 用户脚本调试 | `pnpm run dev:script` | Vite watch，输出 `index.dev.js` 手动导入 Tampermonkey。 |
  | 浏览器插件调试 | `pnpm run dev:plugin` | 使用 WXT。Firefox 专用：`pnpm run dev:firefox`。 |
  | 配置页调试 | `pnpm run dev:options` | 访问 `http://localhost:5173/all-search/`。 |
  | 代码校验 | `pnpm run lint` | Husky 在提交前触发 lint-staged。 |
- **生产构建**：
  - `pnpm run build:script` → `packages/script/dist/index.user.js`（用于 GreasyFork/ScriptCat）。
  - `pnpm run build:plugin` / `pnpm run build:firefox` → `packages/plugin/.output/`（再执行 `pnpm run zip(:firefox)` 打包商店包）。
  - `pnpm run build:options` → `packages/options/dist/`（部署 GitHub Pages，`base=/all-search/`）。

## 当前优先级（摘自 `TODO.md`）
1. **TypeScript 阶段 5**  
   - 收紧 `tsconfig`，逐步移除 `any` 并实现全量类型检查。  
   - 需要同时更新 ESLint/构建链确保 TS 校验成为默认流程。
2. **Vite 配置合并**  
   - `packages/script` 与 `packages/options` 有重复配置，需提取公共逻辑到根级共享文件。  
   - 注意保留各包特有的插件（如 `vite-plugin-monkey`）。
3. **布局拆分**  
   - `src/index.vue` 仍承担大量布局状态，需要把 Top/Bottom/Left/Right 逻辑提取成专用组件。  
   - `syncHostLayout` 需配合新组件流程保持宿主偏移同步。
4. **Element Plus 按需加载**  
   - 检查 `packages/options` 是否仍全量引入，若是需改为 `unplugin-vue-components` 等方案减少包体。  
5. **图标加载优化**  
   - 评估 `iconfont.vue`，考虑改为内联 SVG 或 `unplugin-icons`。  
6. **类名系统迁移（中长期）**  
   - 调研 `.body-*` 的使用点，设计 `as-internal-*` 替代方案，逐步实现双系统共存→清理旧名。  
7. **后续增强**（低优先级）  
   - 配置同步机制、国际化支持、Vitest 单元测试、`src/util/hook.ts` 清理等。

## AI 协作文档/入口
- 根文档：`CLAUDE.md`（架构、流程、约束、覆盖率）。  
- 模块文档：`packages/*/CLAUDE.md`、`src/CLAUDE.md`。  
- 任务追踪：`TODO.md`。  
- 其他参考：`GEMINI.md`（Shadow DOM 细节、开发规范）、`.claude/index.json`（扫描索引，如需精确文件列表）。

## 建议工作流程
1. **任务分类**：确认修改位于共享 `src` 还是子包，避免在错误入口动手。  
2. **遵循挂载与样式约定**：修改 DOM/样式时首先检查 Shadow DOM 约束及宿主类名影响；新增 Teleport/样式注入必须通过统一工具。  
3. **保持类型演进**：新增文件优先使用 TS / `<script setup lang="ts">`，并补充必要类型。  
4. **同步多出口**：任何核心逻辑改动需在 script 与 plugin 两端验证（含配置页交互），避免只在单一目标测试。  
5. **更新 TODO**：完成任务后记得在 `TODO.md` 中维护状态（如在本次会话内支持写入）。  

## 术语速查
- **宿主 (Host)**：注入到网页中的 `#all-search` 或 `<all-search-root>` 元素。  
- **Shadow Root**：挂载 Vue 应用的影子 DOM，所有 UI 渲染均发生在此。  
- **Mount Anchor**：`div#as-mount-anchor`，Vue 应用和 Teleport 的默认挂载点。  
- **as-host-* / body-* 类名**：前者控制宿主页面布局偏移，后者（待迁移）控制 Shadow DOM 内部布局状态。

遵循以上要点即可快速在 All-Search 中开展代理工作，并保持与既有文档、任务规划的一致性。

