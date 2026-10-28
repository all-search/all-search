#!/usr/bin/env node
/**
 * 产物守门：三端产物是否齐全、配置页首屏是否还在预算内。
 *
 * 用法：
 *   node scripts/check-artifacts.mjs          # 只检查已存在的产物
 *   node scripts/check-artifacts.mjs --json   # 机器可读输出
 *
 * 为什么要它：
 * - 发布链路里 Firefox 包只有发版当天才会被打，坏了没人知道；这里把「三产物齐全」变成一条命令
 * - 配置页首屏从 2.4MB 压到 400KB 花了两天，没有预算就会慢慢涨回去
 */
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const asJson = process.argv.includes('--json')

/** 配置页首屏（entry + 同步 chunk + CSS）的 gzip 预算 */
const FIRST_LOAD_BUDGET_KB = 450

const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'))
const VERSION = pkg.version

const problems = []
const report = []

function fail (message) {
  problems.push(message)
}

function ok (label, detail) {
  report.push({ label, detail, ok: true })
}

function checkFile (label, file, minBytes) {
  if (!fs.existsSync(file)) {
    fail(`${label} 不存在：${path.relative(ROOT, file)}`)
    return null
  }
  const size = fs.statSync(file).size
  if (size < minBytes) {
    fail(`${label} 只有 ${size} 字节，明显不对：${path.relative(ROOT, file)}`)
    return null
  }
  ok(label, `${Math.round(size / 1024)} KB`)
  return file
}

/**
 * 在 .output 里找**当前版本**的 zip。
 *
 * 以前按 mtime 找「最近生成」的：只要目录里有旧包就能通过，
 * 实测 package.json 已经是 2.1.1、目录里全是 2.0.1 的包，脚本照样全绿。
 * 现在必须文件名里带 `-<version>-`，旧包直接算缺失。
 */
function findZip (suffix) {
  const dir = path.join(ROOT, 'packages', 'plugin', '.output')
  if (!fs.existsSync(dir)) return { file: null, stale: [] }
  const names = fs.readdirSync(dir)
  const hit = names.filter(name => name.endsWith(suffix) && name.includes(`-${VERSION}-`)).sort()
  if (hit.length) return { file: path.join(dir, hit[hit.length - 1]), stale: [] }
  return { file: null, stale: names.filter(name => name.endsWith(suffix)) }
}

/** 缺包时给一句能定位的话：是没构建，还是目录里全是旧版本 */
function missingZip (label, suffix, stale, hint) {
  if (!stale.length) {
    fail(`缺少${label}（先跑 ${hint}）`)
    return
  }
  fail(`没有 ${VERSION} 版本的${label}，.output 里只有旧包：${stale.join(', ')}（重新构建）`)
}

/* ---------- 1. 用户脚本 ---------- */
const userscript = checkFile('用户脚本 index.user.js', path.join(ROOT, 'packages', 'script', 'dist', 'index.user.js'), 100 * 1024)
if (userscript) {
  const head = fs.readFileSync(userscript, 'utf8').slice(0, 8192)
  const got = (head.match(/^\/\/\s*@version\s+(\S+)/m) || [])[1]
  if (got !== VERSION) {
    fail(`用户脚本 @version=${got || '(缺失)'}，与 package.json ${VERSION} 不一致（重新构建）`)
  }
  if (!/^\/\/\s*@updateURL\s+https:\/\/raw\.githubusercontent\.com\/all-search\/all-search\/release\/index\.user\.js/m.test(head)) {
    fail('用户脚本 @updateURL 不是稳定的 release 分支地址（升级链会断）')
  }
  if (!/^\/\/\s*@match\s+\*:\/\/\*\/\*/m.test(head)) {
    fail('用户脚本 @match 不是 *://*/*，菜单条不会在任意站点出现')
  }
}

/* ---------- 2. 插件三产物 ---------- */
const chrome = findZip('-chrome.zip')
if (chrome.file) checkFile('插件 Chrome 包', chrome.file, 100 * 1024)
else missingZip(' Chrome 包', '-chrome.zip', chrome.stale, 'pnpm build:plugin')

const firefox = findZip('-firefox.zip')
if (firefox.file) checkFile('插件 Firefox 包', firefox.file, 100 * 1024)
else missingZip(' Firefox 包', '-firefox.zip', firefox.stale, 'pnpm zip:firefox')

