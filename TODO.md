# 项目重构与优化 TODO

## 📌 专项清单

- **[固定元素避让：code review 跟进](docs/style-avoidance-todo.md)** — P0 站点自管 `top` 被覆盖、静态规则失效兜底；P1 选择器稳定性与扫描器质量；P2 采样成本、dom observer；P3 测试补齐
- **[可借鉴特性评估：searchEngineJump-Enhance-DIY](docs/borrow-from-searchEngineJump.md)** — AI 搜索分类、按名排序、深色模式、配置编辑器增强等的取舍与实施建议

### 依赖升级：WXT 0.21（暂缓）

已升到 `0.20.27`（0.20 线最后的补丁版，无破坏性变更，构建与 e2e 已验证）。
`0.21.4`（最新）暂时不动，原因是这些前置条件必须先满足：

- [ ] **Node ≥ 22**：0.21 把 engines 提到 `>=22`，本地（当前 20.19.5）与三条 workflow 的 `node-version: 20` 都要改
- [ ] **`web-ext` 变成 peerDependency**（`>=9.2.0`），需要显式装到 devDependencies
- [ ] **zip 模板语义变化**：新增 `{{modeSuffix}}`，`{{version}}` / `{{versionName}}` 行为调整；我们用的 `artifactTemplate` 需复核产物名
- [ ] **`includeSources`/`excludeSources` 改为白名单语义**：影响 AMO 的 `sources.zip`
- [ ] **content script 返回值**：需要返回值的场景（如 `scripting.executeScript`）要加 `globalName: true`（当前项目未用到）
- [ ] **tsconfig 默认值更新**（要求 TS ≥5.4，且 `.wxt/tsconfig.json` 由 CLI 重新生成）
- [ ] `@webext-core/isolated-element` v1 → v3：`createShadowRootUi` 的宿主结构需回归（深色模式依赖挂载锚点）

升级时按「升依赖 → 重新生成 .wxt → build:plugin + zip:firefox → e2e 70 项 → 手工装一次扩展」的顺序验证。

## ?? 执行路线图

### 阶段 0：Critical 问题修复 (DONE ?)
- [x] **修复挂载模式类型与行为不一致**：统一支持 top/bottom/left/right 模式。
- [x] **统一挂载/布局服务**：创建 `LayoutService` 单例，消除脚本与插件的挂载冲突。
- [x] **存储桥接容错与类型 safe**：添加 WebBridge 超时降级（localStorage）和类型安全。
- [x] **精简 MutationObserver 全 DOM 监听**：实现防抖、增量过滤与扫描规模限制。

### 阶段 1：架构优化 (DONE ?)
- [x] **TypeScript 核心迁移**：基础设施、基础配置、工具函数及核心组件 TS 化。
- [x] **抽象 Shadow DOM 注入工厂**：创建 `setupApp` 减少 50%+ 初始化重复代码。
- [x] **开发模式样式同步去重**：解决 HMR 导致的样式堆积问题。
- [x] **解耦 "上帝组件" `src/index.vue`**：拆分出 `LayoutManager` 和 `StyleManager`。
- [x] **合并 Vite 配置**：公共配置已提取至 `vite.config.shared.ts`。
- [x] **修复路由监听**：已在 `routerChange.ts` 中完成 History 拦截，脱离 `hook.ts`。

### 阶段 2：样式与清理 (IN PROGRESS)
- [x] **类名系统迁移 (宿主端)**：统一使用 `as-host-*` 类名并适配偏移逻辑。
- [x] **宿主布局可见性优化**：合成 `isLayoutVisible` 状态，修复全屏或收起时的页面占位问题。
- [x] **类名系统迁移 (内部端)**：将 Shadow DOM 内部的 `body-*` 替换为 `as-` 命名。
- [x] **清理冗余代码**：清理 `src/util/hook.ts` 等废弃文件内容。
- [x] **优化图标加载**：`iconfont.vue` 已使用内联 SVG。
- [x] **特殊样式性能回收**：`addSpecialStyle.ts` 已改为 `elementsFromPoint` 网格采样（滚动/resize/DOM 变化触发、120ms 节流、卸载时 `disconnectSpecialStyle()` 回收）。
- [x] **固定元素避让的构建期方案**：`pnpm style:scan` 在构建期扫描站点、生成 `src/config/generatedStyle.ts`；命中的站点运行时只注入静态 CSS，不再采样。
- [ ] **站点覆盖面**：`generatedStyle` 目前只覆盖能稳定访问的站点；Google / 知乎 / 搜狗 / Yandex 会被验证页拦截，仍需人工在有网络的环境补扫。

### 阶段 3：测试与质量提升 (IN PROGRESS ???)
- [x] **基础冒烟测试**：搭建 Vitest + jsdom 环境。
- [x] **组件交互测试**：完成 `LayoutManager` 响应式类名测试。
- [x] **核心 Hook 测试**：`tests/hooks.spec.ts` 覆盖 `useConfig`、`useSites`、`useToolbar`。
- [ ] **扩展单元测试覆盖**：
  - [ ] `useToolbar` 的 TM/插件双模式过滤与兜底。
  - [ ] `useSwitchShow`/`useAutoHide` 的滚动隐藏与状态常量。
  - [ ] Storage fallback、`routerChange` 卸载等边界场景。
- [ ] **添加 E2E 测试**：使用 Playwright 覆盖搜索、模式切换、配置等关键流程。

### 阶段 4：功能增强 (BACKLOG ?)
- [ ] **配置同步机制**
- [ ] **完善国际化 (i18n)**
- [ ] **增强可访问性 (a11y)**
- [ ] **根级快捷入口**：允许在分类同级添加网站（无分组模式），扩展 script/options 的数据结构与 UI。
- [ ] **移动端悬浮球模式**：新增浮球布局模式，支持拖拽、透明度、点击呼出菜单，面向移动端的轻量交互。

### 阶段 5：双模式收尾 (DONE 2026-10-20)
- [x] **插件可用化**：图标（`packages/plugin/public/icon`）、后台 worker、扩展自带设置页 + hash 路由
- [x] **设置入口**：条上的「菜单设置」在插件内打开扩展 options 页（不再跳外网配置站）
- [x] **用户脚本修复**：CSS 按 chunk 注入影子根，修复多段样式互相覆盖导致的裸 HTML
- [x] **构建清理**：删除 TS 迁移遗留的 `main.js` / `route/index.js` / `vite.config.mjs`，恢复 `build:options`
- [x] **发布链路**：新增 `plugin-release.yml`；三个 workflow 统一 pnpm 10（锁文件 v9）
- [x] **测试**：`pnpm test` 14 个用例通过，已接入插件发布流程

---

## ?? 进度统计
- **架构稳定性**: 100%
- **代码重构**: 100%
- **类型覆盖**: 95%
- **测试覆盖**: 50%

## ?? 关键里程碑
- **M0: 架构稳定** (已达成)
- **M1: 代码质量** (已达成)
- **M2: 功能完善** (待开始)
