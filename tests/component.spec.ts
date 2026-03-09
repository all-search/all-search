import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LayoutManager from '@src/components/layout-manager.vue'

describe('LayoutManager.vue', () => {
  it('should reflect show/hide state in classes', async () => {
    const wrapper = mount(LayoutManager, {
      props: {
        mode: 'top',
        direction: 'horizontal',
        show: 1, // 展开
        visible: true
      }
    })

    const container = wrapper.find('.as-container')
    expect(container.classes()).toContain('as-show')
    expect(container.classes()).not.toContain('as-hide')

    // 更新 props
    await wrapper.setProps({ show: 2 }) // 收起
    
    expect(container.classes()).toContain('as-hide')
    expect(container.classes()).not.toContain('as-show')
  })

  it('should update direction and mode classes', async () => {
    const wrapper = mount(LayoutManager, {
      props: {
        mode: 'left',
        direction: 'vertical',
        show: 1,
        visible: true
      }
    })

    const container = wrapper.find('.as-container')
    expect(container.classes()).toContain('as-vertical')
    expect(container.classes()).toContain('as-left')

    await wrapper.setProps({ mode: 'right' })
    expect(container.classes()).toContain('as-right')
  })
})
