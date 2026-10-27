# Src 模块 - 核心源码库

[根目录](../CLAUDE.md) > **src**

## 模块职责

用户脚本、浏览器插件、配置站三端共享的全部代码：Vue 组件、站点配置、存储适配、挂载与布局逻辑。**全部为 TypeScript**，不存在 `.js` 副本。

## 顶层文件

| 文件 | 作用 |
| --- | --- |
| `index.vue` | 根组件，只做装配：`useApp()` → `<layout-manager>` + 划词栏 + 搜索弹窗 + 图标；不再承载布局逻辑 |
| `useApp.ts` | 组合 `useMode` / `useSwitchShow` / `useAutoHide` / `useToolbar` / `useStyleManager`，产出 `mode`、`show`、`visible`、`dialogVisible` 等 |
| `useStyleManager.ts` | 监听 `site` 变化注入特殊样式；`watchEffect` 合成 `isLayoutVisible` 并调用 `syncHostLayout()` 同步宿主类名 |
| `env.ts` | 构建期环境判定：`isPlugin` / `isScript`（来自 `VITE_TARGET`） |

## DOM 契约（三端统一，必须先看这段）

宿主元素：`<all-search-ui>`（脚本版还带 `id="all-search"`）。所有 DOM 访问都通过 `util/dom.ts`：

| 函数 | 返回 |
| --- | --- |
| `getAsRoot()` | 宿主元素本身 |
| `getAsShadowRoot()` | 影子根 |
| `getAsShadowHead()` | 影子根里的 `<head>`（样式注入用） |
| `getAsMountAnchor()` | Vue 挂载点 / Teleport 目标（脚本版 `#as-mount-anchor`，插件版影子 `<body>`） |

**禁止**：直接 `document.querySelector('#all-search')`、把 Teleport 指向 `document.body`、在组件里往宿主页面注入样式。

## 挂载与布局

- `util/mount.ts`
  - `setupApp()`：脚本版入口用（读 mode → 建宿主 → `LayoutService.refresh` → 建影子根 → 派发 `as-inject-style` → 挂 Vue）
  - `initShadow()`：在影子根里造 `html/head/body#as-mount-anchor`（与 WXT 的结构对齐）
  - `mountToPage()`：top/left/right 插到 `<body>` 之前；bottom 追加到 `<html>` 末尾
- `util/layoutService.ts`
  - `LayoutService.refresh(mode, targetHost?)`：移动宿主 + 维护 `as-host-{top,bottom,left,right}`、`as-host-{horizontal,vertical}`
  - `setMode(mode)`：refresh + 持久化 + 广播 `as-layout-change`

> 底部布局不需要给 body 加 `margin-bottom`：宿主本身在 `<body>` 之后占 30px，滚到最底时内容正好落在条上方（已实测）。

## 样式分层

| 文件 | 注入位置 | 内容 |
| --- | --- | --- |
| `assets/global.scss` | 宿主页面 `<head>` | 只放 `all-search-ui, #all-search` 的 `as-host-*` 兄弟选择器规则 |
| `assets/internal.scss` | 影子根 | CSS 变量、`:host` 基础样式、引入 `layout.scss` |
| `assets/layout.scss` | 影子根 | `.as-container` 四向布局、`.as-*` 动画、`:host(.as-host-*)` |
| 各组件的 `<style>` | 影子根 | 组件自身样式（非 scoped，作用域靠 `as-` 前缀） |

注意：`.as-container` 上有 `transform`（动画用），它会让后代 `position: fixed` 的包含块变成容器本身——浮层若直接放在滚动容器里要留意裁剪，必要时改用 `getAsMountAnchor()` 传送。

## 存储

`util/storage/`

| 文件 | 说明 |
| --- | --- |
| `index.ts` | 选择适配器（`isPlugin` → Extension；配置站 → WebBridge；其余 → Tm），导出 `getStorage` / `setStorage` / `delStorage` |
| `tm.ts` | GM_getValue / GM_setValue / GM_deleteValue |
| `extension.ts` | `@wxt-dev/storage`（`local:__allSearch__*`） |
| `bridge.ts` | 在线配置页 ↔ 油猴脚本的跨上下文桥接；5 秒超时降级 localStorage；顺带把版本号写进 `store.tmVersion` |
| `types.ts` | `StorageAdapter` 接口 |

key 前缀由 `util/common.ts` 的 `getName()` 生成：`__allSearch__${name}`（2020 年起未变，**不需要迁移**）。

## 配置数据

