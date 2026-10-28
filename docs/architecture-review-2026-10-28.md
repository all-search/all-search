# 架构与质量 Review（2026-10-28）

> 范围：`src/`（95 个文件 / 约 6.7k 行）、`packages/options`（约 3.4k 行）、构建 / 测试 / CI / 脚本。
> 方法：3 个独立只读 review + 主控复核关键结论（所有 P0 都由我本人用 `file:line` 或实跑命令验证过）。
> 代码状态：`feat/2.2` @ `9034d60`，`pnpm verify` 绿、`pnpm e2e` 109/109。

## 0. 一句话结论

分层是干净的（storage 适配器、DOM 契约、`as-*` 命名都守得住），**真正的风险不在代码结构，而在三处「静默」**：

1. 配置页把「默认值」当成「存储已读完」——在线配置站有 5 秒窗口会把真实配置冲掉；
2. JSON 编辑器保存是白名单——手写的扩展字段保存一次就没了；
3. 发版链路 tag 先于构建、产物守门「存在即通过」——可能发出没构建过的版本。

这三条都能在正常操作下丢用户数据或发错包，其余问题都是「可维护性债务」。

## 1. 规模与质量信号

| 指标 | 数值 |
| --- | --- |
| 代码文件 / 总行数 | 146 / 15,691（不含 e2e 断言外的产物） |
| 最大文件 | `packages/options/views/sites.vue` 1124、`e2e/specs/config.mjs` 940、`views/toolbar.vue` 649、`src/util/addSpecialStyle.ts` 531 |
| `any` | 67 处 / 26 文件（`useToolbar`、`tap`、`util/toolbar` 各 6） |
| 单测 | 10 spec / 52 用例（文档里仍写 21） |
| e2e | 4 场景 / 109 断言（config 64 / plugin 30 / selection 9 / userscript 6） |
| 循环依赖 | 2 处：`util/index.ts ↔ addSpecialStyle.ts`、`layoutService.ts ↔ mount.ts` |
| 跨包方向 | options → src 22 处，src → options **0** 处（方向正确） |
| 运行时 API 泄漏 | `GM_*` / `chrome.storage` 只在适配器里；例外是 `chrome.runtime` 有 2 处（`openUrl`、`side-bar`） |

## 2. P0（正常操作会丢数据 / 发错包）

### P0-1 配置页首屏把「内置默认值」当成「存储已读完」

- `useSites` 的初始值就是内置默认（`src/components/useSites.ts:9`），真实数据异步读（`:36`）。
- `sites.vue` 用 `watch(sites, { immediate: true })` **同步**跑 `init(默认值)`，而 `init` 里直接 `hydrated.value = true`（`packages/options/views/sites.vue:458`）。
- 于是 `data-hydrated="1"` 第一帧就成立，而守卫是 `if (hydrated && (dirty || dragging)) return`（`:464-469`）。
- 在线配置站没连上油猴时，WebBridge 要等满 5 秒（`src/util/storage/bridge.ts:33-41`）。**这 5 秒内用户拖一下或点一下编辑，真实配置就再也不会铺到界面**；随后保存 = 默认值 + 用户改动，覆盖掉原配置。
- `toolbar.vue:227` 与 `edit.vue:52` 是同构问题（脏时直接丢弃已读到的数据）。
- e2e 的 `waitHydrated` 等的就是这个提前置位的标记（`e2e/specs/config.mjs:56`），所以断言给了虚假信心。

**修法**：`useSites` 暴露 `sitesReady`（首次 `getStorage` settle 后置 true），`data-hydrated` 绑它；ready 前禁用保存/拖拽/编辑；toolbar / edit 同样接入。

### P0-2 JSON 编辑器保存丢字段 + 两套校验不一致

- `json-editor.vue:189-204` 的 `formatSites` 是**白名单**：分类只留 `nameZh/name/data/list`，站点只留 `nameZh/url/icon/data`。
- 而 `sites.vue:436-441` 是**保留式**（`stripUid` 后展开），注释明写「其余字段原样保留」。
- 后果：用户手写的 `invisible` / `style` / `selectors` / `query` / `favicon` / `show`（`src/types/site.ts:9-33` 都声明过）经 `/config/edit` 保存一次就消失，无提示。
- 校验也不一致：`json-editor.vue:96-140` 要求分类和站点都有 `nameZh`；`src/util/validateSites.ts:16` 只要求 `name`/`list`/`url`。于是导入提示成功、点保存又被 `instance.validate()` 拒掉，卡住。

