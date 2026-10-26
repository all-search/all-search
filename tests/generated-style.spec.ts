import { describe, it, expect } from 'vitest'
import { list } from '@src/config/loadList'
import { generatedStyle } from '@src/config/generatedStyle'

/**
 * `generatedStyle.ts` 是 `pnpm style:scan` 的产物，而扫描需要外网 + 真实浏览器，
 * CI 里不可复现。这个测试不检查「规则内容是否过期」，只守住一件事：
 *
 *   给站点配了 `probe`，就必须能在 generatedStyle 里找到匹配的规则 ——
 *   否则说明「加了 probe 却忘了重扫」。
 *
 * 扫描拿不到 / 扫了也没有可避让元素的站点登记在 KNOWN_MISSING 里，写清原因。
 * 新增 probe 时如果这里红了，先重扫；确实扫不到再登记，别直接加白。
 */

const KEYWORD = 'all-search'

/** probe 地址（`%s` 已替换）→ 为什么没有静态规则 */
const KNOWN_MISSING = new Map<string, string>([
  ['https://www.google.com/search?q=all-search', '验证码拦截，需人工补扫'],
  ['https://www.baidu.com/s?wd=all-search', '扫描时未发现需要避让的固定元素'],
  ['https://search.bilibili.com/all?keyword=all-search', '扫描时未发现需要避让的固定元素'],
  ['https://www.douban.com/search?q=all-search', '扫描时未发现需要避让的固定元素']
])

const probes = list
  .filter(site => typeof site.probe === 'string' && site.probe.length > 0)
  .map(site => ({
    probe: String(site.probe).replace('%s', KEYWORD),
    pattern: site.url.source,
    flags: site.url.flags
  }))

const rules = generatedStyle.map(rule => ({
  ...rule,
  regex: new RegExp(rule.pattern, rule.flags)
}))

const ruleFor = (probe: string) => rules.find(rule => rule.regex.test(probe))

describe('generatedStyle 与 loadList 的一致性', () => {
  it('loadList 里配了 probe 的站点都能在 generatedStyle 找到规则', () => {
    const missing = probes
      .filter(item => !ruleFor(item.probe) && !KNOWN_MISSING.has(item.probe))
      .map(item => `${item.probe}  (pattern: ${item.pattern})`)

    expect(
      missing,
      `这些站点配了 probe 但没有静态规则，需要重跑 pnpm style:scan，或登记进 KNOWN_MISSING：\n${missing.join('\n')}`
    ).toEqual([])
  })

  it('KNOWN_MISSING 只登记确实还没有规则的站点', () => {
    const stale = [...KNOWN_MISSING.keys()].filter(probe => ruleFor(probe))
    expect(
      stale,
      `这些站点已经有静态规则了，请从 KNOWN_MISSING 里删掉：\n${stale.join('\n')}`
    ).toEqual([])
  })

  it('每条规则都能匹配它自己记录的 probe 地址', () => {
    const broken = rules
      .filter(rule => !rule.regex.test(String(rule.probe || '')))
      .map(rule => `${rule.pattern}  ←  ${rule.probe}`)

    expect(
      broken,
      `这些规则的 pattern 匹配不到自己的 probe（改正则或 probe 时漏了一边）：\n${broken.join('\n')}`
    ).toEqual([])
  })

  it('每条规则都带了可复验的 probe 地址与样式', () => {
    const bad = rules
      .filter(rule => !rule.probe || !rule.top || !rule.top.trim())
      .map(rule => rule.pattern)
    expect(bad, `规则缺少 probe 或 top：\n${bad.join('\n')}`).toEqual([])
  })
})
