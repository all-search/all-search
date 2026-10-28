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
