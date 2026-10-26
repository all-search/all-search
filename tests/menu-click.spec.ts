import { describe, it, expect } from 'vitest'
import { pickCategoryTargets } from '@src/util/menuTargets'

function item (url: string | RegExp, visible = true): any {
  return { nameZh: String(url), url, data: { visible } }
}

describe('pickCategoryTargets', () => {
  it('按分类里的顺序返回可见项', () => {
    const list = [item('https://a.com/s?q=%s'), item('https://b.com/s?q=%s')]
    expect(pickCategoryTargets(list, 'example.org').map(i => i.url)).toEqual([
      'https://a.com/s?q=%s',
      'https://b.com/s?q=%s'
    ])
  })

  it('隐藏项不参与', () => {
    const list = [item('https://a.com'), item('https://b.com', false)]
    expect(pickCategoryTargets(list, 'example.org')).toHaveLength(1)
  })

  it('跳过指向当前站点自己的入口', () => {
    const list = [item('https://www.baidu.com/s?wd=%s'), item('https://www.google.com/search?q=%s')]
    expect(pickCategoryTargets(list, 'www.baidu.com').map(i => i.url)).toEqual([
      'https://www.google.com/search?q=%s'
    ])
  })

  it('hostname 为空时不过滤', () => {
    const list = [item('https://a.com'), item('https://b.com')]
    expect(pickCategoryTargets(list, '')).toHaveLength(2)
  })

  it('空分类 / 非数组返回空数组', () => {
    expect(pickCategoryTargets([])).toEqual([])
    expect(pickCategoryTargets(null)).toEqual([])
    expect(pickCategoryTargets(undefined)).toEqual([])
  })

  it('正则形式的 url（纯匹配规则）不参与：调用方拿它做 .replace 会抛错', () => {
    const list = [item(/baidu/), item('https://a.com/s?q=%s')]
    expect(pickCategoryTargets(list, 'example.org').map(i => i.url)).toEqual(['https://a.com/s?q=%s'])
  })

  it('data 缺失的旧数据不算可见，不会被选中', () => {
    const list = [{ nameZh: '旧数据', url: 'https://a.com' }] as any
    expect(pickCategoryTargets(list, 'example.org')).toEqual([])
  })
})
