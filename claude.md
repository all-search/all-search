# All-Search 项目开发指南

## 项目概述

**All-Search (全搜)** 是一个基于Vue 3开发的搜索引擎跳转菜单工具，提供用户在不同搜索引擎之间快速切换的功能。项目支持多种部署形式，包括Tampermonkey用户脚本、浏览器插件等，是一个成熟的前端工具类项目。

## 🏗️ 项目架构

### 技术栈
- **Vue 3.3.4** - 前端框架
- **Vite 5.2.7** - 构建工具
- **Element Plus 2.2.22** - UI组件库
- **Vue Router 4.0.5** - 路由管理
- **Sass** - CSS预处理器
- **WXT 0.19.12** - 浏览器扩展开发框架

### Monorepo结构
项目采用 **pnpm workspace** 管理的monorepo架构：

```
all-search/
├── packages/
│   ├── script/         # Tampermonkey用户脚本
│   ├── plugin/         # 浏览器插件
│   └── options/        # 配置页面
├── src/                # 核心源码
├── lib/                # 外部库文件
└── 配置文件
```

## 📁 目录结构详解

### 核心源码 (`src/`)

#### 组件系统 (`src/components/`)
- **基础UI组件**: `button.vue`, `dialog.vue`, `favicon.vue`, `logo.vue`
- **功能组件**: `menu.vue`, `menuItem.vue`, `side-bar.vue`, `search-dialog.vue`
- **交互组件**: `hover-btn.vue`, `selection-bar.vue`, `popper.vue`
- **逻辑组合**: `useConfig.js`, `useSites.js`, `useToolbar.js`

#### 配置管理 (`src/config/`)
- `loadList.js` - 加载列表配置
- `siteInfo.js` - 站点信息管理
- `toolbar.js` - 工具栏配置
- `sites/` - 各类搜索引擎配置目录
  - `search.js` - 通用搜索引擎
  - `image.js` - 图片搜索
  - `video.js` - 视频搜索
  - `music.js` - 音乐搜索
  - `translate.js` - 翻译工具
  - `scholar.js` - 学术搜索
  - `shopping.js` - 购物搜索
  - `developer.js` - 开发工具

#### 工具函数 (`src/util/`)
- **核心工具**: `index.js`, `storage.js`, `hook.js`
- **样式处理**: `initStyle.js`, `addSpecialStyle.js`, `injectStyle.js`
- **交互功能**: `getKeyword.js`, `fullScreen.js`, `clipboard.js`
- **兼容性**: `routerChange.js`, `addScript.js`

### 子包结构

#### 1. 用户脚本包 (`packages/script/`)
- 开发: `pnpm run dev:script`
- 构建: `pnpm run build:script`
- 入口: `packages/script/src/index.js`

#### 2. 浏览器插件包 (`packages/plugin/`)
- 开发: `pnpm run dev:plugin`
- 构建: `pnpm run build:plugin`
- 配置: `packages/plugin/wxt.config.js`

#### 3. 配置页面包 (`packages/options/`)
- 开发: `pnpm run dev:options`
- 构建: `pnpm run build:options`
- 页面组件: `packages/options/views/`

## 🚀 开发指南

### 环境准备
```bash
# 安装依赖
pnpm install

# 准备Git hooks
pnpm run prepare
```

### 开发模式

#### 用户脚本开发
```bash
pnpm run dev:script
```
- 使用watch模式自动构建
- 生成 `index.dev.js` 文件
- 需要复制到Tampermonkey中运行
- 记得开启文件访问权限

#### 浏览器插件开发
```bash
pnpm run dev:plugin
```
- 使用WXT框架进行开发
- 支持热重载
- 自动加载到浏览器

#### 配置页面开发
```bash
pnpm run dev:options
```
- 独立的Vue应用
- 用于搜索引擎配置管理

### 生产构建

#### 构建用户脚本
```bash
pnpm run build:script
```
- 生成 `dist/index.user.js`
- 版本号引用package.json
- 可直接发布到GreasyFork

#### 构建浏览器插件
```bash
pnpm run build:plugin
```
- 生成zip包
- 支持Chrome、Firefox等

