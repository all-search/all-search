import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright-core'

export const ROOT = path.resolve(import.meta.dirname, '..')
export const ARTIFACTS = path.join(ROOT, 'e2e', 'artifacts')
export const PLUGIN_EXT = path.join(ROOT, 'packages', 'plugin', '.output', 'chrome-mv3')
export const USER_SCRIPT = path.join(ROOT, 'packages', 'script', 'dist', 'index.user.js')
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
</style></head>
<body><header class="site"><b style="color:#2932e1">百度</b><input id="kw" value="all-search">
<input type="hidden" name="ie" value="utf-8"><input type="hidden" name="tn" value="1"></header>
<main><h1>all-search e2e fixture</h1><p>${'搜索引擎跳转菜单回归测试文本。'.repeat(120)}</p></main></body></html>`

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
  const options = {
    headless,
    args,
    viewport: { width: 1280, height: 800 }
  }
  if (process.env.E2E_EXECUTABLE) {
    options.executablePath = process.env.E2E_EXECUTABLE
  } else {
    // Chrome 137+ 已移除命令行 --load-extension，Windows 上默认用 Edge
    options.channel = process.env.E2E_CHANNEL || (process.platform === 'win32' ? 'msedge' : 'chrome')
  }
  return options
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
