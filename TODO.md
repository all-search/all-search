# 项目重构与优化 TODO

## 📅 执行路线图

> **注意**：以下阶段划分基于任务依赖关系，不包含具体时间承诺（实际进度取决于团队规模和可投入时间）

### 阶段 0：Critical 问题修复
关键架构问题，阻塞后续开发，必须优先解决

### 阶段 1：架构优化
重构核心逻辑，提升代码质量和可维护性

### 阶段 2：完善与优化
类型安全、配置整合、性能优化

### 阶段 3：功能增强
新特性开发、国际化、测试覆盖

---

## 0. 关键架构问题修复 (Critical - 必须优先解决)

> ⚠️ 这些问题会导致类型安全失效、运行时竞态或页面卡死，必须立即修复

- [ ] **修复挂载模式类型与行为不一致** _(阻塞 TS 校验)_
    - **问题**：`src/util/mount.ts` 的 `getMountMode()` (L5-19) 只声明 `'top' | 'bottom'`，但 `useMode` (src/components/useMode.ts L5-33) 允许 `'left'/'right'` 并写入存储
    - **影响**：TypeScript 校验与实际运行脱节，插件侧调用会收到未声明的值
    - **方案**：
        1. 将 `MountMode` 类型改为 `'top' | 'bottom' | 'left' | 'right'`
        2. 在 `mountToPage()` 中显式处理横向/纵向场景
        3. 统一映射规则（如 left/right → top 行为）
    - **依赖**：无

- [ ] **统一挂载/布局服务** _(存在竞态条件)_ → _依赖上一项_
    - **问题**：`useMode` 直接移动 DOM 节点 (src/components/useMode.ts L11-33)，脚本入口又重新 mount (packages/script/index.ts L11-41)，导致"模式切换"存在两个代码路径
    - **影响**：插件端重复调用 `mountToPage()`，存在竞态和不一致性
    - **方案**：
        1. 创建单例服务 `LayoutService`
        2. 统一负责：监听配置变更 → 更新存储 → 移动节点 → 广播事件
        3. script/plugin/options 都通过此服务操作
    - **依赖**：修复挂载模式类型（上一项）

- [ ] **存储桥接容错与类型收敛** _(options 页面可用性)_
    - **问题**：`src/util/storage/bridge.ts` 的 `WebBridgeAdapter` 默认永远 pending（若注入脚本未响应），大量使用 `any`
    - **影响**：options 页面在脚本不可用时永久卡死，无法降级处理
    - **方案**：
        1. 添加超时机制（默认 5s）
        2. 增加断线重连/降级到 localStorage
        3. 整理 `StorageAdapter` 泛型约束
        4. 在组件卸载时注销事件监听
    - **依赖**：无

- [ ] **为关键重构模块添加冒烟测试** _(保障重构质量)_ → _依赖前三项完成_
    - **目标**：仅覆盖 Critical 阶段重构的核心模块，确保架构变更不破坏现有功能
    - **范围**（最小测试集）：
        - [ ] `src/util/storage/` 三种适配器的基础读写测试
        - [ ] `src/util/mount.ts` 挂载逻辑的类型正确性测试
        - [ ] `src/components/useMode.ts` 布局切换的状态同步测试
        - [ ] `LayoutService` 单例服务的基础行为测试（新增）
    - **工具**：Vitest + @vue/test-utils
    - **覆盖率目标**：核心路径 > 80%（非全量覆盖）
    - **依赖**：前三项架构问题修复完成
    - **注意**：完整测试体系建设见 Section 3.1，此处仅为阻塞性冒烟测试

- [ ] **精简 MutationObserver 全 DOM 监听** _(性能风险)_
    - **问题**：`src/util/addSpecialStyle.ts` 在整个 `document.body` 上开启 `subtree=true` 观察器 (L73-126)，全量扫描所有 DOM 变更，性能风险高
    - **影响**：在复杂页面（如 Gmail、Notion）可能导致卡顿，尤其是频繁 DOM 更新时
    - **说明**：仓库中存在两处 MutationObserver，用途不同——此任务针对 `addSpecialStyle.ts` 的全局 DOM 监听；开发模式样式同步（`syncDevStyles`）已在 Section 1.2 的“开发模式样式同步去重”中单列处理。
    - **方案**：
        1. 基于 `loadList.ts` 的 `selectors` 生成白名单（仅监听已知需要适配的节点）
        2. 使用 `attributeFilter` 限制监听的属性变更类型
        3. 提供 disconnect/重建机制，在页面稳定后停止监听
        4. 配合 ResizeObserver 或节流策略进一步降低消耗
    - **依赖**：建议在 `LayoutService` 完成后立即执行
    - **优先级说明**：属于潜在性能瓶颈，为避免在复杂站点出现卡顿，仍保持 Critical 优先级

---

## 1. 架构优化与代码重构 (High Priority)

