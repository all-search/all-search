# 固定元素避让：code review 跟进清单

> 来源：2026-10-21 针对 `1b25f9e..HEAD`（构建期静态样式 + 运行时采样）的独立审查。
> 三条阻塞问题已修复（见文末「已完成」），这里是剩余项，按优先级排列。
> 相关文档：[`src/CLAUDE.md`](../src/CLAUDE.md)（避让机制说明）、[`README.md`](../README.md)（`pnpm style:scan` 用法）

## 约定

- 每项都写清**触发场景 + 后果 + 修法 + 验收标准**，接手时不需要重新推演
- 涉及产物的改动（`generatedStyle.ts`）必须重跑 `pnpm style:scan` 并 review diff
- 改运行时逻辑必须同时跑 `pnpm e2e`（静态路径 + 路由切换已有用例）与 `pnpm test`

---

## P0 · 功能性缺陷

### 1. 站点自己改 `top` 时被我们覆盖

- **位置**：`src/util/addSpecialStyle.ts` 的 `updateNodeOffset`、`restoreOriginalTop`
- **场景**：元素被标记后再采样，走「已调整」分支，直接用保存的 `originalTop + offset` 写回。站点在滚动时用 `top: -60px` 收起头部，会被我们改回 `30px`，收起动画失效；站点把头部切回 `position: relative` 后，我们仍会写 `top: 30px !important`，造成 30px 视觉偏移。
- **修法**：
  - `AdjustedElement` 增加 `appliedTop`
  - 重应用前比对 `item.style.getPropertyValue('top')` 是否仍等于 `appliedTop`；不等说明站点接管了，清 marker 而不是覆盖
  - 重应用前校验 `getComputedStyle(item).position` 仍是 fixed/sticky，否则先还原
  - 还原同样只在「当前值仍是自己写的」时才写
- **验收**：e2e fixture 里放一个「滚动后把 `top` 设为 -60px」的头部，断言滚动后仍是 -60px，且 `data-as-adjusted` 被清掉

### 2. `!important` 让站点收不起头，规则失效后又没有采样兜底

- **位置**：`scripts/scan-special-style.mjs` 生成逻辑、`src/useStyleManager.ts`
- **场景 A**：站点头部正常 `top: 0`、滚动后自己设 `top: -60px` 收起。静态 CSS 的 `top: 30px !important` 优先级更高，头部永远收不起来。扫描器在 scroll 0 抓到规则后，后续位置看到负值只会跳过，不会撤销。
- **场景 B**：站点改版后选择器不再命中，CSS 变成空操作；但 `useStyleManager` 只要有 `generatedStyle` 就完全不启动采样，效果比「没有规则、纯采样」更差。
- **修法**：
  - 扫描阶段记录同一 selector 在各 `SCROLL_STEPS` 的 `style.top`；从 0 变成 < -1 的标为「会收起」，不生成静态规则（交给运行时采样）
  - 运行时注入后校验：解析 rule 的首个选择器，`document.querySelectorAll(sel).length !== 1` 视为失效，启动采样兜底
  - 产物增加 `collapses?: boolean` 元数据，便于人工复核
- **验收**：扫描 B 站（头部会收起）不产出静态规则；人为把某条规则的选择器改错后，运行时仍能采样避让

---

## P1 · 产物质量（需要重扫才能生效）

### 3. 哈希类名判定误判与误收

- **位置**：`scripts/scan-special-style.mjs` 的 `isStableClass`
- **问题**：
  - 误收：`headerWrap_W4DP5`（`_` 后恰好 5 位）、`prc-PageLayout-PaneWrapper-pHPop`（`-` 后 5 位）被当稳定类名，产出里就有这两条
  - 误杀：`header_wrapper`、`menu_item`（`_[A-Za-z0-9]{6,}$` 命中）、`searchHeader`、`mainContent`（camelCase 被判哈希）、所有 BEM `__` 类名
  - `stable: false` 的规则仍然落盘，只在终端标 ⚠（nicovideo 的超长 Tailwind 选择器、Pinterest 的根 nth、知乎的 `#root > div:nth-of-type(3)`）
- **修法**：
  - 判定改为「后缀含数字或大小写混排才算哈希」，`__` 只在随机后缀时拒绝
  - 产物写入 `stable` 字段，默认只写 stable；不稳定的要 `--allow-unstable` 才写
  - `verify` 用 `querySelectorAll(sel).length === 1` 而不是 `querySelector`
- **验收**：重扫后产物里不再出现 `headerWrap_W4DP5` / `pHPop` 这类规则；`header_wrapper` 这类可读类名能正常产出

### 4. probe 推导依赖文件系统顺序（Sogou 被推导到新闻模板）

