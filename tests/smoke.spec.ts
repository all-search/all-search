import { describe, it, expect, beforeEach, vi } from 'vitest'
import { LayoutService } from '@src/util/layoutService'
import { WebBridgeAdapter } from '@src/util/storage/bridge'
import { getName } from '@src/util/common'

// Mock 存储相关的全局变量
vi.mock('@src/util/storage/tm', () => {
  return {
    TmAdapter: vi.fn().mockImplementation(function (this: any) {
      this.get = vi.fn().mockResolvedValue(null)
      this.set = vi.fn().mockImplementation((_n: string, v: any) => Promise.resolve(v))
      this.remove = vi.fn().mockResolvedValue(true)
    })
  }
})

describe('Smoke Test: Core Architecture', () => {
  describe('LayoutService', () => {
    beforeEach(() => {
      document.documentElement.innerHTML = '<head></head><body></body>'
    })

    it('should refresh layout and update host classes', () => {
      const host = document.createElement('div')
      host.id = 'all-search'
      LayoutService.refresh('right', host)

      expect(host.classList.contains('as-host-right')).toBe(true)
      // 检查物理挂载位置（right 应该在 body 之前）
      expect(document.body.previousElementSibling).toBe(host)
    })

        it('should handle bottom mode correctly', () => {
          const host = document.createElement('div')
          host.id = 'all-search'
          LayoutService.refresh('bottom', host)
          
          expect(host.classList.contains('as-host-bottom')).toBe(true)
          // bottom 模式应在 html 的最后
          expect(document.documentElement.lastElementChild).toBe(host)
        })
    
        it('should update host classes when mode or direction changes via LayoutService', () => {
          const host = document.createElement('div')
          host.id = 'all-search'
          
          LayoutService.refresh('left', host)
          expect(host.classList.contains('as-host-left')).toBe(true)
          expect(host.classList.contains('as-host-vertical')).toBe(true)
          
          LayoutService.refresh('top', host)
          expect(host.classList.contains('as-host-top')).toBe(true)
          expect(host.classList.contains('as-host-horizontal')).toBe(true)
          expect(host.classList.contains('as-host-left')).toBe(false)
        })
      })
      describe('Storage WebBridgeAdapter Fallback', () => {
    it('should fallback to localStorage when connection times out', async () => {
      vi.useFakeTimers()
      const adapter = new WebBridgeAdapter()

      // 模拟超时
      vi.advanceTimersByTime(5001)

      const testKey = 'test-mode'
      const testVal = 'dark'
      const prefixedKey = getName(testKey)!

      await adapter.set(testKey, testVal)
      expect(localStorage.getItem(prefixedKey)).toContain('dark')

      const result = await adapter.get(testKey)
      expect(result).toBe(testVal)

      vi.useRealTimers()
    })
  })
})
