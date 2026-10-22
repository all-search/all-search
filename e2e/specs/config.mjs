import fs from 'node:fs'
import path from 'node:path'
import { ARTIFACTS, OPTIONS_DIST, serveOptions, launchBrowser } from '../lib.mjs'

export const name = 'config'

/**
 * 配置页（packages/options/dist）交互回归：
 * 顶栏壳层、站点分类/搜索/编辑/脏状态/保存/撤销/恢复默认、划词工具栏、交互页、JSON 编辑、深色、窄屏。
 */
export async function run ({ headless, report }) {
  if (!fs.existsSync(path.join(OPTIONS_DIST, 'index.html'))) {
    report.check('配置页产物存在', false, '先跑 pnpm build:options')
    return
  }

  const site = await serveOptions()
  const browser = await launchBrowser({ headless })
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
  const problems = []
  page.on('pageerror', e => problems.push(String(e).slice(0, 120)))
  page.on('response', (r) => {
    if (r.status() >= 400) problems.push(`${r.status()} ${r.url().slice(0, 90)}`)
  })

  const go = async (route) => {
    await page.goto(`${site.origin}/all-search${route}`, { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForTimeout(600)
  }
  const shot = file => page.screenshot({ path: path.join(ARTIFACTS, file) })

  try {
    /* ---------- 顶栏 ---------- */
    await go('/config/sites')
    await page.waitForSelector('.site-nav')

    const shell = await page.evaluate(() => {
      const bar = document.querySelector('.top-bar')
      return {
        tabs: [...document.querySelectorAll('.nav-tab')].map(t => t.textContent.trim()),
        active: document.querySelector('.nav-tab.is-active')?.textContent?.trim(),
        barHeight: Math.round(bar?.getBoundingClientRect().height || 0),
        contentWidth: Math.round(document.querySelector('.page-inner')?.getBoundingClientRect().width || 0),
        overflowX: document.documentElement.scrollWidth > window.innerWidth + 2
      }
    })
    report.check('顶栏四个标签', shell.tabs.length === 4, shell.tabs.join(' / '))
    report.check('当前页标签高亮', (shell.active || '').includes('站点'), shell.active)
    report.check('顶栏高度固定 56', shell.barHeight === 56, `${shell.barHeight}px`)
    report.check('内容区限宽且不溢出', shell.contentWidth <= 1200 && !shell.overflowX, `${shell.contentWidth}px`)

    /* ---------- 站点页 ---------- */
    const nav = await page.evaluate(() => ({
      items: [...document.querySelectorAll('.site-nav .nav-item')].map(el => el.textContent.replace(/\s+/g, ' ').trim()),
      firstLabel: document.querySelector('.site-nav .nav-item .nav-label')?.textContent?.trim(),
      firstCount: document.querySelector('.site-nav .nav-item .nav-count')?.textContent?.trim(),
      rows: document.querySelectorAll('.engine-row').length,
      saveStatus: document.querySelector('.save-status')?.textContent?.trim()
    }))
    report.check(
      '分类导航带计数',
      nav.items.length === 14 && nav.firstLabel === 'AI' && /^\d+$/.test(nav.firstCount || ''),
      `${nav.items.length} 项：${nav.firstLabel}=${nav.firstCount}`
    )
    report.check('只渲染当前分类的站点', nav.rows > 0 && nav.rows < 15, `${nav.rows} 行`)
    report.check('初始为已保存态', nav.saveStatus === '所有修改已保存', nav.saveStatus)

    // 一级分类拖拽换位（拖动导航第 3 项到最前）
    const navLabels = () => page.evaluate(
      () => [...document.querySelectorAll('.nav-item .nav-label')].map(el => el.textContent.trim())
    )
    const before = await navLabels()
    const from = await page.locator('.nav-item').nth(2).boundingBox()
    const to = await page.locator('.nav-item').nth(0).boundingBox()
    await page.mouse.move(from.x + from.width / 2, from.y + from.height / 2)
    await page.mouse.down()
    await page.mouse.move(to.x + to.width / 2, to.y + 2, { steps: 20 })
    await page.waitForTimeout(200)
    await page.mouse.up()
    await page.waitForTimeout(500)
    const afterDrag = await navLabels()
    const draggedDirty = await page.evaluate(
      () => document.querySelector('.save-status')?.classList.contains('is-dirty')
    )
    report.check(
      '拖拽分类换位并标记未保存',
      afterDrag[0] === before[2] && draggedDirty === true,
      `${before[2]} → 第 1 位`
    )

    // 撤销回到原顺序
    await page.locator('.save-bar .el-button').filter({ hasText: '撤销' }).click()
    await page.waitForTimeout(500)
    const restored = await navLabels()
    report.check('撤销还原分类顺序', restored[0] === before[0], `${before[0]} / ${restored[0]}`)

    // 点击仍然切换分类
    await page.locator('.site-nav .nav-item').filter({ hasText: '翻译' }).first().click()
    await page.waitForTimeout(300)
    const clickedTitle = await page.evaluate(() => document.querySelector('.panel-title')?.textContent?.trim())
    report.check('点击分类切换面板', clickedTitle === '翻译', clickedTitle)
    await page.locator('.site-nav .nav-item').filter({ hasText: 'AI' }).first().click()
    await page.waitForTimeout(300)

    // 搜索
    await page.fill('.toolbar-search input', 'chatgpt')
    await page.waitForTimeout(300)
    const searched = await page.evaluate(() => ({
      rows: document.querySelectorAll('.engine-row').length,
      name: document.querySelector('.engine-name')?.textContent?.trim()
    }))
    report.check('搜索过滤站点', searched.rows === 1 && searched.name === 'ChatGPT', `${searched.rows} 行 / ${searched.name}`)
    await page.fill('.toolbar-search input', '')
    await page.waitForTimeout(300)

    // 切分类 + 编辑态
    await page.locator('.site-nav .nav-item').filter({ hasText: '搜索' }).first().click()
    await page.waitForTimeout(300)
    const originalName = await page.evaluate(() => document.querySelector('.engine-name')?.textContent?.trim())
    await page.locator('.engine-main').first().click()
    await page.waitForTimeout(300)
    const editing = await page.evaluate(() => ({
      editor: document.querySelectorAll('.engine-editor').length,
      inputs: document.querySelectorAll('.engine-editor input').length
    }))
    report.check('点行进入编辑态', editing.editor === 1 && editing.inputs === 2, `inputs=${editing.inputs}`)

    await page.locator('.engine-editor .editor-name input').first().fill('百度测试')
    await page.waitForTimeout(350)

    // 取消应还原：编辑中的草稿不算未保存改动，点「完成」才落进列表
    await page.locator('.engine-editor button').filter({ hasText: '取消' }).click()
    await page.waitForTimeout(400)
    const cancelled = await page.evaluate(() => ({
      editors: document.querySelectorAll('.engine-editor').length,
      name: document.querySelector('.engine-name')?.textContent?.trim(),
      saveDisabled: document.querySelector('.save-bar .el-button--primary')?.disabled
    }))
    report.check(
      '取消编辑还原名称并回到已保存态',
      cancelled.editors === 0 && cancelled.name === originalName && cancelled.saveDisabled === true,
      `${originalName} → ${cancelled.name}`
    )

    // 完成 + 进入未保存态 + 保存
    await page.locator('.engine-main').first().click()
    await page.waitForTimeout(250)
    await page.locator('.engine-editor .editor-name input').first().fill('百度测试')
    await page.locator('.engine-editor button').filter({ hasText: '完成' }).click()
    await page.waitForTimeout(400)
    const dirty = await page.evaluate(() => ({
      isDirty: document.querySelector('.save-status')?.classList.contains('is-dirty'),
      saveDisabled: document.querySelector('.save-bar .el-button--primary')?.disabled
    }))
    report.check('完成编辑后进入未保存态', dirty.isDirty && dirty.saveDisabled === false)

    await page.locator('.save-bar .el-button').filter({ hasText: '保存' }).click()
    await page.waitForTimeout(600)
    const saved = await page.evaluate(() => ({
      name: document.querySelector('.engine-name')?.textContent?.trim(),
      status: document.querySelector('.save-status')?.textContent?.trim(),
      disabled: document.querySelector('.save-bar .el-button--primary')?.disabled
    }))
    report.check('保存后写入列表并回到已保存态', saved.name === '百度测试' && saved.status === '所有修改已保存' && saved.disabled === true, saved.status)

    // 撤销
    await page.locator('.engine-main').first().click()
    await page.waitForTimeout(250)
    await page.locator('.engine-editor .editor-name input').first().fill('百度再改')
    await page.locator('.engine-editor button').filter({ hasText: '完成' }).click()
    await page.waitForTimeout(300)
    await page.locator('.save-bar .el-button').filter({ hasText: '撤销' }).click()
    await page.waitForTimeout(500)
    const reverted = await page.evaluate(() => document.querySelector('.engine-name')?.textContent?.trim())
    report.check('撤销回到已保存数据', reverted === '百度测试', reverted)

    // 恢复默认：不依赖「有修改」也能点（历史 bug：按钮被 dirty 禁掉）
    const resetEnabled = await page.evaluate(() => {
      const btn = [...document.querySelectorAll('.save-bar .el-button')].find(b => b.textContent.trim() === '恢复默认')
      return !!btn && btn.disabled === false
    })
    report.check('恢复默认按钮始终可用', resetEnabled)

    await page.locator('.save-bar .el-button').filter({ hasText: '恢复默认' }).click()
    await page.waitForTimeout(300)
    await page.locator('.el-message-box__btns .el-button--primary').click()
    await page.waitForTimeout(1200)
    const afterReset = await page.evaluate(() => ({
      status: document.querySelector('.save-status')?.textContent?.trim(),
      names: [...document.querySelectorAll('.engine-name')].map(el => el.textContent.trim())
    }))
    report.check(
      '恢复默认清掉自定义数据',
      afterReset.status === '所有修改已保存' && !afterReset.names.includes('百度测试'),
      `${afterReset.status} / ${afterReset.names.slice(0, 2).join('、')}`
    )
    await shot('config-sites.png')

    /* ---------- 划词工具栏 ---------- */
    await go('/config/toolbar')
    await page.waitForSelector('.toolbar-page')
    const toolbar = await page.evaluate(() => ({
      title: document.querySelector('.panel-title')?.textContent?.trim(),
      rows: document.querySelectorAll('.item-row').length,
      status: document.querySelector('.save-status')?.textContent?.trim(),
      saveDisabled: document.querySelector('.save-bar .el-button--primary')?.disabled
    }))
    report.check('工具栏页渲染', toolbar.rows >= 2 && toolbar.status === '所有修改已保存', `${toolbar.rows} 行 / ${toolbar.status}`)

    const firstName = page.locator('.item-row .item-name input').first()
    await firstName.fill('百度改名')
    await page.waitForTimeout(300)
    const toolbarDirty = await page.evaluate(() => document.querySelector('.save-status')?.classList.contains('is-dirty'))
    report.check('编辑工具栏项后进入未保存态', toolbarDirty)
    await page.locator('.save-bar .el-button').filter({ hasText: '撤销' }).click()
    await page.waitForTimeout(400)
    const toolbarReverted = await page.locator('.item-row .item-name input').first().inputValue()
    report.check('撤销还原工具栏项', toolbarReverted !== '百度改名', toolbarReverted)

    await page.locator('.item-row .item-action').first().click()
    await page.waitForTimeout(300)
    const hiddenRows = await page.evaluate(() => document.querySelectorAll('.item-row.is-hidden').length)
    report.check('工具栏可切换显示/隐藏', hiddenRows === 1, `${hiddenRows} 行隐藏`)
    await page.locator('.save-bar .el-button').filter({ hasText: '撤销' }).click()
    await page.waitForTimeout(300)
    await shot('config-toolbar.png')

    /* ---------- 交互页 ---------- */
    await go('/config/interaction')
    await page.waitForSelector('.interaction-page')
    const interaction = await page.evaluate(() => ({
      radios: document.querySelectorAll('.el-radio').length,
      tip: document.querySelector('.as-open-mode-tip')?.textContent?.trim(),
      cardWidth: Math.round(document.querySelector('.card')?.getBoundingClientRect().width || 0)
    }))
    report.check('交互页两组单选', interaction.radios === 4, `${interaction.radios} 个`)
    report.check('说明文案不重复', !(interaction.tip || '').includes('「主菜单」='), (interaction.tip || '').slice(0, 30))
    report.check('交互卡片限宽', interaction.cardWidth <= 760, `${interaction.cardWidth}px`)
    await shot('config-interaction.png')

    /* ---------- JSON 编辑 ---------- */
    await go('/config/edit')
    await page.waitForSelector('.editor-body .jsoneditor', { timeout: 15000 })
    await page.waitForTimeout(600)
    const editPage = await page.evaluate(() => ({
      buttons: [...document.querySelectorAll('.editor-toolbar .el-button')].map(b => b.textContent.trim()),
      editorHeight: Math.round(document.querySelector('.editor-body .jsoneditor')?.getBoundingClientRect().height || 0)
    }))
    report.check('JSON 工具栏五个按钮', editPage.buttons.length === 5, editPage.buttons.join(' / '))
    report.check('编辑器撑满面板', editPage.editorHeight > 400, `${editPage.editorHeight}px`)
    await shot('config-edit.png')

    /* ---------- 深色模式 ---------- */
    await go('/config/sites')
    await page.locator('.top-actions .icon-btn').first().click()
    await page.waitForTimeout(300)
    await page.locator('.el-dropdown-menu__item').filter({ hasText: '深色' }).click()
    await page.waitForTimeout(500)
    const dark = await page.evaluate(() => ({
      htmlDark: document.documentElement.classList.contains('dark'),
      cardBg: getComputedStyle(document.querySelector('.site-nav')).backgroundColor
    }))
    report.check('切到深色模式', dark.htmlDark && dark.cardBg !== 'rgb(255, 255, 255)', `card=${dark.cardBg}`)
    await shot('config-dark.png')
    await page.locator('.top-actions .icon-btn').first().click()
    await page.waitForTimeout(300)
    await page.locator('.el-dropdown-menu__item').filter({ hasText: '浅色' }).click()
    await page.waitForTimeout(400)

    /* ---------- 窄屏 ---------- */
    await page.setViewportSize({ width: 420, height: 900 })
    await page.waitForTimeout(500)
    const mobile = await page.evaluate(() => ({
      overflowX: document.documentElement.scrollWidth > window.innerWidth + 2,
      navText: [...document.querySelectorAll('.nav-tab .nav-text')].map(el => getComputedStyle(el).display),
      navDirection: getComputedStyle(document.querySelector('.site-nav')).flexDirection
    }))
    report.check('窄屏无横向滚动', !mobile.overflowX)
    report.check('窄屏隐藏导航文字', mobile.navText.every(d => d === 'none'), mobile.navText.join(','))
    report.check('窄屏分类导航横排', mobile.navDirection === 'row', mobile.navDirection)
    await shot('config-mobile.png')

    report.check('配置页无运行时错误', problems.length === 0, problems.slice(0, 2).join(' | '))
  } finally {
    await browser.close()
    await site.close()
  }
}
