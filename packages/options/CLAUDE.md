# Options 模块 - 配置页面

[根目录](../../CLAUDE.md) > [packages](../) > **options**

## 模块职责

一个独立的 Vue 3 + Element Plus 配置站，用来管理搜索引擎、划词工具栏等配置。它同时被**插件复用为设置页**——插件不复制一份视图，而是直接 import 本包的 `App.vue` 和 `route`。

## 入口与路由

| 文件 | 作用 |
| --- | --- |
| `main.ts` | `createApp(App)` + Element Plus + 全部图标 + `normalize.css` / `common.scss` |
| `App.vue` | 只有 `<router-view>` + 全局样式 |
| `route/index.ts` | 路由表；**history 模式按环境切换**（见下） |

路由：

```
/                     → 重定向 /config/sites
/config/sites         → views/sites.vue    搜索引擎配置（拖拽排序、增删）
/config/edit          → views/edit.vue     JsonEditor 编辑原始配置
/config/toolbar       → views/toolbar.vue  划词工具栏配置
/:pathMatch(.*)*      → 重定向 /
```

### 两种运行环境

| 环境 | history | URL 示例 |
| --- | --- | --- |
| 独立站点（GitHub Pages） | `createWebHistory('/all-search/')` | `/all-search/config/sites` |
| 插件设置页 | `createWebHashHistory()` | `options.html#/config/sites` |

插件内必须用 hash：`chrome-extension://<id>/config/sites` 这样的路径刷新会 404。判定依据是 `src/env.ts` 的 `isPlugin`。

## 构建与部署

```bash
pnpm dev:options    # 本地开发
pnpm build:options  # 产物 packages/options/dist
```

- 使用 `vite.config.ts`，基础配置来自根目录 `vite.config.shared.ts`（`@src` 别名、Vue 插件、manualChunks）
- production 模式才 `emptyOutDir` + `minify`
- 部署到 GitHub Pages：`.github/workflows/gh-page.yml` 上传 `packages/options/dist`，base 为 `/all-search/`

> 历史遗留：`main.js` / `route/index.js` / `vite.config.mjs` 三份 TS 迁移后的重复文件已删除。`vite.config.mjs` 曾在 Vite 的解析顺序里抢先于 `.ts`，导致 `build:options` 直接失败。

## 与插件的复用关系

```
packages/plugin/entries/options/main.js
  ├─ import App from '../../../options/App.vue'
  └─ import router from '../../../options/route'   → route/index.ts
```

因此改本包的路由或视图，会同时影响**在线配置站**和**插件设置页**，改完两边都要看一眼。

## 版本提示（version-alert）

- 在线站点依赖 `WebBridgeAdapter` 连上油猴脚本后写入 `store.tmVersion`，连不上才提示“未安装/未启用”
- 插件设置页里 `isPlugin=true`，**直接跳过**这条提示（数据本来就在 chrome.storage）

## 已知限制 / 待办

- Element Plus 全量引入（`app.use(ElementPlus)` + 全量图标），包体偏大，可改按需引入
- 没有 i18n，界面只有中文
- 配置站与插件设置页共用视图，但没有自动化测试覆盖
