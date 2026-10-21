# 可借鉴特性评估：searchEngineJump-Enhance-DIY

> 参考项目：[csxo/searchEngineJump-Enhance-DIY](https://github.com/csxo/searchEngineJump-Enhance-DIY)（Fork 自 qxinGitHub/searchEngineJump，V0.1.0 现代增强版）
> 评估时间：2026-10-21。结论基于其 README 与实际仓库结构，**未逐个功能实测**，落地前需要验证。

## 一、对照结论

| 对方特性 | 我们的现状 | 结论 |
| --- | --- | --- |
| AI 搜索独立分类（6 个支持 `?q=%s` 的引擎） | `src/config/sites/` 有 13 个分类，**没有 AI** | ✅ 建议做，纯配置、成本最低 |
| 分类 / 引擎按首字母排序（数字 → A-Z → 中文拼音） | 只有拖拽排序，无按名排序（仓库里没有 `localeCompare`） | ✅ 建议做 |
| 深色模式 | 无（全仓没有 `prefers-color-scheme` / `dark`） | ✅ 建议做 |
| 配置文件编辑器：格式化 / 复制 / 恢复默认 / Esc 关闭 | `json-editor.vue` 只有 `JSON.parse` 校验 | ✅ 建议做，改动小 |
| 拖拽 0ms 持久化（防抖写存储） | vue-draggable-next，落盘时机未测 | ⚠️ 先测量再决定 |
| 分类图标跟随「用户首位的引擎」，且不被同站隐藏带偏 | 没有「隐藏当前站点」功能，图标逻辑未核 | ⚠️ 做图标跟随，同站隐藏另议 |
| 玻璃拟态 UI（`backdrop-filter: blur(20px)`） | 菜单条是扁平纯色 | 🔸 可选，优先级低 |
| Violentmonkey 兼容（`@match *://*/*`） | 已经是 `*://*/*` | ❌ 不需要 |
| GBK 搜索页支持 | 我们的 URL 模板统一按 utf-8 | ❌ 不需要 |
| 设置中心「左导航 + 右侧卡片」布局 | 已有独立 options 页（hash 路由） | ❌ 不需要 |

## 二、值得抄的一条方法论

他们每条新增引擎都做「真实浏览器带参实测」，并**明确剔除无法通过 URL 传参触发搜索的 SPA 引擎**（DeepSeek、Gemini、Kimi、Poe）。我们目前只按经验加站点，没有这条约束。

建议写进贡献规范：

> 新增搜索引擎前，必须在真实浏览器里用 `<url 模板>` 带上关键词访问一次，确认能直接落到结果页；只能预填输入框、需要再点一次发送的（纯 SPA），不计入 `sites/`，或标注 `requiresEnter: true` 单独处理。

## 三、逐项实施建议

### 1. AI 搜索分类（P0，半天）

- 新建 `src/config/sites/ai.ts`，在 `index.ts` 注册，插到分类列表最前
- 候选引擎（对方已实测可通过 URL 传参，我们落地前仍需复验）：
  - ChatGPT `https://chatgpt.com/?hints=search&q=%s`
  - Perplexity `https://www.perplexity.ai/search?q=%s`
  - 秘塔 `https://metaso.cn/?q=%s`
  - Devv `https://devv.ai/search?q=%s`
  - Claude `https://claude.ai/new?q=%s`（预填输入框，需确认是否算「直达」）
  - DuckDuckGo AI `https://duckduckgo.com/?q=%s&ia=chat`
- 验收：菜单出现「AI搜索」分类；点击任一引擎能在目标站带上关键词；`loadList` 里补对应 `probe`（若要静态避让）

### 2. 按名排序（P1，一天）

- 设置页（`packages/options/views/sites.vue`）给每个分类加 `A-Z` / `Z-A` 按钮，全局再加一个「整理全部分类」
- 排序规则：`localeCompare(b, 'zh-CN')` 天然支持拼音；数字前缀单独排在字母前
- 引擎排序时**已启用的排在未启用之前**（对方的分区规则，符合直觉）
- 验收：排序后刷新页面顺序不变；与手动拖拽的顺序不打架（排序即覆盖为当前顺序）

### 3. 深色模式（P1，一到两天）

- 配置页：Element Plus 的 dark 主题用 `html.dark` 类 + `dark/css-vars.css`，加「跟随系统 / 浅色 / 深色」三态开关
- 菜单条：影子根里的 CSS 变量在 `@media (prefers-color-scheme: dark)` 下覆盖（`--as-bg-color`、`--as-primary-text-color` 等，见 `src/assets/internal.scss`）
- 验收：系统切深色后，菜单条与配置页都不再是刺眼白底；`<all-search-ui>` 的 shadow 内颜色生效

### 4. 配置编辑器增强（P2，半天）

- `src/components/json-editor.vue` 加三个按钮：`格式化`（`JSON.stringify(parse(val), null, 2)`）、`复制配置`（`clipboard.ts` 已有能力）、`恢复默认`（二次确认）
- 支持 Esc 关闭（优先关当前弹层，不影响下层）
- 验收：格式化后缩进为 2 空格且不丢数据；复制内容等于编辑框当前值

### 5. 拖拽性能（P2，先测再定）

- 先造 100+ 引擎的配置，测量拖动时是否掉帧
- 若卡：拖拽过程只改本地数组，松手后 debounce 300ms 写一次存储（对方的核心优化点）
- 验收：100 个引擎拖动时无长任务超过 50ms

### 6. 分类图标跟随首位引擎（P2）

- 现状待核：`useFavicon` / `menu.vue` 里分类图标取的是哪一项
- 目标：始终取该分类「第一个已启用」的引擎 favicon
- 若将来做「隐藏当前站点」，图标要跟着取「第一个可见引擎」，否则会出现对方描述的图标突变
- 验收：刷新页面、切换站点后分类图标不变

### 7. 玻璃拟态（可选）

- 菜单条加 `backdrop-filter: blur(12px)` + 半透明背景
- 注意：`<all-search-ui>` 在部分站点会与站点自身的 `backdrop-filter` 叠加导致性能问题，需要限制到菜单条容器，不要整个宿主

## 四、不建议照搬

- **设置中心布局**：我们有独立 options 页，回退成页面内模态框是倒退
- **剔除 SPA 引擎**：我们保留引擎项，只是不提供「带 `%s` 直达」的能力，两者定位不同
- **GBK 处理**：我们的引擎配置统一按 utf-8 组 URL，不需要兼容上的额外分支
