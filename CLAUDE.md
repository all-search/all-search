# All-Search 项目开发指南

## 变更记录 (Changelog)

### 2026-10-22 - 配置页改版（交互 + 视觉 + e2e）

**页面骨架**
- `views/config.vue` 重写为 `<script setup lang="ts">`：56px 顶栏（品牌 / 四个胶囊标签 / 主题按钮 / GitHub）+ `el-scrollbar` 内容区 + `max-width: 1200` 居中
- 修掉三处壳层问题：logo 写死 `/all-search`（插件里 404，改走路由）、内容区高度用 `calc(100vh - 43px)` 硬编码、`box-sizing` 默认 content-box 导致「定宽 + 内边距」的卡片全部超宽
- `.el-scrollbar__view { height: 100% }` 打通 flex 高度链，保存条不再漂在页面中间

**站点配置**
- 拆出 `components/site-engine-row.vue`（阅读态 / 编辑态两态 + ⋯ 菜单），编辑改用本地草稿，点「完成」才回传，不再直接改 props（`vue/no-mutating-props`）
- 抽取 `components/save-bar.vue` 与 `composables/use-unsaved-guard.ts`，站点页与划词工具栏页共用
- **修复**：`恢复默认` 原先跟 `dirty` 绑定，保存过自定义数据后再也点不动——它是唯一能把数据还原成内置默认的入口，现已常开
- 取消编辑会还原快照，新建站点取消即丢弃；离开页面（关标签 / 切路由）统一提示未保存

**其他页面**
- 划词工具栏：卡片化 + 读写脏状态 + 撤销 / 重置，异步存储读到用户数据后再替换首屏默认值
- 交互页：两组单选加行内说明，`open-mode-tip` 支持 `compact`，避免文案重复
- JSON 编辑：面板高度改为 flex 自适应，补 `html.dark` 下的 ace / jsoneditor / 状态栏配色（右键菜单保持白底）
- 删除从未被路由引用的 `views/index.vue`（旧的搜索框 demo，还调用了不存在的 `this.$fetch`）

**测试**
- `pnpm e2e` 新增 `config` 场景（29 项断言，静态托管 `packages/options/dist` + 本机 Edge），总计 65 项
- 顺带修掉 `vitest.config.ts` 里 `mock-gm.ts` 的旧路径（文件已移到 `src/util/mock-gm.ts`，单测此前会整批失败）

### 2026-10-21 - v2.0.0

**固定元素避让重做（核心变更）**
- 弃用「全量 TreeWalker + 一次性推所有 fixed」的老做法，改为命中测试采样：`elementsFromPoint` 15×3 网格 + 祖先链追溯 + 320ms 稳定后补采，只处理真正压在条上的元素
- 新增构建期扫描：`pnpm style:scan` 打开真实站点生成 `src/config/generatedStyle.ts`，命中站点运行时只注入静态 CSS、不跑采样（两套机制互斥）
- 修掉两个长期存在的 bug：`addCustomStyle` 的方向判断永远不命中（手写样式从未生效）；样式被注入影子根（管不到站点元素）
- 扫描器支持 `--cdp` 接真实浏览器，绕过验证页；用卷影副本取出 Chrome 正在锁定的 Cookies

**新功能**
- AI 搜索分类（ChatGPT / Perplexity / 秘塔 / Devv / Claude / DuckDuckGo AI），分类数 12 → 13
- 深色模式：跟随系统 / 浅色 / 深色，配置页与菜单条同时生效
- 配置编辑器：格式化、复制当前内容、恢复默认（二次确认）

**工程化**
- `pnpm e2e` 入库（plugin / userscript / selection，36 项断言），静态规则与路由切换已覆盖
- 新增 `pnpm release:*` 一键发版，tag 与 `package.json` 版本不一致时 CI 直接失败
- 构建脚本自带临时目录（`scripts/run-with-temp.mjs`），规避 Windows 上 esbuild 的 `Access is denied`
- WXT 0.20.13 → 0.20.27；命令去重与去样板（新增 `verify` / `lint:check`，`lint` 纳入 `scripts/`）

