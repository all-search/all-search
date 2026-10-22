#!/usr/bin/env node
/**
 * All-Search 浏览器回归（pnpm e2e）
 *
 * 覆盖四个场景：
 *   - plugin     ：加载未打包扩展，验证菜单渲染、四向布局下的浮层方向、设置入口
 *   - userscript ：模拟油猴环境（Vue 全局 + GM_* 打桩）注入 dist/index.user.js
 *   - selection  ：划词工具栏与搜索弹窗、左键打开方式
 *   - config     ：配置页（站点/划词工具栏/交互/JSON 编辑/深色/窄屏）交互回归
 *
 * 用法：
 *   pnpm e2e                  # 先构建再跑全部场景
 *   pnpm e2e --no-build       # 跳过构建（复用已有产物）
 *   pnpm e2e --headed         # 显示浏览器窗口
 *   pnpm e2e --only=plugin    # 只跑某个场景（逗号分隔）
 *
 * 浏览器：默认 Windows 用 Edge、其他平台用 Chrome；可用环境变量覆盖
 *   E2E_CHANNEL=chrome|msedge|chromium   E2E_EXECUTABLE=/path/to/chrome
 */
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { ROOT, ARTIFACTS, createReport } from './lib.mjs'

const argv = process.argv.slice(2)
const hasFlag = name => argv.includes(`--${name}`)
const getArg = (name, fallback) => {
  const hit = argv.find(a => a.startsWith(`--${name}=`))
  return hit ? hit.slice(name.length + 3) : fallback
}

const headless = !hasFlag('headed')
const shouldBuild = !hasFlag('no-build')
const allSpecs = ['plugin', 'userscript', 'selection', 'config']
const selected = getArg('only', allSpecs.join(',')).split(',').map(s => s.trim()).filter(Boolean)
const unknown = selected.filter(s => !allSpecs.includes(s))
if (unknown.length) {
  console.error(`未知场景：${unknown.join(', ')}（可选：${allSpecs.join(', ')}）`)
  process.exit(2)
}

const tmpDir = path.join(ROOT, '.tmp', 'build')
fs.mkdirSync(tmpDir, { recursive: true })
const buildEnv = {
  ...process.env,
  // Windows 上 esbuild 在默认 %TEMP% 下会删不掉临时文件（Access is denied）
  ...(process.platform === 'win32' ? { TEMP: tmpDir, TMP: tmpDir } : {})
}

function runCommand (label, command, args) {
  console.log(`\n▶ ${label}：${command} ${args.join(' ')}`)
  const result = spawnSync(command, args, {
    cwd: ROOT,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: buildEnv
  })
  if (result.status !== 0) throw new Error(`${label} 失败（exit ${result.status}）`)
}

if (shouldBuild) {
  runCommand('构建插件（未打包目录）', 'pnpm', ['-C', 'packages/plugin', 'build'])
  runCommand('构建用户脚本', 'pnpm', ['build:script'])
  if (selected.includes('config')) {
    runCommand('构建配置页', 'pnpm', ['build:options'])
  }
}

const channel = process.env.E2E_EXECUTABLE || process.env.E2E_CHANNEL || (process.platform === 'win32' ? 'msedge' : 'chrome')
console.log(`\n浏览器：${channel}（headless=${headless}）`)
console.log(`产物目录：${ARTIFACTS}`)

const results = []
for (const spec of selected) {
  console.log(`\n=== ${spec} ===`)
  const report = createReport(spec)
  try {
    const mod = await import(`./specs/${spec}.mjs`)
    await mod.run({ headless, report })
  } catch (err) {
    report.check('场景执行', false, err && err.message ? err.message.split('\n')[0] : String(err))
  }
  results.push(...report.results)
}

const passed = results.filter(r => r.passed).length
const failed = results.length - passed
console.log(`\n──────── 汇总 ────────`)
console.log(`通过 ${passed} / ${results.length}${failed ? `，失败 ${failed}` : '，全部通过 ✅'}`)
if (failed) {
  for (const r of results.filter(r => !r.passed)) {
    console.log(`  ✘ [${r.scenario}] ${r.name}${r.detail ? ' — ' + r.detail : ''}`)
  }
  console.log(`\n截图见：${ARTIFACTS}`)
}
process.exit(failed ? 1 : 0)