**修法**：`formatSites` 改成保留式（照抄 sites.vue 那 6 行）；`onValidate` 复用 `validateSites`。

### P0-3 发版顺序倒置：tag 先于构建

- `scripts/release.mjs:82-87` 只跑 `pnpm verify`（lint/类型/单测），随后 `:95-102` 直接写版本、commit、`git tag`——**没有任何 build 或产物检查**。
- 构建发生在 tag 触发之后（`.github/workflows/plugin-release.yml:78-85`）。
- `--push` 是先推分支再推 tag（`release.mjs:104-106`），而 `script-release.yml:3-7` **每次 push master 就构建并推 `release` 分支**（用户脚本的自动更新源），没有 tag 校验、没有 e2e、没有产物检查。
- 后果：tag 已存在但 Release 可能缺失；`release.mjs:51-57` 又会因 tag 存在而拒绝重跑；`release` 分支可能先于插件验证更新。

**修法**：`release.mjs` 在 commit 前预构建 + `check-artifacts`；`script-release.yml` 改成 tag 触发（与 `plugin-release` 对齐）。

### P0-4 产物守门「存在即通过」

- `scripts/check-artifacts.mjs:49-59` 按 mtime 找「最近生成」的 zip，`:62-83` 只查存在 + ≥100KB。
- **实测**：`package.json` 是 `2.1.1`，而 `packages/plugin/.output` 里只有 `all-search-2.0.1-*.zip`，脚本照样全绿退出 0。
- `:98-125` 的 assets 正则只匹配 `/all-search/assets/`，匹配不到时 `gzip=0` 也通过。
- 不检查 manifest 的 `version`/`permissions`/`options_ui`，也不检查用户脚本的 `@version`/`@updateURL`/`@require`。

**修法**：zip 必须带当前版本号；assets 不能为空；校验 manifest 与用户脚本头；加 `--target=script|plugin|options` 便于各发布链复用。

## 3. P1（正常流程行为错误 / 结构性债务）

| # | 位置 | 问题 | 后果 |
| --- | --- | --- | --- |
| 1 | `sites.vue:721`、`toolbar.vue:363` | 编辑中点「保存」写的是旧数据，且不清 `editingDirty` | 提示成功但没保存；状态条一直「有未保存的修改」 |
| 2 | `sites.vue:615` | 「加入常用」`personal.list.push(item)` 共享同一对象引用 | 改常用 = 改原分类；删除只删一边；两条共享 `__uid` |
| 3 | `sites.vue:689` + `:721` | 清除图标缓存后保存会复活（`{...latestIcons, ...iconCache}` 只能加不能删） | 清除功能实际不可用 |
| 4 | 全仓 | 跨标签页/跨上下文 last-write-wins，无冲突提示；`toolbar` 根本没订阅 | 两边同时编辑时静默丢更新 |
| 5 | `json-editor.vue:142/161` | 建了 `new JSONEditor` 但从不 `destroy()` | 反复进出 `/config/edit` 累积 Ace 实例 |
| 6 | `selection-bar.vue:128/139/155` | 3 个全局监听写在 setup 顶层，无 `removeEventListener`；组件被 `v-if` 控制 | 每次切换划词开关多一份永久监听 |
| 7 | `menu-item.vue:65/86` | `isTap` 只置 true 从不复位 | **触屏上分类点击永久失效**（含「分类全开」） |
| 8 | `util/index.ts` ↔ `addSpecialStyle.ts` | barrel 全量 re-export + import 期副作用（`parseUrl` 顶层建 `<a>`、`toolbar` 顶层读 storage、storage 顶层选适配器） | 单测只能整模块 mock；import 顺序影响行为；tree-shaking 失效 |
| 9 | `packages/script/vite.config.ts:18` | 用户脚本 `@require` 硬编码 Vue **3.4.15**，项目实际 3.5.44；e2e 还用 3.5.44 冒充 | 同一份源码在油猴里跑旧运行时，且测不出来 |
| 10 | `vite.config.shared.ts` / `wxt.config.js` | plugin 完全绕过 sharedConfig（alias、build target 各一份） | 三端行为漂移；新增 alias 只生效两端 |
| 11 | `src/env.ts:4` | `isScript = target === 'script' \|\| !target`，且 `.env` 靠 cwd 读取 | 构建环境错配时静默降级成 TmAdapter，构建仍绿 |
| 12 | `scripts/check-artifacts` / CI | `plugin`/`selection` 两个 e2e 场景不在任何门禁里 | 扩展运行时回归可以直接发版 |
| 13 | `addSpecialStyle.ts:118-126` | 克隆节点「有标记无记录」只摘标记不还原 `top` | 站点 clone 头部后永久错位、不自愈 |