### 2026-10-20 - 双模式收尾（插件可用化 + 文档对齐）
- 插件补齐图标、后台 worker、自带设置页（hash 路由），侧边栏设置入口改为打开扩展自身 options 页
- 修复用户脚本多段 CSS 互相覆盖导致界面无样式的问题
- 移除 TS 迁移遗留的重复文件（`options/main.js`、`route/index.js`、`vite.config.mjs`），恢复 `build:options`
- 新增插件打包 workflow，三个 workflow 统一 pnpm 10（仓库锁文件为 v9）
- 同步 README / AGENT / 本文档中的入口路径、存储实现与测试现状

### 2025-12-30 15:38:20 - AI 上下文二次增强
- 完成全仓扫描：识别 5 个模块，85 个关键文件
- 生成 `.claude/index.json` 扫描索引（包含覆盖率和缺口分析）
- 确认模块文档完整性：所有子模块已有 CLAUDE.md
- 扫描覆盖率：18.9%（450 个文件中的 85 个）
- 识别主要缺口：无测试、无 TypeScript、部分文档缺失

### 2025-12-30 14:24:51 - AI 上下文初始化
- 增强架构文档：添加 Mermaid 模块结构图
- 完善 Monorepo 结构说明
- 添加模块索引表格，包含各模块的一句话职责描述
- 为每个子模块生成独立的 `CLAUDE.md` 文档

---

## 项目概述

**All-Search (全搜)** 是一个基于Vue 3开发的搜索引擎跳转菜单工具，提供用户在不同搜索引擎之间快速切换的功能。项目支持多种部署形式，包括Tampermonkey用户脚本、浏览器插件等，是一个成熟的前端工具类项目。

## 🏗️ 项目架构

### 技术栈
- **Vue 3.5** - 前端框架（Composition API + TypeScript）
- **Vite 7** - 构建工具（`vite.config.shared.ts` 为共享配置）
- **Element Plus 2.9** - 配置页 UI 组件库
- **Vue Router 4** - 路由管理
- **Sass** - CSS 预处理器
- **WXT 0.20.27** - 浏览器扩展开发框架
- **Vitest + jsdom** - 单元测试
- **Rollup (via Vite)** - 模块打包

### 核心依赖
- `@floating-ui/vue` - 浮动定位（用于 Popper）
- `resize-observer-polyfill` - 响应式观察器
- `vite-plugin-monkey` - Tampermonkey 用户脚本开发支持

### Monorepo结构

项目采用 **pnpm workspace** 管理的 monorepo 架构：

```
all-search/
├── packages/
│   ├── script/         # Tampermonkey 用户脚本
│   ├── plugin/         # 浏览器插件（WXT 框架）
│   └── options/        # 配置页面（独立 Vue 应用）
├── src/                # 核心源码（共享代码库）
├── lib/                # 外部库文件（popper-lite）
└── 配置文件
```

### 模块结构图

```mermaid
graph TD
    A["(根) All-Search"] --> B["packages"];
    B --> C["script - Tampermonkey 用户脚本"];
    B --> D["plugin - 浏览器插件"];
    B --> E["options - 配置页面"];
    A --> F["src - 核心源码"];
    F --> G["components - Vue 组件"];
    F --> H["config - 配置管理"];
    F --> I["util - 工具函数"];
    A --> J["lib - 外部库"];

    click C "./packages/script/CLAUDE.md" "查看 script 模块文档"
    click D "./packages/plugin/CLAUDE.md" "查看 plugin 模块文档"
    click E "./packages/options/CLAUDE.md" "查看 options 模块文档"
    click F "./src/CLAUDE.md" "查看 src 模块文档"
```

## 📦 模块索引

