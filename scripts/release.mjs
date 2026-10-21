#!/usr/bin/env node
/**
 * 发版助手：升版本 → 提交 → 打 tag →（可选）推送。
 *
 * 推送 tag 会触发 `.github/workflows/plugin-release.yml`：
 * 校验版本一致 → 类型检查 → 单测 → 打 Chrome/Firefox 包 → 创建 GitHub Release。
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

pkg.version = next
fs.writeFileSync(PKG, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8')
console.log(`版本：${current} → ${next}`)

run('git', ['add', 'package.json'])
run('git', ['commit', '-m', `chore(release): ${tag}`])
run('git', ['tag', '-a', tag, '-m', tag])
console.log(`已提交并打 tag：${tag}`)

if (push) {
  run('git', ['push'])
  run('git', ['push', 'origin', tag])
  console.log('已推送，Release workflow 会自动开始')
} else {
  console.log(`下一步：git push && git push origin ${tag}`)
}
