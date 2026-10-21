# Plugin 模块 - 浏览器插件

[根目录](../../CLAUDE.md) > [packages](../) > **plugin**

## 模块职责

用 WXT 0.20 把 `src/` 共享代码打包成 Chrome / Edge / Firefox 扩展（MV3）。插件自带设置页，数据存 `chrome.storage.local`，不依赖油猴脚本。

## 入口

| 文件 | 作用 |
| --- | --- |
| `entries/content.ts` | 内容脚本：`createShadowRootUi` 建影子根 → `LayoutService.refresh(mode, host)` 定位 → `createApp(App).mount(body)`；监听 `wxt:locationchange` 重新挂载 |
| `entries/background.ts` | 后台 worker：收到 `{ type: 'all-search:open-options', route }` 后 `tabs.create('options.html#<route>')` |
| `entries/options/index.html` + `main.js` | 设置页，复用 `packages/options` 的 `App.vue` 与 `route` |

## 配置（`wxt.config.js`）

- `entrypointsDir: "entries"`，`modules: ['@wxt-dev/module-vue']`
- `manifest.permissions: ['storage']`；`options_ui.page = options.html`（`open_in_tab: true`）
- 别名：`@src` → 仓库根 `src`；`vite-plugin-monkey/dist/client` → `mock-gm.ts`
- `zip.artifactTemplate: all-search-<version>-<browser>.zip`

## 图标

`public/icon/{16,32,48,96,128}.png`，WXT 的 `discoverIcons` 会自动写入 manifest，无需手写 `icons`。
重新生成：`python packages/plugin/scripts/make-icons.py packages/plugin/public/icon`（Pillow 画蓝底放大镜）。

## 数据存储

- 构建时 `packages/plugin/.env` 提供 `VITE_TARGET=plugin`，`src/env.ts` 判定 `isPlugin=true`
- `src/util/storage/index.ts` 因此选 `ExtensionAdapter`（`@wxt-dev/storage`）
- key 形如 `local:__allSearch__sites`、`local:__allSearch__mode`
- **`mock-gm.ts` 会对任何 GM API 调用抛错**——如果哪天 `VITE_TARGET` 丢失导致走了 `TmAdapter`，控制台会立刻报“GM API 在当前构建中不可用”，不会静默丢配置

## 设置页（重要）

- 插件内使用 **hash 路由**：`options.html#/config/sites`，刷新不会 404（history 路由会）
- 内容脚本里**不能**直接 `window.open('chrome-extension://…')`，浏览器会拦（`ERR_BLOCKED_BY_CLIENT`）；必须让 background `tabs.create`
- 侧边栏「菜单设置 / 划词工具栏设置」已按此实现（`src/components/side-bar.vue`）

## 开发与构建

```bash
pnpm dev:plugin      # wxt dev：自动构建 + 打开浏览器 + 热更新
pnpm dev:firefox     # Firefox 开发

pnpm build:plugin    # 产出 .output/all-search-<ver>-chrome.zip
pnpm zip:firefox     # 产出 .output/all-search-<ver>-firefox.zip（MV2 + AMO sources）
pnpm -C packages/plugin build   # 只要未打包目录 .output/chrome-mv3
```

> Windows 下 esbuild 默认写 `%TEMP%`，被杀毒/索引占用时报 `[vite:esbuild-transpile] remove ...: Access is denied`。`pnpm build:plugin` 等脚本会先跑 `pnpm build:prepare`、再经 `pnpm with-temp` 执行，直接跑即可；手动调 `wxt` 才需自己设 `$env:TEMP`。

## 产物结构（`.output/chrome-mv3`）

```
manifest.json
background.js
options.html + chunks/ + assets/
content-scripts/content.js   # 含 Vue 应用与共享代码
content-scripts/content.css  # 组件样式，WXT 注入影子根
icon/*.png
```

## 已知限制 / 待办

- Firefox 目前打的是 **MV2**（WXT 默认），后续要评估切 MV3
- `content.ts` 同时通过 `css` 选项传 `internal.scss?inline`、又由 WXT 注入 `content.css`，两者有重叠（无害，但可精简）
- 插件暂未上架商店；图标是占位设计，有正式稿直接同名覆盖 PNG

## 调试

1. `chrome://extensions` → 开发者模式 → 加载 `.output/chrome-mv3`
2. 改代码后点扩展卡片上的刷新按钮（`wxt dev` 会自动重载）
3. 页面 Elements 里搜 `all-search-ui`：宿主存在但内部为空 → 当前站点不在 `loadList` 白名单（应用按设计 disabled）
