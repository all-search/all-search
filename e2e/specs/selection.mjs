import path from 'node:path'
import {
  ARTIFACTS, PLUGIN_EXT, FIXTURE_URL,
  installFixture, launch, waitForMenu
} from '../lib.mjs'

export const name = 'selection'

/** 拖选一段文字，返回选中的文本 */
async function selectText (page) {
  const box = await page.evaluate(() => {
    const r = document.querySelector('main p').getBoundingClientRect()
    return { x: r.x + 10, y: r.y + 10, x2: r.x + 260, y2: r.y + 10 }
  })
  await page.mouse.move(box.x, box.y)
  await page.mouse.down()
  await page.mouse.move(box.x2, box.y2, { steps: 8 })
  await page.mouse.up()
  await page.waitForTimeout(600)
  return page.evaluate(() => window.getSelection().toString().trim())
}

/** 点“更多”，返回弹窗信息 */
async function openMoreDialog (page) {
  await page.locator('.bar-container').waitFor({ state: 'visible', timeout: 5000 })
  await page.locator('.bar-container .tool-bar-item').last().click()
  await page.waitForTimeout(800)
  return page.evaluate(() => {
    const sr = document.querySelector('all-search-ui').shadowRoot
    const el = sr.querySelector('.as-dialog')
    return {
      visible: !!el && getComputedStyle(el).display !== 'none',
      links: sr.querySelectorAll('.as-dialog .cate-item a').length,
      keyword: (sr.querySelector('.se-input') || {}).value || ''
    }
  })
}

/** 通过设置抽屉切换「划词打开」的选项，返回说明文案 */
async function setSelectionOpenMode (page, text) {
  await page.locator('.as-setting-btn').filter({ hasText: '设置' }).click()
  await page.waitForTimeout(400)
  const row = page.getByText('划词', { exact: true }).locator('..')
  await row.locator('label.as-radio').filter({ hasText: text }).click()
  await page.waitForTimeout(300)
  const tip = await page.evaluate(() => {
    const sr = document.querySelector('all-search-ui').shadowRoot
    const el = sr.querySelector('.as-open-mode-tip')
    return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''
  })
  await page.locator('.as-overlay').click({ position: { x: 8, y: 400 } })
  await page.locator('.as-overlay').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {})
  await page.waitForTimeout(400)
  return tip
}

/**
 * 划词工具栏回归（对应用户反馈）：
 * 1. 选中文字后工具栏出现
 * 2. 点“更多”打开弹窗，且**关键字不丢失**（影子 DOM 里 e.target 会被重定向，
 *    早期用 contains(e.target) 判断会把点击工具栏误判成点击外部并清空选区）
 * 3. 默认（新标签页）下左键点站点 → 打开新标签页，当前页不变
 * 4. 把「划词打开」切成“当前页”后，左键 → 当前页跳转，且不新开标签
 */
export async function run ({ headless, report }) {
  const ctx = await launch({ tag: 'selection', extensionPath: PLUGIN_EXT, headless })
  const page = await ctx.newPage()
  try {
    await installFixture(page)
    await page.goto(FIXTURE_URL, { waitUntil: 'domcontentloaded' })
    await waitForMenu(page)

    // 1. 选中文字 → 工具栏
    const selected = await selectText(page)
    const barVisible = await page.evaluate(() => {
      const sr = document.querySelector('all-search-ui').shadowRoot
      const bar = sr.querySelector('.bar-container')
      return !!bar && getComputedStyle(bar).display !== 'none'
    })
    report.check('选中文字后划词工具栏出现', barVisible && selected.length > 0, `选区=${selected.slice(0, 12)}…`)
    await page.screenshot({ path: path.join(ARTIFACTS, 'selection-bar.png') })

    // 2. 「更多」弹窗
    const dialog = await openMoreDialog(page)
    report.check('“更多”打开搜索弹窗', dialog.visible && dialog.links > 0, `links=${dialog.links}`)
    report.check('弹窗保留选中关键字', dialog.keyword === selected, `keyword=${dialog.keyword.slice(0, 12)}…`)
    await page.screenshot({ path: path.join(ARTIFACTS, 'selection-dialog.png') })

    // 3. 默认：左键 → 新标签页
    //    这里必须点「白名单里的站点」（fixture 只放行 baidu/google/bing）：
    //    目标域名被 route.abort() 时，新标签页的首次导航直接失败，Playwright 收不到 page 事件，
    //    看起来就像「点了没反应」。
    const before = page.url()
    const [popup] = await Promise.all([
      ctx.waitForEvent('page', { timeout: 10000 }),
      page.locator('.as-dialog .cate-item a').filter({ hasText: '百度' }).first().click()
    ])
    await popup.waitForTimeout(400).catch(() => {})
    report.check('默认左键打开新标签页', !!popup && popup.url() !== before, `new=${popup.url().slice(0, 60)}`)
    report.check('默认模式下当前页未被导航', page.url() === before, page.url())
    await popup.close().catch(() => {})

    // 4. 切成“当前页”：左键应在当前页打开
    await page.bringToFront()
    await page.goto(FIXTURE_URL, { waitUntil: 'domcontentloaded' })
    await waitForMenu(page)
    await page.waitForTimeout(400)
    const tip = await setSelectionOpenMode(page, '当前页')
    report.check('设置页含打开方式说明', tip.includes('Ctrl') && tip.includes('另一种'), tip.slice(0, 24) + '…')

    const selected2 = await selectText(page)
    const dialog2 = await openMoreDialog(page)
    report.check('切换后弹窗仍保留关键字', dialog2.keyword === selected2 && selected2.length > 0, `keyword=${dialog2.keyword.slice(0, 12)}…`)

    const pagesBefore = ctx.pages().length
    const urlBefore = page.url()
    await page.locator('.as-dialog .cate-item a').filter({ hasText: '百度' }).first().click()
    await page.waitForTimeout(1500)
    report.check(
      '划词设为“当前页”后左键在当前页打开',
      page.url() !== urlBefore && ctx.pages().length === pagesBefore,
      `url=${page.url().slice(0, 60)} pages=${ctx.pages().length}`
    )
    await page.screenshot({ path: path.join(ARTIFACTS, 'selection-same-tab.png') })

    // 5. 输入框（搜索框）里选词也要出工具栏（issue #88）
    await page.goto(FIXTURE_URL, { waitUntil: 'domcontentloaded' })
    await waitForMenu(page)
    await page.waitForTimeout(300)
    const picked = await page.evaluate(() => {
      const el = document.querySelector('#kw')
      el.focus()
      el.setSelectionRange(0, el.value.length)
      el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
      el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
      return el.value.slice(el.selectionStart, el.selectionEnd)
    })
    await page.waitForTimeout(300)
    const inputBar = await page.evaluate(() => {
      const sr = document.querySelector('all-search-ui').shadowRoot
      const bar = sr.querySelector('.bar-container')
      return !!bar && getComputedStyle(bar).display !== 'none'
    })
    report.check('搜索框内选词也显示划词工具栏', inputBar && picked.length > 0, `选区=${picked}`)
    await page.screenshot({ path: path.join(ARTIFACTS, 'selection-input.png') })
  } finally {
    await ctx.close()
  }
}