#### 构建配置页面
```bash
pnpm run build:options
```
- 生成静态文件
- 可部署到GitHub Pages

## 🔧 核心功能模块

### 1. 搜索引擎管理
- **分类管理**: 支持多种搜索引擎分类
- **拖拽排序**: 可调整搜索引擎顺序
- **自定义添加**: 支持用户添加自定义搜索引擎
- **自动加载**: 新添加的搜索引擎自动显示

### 2. 用户界面
- **响应式设计**: 支持桌面端和移动端
- **布局切换**: 支持水平/垂直布局
- **主题适配**: 自动适应网站样式
- **隐藏功能**: 支持自动隐藏和手动触发

### 3. 交互功能
- **文本选择工具栏**: 选中文字后显示工具栏
- **全局弹窗搜索**: 快速搜索功能
- **中键打开**: 支持中键打开新窗口
- **快捷键支持**: 键盘快捷键操作

### 4. 兼容性处理
- **样式保护**: 防止被网站样式覆盖
- **路由监听**: 适配SPA应用
- **DOM劫持**: 针对特殊网站的处理

## 🎨 样式系统

### CSS变量
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
- **垂直布局**: 左侧/右侧固定
- **移动端适配**: 点击触发菜单

### 动画效果
- **平滑过渡**: transform动画
- **渐显渐隐**: opacity动画
- **滑动效果**: 位置变化动画

## 🔌 配置系统

### 配置存储
- 使用localStorage存储用户配置
- 支持导入/导出配置
- 实时同步配置变更

### 配置项
- **搜索引擎列表**: 分类和URL配置
- **界面设置**: 布局、颜色、位置
- **功能开关**: 各种功能的启用/禁用
- **快捷键设置**: 自定义快捷键

## 🧪 测试和调试

### 本地调试
1. 打开浏览器开发者工具
2. 使用Vue DevTools调试组件
3. 检查控制台错误信息
4. 验证样式兼容性

### 兼容性测试
- **Chrome**: 最新版本
- **Firefox**: 最新版本
- **Safari**: 最新版本
- **Edge**: 最新版本

### 移动端测试
- **iOS Safari**: 测试触摸交互
- **Android Chrome**: 测试响应式布局
- **微信浏览器**: 测试特殊环境

## 📦 部署发布

### 用户脚本发布
1. 更新版本号
2. 构建脚本文件
3. 上传到GreasyFork
4. 更新GitHub Release

### 浏览器插件发布
1. 构建插件包
2. 提交到Chrome Web Store
3. 提交到Firefox Add-ons
4. 更新GitHub Release

### 配置页面部署
1. 构建静态文件
2. 部署到GitHub Pages
3. 配置自定义域名
4. 更新CDN缓存

## 🤝 贡献指南

### 代码规范
- 使用ESLint检查代码
- 遵循Vue 3组合式API规范
- 使用Prettier格式化代码
- 遵循Git提交规范

### 提交流程
1. Fork项目
2. 创建功能分支
3. 提交代码变更
4. 创建Pull Request
5. 代码审查和合并

### 问题反馈
- 使用GitHub Issues报告问题
- 提供详细的重现步骤
- 包含浏览器和环境信息
- 添加相关截图或录屏

## 📚 相关资源

### 官方文档
- [Vue 3文档](https://vuejs.org/)
- [Vite文档](https://vitejs.dev/)
- [Element Plus文档](https://element-plus.org/)
- [WXT文档](https://wxt.dev/)

### 同类工具
- [搜索酱](https://greasyfork.org/zh-CN/scripts/445274-searchjumper) - 功能最全面
- [searchEngineJump](https://greasyfork.org/zh-CN/scripts/2739-search-enginejump) - 用户最多

### 社区交流
- [GitHub Issues](https://github.com/all-search/all-search/issues)
- [腾讯频道](https://pd.qq.com/s/2bmefcl98) - 频道号: pd15449687

## 📄 许可证

本项目采用 [GPL-3.0](LICENSE) 许可证开源。

---

**注意**: 本项目为个人兴趣开发，用爱发电。如果觉得项目对您有帮助，欢迎给个⭐Star鼓励一下！