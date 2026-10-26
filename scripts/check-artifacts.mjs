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

/** 在 .output 里按后缀找**最近生成**的那个 zip（按文件名排序会被 2.9.0 / 2.10.0 这种版本号坑到） */
function findZip (suffix) {
  const dir = path.join(ROOT, 'packages', 'plugin', '.output')
  if (!fs.existsSync(dir)) return null
  const candidates = fs.readdirSync(dir)
    .filter(name => name.endsWith(suffix))
    .map(name => path.join(dir, name))
    .map(file => ({ file, mtime: fs.statSync(file).mtimeMs }))
    .sort((a, b) => b.mtime - a.mtime)
  return candidates.length ? candidates[0].file : null
}

/* ---------- 1. 用户脚本 ---------- */
checkFile('用户脚本 index.user.js', path.join(ROOT, 'packages', 'script', 'dist', 'index.user.js'), 100 * 1024)

/* ---------- 2. 插件三产物 ---------- */
const chromeZip = findZip('-chrome.zip')
if (chromeZip) checkFile('插件 Chrome 包', chromeZip, 100 * 1024)
else fail('缺少 Chrome 包（先跑 pnpm build:plugin）')

const firefoxZip = findZip('-firefox.zip')
if (firefoxZip) checkFile('插件 Firefox 包', firefoxZip, 100 * 1024)
else fail('缺少 Firefox 包（先跑 pnpm zip:firefox）')

const sourcesZip = findZip('-sources.zip')
if (sourcesZip) {
  const name = path.basename(sourcesZip)
  if (/undefined|null/.test(name)) {
    fail(`sources 包命名异常：${name}（zip.sourcesTemplate 没配好）`)
  } else {
    checkFile('插件 AMO 源码包', sourcesZip, 5 * 1024)
  }
} else {
  fail('缺少 AMO 源码包（先跑 pnpm zip:firefox）')
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