- `config/sites/`：13 个分类（ai / search / translate / video / shopping / music / developer / news / social / knowledge / image / disk / scholar），`index.ts` 汇总；`ai.ts` 只收 URL 带 `%s` 能直达结果页的引擎
- `config/loadList.ts`：200+ 站点的 URL 匹配规则、特殊样式、关键词选择器；配了 `probe` 的条目会被 `pnpm style:scan` 扫描
- `config/generatedStyle.ts`：**自动生成**，`pnpm style:scan` 的产物（构建期扫描 → 静态避让 CSS），不要手改
- `config/siteInfo.ts`：按当前 URL 计算 `site`（`invisible` / `disabled` / `style` / `generatedStyle` / `selectors`）；**不在 `loadList` 也不匹配任意搜索引擎 URL 的页面会被 disabled，整块 UI 不渲染**（这是“某些网站看不到菜单”的原因，不是 bug）
- `config/toolbar.ts`：划词工具栏默认项
- `types/site.ts`：`Site` / `SiteCategory` 类型

## 组件与组合式函数

- 布局：`layout-manager.vue`、`logo.vue`、`menu.vue`、`menu-item.vue`、`side-bar.vue`、`hover-btn.vue`
- 浮层：`popper.vue`（`useFloating` + offset/flip/shift，默认 `strategy: 'fixed'`）、`overlay.vue`、`dialog.vue`、`search-dialog.vue`、`selection-bar.vue`
- 基础：`button.vue`、`radio.vue`、`color.vue`、`form-item.vue`、`icon.vue`、`iconfont.vue`、`favicon.vue`、`category-icon.vue`（分类图标：内置 SVG / 首个站点 favicon）、`json-editor.vue`、`scrollbar/`
- Composables：`useConfig`（读写 + 校验 + 回滚）、`useSites`、`useToolbar`、`useMode`、`useSwitchShow`、`useAutoHide`、`useAlign`、`useColor`、`useFavicon`、`useOpenMode`（按功能区控制左键打开方式：`menuOpenMode` / `selectionOpenMode`，取值 `same` / `new`；Ctrl / 中键固定取反）、`useCategoryIcon`（`categoryIconSource` = `builtin` / `site`）

## 工具函数（`util/`）

`common`（`getName`/`parseJson`/`isMobile`）、`dom`、`mount`、`layoutService`、`storage/`、`openUrl`（统一的 `same`/`new` 打开方式）、`initStyle`（`syncHostLayout`/`addCustomStyle`）、`addSpecialStyle`（fixed 元素避让：命中测试采样，仅在没有静态规则的站点启用）、`injectStyle`、`getKeyword`、`fullScreen`、`clipboard`、`onClickOutside`、`tap`、`routerChange`、`addScript`、`toolbar`（配置页默认工具栏项）、`store`、`debounce`、`raf`、`useTimeout`、`useScroll`、`parseUrl`、`favicon`（图标候选顺序 / 首字母色块 / 32×32 压缩 / 缓存裁剪）、`categoryIcon`（分类图标取哪个站点）、`menuTargets`（分类点击要打开哪些站点）

## 固定元素避让（两套机制，互斥）

页面顶部的 fixed/sticky 头会被 30px 菜单条压住，处理方式分两条路：

| 场景 | 机制 | 代价 |
| --- | --- | --- |
| `generatedStyle` 命中当前站点 | 注入构建期生成的静态 CSS（`addCustomStyle`） | 运行时零成本 |
| 没有生成规则 | `addSpecialStyle` 命中测试采样（`elementsFromPoint` 网格 + 祖先链 + 320ms 补采） | 每轮约 45 个采样点 |

两者**不能同时生效**，否则同一元素会被推两次（CSS 与内联样式都会命中）——`useStyleManager` 里按 `currentSite.generatedStyle` 是否为空二选一。

重新生成：`pnpm style:scan`（可选 `--site=<关键词>`、`--limit=N`、`--headed`、`--dry`、`--fresh`）。

## 测试

`tests/`（vitest + jsdom，`pnpm test`，共 21 个用例）：

- `smoke.spec.ts`：`LayoutService` 四向类名与挂载位置、`WebBridgeAdapter` 超时降级
- `hooks.spec.ts`：`useConfig` / `useSites` / `useToolbar` / `useSwitchShow` / `useAutoHide`
- `component.spec.ts`：`layout-manager.vue` 的 show/hide 与方向类名
- `keyword.spec.ts`：关键词提取（地址栏参数、输入框选中、编码）

## 约定

- 新增文件一律 `.ts` / `<script setup lang="ts">`
- 新增组件不要直接操作宿主页面样式，统一走 `as-host-*` + `global.scss`
- 改共享代码后，用户脚本与插件**两端都要验证**（`pnpm build:script` + `pnpm build:plugin`）
- `version-alert.vue` 在 `isPlugin` 时跳过渲染（扩展自带设置页，不需要桥接）