## 4. P2（择机处理）

**配置页**：可达性结果跨分类残留（`sites.vue:490` 只 `resetEditing`）；`save()` 无 busy/try-catch；每行 `:index="list.indexOf(item)"` 是 O(N²)；`probeStates` 每次复制整表 O(k²)；`site-engine-row` 的 `item: any`；取消编辑不回滚图标；空 URL 不校验。

**运行时**：`useConfig` 不是单例工厂（同名第二处会分叉）；`siteInfo` 顶层 `watch` + 常驻 rAF 轮询；`useFullScreen` 被两处调用导致重复注册；`favicon.vue` 的 `iconCache` 是第三个隐式单例，清缓存不重置它；`version-alert` 裸 `setTimeout`；`side-bar.vue` 456 行可拆 3 组。

**工程**：lint 不扫 `e2e/` 与 `tests/`；lint-staged 不匹配 `.vue`/`.mjs`；`src/CLAUDE.md` 仍写 21 个用例；`build:prepare` 无人引用；`package.json` 的 `files`/`unpkg` 指向不存在的根 `dist`；没有 `packageManager` 字段；`pnpm audit` 没有进 CI；e2e 有 9 条断言没有 detail、`withTimeout` 不会取消浏览器操作；plugin/selection 不抓 `pageerror`。

## 5. 建议的落地顺序

### 第一批：先修 P0（半天，全部可独立验证）

1. `sitesReady` 门槛（P0-1）+ 3 条 e2e：慢存储窗口内操作不覆盖、编辑中保存被拦、toolbar 空列表。
2. `formatSites` 保留式 + `onValidate` 复用 `validateSites`（P0-2）+ 1 条 e2e：手写字段保存后仍在。
3. `check-artifacts` 校验版本/manifest/用户脚本头（P0-4）。
4. `release.mjs` 预构建 + `script-release` 改 tag 触发（P0-3）。

### 第二批：修 P1 里的「真 bug」（一天）

`isTap` 一次性消费（触屏）；`selection-bar` 监听清理；`JSONEditor.destroy()`；加入常用 clone；图标删除 tombstone；编辑中保存拦截；克隆节点还原 `top`。

### 第三批：结构性重构（每步一个 commit）

1. `sites.vue` 拆 4 步：`sites-model` + `useReachability` → `useIconCache` → `useSitesEditor` → `useSitesDraft`（顺序不能反：先抽无状态，再抽状态机，最后抽跨切面的 hydration/保存）。
2. `useConfig` 加同名缓存（10 行，消灭双真源）。
3. 拆 `util/index.ts` barrel + 把 `parseUrl` 的 `<a>` 挪进函数体 + storage 适配器改惰性。
4. `addSpecialStyle` 按 `sample / adjust / observe` 三块拆，`adjustedElements` 改 token 化。
5. plugin 复用 `sharedResolve` / `sharedBuild`；`VITE_TARGET` 加 `envDir` + 构建期断言。

### 第四批：工程收口

plugin/selection 接 Windows+Edge 的 e2e 门禁（约 4–6 分钟）；`userscript` 补侧边栏/弹窗/划词断言；lint 覆盖 `e2e/` 与 `tests/`；文档计数校正；`pnpm audit` 进 CI。

