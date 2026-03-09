[根目录](../../CLAUDE.md) > [packages](../) > **plugin**

# Plugin 模块 - 浏览器插件

## 变更记录 (Changelog)

### 2025-12-30 14:24:51 - 初始化模块文档
- 创建模块级 CLAUDE.md
- 记录模块职责、入口和配置

---

## 模块职责

**浏览器插件模块**，基于 WXT 框架开发，将 All-Search 核心功能打包为符合 Chrome、Firefox 等浏览器扩展标准的插件，支持 Manifest V3 规范。

## 入口与启动

### Content Script 入口
- **文件**: `packages/plugin/entries/content.js`
- **作用**: 注入到网页的内容脚本，负责创建和挂载 Vue 应用
- **执行时机**: 页面加载完成后
- **匹配规则**: `<all_urls>` - 所有网站

**核心逻辑**:
```javascript
// 创建锚点元素
let anchor = document.createElement('div')
anchor.id = 'all-search'
document.documentElement.insertBefore(anchor, document.body)

// 使用 WXT 的 Integrated UI 创建应用
const ui = createIntegratedUi(ctx, {
  position: 'inline',
  anchor: anchor,
  onMount: (container) => {
    const app = createApp(App) // App = src/index.vue
    app.mount(container)
    return app
  }
})
```

### Options Page 入口
- **文件**: `packages/plugin/entries/options/main.js`
- **作用**: 配置页面的入口，提供搜索引擎和工具栏管理界面
- **HTML**: `packages/plugin/entries/options/index.html`

**特点**:
- 独立的 Vue 应用
- 使用 Element Plus UI 组件库
- 与 `packages/options` 共享路由和视图组件

### WXT 配置
- **文件**: `packages/plugin/wxt.config.js`
- **框架**: WXT 0.19.12
- **关键配置**:
  ```javascript
  {
    manifest: {
      name: 'All-Search',
      version: '1.5.10', // 从根 package.json 读取
      permissions: ['storage']
    },
    modules: ['@wxt-dev/module-vue'],
    entrypointsDir: "entries",
    runner: {
      startUrls: ['https://www.baidu.com'] // 开发时默认打开
    }
  }
  ```

## 开发流程

### 开发模式

**Chrome 开发**:
```bash
pnpm run dev:plugin
```
- 使用 WXT 的开发服务器
- 自动加载插件到浏览器
- 支持热重载（HMR）
- 自动重新加载扩展

**Firefox 开发**:
```bash
pnpm run dev:firefox
```
- 针对 Firefox 的开发模式
- 使用 Firefox 特定的 manifest 配置

### 开发流程
1. 运行 `pnpm run dev:plugin`
2. WXT 自动打开浏览器并加载扩展
3. 访问测试网站（如 https://www.baidu.com）
4. 修改代码后，扩展会自动重新加载

### 生产构建

**构建插件**:
```bash
pnpm run build:plugin
```
- 生成优化后的代码到 `.output/chrome-mv3/`
- 支持多浏览器构建（Chrome、Firefox）

**打包为 ZIP**:
```bash
pnpm run zip           # Chrome 版本
pnpm run zip:firefox   # Firefox 版本
```
- 生成 `all-search-1.5.10-chrome.zip`
- 可直接上传到 Chrome Web Store 或 Firefox Add-ons

## 对外接口

### Chrome Extension APIs
插件使用以下浏览器扩展 API：

- **存储相关**:
  - `chrome.storage.local.get()` - 读取存储
  - `chrome.storage.local.set()` - 写入存储
  - `chrome.storage.local.remove()` - 删除存储
  - （通过 WXT 的 `wxt/storage` 封装）

### WXT Storage API
- **包装器**: `wxt/storage`
- **方法**:
  - `storage.getItem('local:key')` - 读取
  - `storage.setItem('local:key', value)` - 写入
  - `storage.removeItem('local:key')` - 删除

### 核心组件集成
- 共享 `src/` 下的所有 Vue 组件
- 通过 `@wxt-dev/module-vue` 自动处理 Vue 文件
- 支持 `.vue` 单文件组件

## 关键依赖与配置

### 核心依赖
- `wxt` - WXT 框架（浏览器扩展开发）
- `@wxt-dev/module-vue` - Vue 3 支持模块
- `vue` - 核心框架（从根依赖继承）
- `vue-router` - 路由（Options Page 使用）
- `element-plus` - UI 组件库（Options Page 使用）

### 存储机制
- **实现**: `src/util/storage.js`
- **环境检测**: `import.meta.env.VITE_TARGET === 'plugin'`
- **Key 格式**: `local:all-search-{name}`
- **存储空间**: `chrome.storage.local`（默认 5MB 上限）

### Manifest V3 配置
```json
{
  "manifest_version": 3,
  "name": "All-Search",
  "version": "1.5.10",
  "permissions": ["storage"],
  "content_scripts": [{
    "matches": ["<all_urls>"],
    "js": ["content.js"]
  }]
}
```