| 模块路径 | 语言 | 职责描述 | 入口文件 | 相关脚本 |
|---------|------|---------|---------|---------|
| `packages/script` | TypeScript | Tampermonkey 用户脚本，通过 GM API 注入核心组件到网页 | `index.ts` | `dev:script`, `build:script` |
| `packages/plugin` | TypeScript | 基于 WXT 的浏览器插件，支持 Chrome/Firefox 等 | `entries/content.ts`、`entries/background.ts` | `dev:plugin`, `build:plugin` |
| `packages/options` | Vue 3 + TS | 独立配置页面应用，提供搜索引擎和工具栏管理界面 | `main.ts` | `dev:options`, `build:options` |
| `src` | Vue 3 | 核心共享代码库，包含所有组件、配置和工具函数 | `index.vue` | - |
| `lib` | JavaScript | 外部库文件（popper-lite.min.js） | - | - |

## 📁 目录结构详解

### 核心源码 (`src/`)

#### 组件系统 (`src/components/`)
- **基础UI组件**: `button.vue`, `dialog.vue`, `favicon.vue`, `logo.vue`, `icon.vue`, `radio.vue`, `color.vue`
- **功能组件**: `menu.vue`, `menuItem.vue`, `side-bar.vue`, `search-dialog.vue`, `version-alert.vue`
- **交互组件**: `hover-btn.vue`, `selection-bar.vue`, `popper.vue`, `overlay.vue`
- **滚动条组件**: `scrollbar/` - 自定义滚动条实现
- **逻辑组合 (Composables)**:
  - `useConfig.js` - 配置管理
  - `useSites.js` - 搜索引擎数据管理
  - `useToolbar.js` - 工具栏状态管理
  - `useMode.js` - 布局模式管理
  - `useSwitchShow.js` - 显示/隐藏切换
  - `useAlign.js` - 对齐方式
  - `useColor.js` - 颜色管理
  - `useFavicon.js` - 网站图标处理

#### 配置管理 (`src/config/`)
- `loadList.js` - 支持的网站加载列表（214+ 网站的 URL 匹配规则和特殊样式）
- `siteInfo.js` - 当前站点信息管理
- `toolbar.js` - 工具栏默认配置
- `sites/` - 各类搜索引擎配置目录
  - `index.js` - 搜索引擎分类索引（12 个分类）
  - `search.js` - 通用搜索引擎（百度、谷歌、必应等）
  - `image.js` - 图片搜索
  - `video.js` - 视频搜索
  - `music.js` - 音乐搜索
  - `translate.js` - 翻译工具
  - `scholar.js` - 学术搜索
  - `shopping.js` - 购物搜索
  - `developer.js` - 开发工具
  - `news.js` - 新闻搜索
  - `social.js` - 社交网络
  - `knowledge.js` - 百科知识
  - `disk.js` - 网盘搜索

#### 工具函数 (`src/util/`)
> 源码已全量迁移到 TypeScript，下列文件均为 `.ts`。

- **核心工具**: `index.ts`, `storage/`（`index.ts` + `tm.ts` / `extension.ts` / `bridge.ts` / `types.ts`）, `hook.ts`, `store.ts`
- **挂载/布局**: `mount.ts`（`setupApp`）, `layoutService.ts`, `dom.ts`
- **样式处理**: `initStyle.ts`, `addSpecialStyle.ts`, `injectStyle.ts`
- **交互功能**: `getKeyword.ts`, `fullScreen.ts`, `clipboard.ts`, `onClickOutside.ts`, `tap.ts`
- **兼容性**: `routerChange.ts`, `addScript.ts`, `sites.ts`
- **性能优化**: `debounce.ts`, `raf.ts`, `useTimeout.ts`, `useScroll.ts`
- **URL 处理**: `parseUrl.ts`

### 子包结构

