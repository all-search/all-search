#!/usr/bin/env node
/**
 * 构建时扫描：把「压在菜单条上的固定元素」转成静态样式。
 *
 * 思路来自最初的实现（全量 TreeWalker 遍历 + 手写避让样式），但搬到了构建期：
 * 平时不动，站点改版后跑一次，产物提交入库；运行时只注入生成好的 CSS，
 * 不再做任何 DOM 采样。
 *
 * 用法：
 *   pnpm style:scan                # 扫描 loadList 里所有配了 probe 的站点
 *   pnpm style:scan --site=google  # 只扫匹配的站点（对 url 正则 / probe 地址做包含匹配）
 *   pnpm style:scan --headed       # 有头模式，方便肉眼看扫描过程
 *   pnpm style:scan --dry          # 只打印结果，不写文件
 *
 * 产物：src/config/generatedStyle.ts
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { transformWithEsbuild } from 'vite'
import { chromium } from 'playwright-core'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT_FILE = path.join(ROOT, 'src', 'config', 'generatedStyle.ts')

/** 菜单条高度，与 layout.scss 的横向布局保持一致 */
const BAR_HEIGHT = 30
/** 探测关键词，替换 probe 地址里的 %s */
const KEYWORD = 'all-search'
/** 每个站点的滚动位置；滚动后站点常把头部吸附到顶部，才能测到真实状态 */
const SCROLL_STEPS = [0, 700, 1500]

const args = process.argv.slice(2)
const filter = (args.find(a => a.startsWith('--site=')) || '').slice('--site='.length)
const limitArg = args.find(a => a.startsWith('--limit='))
const limit = limitArg ? Number(limitArg.split('=')[1]) || 0 : 0
const headed = args.includes('--headed')
const dry = args.includes('--dry')
/** 默认沿用已有结果做增量合并；--fresh 表示整份重扫；--prune 删除本轮扫描后已无命中的旧规则 */
const fresh = args.includes('--fresh')
const prune = args.includes('--prune')
/**
 * 接到一个已经开着的浏览器上（Chrome/Edge 需以 --remote-debugging-port 启动）。
 * 对验证码站点很关键：全新 profile 的自动化浏览器常被判定为机器人，
 * 用真实浏览器（带扩展、带 cookie）走 CDP 就能正常打开。
 */
const cdpEndpoint = (args.find(a => a.startsWith('--cdp=')) || '').slice('--cdp='.length) || process.env.AS_CDP || ''
/**
 * 生成后再复核一遍：站点常在页面加载过程中短暂地把头部设成 fixed，
 * 扫描容易抓到这种瞬时状态，复核时元素已经不是 fixed/sticky 的规则要丢掉。
 * 默认开启，--no-verify 可跳过。
 */
const verify = !args.includes('--no-verify')

/** 读取已有产物，用于增量合并（--fresh 时忽略） */
async function loadExisting () {
  if (fresh || !fs.existsSync(OUT_FILE)) return []
  const source = fs.readFileSync(OUT_FILE, 'utf8')
  const { code } = await transformWithEsbuild(source, 'generatedStyle.ts', { loader: 'ts', format: 'esm' })
  const mod = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`)
  return mod.generatedStyle || []
}

/** 读取 loadList（TS 数据文件，用 Vite 自带的 esbuild 转译后 import） */
async function loadSites () {
  const source = fs.readFileSync(path.join(ROOT, 'src', 'config', 'loadList.ts'), 'utf8')
  const { code } = await transformWithEsbuild(source, 'loadList.ts', { loader: 'ts', format: 'esm' })
  const mod = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`)
  return mod.list
}

/**
 * 从菜单配置里收集所有 `url: 'https://...%s'` 模板。
 * loadList 只写匹配规则、不写真实地址，用菜单里的模板反推探测地址，
 * 这样不用给 200+ 个站点手工配 probe。
 */
function collectMenuUrls () {
  const dir = path.join(ROOT, 'src', 'config', 'sites')
  const urls = []
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.ts')) continue
    const text = fs.readFileSync(path.join(dir, file), 'utf8')
    for (const match of text.matchAll(/url:\s*['"](https?:\/\/[^'"]+)['"]/g)) {
      urls.push(match[1])
    }
  }
  return urls
}