### 1.1 TypeScript 渐进式重构
- [x] **阶段 1：基础设施搭建**：安装 TS 依赖，配置 `tsconfig.json`（开启 `allowJs`），更新 ESLint 配置支持 TS
- [x] **阶段 2：核心配置类型化**：定义搜索引擎配置（Sites）、存储数据结构（Storage）的全局类型声明（`.d.ts`）
- [x] **阶段 3：工具函数迁移**：将 `src/util/` 下的基础工具函数重构为 `.ts` (common, dom, debounce, raf 等)
- [x] **阶段 4：组件按需迁移**：先从简单组件（Button, Icon）开始，逐步迁移核心组件（Menu, SearchDialog）到 `<script setup lang="ts">`
- [ ] **阶段 5：全量类型检查**：逐步收紧 `tsconfig` 校验规则，消除 `any`，最终实现全量类型覆盖
    - **依赖**：Critical 问题全部修复后执行

### 1.2 Shadow DOM 注入与样式系统
- [x] **样式体系重构**：拆分 `host.scss` → `global.scss` (外部) + `internal.scss` (Shadow DOM 内部)
- [x] **架构统一**：创建 `src/util/mount.ts` 统一管理 Shadow Root 创建和挂载
- [x] **清理冗余逻辑**：废弃 `protectStyle`，重构 `changeBodyStyle` → `syncHostLayout`
- [ ] **抽象 Shadow DOM 注入工厂** _(减少 50%+ 重复代码)_
    - **问题**：`packages/script/index.ts` (L1-44) 和 `packages/plugin/entries/content.ts` (L1-46) 都在手动注入样式、触发事件、挂载 Vue
    - **方案**：
        1. 提取 `createAllSearchApp(options)` 工厂函数
        2. 接收策略配置：宿主创建方式、样式注入策略
        3. script/plugin/options 共享，统一错误处理
    - **依赖**：建议在 `LayoutService` 完成后执行

- [ ] **开发模式样式同步去重** _(Priority: Medium)_
    - **问题**：`src/util/mount.ts` 的 `syncDevStyles()` (L62-94) 每次 HMR clone 样式节点但不去重，长时间开发会堆积
    - **方案**：
        1. 用 `Map<data-vite-dev-id, HTMLElement>` 做去重/替换
        2. 在宿主卸载或 HMR 结束时 disconnect observer
    - **依赖**：建议在注入工厂完成后优化

### 1.3 核心组件解耦
- [ ] **解耦 "上帝组件" `src/index.vue`**:
    - [x] 拆分样式初始化逻辑到 `StyleManager` Hook (已完成 `src/useStyleManager.ts`)
    - [ ] 提取布局模式逻辑到 `LayoutManager` 组件
    - [ ] 拆分事件处理到 `EventBus` 或 mitt
    - [ ] 减少组件层级，移除不必要的嵌套

### 1.4 工程化配置整合
- [x] **统一路径别名**：所有 package 中配置 `@src/` 指向 `src/`（避开 WXT 默认别名冲突）
- [x] **优化环境变量管理**：创建 `src/env.js` 统一管理 `VITE_TARGET` 及 Feature Flags
- [ ] **合并 Vite 配置**：`packages/script` 和 `packages/options` 的 `vite.config` 存在重复逻辑，提取公共配置到根目录
    - **依赖**：建议在 Critical 问题全部解决后执行

### 1.5 存储系统优化
- [x] **重构存储适配器**：使用适配器模式封装 TM、插件和网页桥接三种存储实现
- [x] **改进工具函数**：拆分 `src/util/index.js` → `dom.js`, `string.js`, `timer.js` 等小模块

---

## 2. 样式系统完善 (Medium Priority)

- [ ] **类名系统完全迁移** _(消除技术债)_
    - **背景**：当前存在两套类名系统：
        - 新系统：`as-host-*` (用于 global.scss，控制宿主页面)
        - 旧系统：`body-*` (用于 internal.scss/layout.scss，控制 Shadow DOM 内部)
    - **问题**：双重类名增加心智负担，`body-*` 命名容易混淆
    - **依赖**：建议在 Shadow DOM 重构完成后执行
    - **迁移步骤**：
        - [ ] **阶段 1 - 调研分析**：搜索所有 `.body-*` 样式规则，评估影响范围
        - [ ] **阶段 2 - 设计新方案**：设计 `as-internal-*` 类名方案，与 `as-host-*` 风格一致
        - [ ] **阶段 3 - 逐步替换**：新旧类名并存，测试所有布局模式
        - [ ] **阶段 4 - 清理旧代码**：删除 `.body-*` 规则和相关代码
        - [ ] **阶段 5 - 测试验证**：单元测试 + 多网站验证
    - **预期效果**：命名统一、代码更清晰、易于维护

- [ ] **按需加载 Element Plus**：检查 `packages/options` 打包体积，确保 UI 组件库按需引入
- [ ] **优化图标加载**：`iconfont.vue` 转换为内联 SVG 或使用 `unplugin-icons`

---

## 3. 性能与质量提升 (Medium Priority)

### 3.1 测试体系建设

> **注意**：Critical 阶段已包含冒烟测试（Section 0），此处为完整测试体系的扩展覆盖

