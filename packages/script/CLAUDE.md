[根目录](../../CLAUDE.md) > [packages](../) > **script**

# Script 模块 - Tampermonkey 用户脚本

## 变更记录 (Changelog)

### 2025-12-30 14:24:51 - 初始化模块文档
- 创建模块级 CLAUDE.md
- 记录模块职责、入口和配置

---

## 模块职责

**Tampermonkey 用户脚本模块**，负责将 All-Search 核心功能打包为符合 Tampermonkey 规范的用户脚本，通过 GM API 注入到网页中运行。

## 入口与启动

### 主入口
- **文件**: `packages/script/index.js`
- **作用**: 用户脚本的主入口文件（由构建工具生成）

### 配置文件
- **文件**: `packages/script/src/script-config.js`
- **作用**: 定义 Tampermonkey 元数据（UserScript Header）
- **关键配置**:
  ```javascript
  {
    name: "all-search 全搜，搜索引擎快捷跳转...",
    namespace: "all-search",
    version: "1.5.10", // 从根 package.json 读取
    match: ['*://*/*'], // 匹配所有网站
    'run-at': 'document-idle',
    noframes: true
  }
  ```

### 构建配置
- **工具**: Vite + vite-plugin-monkey
- **配置文件**: 无独立 `vite.config.js`（使用根配置）
- **环境变量**: `VITE_TARGET=script`

## 开发流程

### 开发模式
```bash
pnpm run dev:script
```
- 使用 Vite watch 模式
- 生成 `index.dev.js`（开发版本）
- 自动监听文件变化并重新构建

### 使用开发版本
1. 在 Tampermonkey 中创建新脚本
2. 复制 `index.dev.js` 内容到脚本编辑器
3. 启用 Tampermonkey 的"允许访问文件网址"
4. 每次代码变更后，脚本会自动重新加载

### 生产构建
```bash
pnpm run build:script
```
- 生成 `dist/index.user.js`（生产版本）
- 代码压缩和优化
- 可直接上传到 GreasyFork

## 对外接口

### GM API 使用
脚本使用以下 Greasemonkey API：

- **存储相关**:
  - `GM_getValue(key)` - 读取存储
  - `GM_setValue(key, value)` - 写入存储
  - `GM_deleteValue(key)` - 删除存储

### 核心组件注入
- 通过 Vue 3 的 `createApp()` 创建应用实例
- 将 `src/index.vue` 组件挂载到 `#all-search` 元素
- 使用 `vite-plugin-monkey` 自动注入 GM API

## 关键依赖与配置

### 依赖项
- `vite` - 构建工具
- `vite-plugin-monkey` - Tampermonkey 脚本开发支持
- `vue` - 核心框架（从根依赖继承）
- `@floating-ui/vue` - Popper 定位
- `resize-observer-polyfill` - 兼容性 polyfill

### 存储机制
- **实现**: `src/util/storage.js`
- **Key 前缀**: `all-search-`
- **数据格式**: JSON 字符串
- **存储空间**: Tampermonkey 独立存储（不同于 localStorage）

### 特殊处理
- **跨域支持**: GM API 不受同源策略限制
- **沙箱隔离**: 运行在独立的 JavaScript 沙箱中
- **样式注入**: CSS 直接注入到页面 `<head>`

## 数据模型

### 存储的数据结构

#### 1. 搜索引擎配置 (`all-search-sites`)
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

#### 2. 用户配置 (`all-search-config`)
```javascript
{
  mode: 1, // 布局模式: 1-水平, 2-垂直
  direction: 1, // 方向: 1-顶部/左侧, 2-底部/右侧
  color: "#1890ff", // 主题色
  show: 1 // 显示状态: 0-隐藏, 1-显示, 2-移除
}
```

#### 3. 工具栏配置 (`all-search-toolbar`)
```javascript
{
  visible: 1 // 工具栏可见性: 0-隐藏, 1-显示
}
```

## 测试与质量

### 测试策略
- **无自动化测试**: 当前模块没有单元测试
- **手动测试**: 在多个网站上测试兼容性
- **浏览器测试**: Chrome、Firefox、Edge 等

### 测试场景
1. **基本功能**:
   - 脚本是否正常加载
   - 搜索菜单是否显示
   - 搜索跳转是否正常

2. **兼容性**:
   - 测试 214+ 支持网站（见 `src/config/loadList.js`）
   - 验证特殊样式是否生效
   - 检查是否与其他脚本冲突

3. **性能**:
   - 页面加载速度影响
   - 内存占用情况

### 代码质量工具
- **ESLint**: 继承根配置（`.eslintrc.js`）
- **格式化**: 无独立配置

## 常见问题 (FAQ)

### Q: 为什么脚本不生效？
A: 检查以下几点：
1. Tampermonkey 是否启用
2. 脚本是否启用
3. 当前网站是否在白名单中（`match: ['*://*/*']` 应该匹配所有网站）
4. 检查控制台是否有错误信息

### Q: 如何调试脚本？
A:
1. 使用 `console.log()` 输出调试信息
2. 在 Chrome DevTools 中查看 `#all-search` 元素
3. 检查 Tampermonkey 控制台的错误信息

### Q: 开发模式下修改代码不生效？
A:
1. 确认 `pnpm run dev:script` 正在运行
2. 检查 `index.dev.js` 是否已更新
3. 在 Tampermonkey 中重新保存脚本
4. 刷新测试网页

### Q: 如何添加新的存储数据？
A:
1. 使用 `src/util/storage.js` 中的 `getStorage` / `setStorage`
2. Key 必须使用 `all-search-` 前缀
3. 数据会自动序列化为 JSON

### Q: 脚本与其他用户脚本冲突？
A:
1. 检查是否有其他脚本修改了相同的 DOM
2. 确认 CSS 样式是否被其他脚本覆盖
3. 尝试调整 `@run-at` 时机（当前为 `document-idle`）

## 相关文件清单

### 核心文件
- `packages/script/index.js` - 主入口（构建生成）
- `packages/script/src/script-config.js` - Tampermonkey 元数据配置
- `packages/script/package.json` - 模块配置

### 共享代码（来自 `src/`）
- `src/index.vue` - 核心组件
- `src/util/storage.js` - 存储适配层
- `src/config/loadList.js` - 支持的网站列表
- `src/config/sites/` - 搜索引擎配置

### 构建产物
- `dist/index.user.js` - 生产版本
- `index.dev.js` - 开发版本（临时文件）

## 下一步建议

1. **添加单元测试**: 使用 Vitest 测试存储逻辑
2. **优化构建**: 减小脚本体积
3. **改进调试**: 添加开发者模式和详细日志
4. **文档完善**: 添加 API 文档和示例