#### 1. 用户脚本包 (`packages/script/`)
- 开发: `pnpm run dev:script`
- 构建: `pnpm run build:script`
- 入口: `packages/script/index.ts`
- 配置: `packages/script/src/script-config.js` - Tampermonkey 元数据
- 构建配置: `packages/script/vite.config.ts`（含 CSS 按 chunk 注入影子根的逻辑）

**特点**：
- 使用 Vite + vite-plugin-monkey 构建
- 支持开发模式（watch）和生产模式
- 生成符合 Tampermonkey 规范的用户脚本
- 通过 GM API (`GM_getValue`, `GM_setValue`) 管理存储

#### 2. 浏览器插件包 (`packages/plugin/`)
- 开发: `pnpm run dev:plugin`
- 构建: `pnpm run build:plugin`（产出 zip）/ `pnpm run zip:firefox`
- 配置: `packages/plugin/wxt.config.js`
- 入口:
  - Content Script: `entries/content.ts`
  - Background: `entries/background.ts`（响应“打开设置页”消息）
  - Options Page: `entries/options/main.js`
- 图标: `packages/plugin/public/icon/{16,32,48,96,128}.png`（WXT 自动写入 manifest）

**特点**：
- 使用 WXT 框架开发
- 支持 Chrome、Firefox 多浏览器
- 自动生成 manifest.json
- 通过 `src/util/storage/extension.ts` 使用 `@wxt-dev/storage`（底层 `chrome.storage.local`）
- 设置页在扩展内走 hash 路由（`options.html#/config/sites`），刷新不会 404
- 支持热重载

#### 3. 配置页面包 (`packages/options/`)
- 开发: `pnpm run dev:options`
- 构建: `pnpm run build:options`
- 入口: `packages/options/main.ts`
- 路由: `packages/options/route/index.ts`（插件内 hash 路由 / 独立站点 history 路由）
- 页面组件: `packages/options/views/`
  - `config.vue` - 页面骨架（顶栏 / 滚动区 / 限宽内容），四个标签共用
  - `sites.vue` - 站点配置（分类导航 + 面板 + 保存条）
  - `edit.vue` - JSON 编辑
  - `toolbar.vue` - 划词工具栏配置
  - `interaction.vue` - 左键打开方式
- 复用件: `components/site-engine-row.vue`、`components/save-bar.vue`、`composables/use-unsaved-guard.ts`

**特点**：
- 独立的 Vue 3 + Vue Router 应用
- 使用 Element Plus 组件库
- 支持拖拽排序（vue-draggable-next）
- 可部署到 GitHub Pages

## 🚀 开发指南

### 环境准备
```bash
# 安装依赖
pnpm install

# 准备Git hooks
pnpm run prepare
```

**依赖要求**：
- Node.js: >= 16
- pnpm: >= 8

### 开发模式

#### 用户脚本开发
```bash
pnpm run dev:script
```
- 使用 watch 模式自动构建
- 生成 `index.dev.js` 文件
- 需要复制到 Tampermonkey 中运行
- 记得开启文件访问权限

**调试技巧**：
1. 在 Tampermonkey 中启用"允许访问文件网址"
2. 使用 `file://` 协议加载开发版本
3. 修改代码后自动重新构建

#### 浏览器插件开发
```bash
pnpm run dev:plugin
```
- 使用 WXT 框架进行开发
- 支持热重载
- 自动加载到浏览器

**Firefox 开发**：
```bash
pnpm run dev:firefox
```

#### 配置页面开发
```bash
pnpm run dev:options
```
- 独立的 Vue 应用
- 用于搜索引擎配置管理
- 访问 `http://localhost:5173/all-search/`

### 生产构建

#### 构建用户脚本
```bash
pnpm run build:script
```
- 生成 `dist/index.user.js`
- 版本号引用 package.json
- 可直接发布到 GreasyFork

#### 构建浏览器插件
```bash
pnpm run build:plugin
```
- 生成 zip 包
- 支持 Chrome、Firefox 等