## 6. 明确不改（避免以后重复讨论）

- **模块级单例 + `watchStorage`**：三端只有一个 app 实例，改 provide/inject 收益不明；只修「顶层 IO」和「同名不共享」。
- **`sites.vue` 的 Options API**：不是瓶颈；转 `<script setup>` 是纯机械清理，放最后单独做。
- **Element Plus 按需引入、`manualChunks` 只在 options、script 的 CSS 内容哈希注入、WXT zip 模板、`serveOptions` 的路径防护、`run.mjs` 按场景构建**：都是踩过坑的设计。
- **`formatSites` 的 spread + `__uid` 只存内存**：正确，不要为了「纯函数」改成白名单。
- **图标策略**（缓存优先、默认零外链、32×32、300 上限、显式抓取）：产品优势，不要改成自动拉取。
- **`addSpecialStyle` 不写 jsdom 单测**：jsdom 没有真实布局，用 plugin/userscript e2e 覆盖更合适。
- **config 的 64 条断言**：不是太多，是 runtime 太少——应该加，不是减。

## 7. 复核记录

| 结论 | 复核方式 |
| --- | --- |
| P0-1 hydration | 读 `sites.vue:443-474`：`watch(immediate)` → `init(默认值)` → `hydrated = true` |
| P0-2 白名单丢字段 | 读 `json-editor.vue:189-204` 与 `sites.vue:436-441` 对比 |
| P0-3 发版顺序 | 读 `release.mjs:82-110`；`script-release.yml:3-7` 确认 push master 即触发 |
| P0-4 旧包通过 | 实跑：`.output` 只有 2.0.1 三个 zip，`package.json` 2.1.1，`check-artifacts` 全绿 |
| P1-7 `isTap` | 读 `menu-item.vue:65/86`，全仓无复位 |
| P1-9 Vue 版本漂移 | `packages/script/dist/index.user.js` 的 `@require` 是 3.4.15；`vite.config.ts:18` 硬编码 |
| P1-13 克隆节点 | 读 `addSpecialStyle.ts:118-126`：`!data` 分支只 `delete marker` 就 return |
| 循环依赖 | 自写 import 图检测：2 个环 |
| 运行时 API 边界 | grep `chrome.` / `GM_*`：只在 `storage/*`，例外 `openUrl`/`side-bar` |

## 8. 「明确不改」的理由（详细版）

Review 的产出不是把所有东西都改一遍，而是区分**债务**（该还）和**决定**（有上下文的选择）。判断标准四条：改了用户能感知吗、不改会丢数据吗、成本是否超过收益、现状有没有测试锁住。

### 8.1 模块级单例 + `watchStorage`

**现状**：`useSites.ts:9` 是模块级 `ref`，`:36` 顶层 `getStorage().then(...)`，`:44` 顶层 `watchStorage(...)`；`useMode` / `useSwitchShow` / `useAlign` / `useColor` / `useOpenMode` / `useFavicon` 同理，都是「模块顶层调 `useConfig()`」。

**为什么这么设计**：三端（content script / options 页 / 独立配置站）**各自只有一个 app 实例**，而这些数据天然是全局的（同一份配置）。`useSites` 同时被 `menu-item.vue`（第 4 层子组件）、options 的 sites / edit / toolbar 三个路由页消费。改成 provide/inject 意味着：`index.vue` provide → `layout-manager` → `menu` → `menu-item` 逐层透传；options 侧要在 `bootstrap` 里给四个路由页共用一个 provider；所有消费点改签名；单测要自己搭 provider。收益只是「符合框架推荐」，而项目规模（一个 app、一份配置）不需要。

**真正的缺陷是另外两件事**，与单例无关：
- **顶层 IO**：`import` 这个模块就发请求。后果是单测必须整模块 mock `@src/util/storage`（`tests/hooks.spec.ts:12-18` 就是代价），任何工具函数都无法在无 DOM / 无 localStorage 的环境单独 import。修法是把 `getStorage` 挪进 `initXxx()`，由 `setupApp()` 调一次。
- **`useConfig` 不是单例工厂**：`useConfig.ts:33-71` 每次调用都新建 `ref`，单例性只靠「调用写在模块顶层」这条约定。第二处 `useConfig({ name: 'showToolbar' })` 会得到**第二个真源**，`set` 不广播、两边静默分叉。加一个 `Map<name, Ref>`（约 10 行）即可，这是该修的。

