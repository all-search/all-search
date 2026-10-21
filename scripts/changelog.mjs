#!/usr/bin/env node
/**
 * 从 Conventional Commits 生成 changelog。
 *
 * 用法：
 *   pnpm changelog                      # 预览上一个 tag 到 HEAD 的内容
 *   pnpm changelog -- --from v2.0.0     # 指定起点
 *   pnpm changelog -- --write           # 写入 CHANGELOG.md（新版本置顶，保留历史）
 *   pnpm changelog -- --out release.md  # 输出到指定文件（CI 用来当 Release 正文）
 *
 * 约定：提交信息写成 `type(scope): subject`，破坏性变更写成 `type(scope)!: subject`
 * 或在正文里给出 `BREAKING CHANGE:`。它不是规范的提交会被归到「其他」。
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DEFAULT = path.join(ROOT, 'CHANGELOG.md')

/** 分组顺序即输出顺序；空分组会自动跳过 */
const GROUPS = [
  { key: 'breaking', title: '⚠️ 破坏性变更' },
  { key: 'feat', title: '🚀 新功能' },
  { key: 'fix', title: '🐛 修复' },
  { key: 'perf', title: '⚡ 性能' },
  { key: 'refactor', title: '♻️ 重构' },
  { key: 'docs', title: '📖 文档' },
  { key: 'build', title: '🔧 构建 / 依赖' },
  { key: 'ci', title: '🤖 CI' },
  { key: 'test', title: '✅ 测试' },
  { key: 'style', title: '🎨 样式' },
  { key: 'other', title: '📦 其他' }
]

// 发布提交本身不进 changelog
const IGNORED = [/^chore\(release\)/i, /^Merge (pull request|branch)/i]

const args = process.argv.slice(2)
const option = (name, fallback = null) => {
  const index = args.indexOf(`--${name}`)
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback
}
const write = args.includes('--write')

const git = (...gitArgs) => execFileSync('git', gitArgs, { cwd: ROOT, encoding: 'utf8' }).trim()

function head () {
  return option('to') || 'HEAD'
}

/** 上一个 tag（排除当前 HEAD 上打的 tag），没有就用首个提交 */
function previousTag (to) {
  if (option('from')) return option('from')
  try {
    const tags = git('tag', '--merged', to, '--sort=-creatordate').split('\n').filter(Boolean)
    const exact = tags.find(tag => git('rev-list', '-n', '1', tag) === git('rev-list', '-n', '1', to))
    const candidates = tags.filter(tag => tag !== exact)
    return candidates[0] || git('rev-list', '--max-parents=0', to).split('\n')[0]
  } catch {
    return git('rev-list', '--max-parents=0', to).split('\n')[0]
  }
}

const CONVENTIONAL = /^(feat|fix|perf|refactor|docs|build|ci|test|style|chore)\s*(?:\(([^)]+)\))?\s*(!)?:\s*(.+)$/

function classify (subject) {
  const match = subject.match(CONVENTIONAL)
  if (!match) return { group: 'other', scope: '', subject: subject.trim(), breaking: false }
  const [, type, scope = '', bang = '', text = ''] = match
  const group = type === 'chore' ? 'other' : type
  return { group, scope, subject: text.trim(), breaking: Boolean(bang) }
}

function collect (from, to) {
  // %x00 分隔字段、%x1e 分隔提交，避免 subject 里出现分隔符时串行
  const raw = git('log', `${from}..${to}`, '--no-merges', '--pretty=format:%s%x00%b%x1e')
  const items = []
  for (const record of raw.split('\x1e')) {
    const [subject = '', body = ''] = record.split('\x00')
    const line = subject.trim()
    if (!line || IGNORED.some(pattern => pattern.test(line))) continue
    const parsed = classify(line)
    if (/BREAKING[ -]CHANGE/i.test(body)) parsed.breaking = true
    items.push(parsed)
  }
  return items
}

function render (items, { from, to, version }) {
  const buckets = new Map(GROUPS.map(group => [group.key, []]))
  for (const item of items) {
    const key = item.breaking ? 'breaking' : item.group
    if (!buckets.has(key)) buckets.set(key, [])
    buckets.get(key).push(item)
  }

  const lines = [`## ${version || to}`, '']
  for (const group of GROUPS) {
    const entries = buckets.get(group.key)
    if (!entries.length) continue
    lines.push(`### ${group.title}`, '')
    for (const item of entries) {
      const scope = item.scope ? `**${item.scope}**: ` : ''
      lines.push(`- ${scope}${item.subject}`)
    }
    lines.push('')
  }

  if (!items.length) lines.push('- 本次没有面向用户的改动', '')

  if (from && to) {
    lines.push(`**完整对比**：https://github.com/all-search/all-search/compare/${from}...${to}`)
  }
  return `${lines.join('\n').trim()}\n`
}

const to = head()

/** HEAD 上正好有 tag 时用 tag 名，让对比链接更好读 */
function toLabel (ref) {
  if (ref !== 'HEAD') return ref
  try {
    // 没有 tag 时 git describe 会往 stderr 写 fatal，这里静默掉
    return execFileSync('git', ['describe', '--tags', '--exact-match', 'HEAD'], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim()
  } catch {
    return 'HEAD'
  }
}

const from = previousTag(to)
const label = toLabel(to)
const version = option('version') || (to === 'HEAD' ? '未发布' : to)
const items = collect(from, to)
const markdown = render(items, { from, to: label, version })

const outFile = option('out')
if (outFile) {
  fs.writeFileSync(path.join(ROOT, outFile), markdown, 'utf8')
  console.log(`已写入 ${outFile}（${items.length} 条，区间 ${from}..${to}）`)
} else if (write) {
  const existing = fs.existsSync(OUT_DEFAULT) ? fs.readFileSync(OUT_DEFAULT, 'utf8') : ''
  const header = existing.startsWith('# ') ? '' : '# 更新日志\n\n格式来自 [Conventional Commits](https://www.conventionalcommits.org/)，由 `pnpm changelog` 生成。\n\n'
  const rest = existing.replace(/^# [^\n]*\n+/, '')
  fs.writeFileSync(OUT_DEFAULT, `${header}${markdown}\n${rest}`.trimEnd() + '\n', 'utf8')
  console.log(`已写入 CHANGELOG.md（${items.length} 条，区间 ${from}..${to}）`)
} else {
  process.stdout.write(markdown)
  console.error(`\n（区间 ${from}..${to}，共 ${items.length} 条；加 --write 写入 CHANGELOG.md）`)
}