**分浏览器构建**：
```bash
pnpm run build:plugin   # 打包 Chrome 版本（.output/*-chrome.zip）
pnpm run zip:firefox    # 打包 Firefox 版本（.output/*-firefox.zip + AMO sources）
```

#### 构建配置页面
```bash
pnpm run build:options
```
- 生成静态文件到 `packages/options/dist/`
- 可部署到 GitHub Pages

## 🔧 核心功能模块

### 1. 搜索引擎管理
- **分类管理**: 支持 13 种搜索引擎分类（含 AI）
- **拖拽排序**: 可调整搜索引擎顺序
- **自定义添加**: 支持用户添加自定义搜索引擎
- **自动加载**: 新添加的搜索引擎自动显示
- **数据持久化**: 使用 localStorage (TM) 或 chrome.storage (Plugin)

### 2. 用户界面
- **响应式设计**: 支持桌面端和移动端
- **布局切换**: 支持水平/垂直布局
  - 水平：顶部/底部固定
  - 垂直：左侧/右侧固定
- **主题适配**: 自动适应网站样式
- **隐藏功能**: 支持自动隐藏和手动触发
- **动画效果**: 平滑的过渡动画

### 3. 交互功能
- **文本选择工具栏**: 选中文字后显示工具栏（可配置）
- **全局弹窗搜索**: 快速搜索功能
- **中键打开**: 支持中键打开新窗口
- **快捷键支持**: 键盘快捷键操作
- **触摸支持**: 移动端触摸手势

### 4. 兼容性处理
- **样式保护**: 使用 CSS 命名空间防止被网站样式覆盖
- **路由监听**: 适配 SPA 应用（监听 URL 变化）
- **DOM 劫持**: 针对特殊网站的处理（百度、YouTube 等）
- **特殊样式注入**: 针对 214+ 网站的样式适配

## 🎨 样式系统

### CSS 变量
```css
:root {
  --as-horizontal-height: 40px;
  --as-primary-color: #1890ff;
  --as-bg-color: #ffffff;
  --as-primary-text-color: #606266;
  --as-secondary-background-color: #f5f7fa;
  --as-border-color: #e8e8e8;
}
```

### 布局模式
- **水平布局**: 顶部/底部固定
  - `.as-horizontal.as-top` - 顶部
  - `.as-horizontal.as-bottom` - 底部
- **垂直布局**: 左侧/右侧固定
  - `.as-vertical.as-left` - 左侧
  - `.as-vertical.as-right` - 右侧
- **移动端适配**: 点击触发菜单

### 动画效果
- **平滑过渡**: transform 动画（0.1s）
- **渐显渐隐**: opacity 动画
- **滑动效果**: 位置变化动画
- **隐藏/显示**: translateY/translateX 100%

### 样式隔离
- 所有样式使用 `#all-search` 作为根选择器
- 使用 `as-` 前缀避免命名冲突
- 重要样式使用 `!important` 防止覆盖

## 🔌 配置系统

### 配置存储

**Tampermonkey 模式**：
- 使用 `GM_getValue` / `GM_setValue` / `GM_deleteValue`
- 存储在 Tampermonkey 的独立存储空间

**Plugin 模式**：
- 使用 `wxt/storage` API
- 底层使用 `chrome.storage.local`

**存储 Key 格式**：
- `__allSearch__{name}` - 统一前缀（由 `src/util/common.ts` 的 `getName()` 生成）
- 例：`__allSearch__sites`、`__allSearch__mode`

**适配器**（`src/util/storage/`）：
- `TmAdapter`（`tm.ts`）：GM_getValue / GM_setValue / GM_deleteValue
- `ExtensionAdapter`（`extension.ts`）：`@wxt-dev/storage`，底层 `chrome.storage.local`
- `WebBridgeAdapter`（`bridge.ts`）：在线配置页 ↔ 油猴脚本的跨上下文桥接，5 秒无响应降级到 localStorage

