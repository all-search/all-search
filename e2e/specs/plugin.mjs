import path from 'node:path'
import {
  ARTIFACTS, PLUGIN_EXT, FIXTURE_URL,
  installFixture, launch, waitForMenu, measure,
  switchMode, hoverFirstCategory, directionOk, MODE_META
} from '../lib.mjs'

export const name = 'plugin'

export async function run ({ headless, report }) {
  const ctx = await launch({ tag: 'plugin', extensionPath: PLUGIN_EXT, headless })
  const page = await ctx.newPage()

  try {
    await installFixture(page)
    await page.goto(FIXTURE_URL, { waitUntil: 'domcontentloaded' })
    await waitForMenu(page)
    await page.waitForTimeout(800)

    // 1. 菜单渲染
    const initial = await measure(page)
    report.check('宿主与菜单渲染', initial.host && initial.items > 0, `items=${initial.items} class=${initial.hostClass}`)
    report.check('菜单条贴在顶部', !!initial.bar && initial.bar.y === 0 && initial.bar.h > 20, JSON.stringify(initial.bar))
    await page.screenshot({ path: path.join(ARTIFACTS, 'plugin-bar.png') })

    // 1.0 命中测试只应碰到压在条上的元素，页面其它 fixed 元素不动
    const adjusted = await page.evaluate(() => {
      return [...document.querySelectorAll('[data-as-adjusted]')]
        .map(el => (el.className || el.tagName).toString())
    })
    report.check(
      '只避让压在条上的 fixed 元素',
      !adjusted.some(c => c.includes('fixed-center') || c.includes('fixed-lower')),
      `adjusted=${JSON.stringify(adjusted)}`
    )

    // 1.1 滚动后，贴顶的 sticky 元素应停在菜单条下方，而不是被压住（issue #83）
    await page.evaluate(() => window.scrollTo(0, 400))
    await page.waitForTimeout(300)
    const stickyTop = await page.evaluate(() => {
      const el = document.querySelector('header.site')
      return el ? Math.round(el.getBoundingClientRect().top) : -1
    })
    report.check(
      '滚动后 sticky 顶部元素让位',
      !!initial.bar && stickyTop >= initial.bar.h - 2 && stickyTop <= initial.bar.h + 4,
      `header.top=${stickyTop} bar.h=${initial.bar && initial.bar.h}`
    )
    await page.screenshot({ path: path.join(ARTIFACTS, 'plugin-sticky.png') })
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(200)

    // 1.2 关键词应取自 URL 参数，不能被百度页面的 ie=utf-8 / tn=1 隐藏域污染（issue #95）
    //     主菜单默认「当前页」打开，所以这里等的是当前页跳转
    await hoverFirstCategory(page)
    await page.locator('.as-subMenu li a').filter({ hasText: '谷歌' }).first().click()
    await page.waitForURL(/google\.com\/search/, { timeout: 15000 }).catch(() => {})
    await page.waitForTimeout(300)
    report.check(
      '跳到谷歌时关键词正确',
      page.url().includes('q=all-search-e2e'),
      page.url().slice(0, 90)
    )
    await page.goto(FIXTURE_URL, { waitUntil: 'domcontentloaded' })
    await waitForMenu(page)
    await page.waitForTimeout(400)

    // 2. 四种布局下的浮层方向
    for (const mode of ['top', 'bottom', 'left', 'right']) {
      if (mode !== 'top') await switchMode(page, MODE_META[mode].label)
      await hoverFirstCategory(page)
      const m = await measure(page)
      const p = m.popper
      report.check(
        `${MODE_META[mode].label} · 浮层弹出`,
        !!p && p.hitInside && p.inViewport,
        p ? `rect=${p.w}x${p.h}@${p.x},${p.y} hit=${p.hitInside}` : 'no popper'
      )
      report.check(
        `${MODE_META[mode].label} · 方向 ${MODE_META[mode].placement}`,
        !!p && p.placement === MODE_META[mode].placement && directionOk(mode, m.bar, p),
        p ? `placement=${p.placement}` : '-'
      )
      await page.screenshot({ path: path.join(ARTIFACTS, `plugin-mode-${mode}.png`) })
      await page.mouse.move(640, 620)
      await page.waitForTimeout(250)
    }

    // 2.1 退出循环时是「居右」：不再有顶部偏移，被下移的 fixed 元素必须还原
    await page.waitForTimeout(800)
    const restoredTop = await page.evaluate(() => {
      const el = document.querySelector('header.site')
      return el ? Math.round(el.getBoundingClientRect().top) : -1
    })
    report.check('离开顶部布局后 fixed 头部恢复原位', restoredTop === 0, `header.top=${restoredTop}`)

    // 3. 设置入口打开扩展自带 options 页
    await page.locator('.as-setting-btn').filter({ hasText: '设置' }).click()
    await page.waitForTimeout(400)
    const [popup] = await Promise.all([
      ctx.waitForEvent('page', { timeout: 15000 }),
      page.locator('.as-side-bar .link').first().click()
    ])
    await popup.waitForLoadState('domcontentloaded').catch(() => {})
    await popup.waitForTimeout(2000)
    const optionsUrl = popup.url()
    const optionsInfo = await popup.evaluate(() => ({
      hash: location.hash,
      appLen: (document.querySelector('#app')?.innerHTML || '').length
    }))
    report.check('菜单设置打开扩展 options 页', optionsUrl.includes('options.html#/config/sites'), optionsUrl)
    report.check('options 页正常渲染', optionsInfo.appLen > 1000, `#app=${optionsInfo.appLen} hash=${optionsInfo.hash}`)
    await popup.screenshot({ path: path.join(ARTIFACTS, 'plugin-options.png') })

    // 4. 配置站的「交互」页（打开方式开关 + 说明文案）
    await popup.goto(optionsUrl.split('#')[0] + '#/config/interaction')
    await popup.waitForTimeout(1200)
    const interaction = await popup.evaluate(() => ({
      radios: document.querySelectorAll('.el-radio').length,
      tip: (document.querySelector('.as-open-mode-tip')?.textContent || '').replace(/\s+/g, ' ').trim()
    }))
    report.check(
      '配置站有「交互」页与说明',
      interaction.radios >= 4 && interaction.tip.includes('Ctrl') && interaction.tip.includes('另一种'),
      `radios=${interaction.radios}`
    )
    await popup.screenshot({ path: path.join(ARTIFACTS, 'plugin-options-interaction.png') })
  } finally {
    await ctx.close()
  }
}
