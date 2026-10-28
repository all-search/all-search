#!/usr/bin/env node
/**
 * 发版助手：升版本 → 构建 → 检查产物 → 提交 → 打 tag →（可选）推送。
 *
 * 构建放在打 tag 之前：tag 一旦推出，CI 失败也无法重跑（同名 tag 已存在）。
 * 推送 tag 会触发 `.github/workflows/plugin-release.yml` 与 `script-release.yml`：
 * 打 Chrome/Firefox 包 + 创建 GitHub Release，并把用户脚本推到 release 分支。
 *
 * 用法：
 *   pnpm release:patch          # 1.5.10 -> 1.5.11，只提交和打 tag，不推送
 *   pnpm release:patch --push   # 同上，并 git push && git push --tags
 *   pnpm release -- 1.6.0       # 直接指定版本号
 *
 * 说明：只 stage package.json，工作区里其它未提交文件不会被打包进这次提交。
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PKG = path.join(ROOT, 'package.json')

const args = process.argv.slice(2)
const push = args.includes('--push')
// 不带参数时默认 patch，支持 pnpm release 与 pnpm release -- 1.6.0 两种写法
const target = args.find(arg => !arg.startsWith('--')) || 'patch'

if (!target) {
  console.error('用法: pnpm release <patch|minor|major|x.y.z> [--push]')
  process.exit(1)
}

const pkg = JSON.parse(fs.readFileSync(PKG, 'utf8'))
const current = pkg.version

function bump (version, kind) {
  const [major, minor, patch] = version.split('.').map(Number)
  if (kind === 'patch') return `${major}.${minor}.${patch + 1}`
  if (kind === 'minor') return `${major}.${minor + 1}.0`
  if (kind === 'major') return `${major + 1}.0.0`
  if (/^\d+\.\d+\.\d+$/.test(kind)) return kind
  throw new Error(`无法识别的版本：${kind}`)
}

const next = bump(current, target)
const tag = `v${next}`

const run = (command, commandArgs) => execFileSync(command, commandArgs, { cwd: ROOT, stdio: 'inherit' })

// 已有同名 tag 就别继续了
try {
  execFileSync('git', ['rev-parse', '--verify', `refs/tags/${tag}`], { cwd: ROOT, stdio: 'ignore' })
  console.error(`tag ${tag} 已存在`)
  process.exit(1)
} catch {
  // 不存在才继续
}

/**
 * 发版前的三道门禁。
 *
 * 以前这里只 stage package.json：工作区里未提交的源码改动不会进 tag，
 * 但版本号照样发出去 —— 用户拿到的包和仓库对不上，排查时极其难受。
 */
function fail (message) {
  console.error(`\n✘ ${message}`)
  process.exit(1)
}

/** 构建/检查失败时把 package.json 还原，别把半成品版本号留在工作区 */
function revertPkg () {
  try {
    execFileSync('git', ['checkout', '--', 'package.json'], { cwd: ROOT, stdio: 'inherit' })
    console.error('已还原 package.json')
  } catch {
    console.error('⚠ 还原 package.json 失败，请手动执行 git checkout -- package.json')
  }
}

const dirty = execFileSync('git', ['status', '--porcelain'], { cwd: ROOT, encoding: 'utf8' })
  .split('\n')
  .map(line => line.trim())
  .filter(Boolean)
  // 只放行根 package.json（下面会改它）；packages/*/package.json 有改动照样拦
  .filter(line => line.slice(3) !== 'package.json')
  // .claude/ 是本地工具配置，不该挡住发版
  .filter(line => !line.includes('.claude/'))
if (dirty.length) {
  fail(`工作区有未提交的改动，先提交或 stash 再发版：\n  ${dirty.slice(0, 5).join('\n  ')}`)
}

console.log('▶ 跑 lint + 类型检查 + 单测（pnpm verify）')
try {
  execFileSync('pnpm', ['verify'], { cwd: ROOT, stdio: 'inherit', shell: process.platform === 'win32' })
} catch {
  fail('pnpm verify 没过，发版中止（tag 未创建）')
}

// changelog/<version>.md 存在时，CI 会用它当 Release 正文（见 scripts/changelog.mjs）
const notes = path.join(ROOT, 'changelog', `${next}.md`)
console.log(fs.existsSync(notes)
  ? `▶ 将使用手写更新日志：changelog/${next}.md`
  : `ℹ 没有 changelog/${next}.md，Release 正文会由提交历史自动生成`)

pkg.version = next
fs.writeFileSync(PKG, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8')
console.log(`版本：${current} → ${next}`)

/**
 * 先构建、再打 tag。
 *
 * 以前是「bump → commit → tag → push」，构建发生在 tag 触发之后：
 * 一旦 CI 构建失败，tag 已经存在、Release 却没有，而 release.mjs 又会因 tag 存在
 * 拒绝重跑。产物有问题必须在本地就拦住。
 */
const buildSteps = [
  ['构建用户脚本', ['build:script']],
  ['构建配置页', ['build:options']],
  ['构建插件（Chrome）', ['build:plugin']],
  ['构建插件（Firefox + AMO 源码）', ['zip:firefox']]
]
for (const [label, args] of buildSteps) {
  console.log(`▶ ${label}`)
  try {
    execFileSync('pnpm', args, { cwd: ROOT, stdio: 'inherit', shell: process.platform === 'win32' })
  } catch {
    revertPkg()
    fail(`${label}失败，发版中止（版本号已还原，tag 未创建）`)
  }
}

console.log('▶ 检查产物（版本 / manifest / 用户脚本头 / 首屏预算）')
try {
  execFileSync('node', ['scripts/check-artifacts.mjs'], { cwd: ROOT, stdio: 'inherit' })
} catch {
  revertPkg()
  fail('产物检查没过，发版中止（版本号已还原，tag 未创建）')
}

run('git', ['add', 'package.json'])
run('git', ['commit', '-m', `chore(release): ${tag}`])
run('git', ['tag', '-a', tag, '-m', tag])
console.log(`已提交并打 tag：${tag}`)

if (push) {
  // 先推 tag：tag 推失败就什么都不发，别留下「分支已更新、Release 没发」的半成品
  run('git', ['push', 'origin', tag])
  run('git', ['push'])
  console.log('已推送，Release workflow 会自动开始')
} else {
  console.log(`下一步：git push origin ${tag} && git push`)
}