### 配置项
- **搜索引擎列表** (`sites`): 分类和 URL 配置
- **界面设置** (`config`): 布局、颜色、位置
- **功能开关** (`toolbar`): 各种功能的启用/禁用
- **快捷键设置**: 自定义快捷键

### 配置导入/导出
- 支持 JSON 格式导入导出
- 使用 JsonEditor 组件编辑

## 🧪 测试和调试

### 本地调试
1. 打开浏览器开发者工具
2. 使用 Vue DevTools 调试组件
3. 检查控制台错误信息
4. 验证样式兼容性

**调试技巧**：
- 在 `src/index.vue` 的 `setup()` 中添加 `console.log`
- 使用 Vue DevTools 查看响应式数据
- 检查 `#all-search` DOM 结构

### 兼容性测试
- **Chrome**: 最新版本
- **Firefox**: 最新版本
- **Safari**: 最新版本
- **Edge**: 最新版本

### 移动端测试
- **iOS Safari**: 测试触摸交互
- **Android Chrome**: 测试响应式布局
- **微信浏览器**: 测试特殊环境

### 网站兼容性测试
- 在 `src/config/loadList.js` 中查看支持的网站列表
- 测试特殊样式是否生效
- 验证关键词提取是否正确

## 📦 部署发布

### 用户脚本发布
1. 更新版本号（`package.json`）
2. 构建脚本文件：`pnpm run build:script`
3. 上传到 GreasyFork
4. 更新 GitHub Release

**GreasyFork 发布**：
- 使用 `dist/index.user.js`
- 更新说明中注明版本变更

### 浏览器插件发布
1. 构建插件包：`pnpm run build:plugin`
2. 提交到 Chrome Web Store
3. 提交到 Firefox Add-ons
4. 更新 GitHub Release

**注意事项**：
- Chrome Web Store 需要审核（1-3 天）
- Firefox Add-ons 需要代码审查

### 配置页面部署
1. 构建静态文件：`pnpm run build:options`
2. 部署到 GitHub Pages
3. 配置自定义域名（可选）
4. 更新 CDN 缓存

**GitHub Pages 部署**：
- 使用 `packages/options/dist/` 目录
- 配置 base URL 为 `/all-search/`

## 🤝 贡献指南

### 代码规范
- 使用 ESLint 检查代码：`pnpm run lint`
- 遵循 Vue 3 组合式 API 规范
- 使用 Prettier 格式化代码（可选）
- 遵循 Git 提交规范（Conventional Commits）

**Commit 规范**：
```
feat: 新功能
fix: 修复 bug
refactor: 重构
style: 样式调整
docs: 文档更新
chore: 构建/工具变更
```

**Husky 钩子**：
- `pre-commit`: 运行 lint-staged
- `commit-msg`: 检查提交信息格式

### 提交流程
1. Fork 项目
2. 创建功能分支
3. 提交代码变更
4. 创建 Pull Request
5. 代码审查和合并

### 问题反馈
- 使用 GitHub Issues 报告问题
- 提供详细的重现步骤
- 包含浏览器和环境信息
- 添加相关截图或录屏

## 📚 相关资源