/** 给没显式配置 probe 的条目，按菜单模板反推一个可访问地址 */
function withDerivedProbes (sites, templates) {
  const keyword = KEYWORD
  return sites.map((site) => {
    if (site.probe) return site
    const host = templates.find((template) => {
      const href = template.replace('%s', keyword).toLowerCase()
      try {
        return new RegExp(site.url.source, site.url.flags).test(href)
      } catch {
        return false
      }
    })
    return host ? { ...site, probe: host, derived: true } : site
  })
}

/**
 * 页面内执行：注入探针条 → 全量遍历 → 找出压在条上的 fixed/sticky 元素。
 * 必须在页面上下文里跑：选择器唯一性只能用真实的 querySelectorAll 验证。
 * 注意这个函数会被序列化送进浏览器，不能引用外部变量。
 */
function scanCurrentViewport ({ barHeight }) {
  const isStableClass = (name) => {
    if (!name) return false
    if (name.startsWith('css-') || name.startsWith('sc-')) return false
    if (name.includes('__')) return false
    // CSS Modules / CSS-in-JS 的构建哈希后缀，如 headerWrapAdaptMod--p4OEz7QI
    if (/--[A-Za-z0-9_-]{5,}$/.test(name)) return false
    if (/_[A-Za-z0-9]{6,}$/.test(name)) return false
    // 无分隔符且够长，又含数字或大小写混排（Xx7Mif / E5eFb / zLSRge），基本都是混淆名
    if (!/[-_]/.test(name) && name.length >= 5 && (/[0-9]/.test(name) || /[a-z]/.test(name) && /[A-Z]/.test(name))) return false
    return true
  }

  const escape = (value) => (window.CSS && CSS.escape ? CSS.escape(value) : value.replace(/([^\w-])/g, '\\$1'))

  // 带时间戳/随机数的 id（如 flickr 的 yui_3_18_1_1_1792554030425_2160）每次加载都变，不能当锚点
  const hasUnstableId = (id) => /\d{6,}/.test(id) || /^yui_/.test(id)

  const uniqueElement = (selector) => {
    try {
      const found = document.querySelectorAll(selector)
      return found.length === 1 ? found[0] : null
    } catch {
      return null
    }
  }

  const nthOfType = (node) => {
    const siblings = [...node.parentElement.children].filter(item => item.tagName === node.tagName)
    return siblings.indexOf(node) + 1
  }

  const buildSelector = (element) => {
    if (element.id && /^[A-Za-z][\w-]*$/.test(element.id) && !hasUnstableId(element.id)) {
      const selector = `#${escape(element.id)}`
      if (uniqueElement(selector) === element) return { selector, stable: true }
    }

    for (const attr of ['data-testid', 'data-test', 'data-qa', 'data-component']) {
      const value = element.getAttribute(attr)
      if (!value) continue
      const selector = `${element.tagName.toLowerCase()}[${attr}="${value}"]`
      if (uniqueElement(selector) === element) return { selector, stable: true }
    }

    const classes = [...element.classList].filter(isStableClass)
    if (classes.length) {
      const selector = `${element.tagName.toLowerCase()}.${classes.map(escape).join('.')}`
      if (uniqueElement(selector) === element) return { selector, stable: true }
    }

    // 退化：从最近的稳定锚点往下拼路径
    const parts = []
    let node = element
    while (node && node !== document.body && parts.length < 6) {
      if (node.id && !hasUnstableId(node.id) && /^[A-Za-z][\w-]*$/.test(node.id) && uniqueElement(`#${escape(node.id)}`) === node) {
        parts.unshift(`#${escape(node.id)}`)
        break
      }
      const stable = [...node.classList].filter(isStableClass)
      const tag = node.tagName.toLowerCase()
      let part = `${tag}.${stable.map(escape).join('.')}`
      if (!stable.length || uniqueElement(part) !== node) {
        part = `${tag}:nth-of-type(${nthOfType(node)})`
      }
      parts.unshift(part)
      node = node.parentElement
    }
    const selector = parts.join(' > ')
    // 选择器里若还残留长串数字，说明结构本身不稳定，标出来让人工看一眼
    return { selector, stable: uniqueElement(selector) === element && !/\d{6,}/.test(selector) }
  }

  // 探针条：尺寸与真实菜单条一致，纯占位、不参与交互
  const probe = document.createElement('div')
  probe.setAttribute('data-as-probe', '1')
  probe.style.cssText = `position:fixed;left:0;top:0;width:100%;height:${barHeight}px;z-index:2147483647;pointer-events:none;background:transparent`
  document.documentElement.appendChild(probe)
  const barRect = probe.getBoundingClientRect()

  const results = []
  const seen = new Set()
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT)
  let node = walker.currentNode
  while (node) {
    if (node instanceof HTMLElement && node !== probe) {
      const style = getComputedStyle(node)
      const positioned = style.position === 'fixed' || style.position === 'sticky'
      const hasOffset = style.top && style.top !== 'auto'
      const pinned = style.position === 'fixed' || parseFloat(style.top) === 0
      // 负偏移说明它正被藏起来（如 B 站下滑时 top:-34px 的头部），动它没有意义。
      // 留一点容差：谷歌的头部是 top:-0.05px，属于贴在顶部，不是收起
      const tuckedAway = parseFloat(style.top) < -1
      if (positioned && hasOffset && pinned && !tuckedAway) {
        const rect = node.getBoundingClientRect()
        const overlaps = rect.height > 0 && rect.bottom > barRect.bottom - barHeight + 1 && rect.top < barRect.bottom - 1
        const hidden = style.visibility === 'hidden' || style.display === 'none' || style.opacity === '0'
        // 覆盖整个视口的固定层是遮罩/弹窗（如百度的安全验证框），不是压在条上的头部，
        // 推它会把整块弹窗挪位，直接排除
        const coversViewport = style.position === 'fixed' &&
          rect.width >= window.innerWidth * 0.9 &&
          rect.height >= window.innerHeight * 0.9
        // 侧边抽屉 / 整高悬浮面板（如 DuckDuckGo 的滑出菜单）不是压在条上的头部；
        // 但 sticky 的窄侧栏要保留（GitHub 搜索结果左侧栏就会顶到条上）
        const panelLike = style.position === 'fixed' &&
          rect.width < window.innerWidth * 0.5 &&
          rect.height > window.innerHeight * 0.6
        // 完全在视口外的元素（离屏抽屉）不用管
        const offscreen = rect.right <= 1 || rect.left >= window.innerWidth - 1
        if (overlaps && !hidden && !coversViewport && !panelLike && !offscreen) {
          const { selector, stable } = buildSelector(node)
          // 纯 nth-of-type 链路没有任何锚点（如 span:nth-of-type(1) > div:nth-of-type(1)），
          // 会命中页面里任意第一个同类结构，宁可不出规则，交给运行时采样兜底。
          // data-* 属性也算锚点，它比混淆类名稳定得多
          const hasAnchor = /[#.][A-Za-z_-]|\[data-[a-z-]+/i.test(selector)
          if (!hasAnchor) {
            if (!seen.has(`skip:${selector}`)) {
              seen.add(`skip:${selector}`)
              console.log(`   ⚠ 选择器无锚点，跳过：${selector}`)
            }
            node = walker.nextNode()
            continue
          }
          if (!seen.has(selector)) {
            seen.add(selector)
            const numeric = parseFloat(style.top)
            const top = style.top.endsWith('px') && Number.isFinite(numeric)
              ? `${Math.round((numeric + barHeight) * 100) / 100}px`
              : `calc(${style.top} + ${barHeight}px)`

            const declarations = [`top: ${top} !important`]
            // 高度铺满视口的 fixed 层下移后底部会露出空隙，同步收一点高度。
            // 只对 fixed 生效：sticky 元素改变 top 只是挪动吸附线，压高度会挤坏内容。
            const fullscreen = Math.abs(rect.height - window.innerHeight) < 2
            const heightCompensated = fullscreen && style.position === 'fixed'
            if (heightCompensated) {
              declarations.push(`height: calc(100vh - ${barHeight}px) !important`)
            }

            results.push({
              selector,
              // 超长选择器（Tailwind 多类名拼接）容易失效，标出来等人工确认
              stable: stable && selector.length <= 120,
              position: style.position,
              originalTop: style.top,
              top,
              declarations,
              height: Math.round(rect.height),
              fullscreen,
              heightCompensated
            })
          }
        }
      }
    }
    node = walker.nextNode()
  }

  probe.remove()
  return results
}

