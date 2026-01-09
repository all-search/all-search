# 项目重构与优化 TODO

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
- [ ] **特殊样式性能回收**：`addSpecialStyle.ts` 的 TreeWalker 首次扫描需分批执行并暴露断开/回收策略，避免大型站点卡顿。

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
