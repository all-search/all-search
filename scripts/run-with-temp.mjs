#!/usr/bin/env node
/**
 * 带「仓库内临时目录」的 pnpm 包装器。
 *
 * 背景：Windows 上 esbuild 默认把转译产物写到 %TEMP%（如
 * `C:\Users\ADMINI~1\AppData\Local\Temp\esbuild-xxx`），杀毒软件 / 索引服务
 * 常常还占着文件句柄，导致 `[vite:esbuild-transpile] remove ...: Access is denied`。
 * 把 TEMP/TMP/TMPDIR 指到仓库的 .tmp/build 就能稳定复现不了。
 *
 * 用法（package.json 里）：
 *   node scripts/run-with-temp.mjs run -C packages/plugin zip
 */
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const TMPDIR = path.join(ROOT, '.tmp', 'build')
fs.mkdirSync(TMPDIR, { recursive: true })

const args = process.argv.slice(2)
if (!args.length) {
  console.error('用法: node scripts/run-with-temp.mjs <pnpm 子命令...>')
  process.exit(1)
}

const command = ['pnpm', ...args].join(' ')

const child = spawn(command, {
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
