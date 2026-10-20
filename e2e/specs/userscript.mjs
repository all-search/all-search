import fs from 'node:fs'
import path from 'node:path'
import {
  ARTIFACTS, USER_SCRIPT, VUE_GLOBAL, FIXTURE_URL,
  installFixture, launch, waitForMenu, measure, hoverFirstCategory
} from '../lib.mjs'

export const name = 'userscript'

/** 模拟油猴环境：@require 的 Vue 全局 + GM_* 打桩，然后注入构建产物 */
export async function run ({ headless, report }) {
  for (const f of [VUE_GLOBAL, USER_SCRIPT]) {
    if (!fs.existsSync(f)) throw new Error(`缺少构建产物：${f}（先运行 pnpm build:script）`)
  }
  const vueSource = fs.readFileSync(VUE_GLOBAL, 'utf8')
  const userScript = fs.readFileSync(USER_SCRIPT, 'utf8')

  // 不带扩展启动：验证脚本自身在普通页面里能跑
  const ctx = await launch({ tag: 'userscript', headless })
  const page = await ctx.newPage()
  const pageErrors = []
  page.on('pageerror', e => pageErrors.push(e.message))

  try {
    await installFixture(page)
    await page.goto(FIXTURE_URL, { waitUntil: 'load' })

    await page.addScriptTag({ content: vueSource })
    await page.evaluate(() => {
      const raw = () => {
        try { return JSON.parse(localStorage.getItem('__gm__') || '{}') } catch { return {} }
      }
      const flush = o => localStorage.setItem('__gm__', JSON.stringify(o))
      Object.assign(window, {
        GM_getValue: (k, d) => { const o = raw(); return k in o ? o[k] : d },
        GM_setValue: (k, v) => { const o = raw(); o[k] = v; flush(o) },
        GM_deleteValue: k => { const o = raw(); delete o[k]; flush(o) },
        GM_listValues: () => Object.keys(raw()),
        GM_addStyle: css => {
          const s = document.createElement('style')
          s.textContent = css
          ;(document.head || document.documentElement).appendChild(s)
          return s
        },
        GM_info: { script: { version: 'e2e' } },
        unsafeWindow: window
      })
    })
    await page.addScriptTag({ content: userScript })

    await waitForMenu(page)
    await page.waitForTimeout(800)

    const initial = await measure(page)
    report.check('脚本挂载（宿主 #all-search）', initial.host && initial.hostId === 'all-search', `id=${initial.hostId}`)
    report.check('菜单项渲染', initial.items > 0, `items=${initial.items}`)
    await page.screenshot({ path: path.join(ARTIFACTS, 'userscript-bar.png') })

    await hoverFirstCategory(page)
    const m = await measure(page)
    const p = m.popper
    report.check('浮层弹出且未被裁剪', !!p && p.hitInside && p.inViewport, p ? `rect=${p.w}x${p.h}` : 'no popper')
    report.check('浮层方向 bottom-start', !!p && p.placement === 'bottom-start', p ? `placement=${p.placement}` : '-')
    // 组件样式是否真的进了影子根：menu-item 高度应为 ~30px，而不是被 svg 撑开
    const styled = await page.evaluate(() => {
      const sr = document.querySelector('all-search-ui').shadowRoot
      const item = sr.querySelector('.as-menu-item')
      return item ? Math.round(item.getBoundingClientRect().height) : 0
    })
    report.check('影子根样式已注入', styled > 20 && styled < 60, `menu-item 高度=${styled}px`)
    await page.screenshot({ path: path.join(ARTIFACTS, 'userscript-popper.png') })

    report.check('无脚本异常', pageErrors.length === 0, pageErrors.slice(0, 2).join('; '))
  } finally {
    await ctx.close()
  }
}
