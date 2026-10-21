# All-Search AGENT 指南

本指南给下次会话 / 新接手的人一个最小但准确的起点。细节以 `CLAUDE.md`、`TODO.md` 和代码为准。

## 项目速览

All-Search（全搜）是一个固定在页面顶部的搜索引擎跳转菜单。**一份 `src/` 核心代码，两种产物**：

- 用户脚本（Tampermonkey / ScriptCat）：`packages/script`
- 浏览器插件（Chrome / Edge / Firefox，WXT）：`packages/plugin`
- 另有一个独立配置站：`packages/options`

UI 全部渲染在 Shadow DOM 内，宿主页面只保留一个 `<all-search-ui>` 元素和 `as-host-*` 类名。

## 仓库结构

| 路径 | 角色 | 入口 |
| --- | --- | --- |
| `src/` | 共享核心：组件、配置、存储适配、挂载/布局 | `src/index.vue` |
| `packages/script/` | 用户脚本包 | `index.ts` + `src/script-config.js`（元数据） |
| `packages/plugin/` | WXT 插件包 | `entries/content.ts`、`entries/background.ts`、`entries/options/` |
| `packages/options/` | 独立配置站 | `main.ts` + `route/index.ts` |
| `.github/workflows/` | CI：脚本发布、Pages、插件打包 | — |

路径别名统一用 `@src/`（对应仓库根 `src/`）。

## 核心约束

- **DOM 访问只走统一入口**：`src/util/dom.ts` 的 `getAsRoot()` / `getAsShadowRoot()` / `getAsMountAnchor()`。不要假设宿主是 `#all-search` 还是 `<all-search-ui>`。
- **挂载与布局**：`src/util/mount.ts` 的 `setupApp()`（用户脚本）和 `LayoutService.refresh()`（两种模式共用）。宿主类名 `as-host-{top|bottom|left|right}`、`as-host-{horizontal|vertical}`、`as-host-{show|hide}`。
- **样式**：宿主页用 `src/assets/global.scss`，影子根用 `internal.scss` + `layout.scss` + 各组件的 `<style>`。禁止在组件里注入宿主页面样式。
- **存储**：只经 `src/util/storage/` 读写。`TmAdapter`（GM_*）/ `ExtensionAdapter`（`@wxt-dev/storage`）/ `WebBridgeAdapter`（在线配置页与油猴脚本通信）。存储 key 前缀是 `__allSearch__`，从 2020 年起没变过，**不需要迁移**。插件构建里 GM API 被替换成抛错实现（`packages/plugin/mock-gm.ts`），误用会立刻报错而不是静默丢数据。
- **环境判定**：`src/env.ts` 的 `isPlugin` / `isScript` 来自构建期的 `VITE_TARGET`（`packages/*/.env`），不要在运行时猜。
- **Teleport**：目标只能是 `getAsMountAnchor()`，不要指向 `body`。

## 常用命令

| 任务 | 命令 | 备注 |
| --- | --- | --- |
| 装依赖 | `pnpm install` | Node ≥ 18，pnpm 10（锁文件 v9） |
| 插件开发 | `pnpm dev:plugin` | WXT 自动开浏览器，热更新 |
| 用户脚本开发 | `pnpm dev:script` | watch 构建 |
| 配置站开发 | `pnpm dev:options` | — |
| 构建 | `pnpm build:script` / `build:plugin` / `zip:firefox` / `build:options` | 产物见各包 `dist/`、`.output/` |
| 测试 | `pnpm test` | vitest + jsdom，14 个用例 |
| 浏览器回归 | `pnpm e2e` | Playwright 驱动本机 Edge/Chrome，跑插件 / 油猴 / 划词三个场景 |

> Windows 下构建若报 esbuild `Access is denied`：`build:*` / `zip*` 脚本已通过 `scripts/run-with-temp.mjs` 自动把临时目录指到 `.tmp/build`；只有手动调 `vite` / `wxt` 时才需要自己设 `$env:TEMP`。

## 当前状态（2026-10-20）

- 双模式已跑通并实测：插件（Chrome 商店格式 zip）、用户脚本、在线配置站均可构建。
- 插件：图标齐全、后台 worker 负责打开自带设置页（hash 路由）、侧边栏设置入口已接入。
- 用户脚本：CSS 按 chunk 注入影子根（修复了多段 CSS 互相覆盖的问题）。
- 测试：3 个 spec / 14 个用例，CI 已接入插件打包流程。

## 下一步

1. Firefox 从 MV2 切 MV3 的回归。
2. 把 `pnpm e2e` 接进 CI（Linux runner 需要 Playwright 的 Chromium，Chrome 137+ 已不支持命令行装扩展）。
3. `addSpecialStyle` 的 fixed 元素偏移只处理了 `top`，性能回收方案见 `src/util/addSpecialStyle_todo.md`。

## 文档入口

- 架构 / 约束 / 流程：`CLAUDE.md`
- 计划与进度：`TODO.md`
- 各模块细节：`packages/*/CLAUDE.md`、`src/CLAUDE.md`
- Shadow DOM / 样式约定：见上文「核心约束」与 `src/assets/*.scss`
