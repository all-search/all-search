# Script 模块 - Tampermonkey 用户脚本

[根目录](../../CLAUDE.md) > [packages](../) > **script**

## 模块职责

用 `vite-plugin-monkey` 把 `src/` 共享代码打包成单个用户脚本（Tampermonkey / ScriptCat）。与插件版共用同一份 UI，只是外壳不同：宿主是 `<all-search-ui id="all-search">`，数据走 GM API。

## 入口与元数据

| 文件 | 作用 |
| --- | --- |
| `index.ts` | 入口：`initTmMethods()` → `addStyle(globalCss)` → `setupApp({ rootComponent, hostId: 'all-search', hostTag: 'all-search-ui' })` |
| `src/script-config.js` | 油猴头：name/version 取自根 `package.json`，`@match *://*/*`、`@run-at document-idle`、`@noframes`、`grant: GM_addStyle/GM_setValue/GM_getValue/GM_deleteValue/GM_listValues` |
| `vite.config.ts` | monkey 插件配置 + CSS 注入逻辑（见下） |

Vue 不打进产物，通过 `@require` 从 CDN 引入（`externalGlobals: { vue: ['Vue', '...vue.global.prod.js'] }`），产物约 230 kB。

## CSS 注入（最容易踩坑的地方）

用户脚本的样式不是 WXT 那种自动注入，而是 `cssSideEffects` 自己塞进影子根。一次构建会产生**两段 CSS**：

1. 组件 SFC 的 `<style>`（menu、popper、scrollbar…）
2. `index.ts` 里 `import '@src/assets/internal.scss'` 产生的内部样式

两段都走同一个注入函数，所以：

- style 元素的 id 必须**按 CSS 内容哈希区分**（`as-style-<hash>`）。早期用固定 id `as-style-common` 且直接覆盖 `textContent`，结果第二段把第一段冲掉，界面退化成裸 HTML（大图标、竖排）。
- 宿主/影子根还没创建时**不要**注入（不要回退到 `document.head`），等 `setupApp` 派发的 `as-inject-style` 事件再注入。

## 数据存储

- `packages/script/.env` 提供 `VITE_TARGET=script` → `isScript=true`/`isPlugin=false`
- 走 `TmAdapter`（`GM_getValue/GM_setValue/GM_deleteValue`），key 形如 `__allSearch__sites`
- 在线配置页通过 `WebBridgeAdapter` 与脚本通信（`all-search-script-loaded` / `all-search-page-loaded` 事件）

## 开发与构建

```bash
pnpm dev:script    # watch 构建，产物 packages/script/dist/
pnpm build:script  # 产出 packages/script/dist/index.user.js
```

调试建议：

1. `pnpm build:script` 后把 `dist/index.user.js` 直接拖进 Tampermonkey 新建脚本，或
2. `dev:script` 持续构建，每次改完在油猴里重新保存

> Windows 下 esbuild 默写 `%TEMP%`，可能报 `Access is denied`；`pnpm build:script` 会先跑 `pnpm build:prepare`、再经 `pnpm with-temp` 执行，手动调 vite 时才需自设 `$env:TEMP`。

## 与插件的差异

| | 用户脚本 | 插件 |
| --- | --- | --- |
| 宿主 | `<all-search-ui id="all-search">` | `<all-search-ui>` |
| 影子根结构 | 自己建 `html/head/body#as-mount-anchor` | WXT `createShadowRootUi` 建 |
| 样式注入 | `cssSideEffects` + `as-inject-style` | WXT 注入 `content.css` + `css` 选项 |
| 存储 | `TmAdapter`（GM_*） | `ExtensionAdapter`（chrome.storage） |
| 设置页 | 在线配置站 | 扩展自带 options 页 |

## 已知限制 / 待办

- 设置页入口仍跳在线配置站（`side-bar.vue` 里 `isPlugin=false` 分支），符合预期
- 没有针对真实站点的自动化回归，目前靠 `.tmp/e2e/userscript.mjs`（模拟 GM 环境注入产物）验证
