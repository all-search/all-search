import { describe, it, expect } from 'vitest'
import { validateSites } from '@src/util/validateSites'

const valid = [
  {
    nameZh: '搜索',
    name: 'search',
    data: { visible: true },
    list: [
      { nameZh: '百度', url: 'https://www.baidu.com/s?wd=%s', icon: '', data: { visible: true } },
      { nameZh: '谷歌', url: 'https://www.google.com/search?q=%s', data: { visible: true } }
    ]
  }
]

describe('validateSites 导入校验', () => {
  it('合法配置通过并返回统计', () => {
    const result = validateSites(valid)
    expect(result.ok).toBe(true)
    expect(result.categories).toBe(1)
    expect(result.sites).toBe(2)
  })

  it('顶层不是数组直接拒绝', () => {
    expect(validateSites({ list: [] }).ok).toBe(false)
    expect(validateSites('[]').ok).toBe(false)
    expect(validateSites(null).ok).toBe(false)
  })

  it('分类缺 name 或 list 时拒绝，并指出是第几个', () => {
    const noName = validateSites([{ nameZh: '搜索', list: [] }])
    expect(noName.ok).toBe(false)
    expect(noName.error).toContain('第 1 个分类缺少 name')

    const noList = validateSites([{ nameZh: '搜索', name: 'search' }])
    expect(noList.ok).toBe(false)
    expect(noList.error).toContain('缺少 list')
  })

  it('站点缺 url 时拒绝，并带上分类名', () => {
    const result = validateSites([
      { nameZh: '搜索', name: 'search', list: [{ nameZh: '百度' }] }
    ])
    expect(result.ok).toBe(false)
    expect(result.error).toContain('搜索')
    expect(result.error).toContain('缺少 url')
  })

  it('空分类数组是合法的（用户可能删光了）', () => {
    expect(validateSites([])).toMatchObject({ ok: true, categories: 0, sites: 0 })
  })
})
