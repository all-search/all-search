# Options 模块 - 配置页面

[根目录](../../CLAUDE.md) > [packages](../) > **options**

## 模块职责

一个独立的 Vue 3 + Element Plus 配置站，用来管理搜索引擎、划词工具栏等配置。它同时被**插件复用为设置页**——插件不复制一份视图，而是直接 import 本包的 `App.vue` 和 `route`。

## 入口与路由

| 文件 | 作用 |
| --- | --- |
| `main.ts` | `createApp(App)` + Element Plus + 全部图标 + `normalize.css` / `common.scss` |
| `App.vue` | 只有 `<router-view>` + 全局样式（含 `box-sizing: border-box` 与 `html.dark body` 底色） |
| `route/index.ts` | 路由表；**history 模式按环境切换**（见下） |

路由：

```
/                     → 重定向 /config/sites
/config/sites         → views/sites.vue        站点配置（分类导航、拖拽、增删、行内编辑）
/config/edit          → views/edit.vue         JsonEditor 编辑原始配置
/config/toolbar       → views/toolbar.vue      划词工具栏配置
/config/interaction   → views/interaction.vue  左键打开方式（主菜单 / 划词两组）
/:pathMatch(.*)*      → 重定向 /
```

### 两种运行环境

| 环境 | history | URL 示例 |
| --- | --- | --- |
| 独立站点（GitHub Pages） | `createWebHistory('/all-search/')` | `/all-search/config/sites` |
| 插件设置页 | `createWebHashHistory()` | `options.html#/config/sites` |

插件内必须用 hash：`chrome-extension://<id>/config/sites` 这样的路径刷新会 404。判定依据是 `src/env.ts` 的 `isPlugin`。
品牌 logo 一律走 `router.push('/config/sites')`，**不要写死 `/all-search`**——在插件里那个地址不存在。

## 页面骨架（views/config.vue）

所有配置页共用一层壳：

```
.config-shell (flex column, height 100vh)
├─ .top-bar     56px：底色/分隔线拉满整宽
│  └─ .top-bar-inner (max-width 1200, 居中)：品牌 / 四个 .nav-tab / 主题切换 / GitHub
└─ .page-scroll (el-scrollbar, flex: 1)
   └─ .page-main (height: 100%, padding 20/24)
      └─ .page-inner (max-width 1200, flex column)
         ├─ version-alert
         └─ <router-view>
```

- 顶栏与正文共用「24px 安全边距 + 1200 栏」这套算法（`.top-bar` 只留 `padding: 0 24px`，`.top-bar-inner` 负责限宽居中），所以品牌和内容卡片的左右边始终对齐；改宽度时两处要一起改，e2e 有断言盯着。
- `.el-scrollbar__view { height: 100% }` 是为了让子页面的 `flex: 1` 与 sticky 底栏有确定高度；去掉它会出现“保存条漂在页面中间”。
- 主题切换写 `html.dark`（Element Plus 的 dark css-vars），图标随当前偏好变（Monitor / Sunny / Moon）。

## 视图与组件

| 文件 | 说明 |
| --- | --- |
| `views/sites.vue` | 左侧分类导航（带计数、隐藏态划线、**拖拽换位**）+ 右侧面板；工具条（搜索 / 全部·已隐藏 / 添加站点）；列表行两态；底部 `save-bar` |
| `components/site-engine-row.vue` | 单行站点：阅读态（拖拽柄 / 图标 / 名称 / 域名 / 隐藏徽标 / ⋯菜单）与编辑态（名称 / 网址 / 图标 / 完成 / 取消）；编辑用**本地草稿**，点“完成”才 emit 回父组件，不改 props |
| `components/save-bar.vue` | 统一底部条：脏状态文案 + 撤销修改 + 恢复默认 + 保存；**恢复默认不受 dirty 限制**（它是唯一能把自定义数据还原成内置默认的入口） |
| `views/toolbar.vue` | 划词工具栏列表，同样接 `save-bar`；存储是异步的，首屏用默认值渲染后再替换成用户数据 |
| `views/interaction.vue` | 两组单选 + `open-mode-tip`（`compact` 模式下只保留 Ctrl / 中键那一条） |
| `views/edit.vue` | JSON 编辑器外壳；初始化与重置都做深拷贝，保存后调用 `reloadSites()` 让其它页面同步 |
| `composables/use-unsaved-guard.ts` | `beforeunload` + 路由守卫的“未保存提醒”，sites / toolbar 共用 |