### 8.2 `sites.vue` 的 Options API

**现状**：1124 行，`<script>` + `export default { setup () {...} }`。**逻辑已经全部在 `setup()` 里**，没有 `this.xxx`、没有 `data()`、没有 `methods`，只有末尾一个 `return { ... }` 把 50 多个东西暴露给模板，外加 `components: { EditPen, MorePlus, Connection }`（按需引入的图标）。

**为什么不是瓶颈**：文件长是因为**职责多**（数据加载 / 脏状态 / 拖拽 / 行内编辑 / 图标缓存 / 可达性检测 / 分类管理 / 保存撤销重置），不是因为用了 Options API。`<script setup>` 在这里省掉的只是「一个 return 对象 + components 注册」，代码行数几乎不变。

**改的代价**：1124 行整体重排 → 一个 diff 覆盖全文件。而 P1 里已经排了 4 步拆分（`sites-model` → `useIconCache` → `useSitesEditor` → `useSitesDraft`），每步一个可回滚的 commit。先做机械转换会把「搬家」和「改行为」混在一起，最难 review、最难回滚。

**正确顺序**：先按 4 步抽 composable，最后单独做转换（纯机械，不掺逻辑）。转换时注意两个坑：Element Plus 图标要改成 `import`，`components` 注册块消失；`:prefix-icon="Search"` 这类表达式取值不再需要从 `setup()` 返回。

### 8.3 构建/工程里「踩过坑」的设计

这六条都是**修过的 bug 留下的形状**，不是随手写的：

| 设计 | 位置 | 它修的是什么 | 改回去会怎样 |
| --- | --- | --- | --- |
| Element Plus 按需引入 | `vite.config.shared.ts:11-19` | `app.use(ElementPlus)` 会把 293 个图标 + 全套组件打进包 | 首屏从 360KB gzip 回到 2.4MB；图标重新变成全局组件（现在的「图标要 import」反而是正确约束） |
| `manualChunks` 只在 options | `packages/options/vite.config.ts:33-52` | ①`cjs-helpers` 是 Rollup 虚拟模块，不单独切会被分进 jsoneditor chunk，entry 为了一个 helper 预加载 1MB 编辑器；②用户脚本是单文件产物，多切一个 chunk 只会多出空文件 | 配置页首屏把 jsoneditor 预加载回来；用户脚本多一个空 chunk |
| script 的 CSS 内容哈希注入 | `packages/script/vite.config.ts:20-58` | 一次构建产出多个 CSS chunk，共用固定 id 时**后者覆盖前者，组件样式全丢**；`as-inject-style` 事件解决「宿主/影子根还没建好就注入」的时序 | 油猴版样式随机丢失，且只在特定 chunk 顺序下复现 |
| WXT zip 模板 | `packages/plugin/wxt.config.js:23-28` | `sourcesTemplate` 默认用 `{{packageVersion}}`，而 `packages/plugin/package.json` 没有 version 字段 → `all-searchplugin-undefined-sources.zip` | AMO 源码包命名错乱 |
| `serveOptions` 的路径防护 | `e2e/lib.mjs:253-316` | `decodeURIComponent` 畸形转义返回 400；`path.resolve` 后前缀校验防 `../` 逃逸；**资源请求 404 不回落 HTML** | 「缺 chunk」会变成 200 + 一段 HTML，浏览器报语法错误，极难定位 |
| `run.mjs` 按场景构建 | `e2e/run.mjs:61-82` | `--only=config` 不必等 plugin + userscript 两次构建 | 每次只跑一个场景都要多等 40 秒 |

### 8.4 `formatSites` 的 spread + `__uid` 只存内存

**现状**：`sites.vue:429-441` 是 `stripUid` 后展开（保留所有未知字段）；`__uid` 是 Vue 的列表 key，只在内存里。

