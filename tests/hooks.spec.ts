import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref, nextTick } from 'vue'
import useConfig from '@src/components/useConfig'
import useSites from '@src/components/useSites'
import useToolbar from '@src/components/useToolbar'
import useSwitchShow, { SHOW_STATUS } from '@src/components/useSwitchShow'
import useAutoHide from '@src/components/useAutoHide'
import { getStorage, setStorage } from '@src/util/storage'

const mockDirection = ref('mid')

vi.mock('@src/util/storage', () => ({
  getStorage: vi.fn().mockResolvedValue(null),
  setStorage: vi.fn().mockResolvedValue(undefined),
}))

vi.mock('@src/util/useScroll', () => ({
  __esModule: true,
  default: () => ({
    direction: mockDirection,
  }),
}))

vi.mock('@src/config/toolbar', () => ({
  __esModule: true,
  default: [
    { nameZh: 'A', url: 'https://a.example.com', data: { visible: true } },
    { nameZh: 'B', url: 'https://b.example.com', data: { visible: false } },
  ],
}))

describe('Core Hooks', () => {
  beforeEach(() => {
    const { show, scrollHide } = useSwitchShow()
    show.value = SHOW_STATUS.VISIBLE
    scrollHide.value = 'none'
    mockDirection.value = 'mid'
    vi.clearAllMocks()
    vi.mocked(getStorage).mockResolvedValue(null)
    vi.mocked(setStorage).mockResolvedValue(undefined)
  })

  describe('useConfig', () => {
    it('should initialize with default value and fetch from storage', async () => {
      vi.mocked(getStorage).mockResolvedValueOnce('right')
      
      const config = useConfig({
        name: 'mode',
        defaultVal: 'top'
      })

      // 初始为默认值
      expect(config.value).toBe('top')
      
      // 等待异步初始化
      await new Promise(resolve => setTimeout(resolve, 0))
      expect(config.value).toBe('right')
    })

    it('should update storage when value changes', async () => {
      const config = useConfig({
        name: 'mode',
        defaultVal: 'top'
      })

      config.value = 'bottom'
      expect(setStorage).toHaveBeenCalledWith('mode', 'bottom')
    })
  })

  describe('useSites', () => {
    it('should load site list', async () => {
      const { sites } = useSites()
      await new Promise(resolve => setTimeout(resolve, 0))
      expect(Array.isArray(sites.value)).toBe(true)
      expect(sites.value.length).toBeGreaterThan(0)
    })
  })

  describe('useToolbar', () => {
    it('should expose toolbar config and persist visibility', async () => {
      const { visible, list } = useToolbar('tm')
      await new Promise(resolve => setTimeout(resolve, 0))
      expect(Array.isArray(list.value)).toBe(true)
      expect(list.value.length).toBe(1)
      expect(list.value[0]).toMatchObject({ nameZh: 'A', url: 'https://a.example.com' })
      expect(visible.value).toBe(1)

      visible.value = 2
      expect(setStorage).toHaveBeenCalledWith('showToolbar', 2)
    })

    it('should keep full list when not in tm mode', async () => {
      const { list } = useToolbar()
      await new Promise(resolve => setTimeout(resolve, 0))
      expect(list.value.length).toBe(2)
    })
  })

  describe('useSwitchShow', () => {
    it('should provide options and persist show/scroll states', () => {
      const { show, scrollHide, options } = useSwitchShow()
      expect(show.value).toBe(SHOW_STATUS.VISIBLE)
      expect(options.has('top')).toBe(true)

      show.value = SHOW_STATUS.COLLAPSED
      scrollHide.value = 'top'

      expect(setStorage).toHaveBeenCalledWith('switchShow', SHOW_STATUS.COLLAPSED)
      expect(setStorage).toHaveBeenCalledWith('scrollHide', 'top')
    })
  })

  describe('useAutoHide', () => {
    it('should collapse when scroll direction matches config', async () => {
      const dispose = useAutoHide()
      const { show, scrollHide } = useSwitchShow()
      scrollHide.value = 'top'
      mockDirection.value = 'top'
      await nextTick()
      expect(show.value).toBe(SHOW_STATUS.COLLAPSED)
      dispose()
    })

    it('should stay visible when scrollHide is none', async () => {
      const dispose = useAutoHide()
      const { show } = useSwitchShow()
      mockDirection.value = 'bottom'
      await nextTick()
      expect(show.value).toBe(SHOW_STATUS.VISIBLE)
      dispose()
    })
  })
})
