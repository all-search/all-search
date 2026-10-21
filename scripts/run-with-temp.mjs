#!/usr/bin/env node
/**
 * 带「仓库内临时目录」的命令包装器。
 *
 * 背景：Windows 上 esbuild 默认把转译产物写到 %TEMP%（如
 * `C:\Users\ADMINI~1\AppData\Local\Temp\esbuild-xxx`），杀毒软件 / 索引服务
 * 常常还占着文件句柄，导致 `[vite:esbuild-transpile] remove ...: Access is denied`。
 * 把 TEMP/TMP/TMPDIR 指到仓库的 .tmp/build 就不会再撞上。
 *
 * 用法：
 *   pnpm build:prepare                       # 只准备临时目录（并清理残留的 esbuild-*）
 *   pnpm with-temp run -C packages/plugin zip  # 带着临时目录跑任意命令
 */
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const TMPDIR = path.join(ROOT, '.tmp', 'build')

/** 建目录，顺带清掉上次构建残留的 esbuild-* / vite-* 临时目录 */
function prepare ({ quiet = false } = {}) {
  fs.mkdirSync(TMPDIR, { recursive: true })

  let removed = 0
  for (const name of fs.readdirSync(TMPDIR)) {
    if (!/^(esbuild|vite)-/.test(name)) continue
    try {
      fs.rmSync(path.join(TMPDIR, name), { recursive: true, force: true })
      removed += 1
    } catch {
      // 还被占用就跳过，下次构建会换个新目录
    }
  }

  if (!quiet) {
    console.log(`临时目录：${path.relative(ROOT, TMPDIR)}${removed ? `（清掉 ${removed} 个残留）` : ''}`)
  }
}

const args = process.argv.slice(2)

if (!args.length) {
  console.error('用法: node scripts/run-with-temp.mjs <prepare|pnpm 子命令...>')
  process.exit(1)
}

if (args[0] === 'prepare') {
  prepare()
  process.exit(0)
}

// 正常构建路径也顺手清理一次，脚本里就不必再串一条 build:prepare
prepare({ quiet: true })

const child = spawn(['pnpm', ...args].join(' '), {
  cwd: ROOT,
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    TEMP: TMPDIR,
    TMP: TMPDIR,
    TMPDIR
  }
})

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }
  process.exit(code ?? 0)
})
