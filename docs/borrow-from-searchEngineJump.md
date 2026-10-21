# 可借鉴特性评估：searchEngineJump-Enhance-DIY

> 参考项目：[csxo/searchEngineJump-Enhance-DIY](https://github.com/csxo/searchEngineJump-Enhance-DIY)（Fork 自 qxinGitHub/searchEngineJump）
> 评估时间：2026-10-21。**已阅读真实脚本源码**（`searchEngineJump Enhance DIY.user.js`，v0.1.1，6511 行 / 437 KB），不是只读 README。
> 引用行号均对应上述版本，仅供定位，代码会随上游变化。

## 0. 先说架构差异（决定了哪些能抄）

| 维度 | 对方 | 我们 |
| --- | --- | --- |
| 条的落点 | **逐站手写插入规则**：`rules[].insertIntoDoc = { target: 'css;.xxx' \| '//xpath', keyword, where: 'beforeBegin' }`，把条插进站点自己的容器里（如 `Line 1615` 起的一系列 rule） | 全局固定条（宿主在文档流占 30px，条自身 `fixed`），再用避让算法处理站点固定头 |
| 站点偏移 | `fixedTop: 75` / `fixedTop: 128` 这种**逐站硬编码** | `generatedStyle` 构建期扫描生成 + 运行时命中测试 |
| 样式隔离 | `GM_addStyle` 注入页面全局，类名靠 `#sej-*` / `.iqxin-*` 前缀 | Shadow DOM，页面只留 `as-host-*` |
| 规则维护 | 几百条 rule，站点改版即失效，需要逐条修 | 一条正则 + 自动扫描，站点改版重跑 `style:scan` |

**结论**：他们用「几百条手写插入点」换取了「不需要避让算法」；我们用「算法」换掉了这些手写规则。这条差异意味着：**他们大多数 rule 的写法对我们没有参考价值**，值得看的是与布局无关的产品功能。

## 1. 值得直接借鉴（已核对实现）

### 1.1 拼音排序的写法（`Line 2595-2628`）

这是全仓最值得抄的一段，比 README 描述精确：

```js
// 首字符定优先级：数字 1 / 字母 2 / 中文 3 / 其他 4
function getFirstCharInfo(str) { /* 去前缀符号后取首字符 */ }

// 同类内用 ICU 拼音 collation 比较
cleanA.localeCompare(cleanB, 'zh-Hans-CN-u-co-pinyin', { numeric: true, sensitivity: 'base' })
```

要点：`zh-Hans-CN-u-co-pinyin` 是带拼音排序规则的 ICU collation，比 `localeCompare(b, 'zh-CN')` 稳定得多；`numeric: true` 让「2」排在「10」前；首字符分类保证了「数字 → 字母 → 中文 → 符号」的粗粒度顺序。

**落地**：`packages/options/views/sites.vue` 加 A-Z / Z-A 按钮，直接复用这套比较函数（新建 `src/util/sortByPinyin.ts`，可单测）。分类内排序时，**已启用的排在未启用之前**（对方 `sortEngineArrayWithPartition` 的做法，符合直觉）。

### 1.2 「拖拽不卡」的真实原因（`Line 5105-5135`）

README 说是「异步防抖持久化」，源码看是这样：

- 拖拽过程中**直接移动 DOM 节点**，不触发 Vue 重渲染
- 松手后 `debouncedSave()` 只延迟 **100ms** 写存储
- 更关键：`saveData()` 是**遍历 DOM 读 `data-*` 反向重建 JSON**，不维护独立的内存模型

也就是说「0ms」的本质是「不做重渲染 + 保存时读 DOM」，不是异步本身。

**落地**：我们的 options 页用 Vue 响应式数组，拖拽必然触发重渲染。如果要优化，方向是「拖拽期间只做 DOM 位移，松手后再同步回数组」，而不是简单加 debounce。**先测量**（100+ 引擎时是否掉帧）再决定值不值得。

### 1.3 配置编辑器（`Line 4985-5010`）

确认存在，且交互完整：`✨ 格式化`（`JSON.stringify(parse, null, 2)` + 语法错误提示）、`📋 复制配置`、`恢复默认设置`（独立危险按钮）、等宽字体、模态框居中。**README 描述属实**。

**落地**：`src/components/json-editor.vue` 加这三个按钮 + Esc 关闭，半天工作量。

### 1.4 AI 搜索列表（`Line 1769-1795`）

真实条目（注释里写「内置 10 个」，实际只有 6 个）：

| 名称 | URL |
| --- | --- |
| ChatGPT | `https://chatgpt.com/?q=%s&hints=search` |
| Perplexity | `https://www.perplexity.ai/search?q=%s` |
| 秘塔AI | `https://metaso.cn/?q=%s` |
| Devv AI | `https://devv.ai/search?q=%s` |
| Claude | `https://claude.ai/new?q=%s` |
| DuckDuckGo AI | `https://duckduckgo.com/?q=%s&ia=chat` |

**落地**：新建 `src/config/sites/ai.ts`。注意他们自己把 Claude 归入「预填输入框」类，严格说不算直达检索——我们落地前要在真实浏览器里各点一次确认。

## 2. 值得做但要改实现

### 2.1 深色模式（`Line 3526-3533`、`Line 6250+`）

他们只判断了 `<meta name="color-scheme">` 的内容，**没有监听 `prefers-color-scheme`**，也没有手动切换开关；换页时不会更新。实现质量一般。

**落地**：我们做的话用 `matchMedia('(prefers-color-scheme: dark)')` + `html.dark` 类（Element Plus 官方 dark 变量），并给用户「跟随系统 / 浅色 / 深色」三态。

### 2.2 分类图标取「第一个未禁用引擎」（`Line 3725-3745`）

源码确实是遍历 `engineList[category]` 取第一个 `!eng.disable` 的引擎，注释说明这是为了避开「同站隐藏导致图标突变」。

**前提**：我们没有 `HideTheSameLink`（隐藏当前站点对应引擎）这个功能，所以碰不到这个 bug。若将来要做同站隐藏，图标必须同步改成「第一个可见引擎」。

### 2.3 图标来源策略（`getIcon` 配置项）

他们有 4 种模式：自动（能连谷歌用谷歌，否则域名 `/favicon.ico`）、域名、谷歌、dnspot 第三方。

我们 `favicon.vue` 已有 faviconkit 兜底，不必照搬，但可以借鉴「按可达性降级」的思路。

## 3. 不建议照搬

- **逐站 `insertIntoDoc` 规则**：与我们的算法路线冲突，且维护成本高（几百条）
- **`fixedTop: 75/128` 硬编码偏移**：正是我们 `generatedStyle` 要取代的东西
- **`debouncedSave` 100ms + 读 DOM 保存**：在 Vue 里会让数据源分裂，收益不抵复杂度
- **夜间模式实现**：只读 meta，不跟系统
- **GBK / `@require toGBK.js`**：我们统一按 utf-8 组 URL
- **`@match *://*/*`**：我们已经一致，无需改

## 4. 方法论（仍然成立）

他们的每条搜索引擎都做过真实浏览器带参实测，并明确剔除无法通过 URL 传参触发搜索的 SPA（DeepSeek、Gemini、Kimi、Poe）。建议写进 `AGENTS.md`：

> 新增搜索引擎前，必须在真实浏览器里用 URL 模板带上关键词访问一次，确认能直接落到结果页；只能预填输入框、需要再点一次发送的，不计入 `sites/`。

## 5. 优先级建议

| 顺序 | 事项 | 工作量 | 价值 |
| --- | --- | --- | --- |
| 1 | AI 搜索分类（6 条，落地前实测） | 半天 | 高，纯配置 |
| 2 | 拼音排序（抄 `compareSmart` + ICU collation） | 半天 + 单测 | 高，用户可感知 |
| 3 | 配置编辑器三按钮 + Esc | 半天 | 中 |
| 4 | 深色模式（按我们的方式实现） | 1–2 天 | 中 |
| 5 | 拖拽性能（先量化） | 视测量结果 | 低 |