- [ ] **扩展单元测试覆盖** _(非阻塞性)_：
    - [ ] 为 `src/config/` 下的配置管理函数添加测试
    - [ ] 为 `src/components/` 下的组合式函数（useConfig, useSites, useToolbar 等）添加测试
    - [ ] 为核心 UI 组件（Menu, SearchDialog, SideBar）添加组件测试
    - [ ] 为工具函数（关键词提取、URL 解析等）添加边界测试
- [ ] **添加 E2E 测试** _(完整用户流程)_：
    - 使用 Playwright 或 Cypress 测试关键用户流程
    - 覆盖场景：搜索引擎切换、配置保存、布局切换、选中文字搜索
    - **依赖**：建议在 Critical 问题全部解决后开始

### 3.2 性能优化
- [ ] **优化首屏加载**：
    - [ ] 使用动态导入（`import()`）懒加载非关键组件
    - [ ] 分析打包体积，移除未使用的依赖
    - [ ] 优化图标和图片资源
- [ ] **运行时性能优化**：
    - [ ] 使用虚拟滚动优化长列表（搜索引擎列表）
    - [ ] 优化关键词提取和高亮逻辑
    - [ ] 减少不必要的响应式数据

---

## 4. 功能增强 (Low Priority)

- [ ] **配置同步机制**：实现用户脚本和插件版本之间的配置同步（WebDAV 或导入导出）
- [ ] **完善国际化 (i18n)**：移除硬编码中文，使用 `vue-i18n` 实现多语言
- [ ] **增强可访问性 (a11y)**：
    - [ ] 添加键盘导航支持
    - [ ] 添加 ARIA 属性
    - [ ] 支持屏幕阅读器
- [ ] **高级搜索功能**：
    - [ ] 搜索历史记录
    - [ ] 智能搜索建议
    - [ ] 自定义搜索快捷键

---

## 5. 代码清理与维护 (Ongoing)

- [x] **删除废弃文件**：menuItem.vue, jsonEditor.vue, storage.js 等
- [x] **统一命名规范**：组件统一为 kebab-case
- [x] **清理调试代码**：移除 console.log 和未使用变量
- [ ] **清理未使用代码**：
    - [ ] 删除 `src/util/hook.ts`（protectStyle 已移除，withHookBefore 不再使用）
    - [ ] 检查并删除其他未使用的工具函数
- [ ] **统一代码风格**：
    - [ ] 为所有公共 API 添加 JSDoc 注释
    - [ ] 统一错误处理模式
    - [ ] 统一异步操作的处理方式（async/await vs Promise）

---

## 📊 进度跟踪

### 已完成（约 60%）
- ✅ TypeScript 基础设施和核心迁移
- ✅ 存储适配器重构
- ✅ Shadow DOM 架构和样式隔离
- ✅ 工具函数模块化拆分
- ✅ 环境变量和路径别名统一

### 进行中（Critical 阶段）
- 🔄 修复挂载模式类型不一致
- 🔄 统一挂载/布局服务
- 🔄 存储桥接容错处理
- 🔄 添加核心模块单元测试

### 待开始（约 40%）
- ⏳ Shadow DOM 注入工厂抽象
- ⏳ 类名系统迁移
- ⏳ 全量类型检查
- ⏳ 性能优化和功能增强

---

## 🎯 关键里程碑

> **注意**：里程碑基于完成条件定义，不包含时间承诺

**里程碑 M0：架构稳定**
- ✅ 完成条件：
  - 所有 Critical 问题修复完成（Section 0 全部打勾）
  - 核心模块冒烟测试通过（覆盖率 > 80%）
  - 类型安全无 `any` 逃逸（`LayoutService`、存储桥接、挂载逻辑）
- 🎁 收益：可安全进行后续重构，无阻塞性架构问题

**里程碑 M1：代码质量**
- ✅ 完成条件：
  - Shadow DOM 注入工厂重构完成（减少 50%+ 重复代码）
  - 类名系统迁移完成（统一 `as-*` 前缀）
  - 性能优化完成（首屏加载 < 1s，MutationObserver 白名单化）
  - TypeScript 全量类型检查通过
- 🎁 收益：代码库可维护性显著提升，新贡献者上手时间缩短

**里程碑 M2：功能完善**
- ✅ 完成条件：
  - 国际化支持上线（至少支持中英双语）
  - 配置同步机制实现（用户脚本 ↔ 插件）
  - E2E 测试覆盖核心用户流程
  - 完整测试体系建立（单元 + 组件 + E2E）
- 🎁 收益：产品功能完整，质量有保障，可大规模推广

---

## 💡 注意事项

1. **优先级原则**：Critical > High > Medium > Low
2. **依赖管理**：严格按照任务依赖关系执行，避免返工
3. **测试驱动**：重构前先补测试，确保行为一致
4. **增量发布**：每完成一个里程碑即可发布新版本
5. **文档同步**：重要架构变更及时更新 CLAUDE.md 和 README
