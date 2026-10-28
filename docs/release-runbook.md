# 发版 Runbook

> 这份文档只讲「怎么发、发完怎么验、发砸了怎么救」。
> 历史事故与设计取舍见 `docs/architecture-review-2026-10-28.md` 的 P0-3 / P0-4。

## 1. 一条命令

```bash
pnpm release:minor --push      # 2.1.1 → 2.2.0
pnpm release:patch --push      # 2.1.1 → 2.1.2
pnpm release -- 3.0.0 --push   # 直接指定版本
```

`scripts/release.mjs` 的执行顺序（**构建在打 tag 之前**）：

```
前置检查（tag 不存在 / 工作区干净 / pnpm verify）
  → 写 package.json
  → 构建：build:script → build:options → build:plugin → zip:firefox
  → node scripts/check-artifacts.mjs
  → git commit chore(release): vX.Y.Z + git tag
  → git push origin vX.Y.Z（先推 tag）
  → git push（再推分支）
```

任何一步失败都会 `git checkout -- package.json` 还原版本号，**不会留下半个 tag**。
以前是先打 tag 再让 CI 构建：CI 一挂，tag 已经存在、Release 却没有，而脚本又因 tag 存在拒绝重跑。

## 2. tag 触发的工作流，用的是 **tag 指向的那个 commit 里的 workflow**

这是 2.2.0 踩过的坑：先把 `script-release.yml` 改成 tag 触发，随后用旧 commit 打了 tag。
CI 读的是 tag 上的 workflow 文件，于是仍按旧逻辑把用户脚本推到了 `test-release`，
`release` 分支（`@updateURL` 指向的自动更新源）停在上一版，而 workflow 页面显示「成功」。

**结论**：改完 `.github/workflows/*` 之后，**下一个 tag 才会用上新逻辑**。
如果要在当前版本上验证 workflow 改动，只有两条路：

1. 删掉 Release 和 tag，在含修复的 commit 上重打同一个 tag（见第 5 节）；
2. 用 `workflow_dispatch` 跑，但注意 `github.ref` 是**你 dispatch 时指定的 ref**，
   用 `--ref vX.Y.Z` 跑仍然是旧文件。

## 3. 四条发布链路

| workflow | 触发 | 产出 | 用到的 ref 判断 |
| --- | --- | --- | --- |
| `plugin-release.yml` | tag `v*` | GitHub Release（Chrome / Firefox / sources / 两个 user.js） | `startsWith(github.ref, 'refs/tags/v')` |
| `script-release.yml` | tag `v*` | 把 `packages/script/dist` 推到 `release` 分支（用户脚本自动更新源） | `startsWith(github.ref, 'refs/tags/') ? release : test-release` |
| `gh-page.yml` | push master | 配置站部署到 GitHub Pages | — |
| `ci.yml` | PR / push master | verify + e2e（userscript/config）+ 三产物构建 + 体积预算 | — |

`release` 分支是**用户脚本的 `@updateURL`**，地址必须保持
`https://raw.githubusercontent.com/all-search/all-search/release/index.user.js`：
文件名带版本号会让老用户手里的地址 404，更新链直接断。

## 4. 发完必验（四条，缺一不可）

```bash
# 1) Release 资产齐全、版本号对
gh release view vX.Y.Z --json assets --jq '.assets[].name'

# 2) 用户脚本自动更新源已更新
git fetch origin release --depth=1
git show FETCH_HEAD:index.user.js | grep '@version'      # 应等于 package.json

# 3) 配置站真的换了构建
curl -s https://all-search.github.io/all-search/ | grep -o 'assets/index-[^"]*\.js'

# 4) 线上页面能跑（无控制台报错、data-ready=1）
pnpm e2e --only=config --no-build   # 或手工开一次
```

`scripts/check-artifacts.mjs` 在本地已经覆盖了「产物是不是当前版本」：
zip 文件名必须带 `-<version>-`、`manifest.version` 必须一致、
用户脚本的 `@version` / `@updateURL` / `@match` 必须正确、`index.html` 必须引用到资源。
它以前按 mtime 找「最近生成的 zip」，实测 2.1.1 配 2.0.1 的产物也能全绿。

## 5. 同版本重跑（不 bump）

适用场景：CI 配置写错、Release 缺资产、tag 指错了 commit。

```bash
# 1) 删 Release 和远端 tag（--cleanup-tag 一起删）
gh release delete vX.Y.Z --yes --cleanup-tag

# 2) 本地删 tag，在「含修复的 commit」上重打
git tag -d vX.Y.Z
git tag -a vX.Y.Z <fix-commit> -m "vX.Y.Z"
git push origin vX.Y.Z

# 3) 等两条 workflow 跑完，按第 4 节验
```

注意：
- `softprops/action-gh-release` 在 Release 已存在时会失败，所以**必须先删 Release**；
- 重打 tag 后 `release` 分支若内容没变，deploy action 会输出
  `There is nothing to commit. Exiting early…`——这是正常的，看它上面的 `branch:` 是不是 `release` 即可；
- 已经发给用户的版本不要重打（缓存、归档、用户侧记录都会对不上）；只在发布后短时间内、确认没人依赖这个 tag 时用。

## 6. 常见故障

| 现象 | 原因 | 处理 |
| --- | --- | --- |
| `git push` 报 `schannel: failed to receive handshake` | 国际 TLS 线路中断（国内站点仍 200） | 换代理 / 等恢复；本地 tag 和产物都已就绪，恢复后 `git push origin vX.Y.Z && git push` 即可 |
| `tag vX.Y.Z 已存在` | 上次发到一半 | 先确认远端有没有这个 tag；没有就 `git tag -d` 重打，有就走第 5 节 |
| `check-artifacts` 报「没有 X 版本的 Chrome 包，只有旧包」 | 产物没重新构建 | 重新跑 `pnpm build:plugin && pnpm zip:firefox`，或直接重跑 `release.mjs` |
| Release 正文只有一行 compare 链接 | 没有 `changelog/<version>.md`，走了自动生成 | 补一份手写日志（`pnpm changelog -- --init X.Y.Z` 起模板），再走第 5 节 |
| `release` 分支没更新 | tag 指向的 workflow 是旧的（第 2 节） | 按第 5 节重打 tag，或临时手工补（`git worktree add` 到 `release`，覆盖 `index.user.js` 后推） |

## 7. 版本号怎么定

- **patch**：只修 bug、文案、样式，没有新入口
- **minor**：新增功能/设置项，向后兼容（例：2.2.0 的分类图标来源、站点体检）
- **major**：破坏兼容（配置结构变更、移除入口）

发版前确认 `changelog/<version>.md` 存在：Release 正文会原样用它。
自动生成的正文只列提交标题，用户看不懂「七个会咬人的 bug」具体是什么。