### 官方文档
- [Vue 3文档](https://vuejs.org/)
- [Vite文档](https://vitejs.dev/)
- [Element Plus文档](https://element-plus.org/)
- [WXT文档](https://wxt.dev/)
- [Tampermonkey 文档](https://www.tampermonkey.net/documentation.php)

### 同类工具
- [搜索酱](https://greasyfork.org/zh-CN/scripts/445274-searchjumper) - 功能最全面
- [searchEngineJump](https://greasyfork.org/zh-CN/scripts/2739-search-enginejump) - 用户最多

### 社区交流
- [GitHub Issues](https://github.com/all-search/all-search/issues)
- [腾讯频道](https://pd.qq.com/s/2bmefcl98) - 频道号: pd15449687

## 🤖 AI 使用指引

### 项目特点提示
1. **Monorepo 架构**：修改代码时注意区分共享代码（`src/`）和模块代码（`packages/*/`）
2. **多目标构建**：同一份核心代码构建为用户脚本和浏览器插件两种形式，环境差异由 `src/env.ts` 的 `VITE_TARGET` 决定
3. **存储抽象**：`src/util/storage/` 提供统一接口（TmAdapter / ExtensionAdapter / WebBridgeAdapter），**不要**在业务代码里直接调用 GM_* 或 chrome.storage
4. **样式隔离**：UI 渲染在 Shadow DOM 内，所有样式使用 `as-` 前缀；宿主页面只保留 `as-host-*` 类名

### 常见任务
- **添加新搜索引擎**：修改 `src/config/sites/{category}.ts`
- **修改布局样式**：修改 `src/assets/layout.scss`、`src/components/layout-manager.vue` 和 `src/useStyleManager.ts`
- **添加新功能组件**：在 `src/components/` 中创建，并在 `src/components/layout-manager.vue` 或 `src/index.vue` 中引用
- **适配新网站**：在 `src/config/loadList.ts` 中添加匹配规则和特殊样式

### 调试建议
1. 使用 `dev:script` 模式开发核心功能（更快）
2. 使用 `dev:plugin` 模式测试插件特性
3. 使用 Vue DevTools 查看组件状态
4. 检查 `#all-search` 元素的样式是否被覆盖

### 文档位置
- 根级文档：`CLAUDE.md`（本文件）
- 模块文档：`packages/{module}/CLAUDE.md`
- 核心代码文档：`src/CLAUDE.md`
- 扫描索引：`.claude/index.json`

## 📊 现状与缺口

### 已具备
- **类型**：`src/` 与 `packages/*` 源码全部 TypeScript（`tsconfig.json` 开 `strict`）
- **测试**：vitest + jsdom（布局服务、核心 hooks、WebBridge 降级、关键词解析）+ `pnpm e2e` 真浏览器回归
- **CI**：脚本发布、GitHub Pages、插件打包（Chrome/Firefox zip + Release）三条 workflow
- **双端实测**：插件与用户脚本都在真实浏览器里跑通过（菜单、四向布局、浮层、设置页）
- **固定元素避让**：`generatedStyle` 静态规则（`pnpm style:scan` 构建期扫描）+ 命中测试兜底，两条路按站点互斥

### 仍然缺的
1. **Firefox MV3**：现在打的是 MV2，切 MV3 需要回归权限与 content script 行为
2. **E2E 未接入 CI**：`pnpm e2e` 已入库（plugin / userscript / selection / config 四个场景，65 项断言），CI 上还需要 Playwright 的 Chromium——Chrome 137+ 已不支持命令行装扩展
3. **国际化**：无 i18n，界面只有中文
4. **无障碍**：键盘导航与屏幕阅读器支持未做
5. **Element Plus**：配置页全量引入，包体偏大，可改按需加载
6. **避让只处理顶部**：`top` 之外的定位（底部条、左右条、`bottom` 定位的元素）未覆盖；Google / 知乎 / 搜狗 / Yandex 等站点会被验证码拦截，暂无静态规则
7. **`height: 100vh` 几何补偿**：只对全屏 fixed 层加了 `height: calc(100vh - 30px)`，其它铺满视口的元素未处理

### 下一步建议
1. 存储/配置的边界用例补测（adapter 选择、bridge 超时、路由 base）
2. 把 `pnpm e2e` 接进 CI
3. 发版走 `pnpm release:patch --push`（自动升版本、打 tag、触发 Release workflow）
4. 在有干净出口的环境补扫被拦截的站点，扩充 `generatedStyle`

## 📄 许可证

本项目采用 [GPL-3.0](LICENSE) 许可证开源。

---

**注意**: 本项目为个人兴趣开发，用爱发电。如果觉得项目对您有帮助，欢迎给个⭐Star鼓励一下！