约定：

- 脏状态一律用「当前序列化结果 ≠ 已保存快照」判断，新增字段要同时改 `formatSites` / `formatList`，否则永远不脏。
- 拖拽排序用 `vue-draggable-next`：站点行（`handle=".engine-drag"`）与一级分类（整块导航项都可拖）各一个实例；列表项需要一个稳定的 `__uid` 做 key，保存时剔除。分类拖完只是改内存顺序，要按 `保存` 才落盘，`撤销修改` 可回退。
- 拖拽参数统一：`:delay="260" :delay-on-touch-only="true" :touch-start-threshold="6" :force-fallback="true"`——移动端必须长按才进拖拽，否则和分类栏的横滑抢手势；桌面鼠标不受影响（仍即时拖）。`force-fallback` 是必须的：原生 HTML5 拖拽会把 `touchStartThreshold` 强制改成 1，手指抖动就会取消长按。
- 卡片统一：`border: 1px solid var(--el-border-color-lighter)` + `border-radius: 12px` + 极浅阴影，不要写死 `#fff` / `#303133`。
- 可点区域按桌面人体工学给：一级分类按钮 ≥ 40px 高、间距 4px、字号 14px（窄屏横排时 36px），顶栏标签 36px、图标按钮 34px；纯图标按钮必须带 `aria-label`，键盘态用 `:focus-visible` 描边。e2e 有一条「分类按钮可点区域够大」盯着尺寸。
- 页内不再自己加 `padding`（壳层已有 20/24），窄屏由壳层降到 12。

## 构建与部署

```bash
pnpm dev:options    # 本地开发
pnpm build:options  # 产物 packages/options/dist
```

- 使用 `vite.config.ts`，基础配置来自根目录 `vite.config.shared.ts`（`@src` 别名、Vue 插件、manualChunks）
- production 模式才 `emptyOutDir` + `minify`
- 部署到 GitHub Pages：`.github/workflows/gh-page.yml` 上传 `packages/options/dist`，base 为 `/all-search/`

> 历史遗留：`main.js` / `route/index.js` / `vite.config.mjs` 三份 TS 迁移后的重复文件已删除。`vite.config.mjs` 曾在 Vite 的解析顺序里抢先于 `.ts`，导致 `build:options` 直接失败。未被任何路由引用的 `views/index.vue`（旧的搜索框 demo，还用了不存在的 `this.$fetch`）也已删除。

## 与插件的复用关系

```
packages/plugin/entries/options/main.js
  ├─ import App from '../../../options/App.vue'
  └─ import router from '../../../options/route'   → route/index.ts
```

因此改本包的路由或视图，会同时影响**在线配置站**和**插件设置页**，改完两边都要看一眼。

## 版本提示（version-alert）

- 在线站点依赖 `WebBridgeAdapter` 连上油猴脚本后写入 `store.tmVersion`，连不上才提示“未连接油猴脚本”（info 提示，说明数据只存在本地）
- 插件设置页里 `isPlugin=true`，**直接跳过**这条提示（数据本来就在 chrome.storage）

## 测试

`pnpm e2e --only=config`（或完整 `pnpm e2e`）起一个静态服务器托管 `dist`，用本机 Edge 跑 47 项断言：顶栏与正文对齐、分类导航计数与可点尺寸、**拖拽分类换位与撤销**、只渲染当前分类、搜索过滤、行内编辑与取消还原、脏状态、保存、撤销、恢复默认、划词工具栏、交互页、JSON 编辑器、深色模式、窄屏、触屏横滑与长按拖拽。截图落在 `e2e/artifacts/config-*.png`。

## 已知限制 / 待办

- Element Plus 全量引入（`app.use(ElementPlus)` + 全量图标），包体偏大，可改按需引入
- 没有 i18n，界面只有中文
- `views/sites.vue` 仍是 Options API + 大量内联逻辑，可拆成 `useSitesEditor` 之类的 composable
- jsoneditor 自带亮色主题，深色模式靠 `json-editor.vue` 里一段 `html.dark` 覆盖（只覆盖了代码模式的 ace 主区域与状态栏）
