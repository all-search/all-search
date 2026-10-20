import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { resolveKeyword, getKeywordFromQuery, getKeywordFromDom } from '@src/util/getKeyword'
import { extractKeywordParam } from '@src/config/siteInfo'

function setUrl (url: string): void {
  window.history.replaceState({}, '', url)
}

describe('extractKeywordParam', () => {
  it('从 URL 模板里反推关键词参数名', () => {
    expect(extractKeywordParam('https://www.baidu.com/s?wd=%s&ie=utf-8')).toBe('wd')
    expect(extractKeywordParam('https://www.google.com/search?q=%s&ie=utf-8')).toBe('q')
    expect(extractKeywordParam('https://so.toutiao.com/search?dvpf=pc&keyword=%s')).toBe('keyword')
  })

  it('路径型模板和非字符串返回 null', () => {
    expect(extractKeywordParam('https://x.com/search?q=%s&src=typed_query')).toBe('q')
    expect(extractKeywordParam('https://www.douyin.com/search/%s?type=general')).toBeNull()
    expect(extractKeywordParam(/baidu/)).toBeNull()
    expect(extractKeywordParam(null)).toBeNull()
  })
})

describe('keyword resolution', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    setUrl('/')
  })

  afterEach(() => {
    document.body.innerHTML = ''
    setUrl('/')
  })

  it('优先使用 URL 里的关键词参数，而不是隐藏域里的 utf-8 / 1（issue #95）', () => {
    setUrl('/s?ie=utf-8&tn=1&wd=%E5%85%A8%E6%90%9C')
    document.body.innerHTML = `
      <input type="hidden" name="ie" value="utf-8">
      <input type="hidden" name="tn" value="1">
      <input id="kw" type="text" name="wd" value="全搜">
    `
    expect(getKeywordFromQuery()).toBe('全搜')
    expect(resolveKeyword()).toBe('全搜')
  })

  it('站点配置的选择器优先级最高', () => {
    setUrl('/search?q=from-url')
    document.body.innerHTML = `
      <input id="upquery" value="from-selector">
      <input name="q" value="from-url">
    `
    expect(resolveKeyword({ selectors: '#upquery' })).toBe('from-selector')
  })

  it('站点配置的参数名优先于常见参数', () => {
    setUrl('/search?q=google&keyword=custom')
    expect(resolveKeyword({ query: 'keyword' })).toBe('custom')
  })

  it('没有 URL 参数时回退到可见输入框，忽略隐藏域', () => {
    setUrl('/search')
    document.body.innerHTML = `
      <input type="hidden" name="ie" value="utf-8">
      <div style="display:none"><input name="x" value="1"></div>
      <input type="text" name="keyword" value="hello">
    `
    expect(getKeywordFromDom()).toBe('hello')
    expect(resolveKeyword()).toBe('hello')
  })

  it('什么都找不到时返回 undefined，而不是随便拿一个输入框的值', () => {
    setUrl('/search')
    document.body.innerHTML = `
      <input type="hidden" name="ie" value="utf-8">
      <input type="checkbox" name="f" value="8">
    `
    expect(resolveKeyword()).toBeUndefined()
  })
})
