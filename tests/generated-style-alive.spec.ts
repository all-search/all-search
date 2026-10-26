import { describe, it, expect } from 'vitest'
import { isGeneratedStyleAlive } from '@src/util/initStyle'

describe('isGeneratedStyleAlive 静态规则是否还有效', () => {
  it('选择器能命中时算有效', () => {
    document.body.innerHTML = '<header id="b_header">x</header>'
    expect(isGeneratedStyleAlive('#b_header { top: 30px !important; }')).toBe(true)
  })

  it('选择器全部失效时算失效（站点改版）', () => {
    document.body.innerHTML = '<div class="new-header">x</div>'
    expect(isGeneratedStyleAlive('#b_header { top: 30px !important; }')).toBe(false)
  })

  it('多条规则里只要有一条命中就算有效', () => {
    document.body.innerHTML = '<div class="new-header">x</div>'
    const css = '#b_header { top: 30px; }\n.new-header { top: 30px; }'
    expect(isGeneratedStyleAlive(css)).toBe(true)
  })

  it('逗号分隔的选择器按单个处理', () => {
    document.body.innerHTML = '<div class="b">x</div>'
    expect(isGeneratedStyleAlive('.a, .b { top: 30px; }')).toBe(true)
  })

  it('空串 / 只有注释 / 解析不出选择器时按有效处理，避免误伤', () => {
    document.body.innerHTML = ''
    expect(isGeneratedStyleAlive('')).toBe(true)
    expect(isGeneratedStyleAlive('/* 注释 */')).toBe(true)
  })

  it('非法选择器不抛错，算失效', () => {
    document.body.innerHTML = '<div>x</div>'
    expect(isGeneratedStyleAlive('[[[ { top: 30px; }')).toBe(false)
  })
})