### 特殊处理
- **URL 变化监听**: 使用 WXT 的 `wxt:locationchange` 事件
- **UI 集成**: 使用 `createIntegratedUi` 而非直接 DOM 操作
- **生命周期**: 自动处理插件卸载和重新挂载

## 数据模型

### 存储的数据结构
与 Tampermonkey 模式相同，但使用不同的存储 API：

#### 1. 搜索引擎配置 (`local:all-search-sites`)
```javascript
[
  {
    nameZh: "搜索",
    name: "search",
    list: [
      {
        nameZh: "百度",
        url: "https://www.baidu.com/s?wd=%s",
        data: { visible: true }
      }
    ],
    data: { visible: true }
  }
]
```

#### 2. 用户配置 (`local:all-search-config`)
```javascript
{
  mode: 1, // 布局模式
  direction: 1, // 方向
  color: "#1890ff", // 主题色
  show: 1 // 显示状态
}
```

#### 3. 工具栏配置 (`local:all-search-toolbar`)
```javascript
{
  visible: 1 // 工具栏可见性
}
```

### 数据同步
- Chrome Sync 支持（可选，需额外配置 `chrome.storage.sync`）
- 跨设备同步（需要用户登录 Chrome）

## 测试与质量

### 测试策略
- **无自动化测试**: 当前模块没有单元测试
- **手动测试**: 在多个浏览器上测试兼容性
- **WXT 开发工具**: 使用 WXT 的内置调试工具

### 测试场景
1. **基本功能**:
   - 插件是否正常加载
   - Content Script 是否注入成功
   - Options Page 是否正常显示

2. **兼容性**:
   - Chrome（Manifest V3）
   - Firefox（Manifest V2/V3）
   - Edge（基于 Chromium）

3. **性能**:
   - 插件大小（ZIP 文件）
   - 页面加载速度影响
   - 内存占用情况

### 代码质量工具
- **ESLint**: 继承根配置
- **TypeScript**: WXT 自动生成类型定义（`.wxt/types/`）

## 常见问题 (FAQ)

### Q: 如何调试插件？
A:
1. 打开 `chrome://extensions/`
2. 启用"开发者模式"
3. 点击"检查视图"打开 DevTools
4. 在 Content Script 中使用 `console.log()`

### Q: 为什么修改代码后插件没有更新？
A:
1. 确认 `pnpm run dev:plugin` 正在运行
2. WXT 应该自动重新加载扩展
3. 如果没有，手动点击"重新加载"按钮
4. 刷新测试网页

### Q: Options Page 样式不正确？
A:
1. 检查 Element Plus 是否正确加载
2. 确认 CSS 文件路径正确
3. 查看控制台是否有 CSS 加载错误

### Q: 如何切换到 Firefox？
A:
```bash
pnpm run dev:firefox    # 开发模式
pnpm run build:firefox  # 构建
pnpm run zip:firefox    # 打包
```

### Q: 插件体积过大怎么办？
A:
1. 检查是否包含了不必要的依赖
2. 使用 WXT 的 Tree Shaking 优化
3. 压缩图片和资源文件
4. 考虑代码分割（Code Splitting）

### Q: 如何添加新的权限？
A:
在 `wxt.config.js` 的 `manifest.permissions` 中添加：
```javascript
manifest: {
  permissions: ['storage', 'tabs', 'activeTab']
}
```

## 相关文件清单

### 核心文件
- `packages/plugin/entries/content.js` - Content Script 入口
- `packages/plugin/entries/options/main.js` - Options Page 入口
- `packages/plugin/entries/options/index.html` - Options Page HTML
- `packages/plugin/wxt.config.js` - WXT 配置
- `packages/plugin/package.json` - 模块配置

### 生成的文件（不要编辑）
- `packages/plugin/.wxt/` - WXT 自动生成的类型定义和配置
- `packages/plugin/.output/` - 构建产物
- `packages/plugin/node_modules/.vite/` - Vite 缓存

### 共享代码（来自 `src/` 和 `packages/options/`）
- `src/index.vue` - 核心组件
- `src/util/storage.js` - 存储适配层
- `packages/options/route/index.js` - Options Page 路由
- `packages/options/views/` - Options Page 视图组件

### 构建产物
- `.output/chrome-mv3/` - Chrome 构建产物
- `.output/firefox-mv3/` - Firefox 构建产物
- `all-search-{version}-{browser}.zip` - 打包文件

## 目录结构
```
packages/plugin/
├── entries/              # 入口点目录
│   ├── content.js       # Content Script
│   └── options/         # Options Page
│       ├── index.html
│       └── main.js
├── wxt.config.js        # WXT 配置
├── package.json
├── .wxt/                # WXT 生成文件
├── .output/             # 构建产物
└── CLAUDE.md            # 本文档
```

## 下一步建议

1. **添加单元测试**: 测试存储逻辑和组件
2. **CI/CD**: 自动化构建和发布流程
3. **多语言支持**: 使用 WXT 的 i18n 功能
4. **权限优化**: 只请求必要的权限
5. **性能监控**: 添加性能指标收集
6. **用户反馈**: 集成错误报告和反馈机制