const render = (entries) => `/**
 * 自动生成，请勿手改。
 *
 * 由 \`pnpm style:scan\` 产出：构建时用无头浏览器打开 loadList 里配了 probe 的站点，
 * 找出压在菜单条上的 fixed/sticky 元素，把避让偏移写成静态 CSS。
 * 运行时只注入这些规则，不再做任何 DOM 采样；站点改版后重跑一次即可。
 */
export interface GeneratedStyleRule {
  /** 站点匹配正则的源码，运行时用 new RegExp(pattern, flags) 匹配 */
  pattern: string;
  /** 正则 flags */
  flags: string;
  /** 菜单条位于顶部时注入的样式（扫描场景就是顶部） */
  top?: string;
  /** 扫描时打开的页面地址，便于复验与排查 */
  probe?: string;
}

export const generatedStyle: GeneratedStyleRule[] = [
${entries}
]
`

async function main () {
  const templates = collectMenuUrls()
  const allSites = withDerivedProbes(await loadSites(), templates)
  const sites = allSites.filter(site => site.probe)
  const filters = filter ? filter.split(',').map(item => item.trim()).filter(Boolean) : []
  const selected = filters.length
    ? sites.filter(site => filters.some(f => String(site.url).includes(f) || site.probe.includes(f)))
    : sites

  // --fresh 会丢掉没扫到的站点；再叠加 --site/--limit 就等于静默删除其余规则
  if (fresh && (filters.length || limit)) {
    console.error('--fresh 会重置整份产物，不能和 --site / --limit 一起用；只改个别站点请用 --prune')
    process.exit(1)
  }

  if (!selected.length) {
    console.error(filter ? `没有匹配 --site=${filter} 的站点` : 'loadList 里没有配置 probe 的站点')
    process.exit(1)
  }

  console.log(
    `扫描 ${selected.length} 个站点（菜单模板共 ${templates.length} 条，` +
    `显式 probe ${allSites.filter(s => s.probe && !s.derived).length} 个，推导 ${allSites.filter(s => s.derived).length} 个）`
  )

  let browser
  let context
  if (cdpEndpoint) {
    console.log(`连接已有浏览器：${cdpEndpoint}`)
    browser = await chromium.connectOverCDP(cdpEndpoint)
    context = browser.contexts()[0]
    if (!context) {
      console.error('CDP 连上了但没有可用的浏览器上下文')
      process.exit(1)
    }
  } else {
    browser = await chromium.launch({
      headless: !headed,
      channel: process.env.E2E_CHANNEL || (process.platform === 'win32' ? 'msedge' : 'chrome'),
      args: [
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-gpu',
        // 需要代理才能访问的站点（如 Google）可用 AS_PROXY 指定
        ...(process.env.AS_PROXY ? [`--proxy-server=${process.env.AS_PROXY}`] : [])
      ],
      ...(process.env.E2E_EXECUTABLE ? { executablePath: process.env.E2E_EXECUTABLE } : {})
    })
  }

  const created = []
  const failures = []
  const empty = []
  const scannedKeys = new Set()
  let index = 0

  for (const site of (limit ? selected.slice(0, limit) : selected)) {
    index += 1
    const url = site.probe.replace('%s', encodeURIComponent(KEYWORD))
    const page = context
      ? await context.newPage()
      : await browser.newPage({ viewport: { width: 1280, height: 800 } })
    console.log(`\n[${index}/${selected.length}] ${url}`)
    try {
      // 谷歌在新 profile 上会先跳同意书页，预置 cookie 直接进结果页
      // （用 CDP 接的是真实浏览器，不要往里塞 cookie）
      if (!context && /(^|\.)google\./.test(new URL(url).hostname)) {
        await page.context().addCookies([
          { name: 'CONSENT', value: 'YES+cb', domain: '.google.com', path: '/' },
          { name: 'SOCS', value: 'CAI', domain: '.google.com', path: '/' }
        ])
      }
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 })
      await page.waitForTimeout(2500)

      // 拦截页 / 空页面：记录原因，不要当成「没有元素压在条上」
      const health = await page.evaluate(() => {
        const text = (document.body && document.body.innerText) || ''
        const blocked = /验证码|安全验证|captcha|unusual traffic|访问受限|人机验证|异常流量|自动程序/i.test(text.slice(0, 500))
        // 用 --cdp 接真实浏览器时，机器上很可能已经装了 All-Search：
        // 它已经把头推下去了，这时量到的位置是「推过之后」的，会生成 double offset
        const host = document.querySelector('all-search-ui')
        return {
          textLength: text.length,
          blocked,
          running: !!(host && host.shadowRoot && host.shadowRoot.querySelector('.as-menu-item')),
          title: document.title
        }
      })
      if (health.running) {
        const reason = '页面上已有 All-Search 在运行，测到的位置可能已被推动'
        console.log(`   跳过：${reason}`)
        failures.push({ url, message: `skip: ${reason}` })
        await page.close().catch(() => {})
        continue
      }
      if (health.blocked || health.textLength < 120) {
        const reason = health.blocked ? '被验证页拦截' : `页面内容过少（${health.textLength} 字）`
        console.log(`   跳过：${reason}`)
        failures.push({ url, message: `skip: ${reason}` })
        await page.close().catch(() => {})
        continue
      }

      const hits = []
      const seen = new Set()
      for (const y of SCROLL_STEPS) {
        await page.evaluate((top) => window.scrollTo(0, top), y)
        await page.waitForTimeout(y === 0 ? 600 : 1400)
        for (const hit of await page.evaluate(scanCurrentViewport, { barHeight: BAR_HEIGHT })) {
          if (seen.has(hit.selector)) continue
          seen.add(hit.selector)
          hits.push(hit)
        }
      }

      if (!hits.length) {
        console.log('   没有元素压在菜单条上')
        empty.push(url)
      }
      for (const hit of hits) {
        const mark = hit.stable ? '✓' : '⚠'
        const extra = hit.heightCompensated ? ' [全屏 fixed，附高度补偿]' : ''
        console.log(`   ${mark} ${hit.selector}  ${hit.position} ${hit.originalTop} (h=${hit.height})${extra}`)
      }
      // 复核：确认这些元素在当前页面仍然是 fixed/sticky，排除加载过程中的瞬时状态
      let confirmed = hits
      if (verify && hits.length) {
        confirmed = []
        for (const hit of hits) {
          const stillPositioned = await page.evaluate((selector) => {
            const el = document.querySelector(selector)
            if (!el) return false
            const cs = getComputedStyle(el)
            if (cs.position !== 'fixed' && cs.position !== 'sticky') return false
            return !!cs.top && cs.top !== 'auto'
          }, hit.selector)
          if (stillPositioned) {
            confirmed.push(hit)
          } else {
            console.log(`   ✗ 复验未通过，丢弃：${hit.selector}`)
          }
        }
      }

      if (confirmed.length) {
        created.push({
          pattern: site.url.source,
          flags: site.url.flags,
          probe: url,
          css: confirmed.map(hit => `${hit.selector} { ${hit.declarations.join('; ')}; }`).join('\n')
        })
      }
      // 记录本轮真正扫到的站点：--prune 时据此删掉已不再命中的旧规则
      scannedKeys.add(`${site.url.source}/${site.url.flags}`)
    } catch (err) {
      const message = String(err).split('\n')[0]
      console.error(`   扫描失败：${message}`)
      failures.push({ url, message })
    } finally {
      await page.close().catch(() => {})
    }
  }

  await browser.close()

  console.log(`\n=== 汇总 ===`)
  console.log(`本轮命中 ${created.length} 个站点，无命中 ${empty.length} 个，跳过/失败 ${failures.length} 个`)
  for (const failure of failures) {
    console.log(`   ✗ ${failure.url} — ${failure.message.slice(0, 90)}`)
  }

  // 增量合并：同上一次的结果按 pattern 覆盖，其余保留
  const existing = await loadExisting()
  const merged = new Map(existing.map(rule => [`${rule.pattern}/${rule.flags}`, rule]))
  const createdKeys = new Set(created.map(item => `${item.pattern}/${item.flags}`))
  if (prune) {
    for (const key of scannedKeys) {
      if (!createdKeys.has(key) && merged.has(key)) {
        merged.delete(key)
      }
    }
  }
  for (const item of created) {
    merged.set(`${item.pattern}/${item.flags}`, {
      pattern: item.pattern,
      flags: item.flags,
      probe: item.probe,
      top: item.css
    })
  }
  const rules = [...merged.values()]

  const entries = rules.map(({ pattern, flags, top, horizontal, css, probe }) => {
    // horizontal 是早期产物里的字段名，读旧文件时兼容一下
    const body = top ?? horizontal ?? css ?? ''
    const lines = body.split('\n').map(line => `      ${JSON.stringify(line)}`).join(',\n')
    const probeLine = probe ? `\n    probe: ${JSON.stringify(probe)},` : ''
    return `  {\n    pattern: ${JSON.stringify(pattern)},\n    flags: ${JSON.stringify(flags)},${probeLine}\n    top: [\n${lines}\n    ].join('\\n')\n  }`
  }).join(',\n')

  const file = render(entries)
  if (dry) {
    console.log('\n--- generatedStyle.ts ---\n' + file)
    return
  }
  fs.writeFileSync(OUT_FILE, file, 'utf8')
  console.log(`\n已写入 ${path.relative(ROOT, OUT_FILE)}（合并后共 ${rules.length} 个站点）`)
}

await main()
