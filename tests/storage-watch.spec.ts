import { describe, it, expect, vi, beforeEach } from 'vitest'

/**
 * chrome.storage 的变更监听：设置页保存后，已打开的页面要能立刻拿到新数据。
 * 这里只测「适配器把 wxtStorage.watch 的回调转成解析后的值」这一层，
 * 真实跨标签页行为由 e2e / 手工验证。
 */

type WatchCb = (value: unknown) => void
const listeners: WatchCb[] = []

vi.mock('@wxt-dev/storage', () => ({
  storage: {
    getItem: vi.fn().mockResolvedValue(null),
    setItem: vi.fn().mockResolvedValue(undefined),
    removeItem: vi.fn().mockResolvedValue(undefined),
    watch: vi.fn((_key: string, cb: WatchCb) => {
      listeners.push(cb)
      return () => {
        const index = listeners.indexOf(cb)
        if (index >= 0) listeners.splice(index, 1)
      }
    })
  }
}))

const { ExtensionAdapter } = await import('@src/util/storage/extension')

describe('ExtensionAdapter.watch', () => {
  beforeEach(() => {
    listeners.length = 0
  })

  it('把 storage 的原始值解析后交给回调', () => {
    const adapter = new ExtensionAdapter()
    const seen: unknown[] = []
    adapter.watch('sites', value => seen.push(value))

    expect(listeners).toHaveLength(1)
    listeners[0](JSON.stringify([{ name: 'search', list: [] }]))

    expect(seen).toHaveLength(1)
    expect(seen[0]).toEqual([{ name: 'search', list: [] }])
  })

  it('删除 key（newValue 为 null）时回调拿到 null', () => {
    const adapter = new ExtensionAdapter()
    const seen: unknown[] = []
    adapter.watch('toolbar', value => seen.push(value))

    listeners[0](null)
    expect(seen).toEqual([null])
  })

  it('取消订阅后不再收到通知', () => {
    const adapter = new ExtensionAdapter()
    const seen: unknown[] = []
    const off = adapter.watch('sites', value => seen.push(value))

    off()
    expect(listeners).toHaveLength(0)
  })
})
