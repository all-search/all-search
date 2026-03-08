# Codex 迭代验收清单

用于解决“改了但不知道是否真的可运行、显示是否正常”的问题。

## 1. 必跑命令（机器可重复）

```bash
pnpm test
pnpm type-check
pnpm exec eslint --ext .js,.ts,.vue src packages
pnpm build:script
pnpm build:plugin
pnpm build:options
```

结论记录模板（PR 内建议逐条填写）：
- command:
- result: pass/fail
- note: 若失败，给出环境原因或修复计划

## 2. 可见性验收（人工可复核）

至少提供以下截图（或录屏）：
1. options 首页（index）
2. sites 配置页
3. config 配置页
4. toolbar 配置页
5. script/plugin 注入后的核心布局（top / left 至少两种）

建议命名：
- `options-index.png`
- `options-sites.png`
- `options-config.png`
- `options-toolbar.png`
- `runtime-top.png`
- `runtime-left.png`

## 3. PR 结论模板

- 验收总览：PASS / PARTIAL / FAIL
- 机器验收：通过 x/y
- 可见性验收：通过 x/y
- 已知风险：
- 下一步：