const sources = findZip('-sources.zip')
if (sources.file) {
  const name = path.basename(sources.file)
  if (/undefined|null/.test(name)) {
    fail(`sources 包命名异常：${name}（zip.sourcesTemplate 没配好）`)
  } else {
    checkFile('插件 AMO 源码包', sources.file, 5 * 1024)
  }
} else {
  missingZip(' AMO 源码包', '-sources.zip', sources.stale, 'pnpm zip:firefox')
}

/* ---------- 2.1 manifest：版本 / 权限 / options 页 ---------- */
const manifestPath = path.join(ROOT, 'packages', 'plugin', '.output', 'chrome-mv3', 'manifest.json')
if (!fs.existsSync(manifestPath)) {
  fail('缺少 chrome-mv3/manifest.json（先跑 pnpm build:plugin）')
} else {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  if (manifest.version !== VERSION) {
    fail(`manifest.version=${manifest.version}，与 package.json ${VERSION} 不一致`)
  }
  const perms = (manifest.permissions || []).join(',')
  if (perms !== 'storage') {
    fail(`manifest.permissions=[${perms}]，预期只有 storage（多了会触发权限申请）`)
  }
  if (!manifest.options_ui || !String(manifest.options_ui.page || '').includes('options.html')) {
    fail('manifest 缺少 options_ui 指向 options.html')
  }
  if (!Array.isArray(manifest.content_scripts) || !manifest.content_scripts.length) {
    fail('manifest 缺少 content_scripts')
  }
  ok('manifest', `v${manifest.version}，权限 ${perms || '(无)'}`)
}

/* ---------- 3. 配置页首屏与预算 ---------- */
const distDir = path.join(ROOT, 'packages', 'options', 'dist')
const indexHtml = path.join(distDir, 'index.html')
if (!fs.existsSync(indexHtml)) {
  fail('配置页产物不存在（先跑 pnpm build:options）')
} else {
  const html = fs.readFileSync(indexHtml, 'utf8')

  // jsoneditor 是懒加载 chunk，绝不能被首屏预加载
  if (/modulepreload[^>]+jsoneditor/.test(html) || /rel="stylesheet"[^>]+jsoneditor/.test(html)) {
    fail('jsoneditor 又被首屏预加载了（检查 manualChunks 里的 cjs-helpers 规则）')
  }

  const assets = [...html.matchAll(/\/all-search\/assets\/([\w.-]+\.(?:js|css))/g)]
    .map(match => match[1])
    .filter((name, index, list) => list.indexOf(name) === index)

  // 匹配不到任何资源说明 base 改了或构建异常：gzip 会算成 0 然后「通过」
  if (!assets.length) {
    fail('index.html 没有引用任何 /all-search/assets/*（base 或构建异常）')
  }

  let raw = 0
  let gzip = 0
  const missing = []
  for (const name of assets) {
    const file = path.join(distDir, 'assets', name)
    if (!fs.existsSync(file)) {
      missing.push(name)
      continue
    }
    const buffer = fs.readFileSync(file)
    raw += buffer.length
    gzip += zlib.gzipSync(buffer, { level: 9 }).length
  }

  if (missing.length) {
    fail(`index.html 引用了不存在的资源：${missing.join(', ')}`)
  } else {
    const gzipKb = Math.round(gzip / 1024)
    if (gzipKb > FIRST_LOAD_BUDGET_KB) {
      fail(`配置页首屏 gzip ${gzipKb} KB，超过预算 ${FIRST_LOAD_BUDGET_KB} KB（raw ${Math.round(raw / 1024)} KB）`)
    } else {
      ok('配置页首屏', `${gzipKb} KB gzip（预算 ${FIRST_LOAD_BUDGET_KB}）`)
    }
  }
}

/* ---------- 输出 ---------- */
if (asJson) {
  console.log(JSON.stringify({ ok: problems.length === 0, problems, report }, null, 2))
} else {
  for (const item of report) console.log(`  ✔ ${item.label} — ${item.detail}`)
  if (problems.length) {
    console.error(`\n✘ 产物检查失败（${problems.length} 项）：`)
    for (const problem of problems) console.error(`  - ${problem}`)
  } else {
    console.log('\n✔ 产物齐全，首屏在预算内')
  }
}

process.exit(problems.length ? 1 : 0)
