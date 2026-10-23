import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { chromium } from 'playwright-core'

export const ROOT = path.resolve(import.meta.dirname, '..')
export const ARTIFACTS = path.join(ROOT, 'e2e', 'artifacts')
export const PLUGIN_EXT = path.join(ROOT, 'packages', 'plugin', '.output', 'chrome-mv3')
export const USER_SCRIPT = path.join(ROOT, 'packages', 'script', 'dist', 'index.user.js')
export const OPTIONS_DIST = path.join(ROOT, 'packages', 'options', 'dist')
export const VUE_GLOBAL = path.join(ROOT, 'node_modules', 'vue', 'dist', 'vue.global.prod.js')

export const FIXTURE_URL = 'https://www.baidu.com/s?wd=all-search-e2e'

/** 仿真百度结果页（白名单站点，内容可控） */
export const FIXTURE_HTML = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">
<title>all-search e2e</title>
<style>
  body{margin:0;font:16px/1.8 system-ui,sans-serif}
  /* 贴顶的 sticky 头：验证「滚动后不会被菜单条压住」（issue #83） */
  header.site{position:sticky;top:0;left:0;right:0;height:60px;background:#fff;border-bottom:1px solid #eee;display:flex;align-items:center;padding:0 20px;z-index:100}
  #kw{margin-left:20px;width:420px;height:36px;padding:0 10px;border:1px solid #c4c7ce}
  main{padding:140px 40px 1200px}
  p{max-width:900px;color:#222}
  /* 不在菜单条覆盖区的 fixed 元素：不应被避让逻辑改动 */
  .fixed-center{position:fixed;top:50%;left:20px;width:120px;height:40px;background:rgba(0,0,0,.08);border:1px solid #ccc;z-index:50}
  .fixed-lower{position:fixed;top:200px;right:20px;width:120px;height:40px;background:rgba(0,0,0,.08);border:1px solid #ccc;z-index:50}
</style></head>
<body><header class="site"><b style="color:#2932e1">百度</b><input id="kw" value="all-search">
<input type="hidden" name="ie" value="utf-8"><input type="hidden" name="tn" value="1"></header>
<div class="fixed-center" aria-hidden="true"></div>
<div class="fixed-lower" aria-hidden="true"></div>
<main><h1>all-search e2e fixture</h1><p>${'搜索引擎跳转菜单回归测试文本。'.repeat(120)}</p></main></body></html>`

/**
 * 命中 generatedStyle 静态规则的站点仿真页（cn.bing.com/search）。
 * `#b_header` 必须带 top:30px —— 由静态 CSS 注入，不走运行时采样。
 */
export const STATIC_FIXTURE_HTML = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">
<title>bing fixture</title>
<style>
  body{margin:0;font:16px/1.8 system-ui,sans-serif}
  #b_header{position:fixed;top:0;left:0;right:0;height:60px;background:#fff;border-bottom:1px solid #eee;z-index:100}
  main{padding:120px 40px 1200px}
  p{max-width:900px;color:#222}
</style></head>
<body><div id="b_header"><b>bing</b></div>
<main><h1>静态规则 fixture</h1><p>${'固定头部避让静态规则回归文本。'.repeat(120)}</p></main></body></html>`

/**
 * 拦截页面请求：百度域返回 fixture，谷歌只回一个空壳（用于验证跳转 URL），
 * 扩展自身资源放行，其余外链（图标等）直接 abort。
 */
export async function installFixture (page) {
  await page.route('**/*', async route => {
    const url = route.request().url()
    if (url.startsWith('chrome-extension://') || url.startsWith('data:') || url.startsWith('blob:')) {
      return route.continue()
    }
    if (url.startsWith('https://cn.bing.com/')) {
      return route.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: STATIC_FIXTURE_HTML })
    }
    if (url.startsWith('https://www.baidu.com/')) {
      return route.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: FIXTURE_HTML })
    }
    if (url.startsWith('https://www.google.com/')) {
      return route.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: '<!doctype html><title>google</title><input id="kw">' })
    }
    return route.abort()
  })
}

function browserOptions ({ extensionPath, headless }) {
  const args = ['--no-first-run', '--no-default-browser-check', '--disable-gpu']
  if (extensionPath) {
    args.push(`--disable-extensions-except=${extensionPath}`, `--load-extension=${extensionPath}`)
  }
  // Chrome 137+ 已移除命令行 --load-extension，Windows 上默认用 Edge
  return {
    headless,
    args,
    viewport: { width: 1280, height: 800 },
    ...resolveBrowserTarget()
  }
}

/** 启动一个持久化上下文（可用扩展；传 extensionPath 则加载未打包扩展） */
export async function launch ({ tag, extensionPath, headless }) {
  fs.mkdirSync(ARTIFACTS, { recursive: true })
  const base = path.join(ARTIFACTS, `profile-${tag}`)
  let profile = base
  try {
    fs.rmSync(base, { recursive: true, force: true })
  } catch {
    // Windows 上上一次的浏览器可能还没完全退出，换一个目录避免 EBUSY
    profile = `${base}-${Date.now()}`
  }
  return chromium.launchPersistentContext(profile, browserOptions({ extensionPath, headless }))
}

function dirSize (dir) {
  let total = 0
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    try {
      total += entry.isDirectory() ? dirSize(full) : fs.statSync(full).size
    } catch {
      // 读不到的算 0，不影响清理
    }
  }
  return total
}

/**
 * 清理历史遗留的浏览器 profile 目录。
 *
 * launch() 只在成功删掉同名目录时才复用，EBUSY（上次的浏览器没退干净）会改成
 * `profile-<tag>-<时间戳>`，这些目录不会自己消失——跑久了能堆到上百 MB。
 * 每次开跑前扫一遍，被占用的下次再清。
 */
export function cleanProfiles () {
  let removed = 0
  let freed = 0
  let entries = []
  try {
    entries = fs.readdirSync(ARTIFACTS, { withFileTypes: true })
  } catch {
    return { removed, freed }
  }
  for (const entry of entries) {
    if (!entry.isDirectory() || !entry.name.startsWith('profile-')) continue
    const dir = path.join(ARTIFACTS, entry.name)
    try {
      freed += dirSize(dir)
      fs.rmSync(dir, { recursive: true, force: true })
      removed += 1
    } catch {
      // 还开着，留给下次
    }
  }
  return { removed, freed }
}

/** 等待宿主内出现菜单项 */
export async function waitForMenu (page, timeout = 20000) {
  await page.waitForFunction(() => {
    const host = document.querySelector('all-search-ui')
    return !!(host && host.shadowRoot && host.shadowRoot.querySelector('.as-menu-item'))
  }, null, { timeout })
}

/** 读取宿主 / 菜单条 / 浮层状态 */
export function measure (page) {
  return page.evaluate(() => {
    const host = document.querySelector('all-search-ui')
    const sr = host && host.shadowRoot
    const bar = sr && sr.querySelector('.as-container')
    const barRect = bar && bar.getBoundingClientRect()
    const pop = sr && sr.querySelector('.as-popover-content')
    let popper = null
    if (pop) {
      const r = pop.getBoundingClientRect()
      const hit = sr.elementFromPoint(
        Math.round(r.x + Math.min(r.width - 2, Math.max(2, r.width / 2))),
        Math.round(r.y + Math.min(r.height - 2, Math.max(2, r.height / 2)))
      )
      popper = {
        x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
        placement: pop.getAttribute('data-placement'),
        hitInside: !!hit && (pop === hit || pop.contains(hit)),
        inViewport: r.x >= 0 && r.y >= 0 && r.right <= innerWidth && r.bottom <= innerHeight
      }
    }
    return {
      host: !!host,
      hostId: host && host.id,
      hostClass: host && host.className,
      items: sr ? sr.querySelectorAll('.as-menu-item').length : 0,
      bar: barRect ? { x: Math.round(barRect.x), y: Math.round(barRect.y), w: Math.round(barRect.width), h: Math.round(barRect.height) } : null,
      popper
    }
  })
}

/** 通过设置面板切换布局方向（真实用户路径） */
export async function switchMode (page, label) {
  await page.locator('.as-setting-btn').filter({ hasText: '设置' }).click()
  await page.waitForTimeout(400)
  await page.getByText(label, { exact: true }).click()
  await page.waitForTimeout(500)
  await page.locator('.as-overlay').click({ position: { x: 8, y: 400 } })
  await page.waitForTimeout(350)
}

/** 悬停第一个分类，等待浮层 */
export async function hoverFirstCategory (page) {
  await page.locator('.as-menu-item').first().hover()
  await page.waitForTimeout(600)
}

/** 按分类名悬停（分类顺序会变，测试不要依赖「第一个」） */
export async function hoverCategory (page, label) {
  await page.locator('.as-menu-item').filter({ hasText: label }).first().hover()
  await page.waitForTimeout(600)
}

export const MODE_META = {
  top: { label: '居顶', placement: 'bottom-start', side: 'bottom' },
  bottom: { label: '居底', placement: 'top-start', side: 'top' },
  left: { label: '居左', placement: 'right-start', side: 'right' },
  right: { label: '居右', placement: 'left-start', side: 'left' }
}

/** 浮层是否出现在期望的一侧 */
export function directionOk (mode, bar, popper) {
  if (!bar || !popper) return false
  switch (MODE_META[mode].side) {
    case 'bottom': return popper.y >= bar.y + bar.h - 2
    case 'top': return popper.y + popper.h <= bar.y + 2
    case 'right': return popper.x >= bar.x + bar.w - 2
    case 'left': return popper.x + popper.w <= bar.x + 2
    default: return false
  }
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.woff2': 'font/woff2'
}

/**
 * 起一个只读静态服务器托管配置页产物。
 * - 只有「无扩展名的路径」才回落到 index.html（history 路由的深链），缺的 js/css 如实 404
 * - 路径被限制在 dist 目录内，`/all-search/../../x` 这类逃逸请求直接 404
 * 返回 `{ origin, close }`，端口由系统分配，不会撞上别的服务。
 */
export async function serveOptions () {
  const root = path.resolve(OPTIONS_DIST)
  const send = (res, status, body, type = 'text/plain; charset=utf-8') => {
    res.writeHead(status, { 'Content-Type': type })
    res.end(body)
  }

  const server = http.createServer((req, res) => {
    let urlPath
    try {
      urlPath = decodeURIComponent((req.url || '/').split('?')[0])
    } catch {
      // 畸形 % 转义
      send(res, 400, 'bad request')
      return
    }

    if (urlPath !== '/all-search' && !urlPath.startsWith('/all-search/')) {
      send(res, 404, 'not found')
      return
    }

    const relative = urlPath.slice('/all-search'.length) || '/'
    let file = path.resolve(root, `.${relative}`)
    if (file !== root && !file.startsWith(root + path.sep)) {
      send(res, 404, 'not found')
      return
    }

    let exists = false
    try {
      exists = fs.existsSync(file) && !fs.statSync(file).isDirectory()
    } catch {
      exists = false
    }
    // 资源类请求不回落到 HTML，否则「缺 chunk」会变成 200 + 一段 HTML，很难查
    if (!exists) {
      if (path.extname(relative)) {
        send(res, 404, 'not found')
        return
      }
      file = path.join(root, 'index.html')
    }

    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' })
    const stream = fs.createReadStream(file)
    stream.on('error', () => {
      if (!res.headersSent) send(res, 500, 'read error')
      else res.destroy()
    })
    stream.pipe(res)
  })

  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  const { port } = server.address()
  return {
    origin: `http://127.0.0.1:${port}`,
    close: () => new Promise((resolve) => {
      // keep-alive 连接会让 close 一直等，先断开再关
      server.closeAllConnections?.()
      server.close(resolve)
    })
  }
}

/** 选浏览器：优先 E2E_EXECUTABLE，其次 E2E_CHANNEL，Windows 默认 Edge */
function resolveBrowserTarget () {
  if (process.env.E2E_EXECUTABLE) {
    return { executablePath: process.env.E2E_EXECUTABLE }
  }
  return { channel: process.env.E2E_CHANNEL || (process.platform === 'win32' ? 'msedge' : 'chrome') }
}

/** 普通浏览器窗口（不加载扩展），用于配置页这类纯网页场景 */
export async function launchBrowser ({ headless = true } = {}) {
  return chromium.launch({ headless, ...resolveBrowserTarget() })
}

/** 收集断言结果 */
export function createReport (scenario) {
  const results = []
  return {
    check (name, passed, detail = '') {
      results.push({ scenario, name, passed: !!passed, detail })
      const mark = passed ? '\u2714' : '\u2718'
      console.log(`  ${mark} ${name}${detail ? ' — ' + detail : ''}`)
      return !!passed
    },
    get results () { return results }
  }
}
