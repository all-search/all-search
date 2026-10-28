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
  // 读剪贴板是为了校验 JSON 编辑器里的「当前内容」，ace 只渲染可见行，读 DOM 读不全
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    permissions: ['clipboard-read', 'clipboard-write']
  })
  const page = await context.newPage()
  const problems = []
  const watchPage = (target, tag = '') => {
    target.on('pageerror', e => problems.push(`${tag}pageerror: ${String(e).slice(0, 120)}`))
    target.on('console', (m) => {
      if (m.type() !== 'error') return
      const text = m.text()
      const from = m.location()?.url || ''
      // 「检测可达性」会故意 abort 一个站点来模拟下线，这条是预期内的
      if (/net::ERR_FAILED/.test(text) && /chatgpt\.com/.test(from)) return
      problems.push(`${tag}console: ${text.slice(0, 120)}`)
    })
    target.on('response', (r) => {
      if (r.status() >= 400) problems.push(`${tag}${r.status()} ${r.url().slice(0, 90)}`)
    })
  }
  watchPage(page)

  // 配置页默认不该请求任何第三方图标服务
  const externalIconRequests = []
  page.on('request', (r) => {
    const url = r.url()
    if (url.includes('favicon.yandex.net') || url.includes('faviconkit')) {
      externalIconRequests.push(url.slice(0, 80))
    }
  })

  const go = async (route) => {
    await page.goto(`${site.origin}/all-search${route}`, { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForTimeout(600)
    if (route === '/config/sites') await waitHydrated()
  }
  /** 存储是异步读回来的，页面上有 data-hydrated 标记；等它再开始操作，避免和首屏默认值抢 */
  const waitHydrated = () => page
    .waitForSelector('.sites-page[data-hydrated="1"]', { timeout: 20000 })
    .catch(() => {})
  const shot = file => page.screenshot({ path: path.join(ARTIFACTS, file) })
  /**
   * 横向溢出要量真正会滚的那个容器。
   * body 是 position:fixed + overflow:hidden，documentElement.scrollWidth 永远是视口宽，
   * 拿它判断等于永远通过。
   */
  const measureOverflow = target => target.evaluate(() => {
    const wrap = document.querySelector('.el-scrollbar__wrap')
    const inner = document.querySelector('.page-inner')
    const right = inner ? Math.round(inner.getBoundingClientRect().right) : 0
    return {
      wrapOverflow: !!wrap && wrap.scrollWidth > wrap.clientWidth + 2,
      rightOverflow: right > window.innerWidth + 2,
      wrapWidth: wrap ? Math.round(wrap.scrollWidth) : 0,
      clientWidth: wrap ? Math.round(wrap.clientWidth) : 0
    }
  })

  try {
    /* ---------- 顶栏 ---------- */
    await go('/config/sites')
    await page.waitForSelector('.site-nav')

    const shell = await page.evaluate(() => {
      const bar = document.querySelector('.top-bar')
      const inner = document.querySelector('.top-bar-inner')
      const content = document.querySelector('.page-inner')
      const rect = el => (el ? el.getBoundingClientRect() : null)
      return {
        tabs: [...document.querySelectorAll('.nav-tab')].map(t => t.textContent.trim()),
        active: document.querySelector('.nav-tab.is-active')?.textContent?.trim(),
        barHeight: Math.round(rect(bar)?.height || 0),
        barWidth: Math.round(rect(bar)?.width || 0),
        innerLeft: Math.round(rect(inner)?.left || 0),
        innerRight: Math.round(rect(inner)?.right || 0),
        contentLeft: Math.round(rect(content)?.left || 0),
        contentRight: Math.round(rect(content)?.right || 0),
        contentWidth: Math.round(rect(content)?.width || 0),
        viewportWidth: window.innerWidth
      }
    })
    const shellOverflow = await measureOverflow(page)
    report.check('顶栏四个标签', shell.tabs.length === 4, shell.tabs.join(' / '))
    report.check('当前页标签高亮', (shell.active || '').includes('站点'), shell.active)
    report.check('顶栏高度固定 56', shell.barHeight === 56, `${shell.barHeight}px`)
    report.check(
      '内容区限宽且不溢出',
      shell.contentWidth <= 1200 && !shellOverflow.wrapOverflow && !shellOverflow.rightOverflow,
      `${shell.contentWidth}px wrap=${shellOverflow.wrapWidth}/${shellOverflow.clientWidth}`
    )
    // 顶栏底色拉满整宽，但里面的品牌 / 标签 / 按钮要和正文同一个 1200 栏
    report.check(
      '顶栏内容与正文左右对齐',
      shell.barWidth === shell.viewportWidth &&
        Math.abs(shell.innerLeft - shell.contentLeft) <= 1 &&
        Math.abs(shell.innerRight - shell.contentRight) <= 1,
      `bar=${shell.innerLeft}..${shell.innerRight} content=${shell.contentLeft}..${shell.contentRight}`
    )

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
      nav.items.length === 14 && nav.firstLabel === 'AI' && nav.firstCount === String(nav.rows),
      `${nav.items.length} 项：${nav.firstLabel}=${nav.firstCount}，面板 ${nav.rows} 行`
    )
    report.check('只渲染当前分类的站点', nav.rows > 0 && nav.rows < 15, `${nav.rows} 行`)
    report.check('初始为已保存态', nav.saveStatus === '所有修改已保存', nav.saveStatus)

    /* ---------- 可达性检测（issue #35） ---------- */
    // 把 AI 分类里的站点全放行、只让 ChatGPT 失败，模拟「一个引擎下线」
    await page.route('**/*', route => {
      const url = route.request().url()
      if (url.includes('chatgpt.com')) return route.abort()
      if (/^https?:\/\/(?!127\.0\.0\.1|localhost)/.test(url)) {
        return route.fulfill({ status: 204, body: '' })
      }
      return route.continue()
    })
    await page.locator('.panel-toolbar .el-button').filter({ hasText: '检测可达性' }).click()
    await page.waitForTimeout(2500)
    const probe = await page.evaluate(() => ({
      dead: [...document.querySelectorAll('.engine-row')].filter(row => row.querySelector('.engine-badge--dead')).length,
      deadName: [...document.querySelectorAll('.engine-row')].find(row => row.querySelector('.engine-badge--dead'))?.querySelector('.engine-name')?.textContent?.trim() || '',
      summary: document.querySelector('.check-result')?.textContent?.replace(/\s+/g, ' ').trim() || ''
    }))
    report.check(
      '检测可达性：标出没有响应的站点',
      probe.dead === 1 && probe.deadName === 'ChatGPT' && probe.summary.includes('1'),
      `dead=${probe.dead} name=${probe.deadName}`
    )

    await page.locator('.check-result .el-button').filter({ hasText: '一键隐藏' }).click()
    await page.waitForTimeout(600)
    const afterHide = await page.evaluate(() => ({
      hidden: [...document.querySelectorAll('.engine-row')].filter(row => row.querySelector('.engine-badge')?.textContent?.includes('已隐藏')).length,
      dirty: document.querySelector('.save-status')?.classList.contains('is-dirty'),
      summaryGone: !document.querySelector('.check-result')
    }))
    report.check(
      '一键隐藏不可达站点并进入未保存态',
      afterHide.hidden >= 1 && afterHide.dirty && afterHide.summaryGone,
      `hidden=${afterHide.hidden} dirty=${afterHide.dirty}`
    )
    await page.locator('.save-bar .el-button').filter({ hasText: '撤销' }).click()
    await page.waitForTimeout(400)
    await page.unroute('**/*')

    // 可点区域：分类按钮至少 40px 高、4px 间距（鼠标/触控都够得着）
    const navMetrics = await page.evaluate(() => {
      const items = [...document.querySelectorAll('.site-nav .nav-item')]
      const a = items[0].getBoundingClientRect()
      const b = items[1].getBoundingClientRect()
      return {
        w: Math.round(a.width),
        h: Math.round(a.height),
        gap: Math.round(b.top - a.bottom),
        font: parseFloat(getComputedStyle(items[0]).fontSize)
      }
    })
    report.check(
      '分类按钮可点区域够大',
      navMetrics.h >= 40 && navMetrics.w >= 160 && navMetrics.gap >= 4 && navMetrics.font >= 14,
      `${navMetrics.w}×${navMetrics.h} gap=${navMetrics.gap} font=${navMetrics.font}`
    )

    // 一级分类拖拽换位（拖动导航第 3 项到最前）
    const navLabels = () => page.evaluate(
      () => [...document.querySelectorAll('.nav-item .nav-label')].map(el => el.textContent.trim())
    )
    const before = await navLabels()
    const from = await page.locator('.nav-item').nth(2).boundingBox()
    const to = await page.locator('.nav-item').nth(0).boundingBox()
    await page.mouse.move(from.x + from.width / 2, from.y + from.height / 2)
    await page.mouse.down()
    await page.mouse.move(to.x + to.width / 2, to.y + to.height / 2, { steps: 20 })
    await page.waitForTimeout(200)
    await page.mouse.up()
    await page.waitForFunction(
      expected => [...document.querySelectorAll('.nav-item .nav-label')][0]?.textContent.trim() === expected,
      before[2],
      { timeout: 5000 }
    ).catch(() => {})
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
    await page.waitForFunction(
      () => !document.querySelector('.save-status')?.classList.contains('is-dirty'),
      null,
      { timeout: 5000 }
    ).catch(() => {})
    const restored = await navLabels()
    report.check('撤销还原分类顺序', restored[0] === before[0], `${before[0]} / ${restored[0]}`)

    // 桌面（鼠标）不延迟、触屏长按才拖：改动这类手势参数时别把桌面拖拽一起拖慢
    const dragOptions = await page.evaluate(() => {
      const read = (selector) => {
        const el = document.querySelector(selector)
        // vue-draggable-next 2.3 把实例挂在 setup 返回的 sortableInstance（ref）上，
        // 2.2 及以前是 _sortable，两种都认一下
        const component = el?.__draggable_component__
        const sortable = component?.sortableInstance?.value ?? component?.sortableInstance ?? component?._sortable
        return sortable
          ? {
              delay: sortable.options.delay,
              touchOnly: sortable.options.delayOnTouchOnly,
              threshold: sortable.options.touchStartThreshold,
              fallback: sortable.options.forceFallback
            }
          : null
      }
      return { nav: read('.nav-list'), rows: read('.engine-list') }
    })
    report.check(
      '分类/站点拖拽在触屏上长按才触发',
      !!dragOptions.nav && dragOptions.nav.delay >= 200 && dragOptions.nav.touchOnly === true &&
        !!dragOptions.rows && dragOptions.rows.delay >= 200 && dragOptions.rows.touchOnly === true,
      `nav=${JSON.stringify(dragOptions.nav)}`
    )

    // 点击仍然切换分类
    await page.locator('.site-nav .nav-item').filter({ hasText: '翻译' }).first().click()
    await page.waitForTimeout(300)
    const clickedTitle = await page.evaluate(() => document.querySelector('.panel-title')?.textContent?.trim())
    report.check('点击分类切换面板', clickedTitle === '翻译', clickedTitle)

    // 手抖 1px 也应该算点击（fallback-tolerance 不足时会被吞掉）
    await page.locator('.site-nav .nav-item').filter({ hasText: 'AI' }).first().click()
    await page.waitForTimeout(300)
    const aiChip = await page.locator('.site-nav .nav-item').filter({ hasText: '视频' }).first().boundingBox()
    await page.mouse.move(aiChip.x + aiChip.width / 2, aiChip.y + aiChip.height / 2)
    await page.mouse.down()
    await page.mouse.move(aiChip.x + aiChip.width / 2 + 1, aiChip.y + aiChip.height / 2)
    await page.mouse.up()
    await page.waitForTimeout(300)
    const movedTitle = await page.evaluate(() => document.querySelector('.panel-title')?.textContent?.trim())
    report.check('指针移动 1px 仍算点击', movedTitle === '视频', movedTitle)
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
    const rowCount = await page.evaluate(() => document.querySelectorAll('.engine-row').length)
    await page.locator('.engine-main').first().click()
    await page.waitForTimeout(300)
    const editing = await page.evaluate(() => ({
      editor: document.querySelectorAll('.engine-editor').length,
      inputs: document.querySelectorAll('.engine-editor input').length
    }))
    report.check('点行进入编辑态', editing.editor === 1 && editing.inputs === 2, `inputs=${editing.inputs}`)

    // 只打字不点「完成」也算未保存（草稿在子组件里，父组件要靠事件知道）
    await page.locator('.engine-editor .editor-name input').first().fill('百度测试')
    await page.waitForTimeout(400)
    const draftDirty = await page.evaluate(() => ({
      dirty: document.querySelector('.save-status')?.classList.contains('is-dirty'),
      saveDisabled: document.querySelector('.save-bar .el-button--primary')?.disabled
    }))
    report.check('只编辑未提交也算未保存', draftDirty.dirty && draftDirty.saveDisabled === false)

    // 取消：退出编辑态、数据不变、脏状态清掉
    await page.locator('.engine-editor button').filter({ hasText: '取消' }).click()
    await page.waitForTimeout(400)
    const cancelled = await page.evaluate(() => ({
      editors: document.querySelectorAll('.engine-editor').length,
      name: document.querySelector('.engine-name')?.textContent?.trim(),
      saveDisabled: document.querySelector('.save-bar .el-button--primary')?.disabled
    }))
    report.check(
      '取消编辑后回到已保存态',
      cancelled.editors === 0 && cancelled.name === originalName && cancelled.saveDisabled === true,
      `${cancelled.name} / 保存禁用=${cancelled.saveDisabled}`
    )

    // 新增一行再取消：应该直接丢弃，不留半成品
    await page.locator('.panel-toolbar .el-button').filter({ hasText: '添加站点' }).click()
    await page.waitForTimeout(300)
    await page.locator('.engine-editor .editor-name input').first().fill('临时站点')
    await page.locator('.engine-editor button').filter({ hasText: '取消' }).click()
    await page.waitForTimeout(400)
    const afterNewCancel = await page.evaluate(() => ({
      rows: document.querySelectorAll('.engine-row').length,
      names: [...document.querySelectorAll('.engine-name')].map(el => el.textContent.trim())
    }))
    report.check(
      '取消新增站点不入库',
      afterNewCancel.rows === rowCount && !afterNewCancel.names.includes('临时站点'),
      `${afterNewCancel.rows} 行`
    )

    // 搜索状态下新增站点：应该先清掉筛选，否则新行看不见
    await page.fill('.toolbar-search input', '百度')
    await page.waitForTimeout(300)
    await page.locator('.panel-toolbar .el-button').filter({ hasText: '添加站点' }).click()
    await page.waitForTimeout(400)
    const addWhileFiltered = await page.evaluate(() => ({
      search: document.querySelector('.toolbar-search input')?.value,
      rows: document.querySelectorAll('.engine-row').length,
      editors: document.querySelectorAll('.engine-editor').length
    }))
    report.check(
      '搜索状态下新增站点会清掉筛选',
      addWhileFiltered.search === '' && addWhileFiltered.editors === 1 &&
        addWhileFiltered.rows === rowCount + 1,
      `search="${addWhileFiltered.search}" rows=${addWhileFiltered.rows}`
    )
    await page.locator('.engine-editor button').filter({ hasText: '取消' }).click()
    await page.waitForTimeout(300)

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
    // 保存是异步的（要等存储适配器就绪），等状态真的变成已保存
    await page.waitForFunction(
      () => !document.querySelector('.save-status')?.classList.contains('is-dirty'),
      null,
      { timeout: 15000 }
    ).catch(() => {})
    const saved = await page.evaluate(() => ({
      name: document.querySelector('.engine-name')?.textContent?.trim(),
      status: document.querySelector('.save-status')?.textContent?.trim(),
      disabled: document.querySelector('.save-bar .el-button--primary')?.disabled
    }))
    report.check(
      '保存后写入列表并回到已保存态',
      saved.name === '百度测试' && saved.status === '所有修改已保存' && saved.disabled === true,
      `${saved.name} / ${saved.status}`
    )

    // 保存要同步到共享数据：同一次会话里切到「编辑」页，编辑器里的内容得是新名字。
    // 只 reload 是测不出来的（reload 会重新读存储）。
    await page.locator('.nav-tab').filter({ hasText: '编辑' }).click()
    await page.waitForSelector('.editor-body .jsoneditor', { timeout: 15000 })
    await page.waitForTimeout(800)
    await page.locator('.editor-toolbar .el-button').filter({ hasText: '复制配置' }).click()
    await page.waitForTimeout(400)
    const editorConfig = await page.evaluate(() => navigator.clipboard.readText().catch(() => ''))
    report.check(
      '保存后同会话切到编辑页看到新数据',
      editorConfig.includes('百度测试'),
      `${editorConfig.length} 字符`
    )

    // 再切回站点（此时是 SPA 路由）
    await page.locator('.nav-tab').filter({ hasText: '站点' }).click()
    await page.waitForSelector('.site-nav')
    await page.waitForTimeout(500)

    // 真持久化：整页重载 + 等存储读回来（线下页面有 5s 的桥接超时）
    await page.reload({ waitUntil: 'networkidle' })
    await waitHydrated()
    await page.waitForSelector('.site-nav')
    await page.locator('.site-nav .nav-item').filter({ hasText: '搜索' }).first().click()
    const persisted = await page.waitForFunction(
      () => {
        const name = document.querySelector('.engine-name')?.textContent?.trim()
        const status = document.querySelector('.save-status')?.textContent?.trim()
        return name === '百度测试' && status === '所有修改已保存'
      },
      null,
      { timeout: 15000 }
    ).then(() => true).catch(() => false)
    const persistedName = await page.evaluate(() => document.querySelector('.engine-name')?.textContent?.trim())
    report.check('刷新后数据仍在（真的落盘）', persisted, persistedName)

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
    await page.waitForSelector('.el-message-box', { state: 'detached', timeout: 5000 }).catch(() => {})
    await page.waitForFunction(
      () => ![...document.querySelectorAll('.engine-name')].some(el => el.textContent.trim() === '百度测试'),
      null,
      { timeout: 15000 }
    ).catch(() => {})
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

    /* ---------- 图标 ---------- */
    // 1) 设置页默认零外链：没有图标就显示首字母色块
    const iconState = await page.evaluate(() => ({
      letters: document.querySelectorAll('.engine-icon--letter').length,
      images: document.querySelectorAll('img.engine-icon').length,
      letterBg: getComputedStyle(document.querySelector('.engine-icon--letter')).backgroundColor
    }))
    report.check(
      '默认用首字母色块、不请求第三方图标',
      externalIconRequests.length === 0 &&
        iconState.letters === 8 && iconState.images === 0 &&
        iconState.letterBg !== 'rgba(0, 0, 0, 0)',
      `letters=${iconState.letters} imgs=${iconState.images} 外链=${externalIconRequests.length}`
    )

    // 2) 显式「抓取图标」：stub 掉 yandex，验证抓到的图标进缓存且能显示
    const iconPng = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      'base64'
    )
    await page.route('**/favicon.yandex.net/**', route => route.fulfill({
      status: 200,
      contentType: 'image/png',
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: iconPng
    }))
    await page.locator('.engine-row').first().locator('.engine-more').click()
    await page.locator('.el-dropdown-menu__item:visible').filter({ hasText: '抓取图标' }).click()
    await page.waitForTimeout(1500)
    const fetched = await page.evaluate(() => {
      const src = document.querySelector('.engine-row img.engine-icon')?.getAttribute('src') || ''
      return {
        shown: src.startsWith('data:image/png'),
        dirty: document.querySelector('.save-status')?.classList.contains('is-dirty')
      }
    })
    report.check(
      '抓取图标后立即显示并标记未保存',
      fetched.shown && fetched.dirty === true,
      `显示=${fetched.shown} 脏=${fetched.dirty}`
    )
    await page.locator('.save-bar .el-button').filter({ hasText: '保存' }).click()
    await page.waitForFunction(
      () => !document.querySelector('.save-status')?.classList.contains('is-dirty'),
      null,
      { timeout: 15000 }
    ).catch(() => {})
    const cachedIcon = await page.evaluate(() => {
      const cache = JSON.parse(localStorage.getItem('__allSearch__iconCache') || '{}')
      return {
        keys: Object.keys(cache).length,
        isDataUrl: Object.values(cache).some(v => String(v).startsWith('data:image/png'))
      }
    })
    report.check('抓到的图标写进缓存', cachedIcon.isDataUrl, `缓存 ${cachedIcon.keys} 项`)

    // 3) 图标弹窗：上传 → 预览 → 确定，写到该域名上
    //    用和上一步不同的小图，否则压完的 data URL 一模一样，脏状态看不出来
    const uploadPng = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAFUlEQVR4nGNkSPv/nwEJMCFziBMAAJwfAmzIXF53AAAAAElFTkSuQmCC',
      'base64'
    )
    await page.locator('.engine-row').first().locator('.engine-more').click()
    await page.locator('.el-dropdown-menu__item:visible').filter({ hasText: '更换图标' }).click()
    const dialogOpened = await page.locator('.el-dialog').first().isVisible()
    await page.locator('.el-dialog input[type="file"]').setInputFiles({
      name: 'icon.png',
      mimeType: 'image/png',
      buffer: uploadPng
    })
    const previewReady = await page.waitForFunction(
      () => !!document.querySelector('.icon-upload-preview img'),
      null,
      { timeout: 5000 }
    ).then(() => true).catch(() => false)
    const previewSize = await page.evaluate(() => {
      const img = document.querySelector('.icon-upload-preview img')
      return img ? `${img.naturalWidth}×${img.naturalHeight}` : ''
    })
    await page.locator('.el-dialog__footer .el-button--primary').click()
    await page.waitForTimeout(400)
    const uploaded = await page.evaluate(() => {
      const src = document.querySelector('.engine-row img.engine-icon')?.getAttribute('src') || ''
      return {
        closed: !document.querySelector('.el-dialog'),
        shown: src.startsWith('data:image/png'),
        dirty: document.querySelector('.save-status')?.classList.contains('is-dirty')
      }
    })
    report.check(
      '上传图标后压缩并立即生效',
      dialogOpened && previewReady && previewSize === '32×32' && uploaded.shown && uploaded.dirty === true,
      `弹窗=${dialogOpened} 预览=${previewSize} 行内=${uploaded.shown} 脏=${uploaded.dirty}`
    )

    // 批量抓取：分类菜单里一次补齐本分类缺的图标
    await page.locator('.panel-head .el-dropdown .el-button').click()
    await page.locator('.el-dropdown-menu__item:visible').filter({ hasText: '抓取本分类图标' }).click()
    const allIcons = await page.waitForFunction(
      () => document.querySelectorAll('.engine-row img.engine-icon').length >= 8,
      null,
      { timeout: 20000 }
    ).then(() => true).catch(() => false)
    const iconCount = await page.evaluate(() => document.querySelectorAll('.engine-row img.engine-icon').length)
    report.check('一键抓取本分类图标', allIcons, `${iconCount}/8 行有图标`)
    await page.unroute('**/favicon.yandex.net/**')

    // 3) 刷新后自定义图标仍在（缓存持久化）
    await page.reload({ waitUntil: 'networkidle' })
    await waitHydrated()
    await page.waitForSelector('.site-nav')
    await page.locator('.site-nav .nav-item').filter({ hasText: '搜索' }).first().click()
    const iconPersisted = await page.waitForFunction(
      () => {
        const img = document.querySelector('.engine-row img.engine-icon')
        return !!img && (img.getAttribute('src') || '').startsWith('data:image/png')
      },
      null,
      { timeout: 15000 }
    ).then(() => true).catch(() => false)
    report.check('刷新后自定义图标仍在', iconPersisted)

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
    const originalToolbarName = await firstName.inputValue()
    await firstName.fill('百度改名')
    await page.waitForTimeout(300)
    const toolbarDirty = await page.evaluate(() => document.querySelector('.save-status')?.classList.contains('is-dirty'))
    report.check('编辑工具栏项后进入未保存态', toolbarDirty)
    await page.locator('.save-bar .el-button').filter({ hasText: '撤销' }).click()
    await page.waitForTimeout(400)
    const toolbarReverted = await page.locator('.item-row .item-name input').first().inputValue()
    report.check('撤销还原工具栏项', toolbarReverted === originalToolbarName, `${originalToolbarName} / ${toolbarReverted}`)

    await page.locator('.item-row .item-action').first().click()
    await page.waitForTimeout(300)
    const hiddenRows = await page.evaluate(() => document.querySelectorAll('.item-row.is-hidden').length)
    report.check('工具栏可切换显示/隐藏', hiddenRows === 1, `${hiddenRows} 行隐藏`)
    await page.locator('.save-bar .el-button').filter({ hasText: '撤销' }).click()
    await page.waitForTimeout(300)

    // 「从菜单选择」：勾选站点配置里的引擎，直接加进工具栏（issue #67）
    await page.locator('.head-actions .el-button').filter({ hasText: '从菜单选择' }).click()
    await page.waitForSelector('.picker-dialog .picker-nav-item', { timeout: 10000 })
    const picker = await page.evaluate(() => ({
      cats: document.querySelectorAll('.picker-dialog .picker-nav-item').length,
      items: document.querySelectorAll('.picker-dialog .picker-body .el-checkbox').length,
      addDisabled: !!document.querySelector('.picker-dialog .el-button--primary')?.disabled
    }))
    report.check('从菜单选择：分类与站点都列出来了', picker.cats > 3 && picker.items > 3, `分类 ${picker.cats} / 本站站点 ${picker.items}`)
    report.check('未勾选时「添加所选」不可点', picker.addDisabled === true)

    await page.locator('.picker-dialog .picker-body .el-checkbox:not(.is-disabled)').first().click()
    await page.waitForTimeout(200)
    await page.locator('.picker-dialog .el-button--primary').click()
    await page.waitForTimeout(400)
    const afterPicker = await page.evaluate(() => {
      const dialog = document.querySelector('.picker-dialog')
      const overlay = dialog ? dialog.closest('.el-overlay') : null
      return {
        rows: document.querySelectorAll('.item-row').length,
        dirty: document.querySelector('.save-status')?.classList.contains('is-dirty'),
        // Element Plus 的弹窗关闭后仍在 DOM 里，看遮罩层是否 display:none
        dialogHidden: !dialog || !overlay || getComputedStyle(overlay).display === 'none'
      }
    })
    report.check('从菜单选择后可加入工具栏并进入未保存态', afterPicker.rows === toolbar.rows + 1 && afterPicker.dirty, `行 ${toolbar.rows} → ${afterPicker.rows}`)
    report.check('加入后弹窗自动关闭', afterPicker.dialogHidden === true)
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
    // 两组「打开方式」+ 一组「分类图标」= 6 个单选
    report.check('交互页三组单选', interaction.radios === 6, `${interaction.radios} 个`)
    report.check(
      '说明文案包含 Ctrl 且不重复',
      !!interaction.tip && interaction.tip.length > 0 &&
        interaction.tip.includes('Ctrl') && !interaction.tip.includes('「主菜单」='),
      (interaction.tip || '(缺失)').slice(0, 40)
    )
    report.check('交互卡片限宽', interaction.cardWidth <= 760, `${interaction.cardWidth}px`)

    // 「点击分类一次性打开」开关（issue #87），默认关闭
    const switchBefore = await page.evaluate(() => ({
      exists: !!document.querySelector('.interaction-page .el-switch'),
      checked: document.querySelector('.interaction-page .el-switch')?.classList.contains('is-checked')
    }))
    report.check('交互页有「分类全开」开关且默认关闭', switchBefore.exists && switchBefore.checked === false, `checked=${switchBefore.checked}`)
    await page.locator('.interaction-page .el-switch').click()
    await page.waitForTimeout(300)
    const switchAfter = await page.evaluate(() => document.querySelector('.interaction-page .el-switch')?.classList.contains('is-checked'))
    report.check('点开关后变为开启', switchAfter === true)
    await page.locator('.interaction-page .el-switch').click()
    await page.waitForTimeout(300)
    const switchRestored = await page.evaluate(() => document.querySelector('.interaction-page .el-switch')?.classList.contains('is-checked'))
    report.check('再点一次回到关闭', switchRestored === false)

    await shot('config-interaction.png')

    /* ---------- JSON 编辑 ---------- */
    await go('/config/edit')
    await page.waitForSelector('.editor-body .jsoneditor', { timeout: 15000 })
    await page.waitForTimeout(600)
    const editPage = await page.evaluate(() => ({
      buttons: [...document.querySelectorAll('.editor-toolbar .el-button')].map(b => b.textContent.trim()),
      editorHeight: Math.round(document.querySelector('.editor-body .jsoneditor')?.getBoundingClientRect().height || 0)
    }))
    report.check('JSON 工具栏七个按钮', editPage.buttons.length === 7, editPage.buttons.join(' / '))
    report.check('编辑器撑满面板', editPage.editorHeight > 400, `${editPage.editorHeight}px`)
    await shot('config-edit.png')

    // 导出/导入：配置文件是用户唯一的资产，必须能带得走、换形态也不丢
    const importPayload = [
      {
        nameZh: '导入分类',
        name: 'imported',
        data: { visible: true },
        list: [
          { nameZh: '导入站点 A', url: 'https://example.com/a?q=%s', data: { visible: true } },
          { nameZh: '导入站点 B', url: 'https://example.com/b?q=%s', data: { visible: true } }
        ]
      }
    ]
    await page.locator('.editor-toolbar input[type="file"]').setInputFiles({
      name: 'sites.json',
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify(importPayload), 'utf8')
    })
    await page.waitForTimeout(700)
    const imported = await page.evaluate(() => ({
      hasImported: (document.querySelector('.jsoneditor')?.textContent || '').includes('导入站点 A'),
      toast: [...document.querySelectorAll('.el-message')].map(m => m.textContent.trim()).join(' | ')
    }))
    report.check('从文件导入后编辑器内容被替换', imported.hasImported, imported.toast || '无提示')

    // 非法 JSON：必须拒绝，且不改动编辑器里的内容
    await page.locator('.editor-toolbar input[type="file"]').setInputFiles({
      name: 'broken.json',
      mimeType: 'application/json',
      buffer: Buffer.from('{"not":"an array"}', 'utf8')
    })
    await page.waitForTimeout(600)
    const rejected = await page.evaluate(() => ({
      stillImported: (document.querySelector('.jsoneditor')?.textContent || '').includes('导入站点 A'),
      error: [...document.querySelectorAll('.el-message--error')].map(m => m.textContent.trim()).join(' | ')
    }))
    report.check(
      '非法配置被拒绝且不改动编辑器',
      rejected.stillImported && rejected.error.includes('格式不对'),
      rejected.error || '没有报错提示'
    )

    // 保存不能吞掉用户手写的扩展字段（invisible / style / selectors 等）
    const customPayload = [
      {
        nameZh: '自定义字段',
        name: 'custom',
        data: { visible: true },
        list: [
          {
            nameZh: '带扩展字段的站点',
            url: 'https://example.com/s?q=%s',
            data: { visible: true },
            invisible: true,
            style: { 1: '.x{top:1px}' },
            selectors: { input: '#kw' }
          }
        ]
      }
    ]
    await page.locator('.editor-toolbar input[type="file"]').setInputFiles({
      name: 'custom.json',
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify(customPayload), 'utf8')
    })
    await page.waitForTimeout(500)
    await page.locator('.editor-toolbar .el-button').filter({ hasText: '保存' }).click()
    await page.waitForTimeout(800)
    // 重新加载后再读一次，确认字段是真的落盘了，而不是只在内存里
    await go('/config/edit')
    await page.waitForSelector('.editor-body .jsoneditor', { timeout: 15000 })
    await page.waitForTimeout(800)
    const kept = await page.evaluate(() => {
      const text = document.querySelector('.jsoneditor')?.textContent || ''
      return {
        invisible: text.includes('invisible'),
        style: text.includes('top:1px'),
        selectors: text.includes('#kw')
      }
    })
    report.check(
      'JSON 保存保留手写的扩展字段',
      kept.invisible && kept.style && kept.selectors,
      `invisible=${kept.invisible} style=${kept.style} selectors=${kept.selectors}`
    )
    // 把自定义数据清掉，后面的深色/窄屏用例继续用内置默认
    await page.evaluate(async () => {
      localStorage.removeItem('__allSearch__sites')
    })
    await go('/config/sites')
    await page.waitForTimeout(500)

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
    const mobileOverflow = await measureOverflow(page)
    const mobile = await page.evaluate(() => ({
      navText: [...document.querySelectorAll('.nav-tab .nav-text')].map(el => getComputedStyle(el).display),
      navDirection: getComputedStyle(document.querySelector('.site-nav')).flexDirection
    }))
    report.check(
      '窄屏无横向滚动',
      !mobileOverflow.wrapOverflow && !mobileOverflow.rightOverflow,
      `wrap=${mobileOverflow.wrapWidth}/${mobileOverflow.clientWidth}`
    )
    report.check('窄屏隐藏导航文字', mobile.navText.every(d => d === 'none'), mobile.navText.join(','))
    report.check('窄屏分类导航横排', mobile.navDirection === 'row', mobile.navDirection)
    await shot('config-mobile.png')

    /* ---------- 站点行拖拽（走手柄，鼠标） ---------- */
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.waitForTimeout(400)
    await page.locator('.site-nav .nav-item').filter({ hasText: '搜索' }).first().click()
    await page.waitForTimeout(300)
    const rowNames = () => page.evaluate(
      () => [...document.querySelectorAll('.engine-name')].map(el => el.textContent.trim())
    )
    const rowsBefore = await rowNames()
    const rowHandle = await page.locator('.engine-row .engine-drag').first().boundingBox()
    const rowTarget = await page.locator('.engine-row').nth(2).boundingBox()
    await page.mouse.move(rowHandle.x + rowHandle.width / 2, rowHandle.y + rowHandle.height / 2)
    await page.mouse.down()
    await page.mouse.move(rowTarget.x + rowTarget.width / 2, rowTarget.y + rowTarget.height - 4, { steps: 20 })
    await page.waitForTimeout(200)
    await page.mouse.up()
    await page.waitForFunction(
      name => [...document.querySelectorAll('.engine-name')][0]?.textContent.trim() !== name,
      rowsBefore[0],
      { timeout: 5000 }
    ).catch(() => {})
    const rowsAfter = await rowNames()
    report.check('拖拽站点行换位', rowsAfter[0] !== rowsBefore[0], `${rowsBefore[0]} → ${rowsAfter[0]}`)
    await page.locator('.save-bar .el-button').filter({ hasText: '撤销' }).click()
    await page.waitForTimeout(400)

    /* ---------- 触屏：横滑排序不抢手势 ---------- */
    const touchCtx = await browser.newContext({ viewport: { width: 420, height: 800 }, hasTouch: true })
    const touchPage = await touchCtx.newPage()
    watchPage(touchPage, 'touch ')
    try {
      await touchPage.goto(`${site.origin}/all-search/config/sites`, { waitUntil: 'networkidle' })
      await touchPage.waitForSelector('.site-nav')
      // 新 context 没有「无油猴」标记，首屏要等 WebBridge 超时（最多 5 秒）才允许操作
      await touchPage.waitForSelector('[data-hydrated="1"]', { timeout: 15000 })
      await touchPage.waitForTimeout(600)

      const touchLabels = () => touchPage.evaluate(
        () => [...document.querySelectorAll('.nav-item .nav-label')].map(el => el.textContent.trim())
      )
      const cdp = await touchCtx.newCDPSession(touchPage)
      const touch = (type, points) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: points })

      // 先测长按拖拽（干净的页面状态），再测横滑；
      // 反过来的话横滑的惯性滚动会让后续坐标失效
      const dragLabels = await touchLabels()
      const dragSrc = await touchPage.locator('.nav-item').nth(2).boundingBox()
      const dragDst = await touchPage.locator('.nav-item').nth(0).boundingBox()
      const srcX = dragSrc.x + dragSrc.width / 2
      const srcY = dragSrc.y + dragSrc.height / 2
      await touch('touchStart', [{ x: srcX, y: srcY }])
      const armed = await touchPage.waitForFunction(
        () => !!document.querySelector('.sortable-chosen'),
        null,
        { timeout: 4000 }
      ).then(() => true).catch(() => false)
      let dragStarted = false
      if (armed) {
        await touch('touchMove', [{ x: srcX, y: srcY - 6 }])
        dragStarted = await touchPage.waitForFunction(
          () => !!document.querySelector('.sortable-fallback'),
          null,
          { timeout: 3000 }
        ).then(() => true).catch(() => false)
      }
      report.check('长按后进入拖拽态', armed && dragStarted, `armed=${armed} ghost=${dragStarted}`)
      if (dragStarted) {
        for (let i = 1; i <= 10; i++) {
          await touch('touchMove', [{
            x: srcX - ((srcX - dragDst.x - dragDst.width / 2) * i) / 10,
            y: srcY - ((srcY - dragDst.y - dragDst.height / 2) * i) / 10
          }])
          // 每步留一帧，Sortable 的 touchmove 处理是跟帧走的，连发会丢中间态
          await touchPage.waitForTimeout(20)
        }
        // 落点再轻推一下，确保最后一次移动被处理
        await touch('touchMove', [{ x: dragDst.x + 6, y: srcY }])
        await touchPage.waitForTimeout(120)
        await touch('touchEnd', [])
        await touchPage.waitForTimeout(600)
        const afterHold = await touchLabels()
        // 横向小 chip 上 Sortable 的落点会差一格，这里只断言「确实往前挪了」
        const movedTo = afterHold.indexOf(dragLabels[2])
        report.check(
          '触屏长按后可拖动换位',
          movedTo > -1 && movedTo < 2,
          `${dragLabels[2]}：第 3 位 → 第 ${movedTo + 1} 位`
        )
      } else {
        await touch('touchEnd', [])
      }

      // 横滑：只滚动分类栏，不换位、也不进入拖拽
      const beforeTouch = await touchLabels()
      const chip = await touchPage.locator('.nav-item').nth(2).boundingBox()
      const startX = chip.x + chip.width - 8
      const midY = chip.y + chip.height / 2
      const swipeStart = Date.now()
      await touch('touchStart', [{ x: startX, y: midY }])
      for (let i = 1; i <= 3; i++) {
        await touch('touchMove', [{ x: startX - i * 40, y: midY }])
      }
      const swipeElapsed = Date.now() - swipeStart
      await touch('touchEnd', [])
      await touchPage.waitForTimeout(600)
      const afterSwipe = await touchLabels()
      const scrollLeft = await touchPage.evaluate(() => document.querySelector('.site-nav').scrollLeft)
      report.check(
        '触屏横滑只滚动、不换位',
        swipeElapsed < 200 && scrollLeft > 40 && afterSwipe.join() === beforeTouch.join(),
        `耗时 ${swipeElapsed}ms scrollLeft=${Math.round(scrollLeft)} 顺序不变=${afterSwipe.join() === beforeTouch.join()}`
      )
    } finally {
      await touchCtx.close()
    }

    /* ---------- 脏数据 / 空数据 ---------- */
    // 旧数据或手写 JSON 可能缺 data；缺了不能让整块界面崩掉
    await page.evaluate(() => {
      localStorage.setItem('__allSearch__sites', JSON.stringify([
        {
          name: 'ai',
          nameZh: 'AI',
          data: { visible: true },
          list: [{ nameZh: '没有 data 的站点', url: 'https://example.test/?q=%s' }]
        }
      ]))
    })
    await page.reload({ waitUntil: 'networkidle' })
    await waitHydrated()
    // 线下页面要等 WebBridge 超时（5s）才读回存储，别用固定 sleep
    const legacyLoaded = await page.waitForFunction(
      () => document.querySelectorAll('.site-nav .nav-item').length === 1,
      null,
      { timeout: 15000 }
    ).then(() => true).catch(() => false)
    const legacy = await page.evaluate(() => ({
      nav: document.querySelectorAll('.site-nav .nav-item').length,
      rows: document.querySelectorAll('.engine-row').length,
      firstName: document.querySelector('.engine-name')?.textContent?.trim(),
      hasSaveBar: !!document.querySelector('.save-bar')
    }))
    report.check(
      '缺 data 的旧数据不崩',
      legacyLoaded && legacy.nav === 1 && legacy.rows === 1 && legacy.hasSaveBar,
      `nav=${legacy.nav} rows=${legacy.rows} bar=${legacy.hasSaveBar}`
    )

    // 空数组是合法的：用户可以把分类删光，不能又回落到内置默认
    await page.evaluate(() => localStorage.setItem('__allSearch__sites', '[]'))
    await page.reload({ waitUntil: 'networkidle' })
    await waitHydrated()
    const emptyLoaded = await page.waitForFunction(
      () => document.querySelectorAll('.site-nav .nav-item').length === 0 &&
        !!document.querySelector('.empty-state'),
      null,
      { timeout: 15000 }
    ).then(() => true).catch(() => false)
    const empty = await page.evaluate(() => ({
      nav: document.querySelectorAll('.site-nav .nav-item').length,
      emptyText: document.querySelector('.empty-state .empty-title')?.textContent?.trim() || ''
    }))
    report.check(
      '清空所有分类后保持为空',
      emptyLoaded && empty.nav === 0 && empty.emptyText.includes('还没有分类'),
      `nav=${empty.nav} "${empty.emptyText}"`
    )

    // 收尾：把种子数据清掉，别影响下次运行
    await page.evaluate(() => localStorage.removeItem('__allSearch__sites'))

    report.check('配置页无运行时错误', problems.length === 0, problems.slice(0, 3).join(' | '))
  } finally {
    await browser.close()
    await site.close()
  }
}