**为什么**：JSON 编辑器就是给高级用户手写 `style` / `selectors` / `invisible` / `query` 用的（`src/types/site.ts:9-33` 全部声明过）。白名单会**静默丢字段**——这正是本次 P0-2 在 `json-editor.vue:189-204` 犯的错。而 `__uid` 每次加载重新生成，落盘只会污染用户 JSON，还会让「导出→导入」产生无意义的 diff。

**但要注意方向**：`toolbar.vue:199-206` 的 `formatList` 是白名单，且已经丢过字段——`util/toolbar.ts:41-45` 先丢掉 `icon`，`formatList` 又写 `icon`，于是「从菜单选择」加进去的图标下次加载就没了。修法应该是让 toolbar **向 spread 对齐**，而不是把 sites 改成白名单。

### 8.5 图标策略（缓存优先、默认零外链、32×32、300 上限、显式抓取）

**现状**：配置页列表行只读 `iconCache` / `item.icon` / 首字母色块，**没有图标不发任何请求**；只有显式点「抓取图标」才走 `yandex → faviconkit → 站点 /favicon.ico`；抓到的图压成 32×32、缓存上限 300 条。e2e 有一条断言专门盯着「默认不请求第三方图标」（`config.mjs:461-470`）。

**为什么是产品优势**：
- **隐私**：配置页一屏就有几十个站点。自动拉取等于把「你配了哪些搜索引擎」这份清单逐个发给第三方 favicon 服务。
- **性能**：92 个站点 = 92 个外部请求，冷启动会被拖住。
- **离线可用**：纯本地数据 + 本地缓存。

**运行时是另一套逻辑**，不要混淆：菜单条的 `favicon.vue` 会在**用户已经访问的站点**上请求图标（同站 favicon 或缓存），这是合理的一次请求。

**要改进的话**：方向是「显式批量抓取」（已经有：分类 ⋯ 菜单）和「抓取失败重试」，不是默认自动拉取。

### 8.6 `addSpecialStyle` 不写 jsdom 单测

**现状**：531 行，依赖 `getBoundingClientRect()`、`document.elementsFromPoint()`、`getComputedStyle()`、`MutationObserver`、`ResizeObserver`。

**jsdom 的现实**：没有布局引擎——所有 `getBoundingClientRect()` 返回 0；没有 `elementsFromPoint`；`getComputedStyle` 基本只回显内联样式。写出来的测试实际是在断言「我 mock 的返回值」，而不是行为。这类测试会给虚假信心，还会在重构时阻碍改动（因为断言的是 mock 的形状）。

**替代方案已经存在**：e2e 用真实浏览器 + fixture 里的 sticky/fixed 头部，覆盖了「滚动后让位」「站点接管 top 后不再被覆盖」「静态规则生效」「离开顶部布局后恢复原位」四条（`plugin.mjs`）。

**但纯判据可以单测**：`isAvoidableGeometry` / `isOffsetAllowed` / `nextAdjustment`（含 `isStillOurs` 的幂等与克隆分支）抽成纯函数后完全可以测——这正是第 6 节纯函数清单的第 3、4 项，属于重构任务，不是「补 jsdom 测试」。

### 8.7 config 的 64 条断言

**现状**：config 64 / plugin 30 / selection 9 / userscript 6。

**为什么 config 多**：它是四个路由 + 拖拽排序 + 行内编辑 + 图标上传/抓取/缓存 + 深色模式 + 窄屏 + 触屏长按 + JSON 编辑器 + 旧数据兼容。而且每一条都对应过一次真实回归：保存条漂移、拖拽换位、图标零外链、分类按钮可点区域、`data` 缺失不崩……

**问题不是 config 太多，是 runtime 太少**：用户脚本是主要分发形态，却只有 6 条断言（宿主存在、菜单渲染、关键词、CSS 注入高度）；`selection` 场景只测插件版，油猴版的划词工具栏零覆盖。

**该做的**：给 `userscript` 补侧边栏/弹窗/划词断言（约 15–20 秒），给 `plugin`/`selection` 补 `pageerror` 收集（`config.mjs:26-39` 已有现成实现，提到 `lib.mjs` 复用）。**删 config 断言来「平衡比例」是最差的选择**——配置页是用户唯一能修数据的地方，删掉等于裸奔。