- **位置**：`scripts/scan-special-style.mjs` 的 `collectMenuUrls` / `withDerivedProbes`
- **问题**：`fs.readdirSync` 顺序不保证，`templates.find` 取第一个匹配；Sogou 的正则 `\/\/www\.sogou\.com\/(?:web|s)/` 会匹配到 `site=news.qq.com` 的新闻搜索模板，于是规则是从新闻页抓的、却应用到 `/web` 和 `/s`
- **修法**：`readdirSync().sort()`；推导时优先选路径含 `web`/`search`、不含 `site=` 的模板；给 Sogou 显式配 `probe`；loadList 正则收紧为 `\/(?:web|s)(?:[?/]|$)`
- **验收**：`--site=sogou --dry` 输出的 probe 是普通搜索页而不是新闻页

### 5. 扫描探针的样式污染与 overlap 阈值

- **位置**：`scripts/scan-special-style.mjs` 的 `scanCurrentViewport`
- **问题**：探针是普通 `div`，只设了 position/尺寸，没重置 `margin/padding/border/box-sizing`，站点全局 `div { padding: 10px }` 会把它撑高；overlap 判据用传入的 `barHeight` 而不是探针实际 rect；`coversViewport` 与 `heightCompensated` 互相抵消（真正的全屏 fixed 层永远走不到高度补偿分支）
- **修法**：探针加 `all: initial` + 显式重置，并断言 `barRect.height === BAR_HEIGHT`；overlap 改用 `barRect.top/bottom` 实际值；明确全屏层的取舍（要么允许并补偿，要么彻底不生成，别留死分支）
- **验收**：在带全局 `div` 样式的 fixture 上扫描，探针高度仍等于 30

---

## P2 · 健壮性与性能

### 6. DOM observer 只听 `childList`，class 驱动的 fixed 变化漏采

- **位置**：`src/util/addSpecialStyle.ts` 的 `observeDomChange`
- **场景**：站点点击/聚焦时给 header 加 `is-fixed` 类，没有新增节点也没有滚动，采样不会触发，头部一直压在条下
- **修法**：加 `attributeFilter: ['class']`（我们只写 inline style，不会自触发）；或监听 `focusin` / `transitionend` / `animationend`
- **注意**：与 P0-1 同批做，避免「站点改 top → 我们重采样 → 覆盖」的环路
- **验收**：fixture 里用 `classList.add('is-fixed')` 触发，断言 300ms 内被避让

### 7. 采样成本

- **位置**：`src/util/addSpecialStyle.ts` 的 `SAMPLE_X_COUNT` / `scheduleSample`
- **现状**：每轮 15×3=45 次 `elementsFromPoint`，每个候选还要沿祖先链调多次 `getComputedStyle`；DOM mutation 与 scroll 共用 120ms 节流，动态页面上可能长期 8–11 次/秒
- **修法**：DOM mutation 用独立 debounce（300–500ms）；`document.visibilityState !== 'visible'` 时跳过；候选节点缓存一次 computed style；X 方向点降到 9；settle 仅在有候选时排期
- **验收**：用 `PerformanceObserver` 在长列表页（如 B 站搜索结果）量化，滚动时主线程单次采样 < 8ms

### 8. 选择器与匹配的边界

- **位置**：`src/config/siteInfo.ts` 的 `findGeneratedStyle`
- **问题**：`find` 取第一条匹配；将来出现更宽的 host 规则会遮蔽具体规则。`--limit=abc` 会被当成 0（全量）
- **修法**：取最具体的一条（匹配长度/规则来源），或按 loadList 条目精确对应；CLI 参数做正整数校验
- **验收**：加一条宽规则 + 一条具体规则的单测，断言命中的是具体规则

---

## P3 · 测试补齐

| 用例 | 覆盖的问题 |
| --- | --- |
| 折叠 / 自动隐藏 / 全屏后静态样式被撤掉 | P0 已完成部分（可见性绑定）目前只有路由切换有 e2e |
| 全屏遮罩 / 侧边抽屉不被推 | 运行时几何过滤（已实现，无自动化验证） |
| fixture 里滚动后 `header.site` **确实**被标记 | 现有断言只验证「不该动的没动」，采样整体失效时会空跑 |
| scanner 的 merge / prune / fresh 语义 | `--prune` 误删、`--fresh` 覆盖 |
| `userscript.mjs` 同步避让断言 | 用户脚本与插件共享同一套逻辑，目前只有插件侧有断言 |

---

## 已完成（2026-10-21）

- [x] 静态 CSS 绑定菜单可见性：收起 / 自动隐藏 / 全屏时撤掉，恢复时重新注入
- [x] 去掉一次性 `isInit`：SPA 路由切换后旧样式被移除（YouTube `/results` → `/watch` 场景）
- [x] 运行时采样补 `coversViewport` / `panelLike` / `offscreen` 三个几何过滤
- [x] `hasAnchor` 接受 `[data-*]` 锚点
- [x] `--fresh` 与 `--site` / `--limit` 互斥，防止静默清空其它规则
- [x] `--cdp` 扫描前检测页面上是否已有 All-Search 在跑（避免 double offset）
- [x] e2e：静态规则注入 head、头部让位 30px、不触发采样、路由切走后样式撤销
