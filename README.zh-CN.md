![all-search](https://socialify.git.ci/all-search/all-search/image?description=1&font=Inter&forks=1&issues=1&language=1&owner=1&pattern=Plus&stargazers=1&theme=Light)

[English](./README.md) | [简体中文](./README.zh-CN.md)

## all-search 全搜，一个搜索引擎快捷跳转菜单

固定在页面上的搜索引擎跳转菜单。**一份核心代码，两种形态**：

- **浏览器插件** —— Chrome / Edge / Firefox，基于 [WXT](https://wxt.dev)（Manifest V3）
- **用户脚本** —— 油猴 / 脚本猫，基于 `vite-plugin-monkey`

两者共用同一套 Vue 3 界面，通过 Shadow DOM 与宿主页面样式隔离。

## 安装

### 浏览器插件

1. 从 [Releases](https://github.com/all-search/all-search/releases) 下载 `all-search-<版本>-chrome.zip`（或 `-firefox.zip`）
2. 解压后打开 `chrome://extensions`，开启**开发者模式**，点**加载已解压的扩展程序**，选择解压出来的目录
3. Firefox：打开 `about:debugging#/runtime/this-firefox` → **临时载入附加组件**，选择解压目录里的 `manifest.json`

### 用户脚本

- [GreasyFork](https://greasyfork.org/zh-CN/scripts/397993-all-search)
- [脚本猫](https://scriptcat.org/script-show-page/477)
- [GitHub 地址](https://raw.github.com/all-search/all-search/release/index.user.js)

## 设置

- **插件**：点菜单条上的「菜单设置」，或在 `chrome://extensions` → All-Search → 详情 → 扩展程序选项。配置页在本地运行，数据存在 `chrome.storage.local`。
- **用户脚本**：同一个入口会打开[在线配置页](https://all-search.github.io/all-search/config/sites)，通过页面桥接与脚本通信。

## 功能

- 图形界面添加 / 编辑网址，拖拽调整分类顺序
- 横向（顶部 / 底部）与纵向（左侧 / 右侧）四种布局，运行时实时切换
- 点击分类打开第一个网址；Ctrl / 中键始终走「另一种」打开方式
- 按功能区设置左键打开方式：主菜单 / 划词搜索（当前页 / 新标签页）
- 滚动自动隐藏、条可收起、划词工具栏、全局搜索弹窗
- 200+ 站点适配（`src/config/loadList.ts`）

## 开发

```bash
pnpm install
pnpm dev:plugin    # WXT dev，自动打开装有扩展的浏览器（热更新）
pnpm dev:script    # 用户脚本 watch 构建（packages/script/dist）
pnpm dev:options   # 独立配置页（http://localhost:3000/all-search/）
```

## 构建

```bash
pnpm build:script   # packages/script/dist/index.user.js（发 GreasyFork / 脚本猫）
pnpm build:plugin   # packages/plugin/.output/*-chrome.zip（Chrome 商店）
pnpm zip:firefox    # packages/plugin/.output/*-firefox.zip（AMO）
pnpm build:options  # packages/options/dist（GitHub Pages）
```

> **Windows 提示**：若构建报 `[vite:esbuild-transpile] remove ...: Access is denied`，先把 `TEMP` 指到项目内再构建：
>
> ```powershell
> New-Item -ItemType Directory -Force .tmp\build | Out-Null
> $env:TEMP="$PWD\.tmp\build"; $env:TMP=$env:TEMP
> ```

## 测试

```bash
pnpm test          # vitest + jsdom 单元测试
pnpm e2e           # 浏览器回归（Playwright + 本机 Edge/Chrome）
pnpm type-check    # vue-tsc（仍有少量历史遗留报错）
pnpm lint
```

`pnpm e2e` 会先构建两套产物，然后：

- **plugin**：加载未打包扩展，验证菜单条、四种布局下的浮层方向、「菜单设置」是否打开扩展自带的 options 页
- **userscript**：模拟油猴环境（Vue 全局 + `GM_*` 打桩）并注入 `dist/index.user.js`
- **selection**：划词工具栏——「更多」弹窗保留选中关键字，并在新标签页打开目标

可选参数：`--no-build`（复用产物）、`--headed`（显示浏览器窗口）、`--only=plugin|userscript`。
截图输出到 `e2e/artifacts/`（已 gitignore）。可用 `E2E_CHANNEL` 或 `E2E_EXECUTABLE` 指定浏览器。

## 目录结构

| 路径 | 作用 |
| --- | --- |
| `src/` | 共享 Vue 组件、站点配置、存储适配层、挂载与布局逻辑 |
| `packages/script/` | 用户脚本入口与油猴元数据 |
| `packages/plugin/` | WXT 插件：内容脚本、后台、设置页、图标 |
| `packages/options/` | 独立配置站（Element Plus + Vue Router） |

## 致谢

感谢 searchEngineJump 提供的创意和网址来源。同类工具：
[搜索酱](https://greasyfork.org/zh-CN/scripts/445274-searchjumper) ·
[searchEngineJump](https://greasyfork.org/zh-CN/scripts/2739-search-enginejump)

如果这个项目对你有帮助，欢迎去 GitHub 点个 ⭐。

## 反馈

- [GitHub Issues](https://github.com/all-search/all-search/issues)
- 腾讯频道：pd15449687

## 许可证

[GPL-3.0](./LICENSE)
