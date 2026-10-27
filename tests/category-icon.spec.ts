import { describe, it, expect } from 'vitest'
import { pickCategoryIconSite, categoryIconUrl } from '@src/util/categoryIcon'

function item (url: any, visible = true): any {
  return { nameZh: String(url), url, data: { visible } }
}

describe('pickCategoryIconSite 分类图标取哪个站点', () => {
  it('取第一个启用的站点', () => {
    const list = [item('https://a.com/s?q=%s'), item('https://b.com')]
    expect(pickCategoryIconSite(list)?.url).toBe('https://a.com/s?q=%s')
  })

  it('跳过隐藏的站点', () => {
    const list = [item('https://hidden.com', false), item('https://shown.com')]
    expect(pickCategoryIconSite(list)?.url).toBe('https://shown.com')
  })

  it('data 缺失按启用处理（旧数据也能出图标）', () => {
    const list = [{ nameZh: '旧数据', url: 'https://old.com' }] as any
    expect(pickCategoryIconSite(list)?.url).toBe('https://old.com')
  })

  it('正则形式的 url 不参与', () => {
    const list = [item(/baidu/), item('https://a.com')]
    expect(pickCategoryIconSite(list)?.url).toBe('https://a.com')
  })

  it('没有可用站点时返回 null', () => {
    expect(pickCategoryIconSite([])).toBeNull()
    expect(pickCategoryIconSite(null)).toBeNull()
    expect(pickCategoryIconSite([item('https://a.com', false)])).toBeNull()
  })

  it('categoryIconUrl 直接给出地址串', () => {
    expect(categoryIconUrl({ name: 'search', list: [item('https://a.com/?q=%s')] } as any)).toBe('https://a.com/?q=%s')
    expect(categoryIconUrl({ name: 'empty', list: [] } as any)).toBe('')
    expect(categoryIconUrl(null)).toBe('')
  })
})
