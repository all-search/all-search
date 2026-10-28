import { computed, ref, ComputedRef, Ref } from 'vue'
import sites from '../config/sites'
import { getStorage, delStorage, watchStorage } from '../util/storage'
import { SiteCategory } from '../types/site'

// 先用内置默认值渲染，等存储返回后再替换。
// 配置站在没有油猴脚本连接时要等 WebBridge 超时（约 5s）才 reject，
// 先渲染默认值可以避免「打开就是空列表」；有用户配置时也只是一次很短的替换。
const sitesData = ref<SiteCategory[]>(sites as SiteCategory[])

function getSites (val: SiteCategory[] | null): SiteCategory[] {
  // 空数组是合法的（用户可能删光了所有分类），只有没存过才回落到内置默认
  if (Array.isArray(val)) {
    return val
  } else {
    return sites as SiteCategory[]
  }
}

function initSites (sites: SiteCategory[], type?: string): SiteCategory[] {
  if (type === 'tm') {
    return sites
      .filter(item =>
        Array.isArray(item.list) &&
        item.list.length > 0 &&
        item.data &&
        item.data.visible)
      .map(item => ({
        ...item,
        show: false
      }))
  }
  return sites
}

/**
 * 真实数据是否已经从存储读回来。
 *
 * 首屏先用内置默认值渲染（避免「打开就是空列表」），但**默认值不等于用户数据**：
 * 线下配置站要等 WebBridge 超时才读到真实配置，这期间如果让用户编辑并保存，
 * 就会用默认值覆盖掉用户的配置。所以页面上要等这个标记为 true 才允许改。
 */
const sitesReady = ref(false)

getStorage<SiteCategory[]>('sites').then(val => {
  sitesData.value = getSites(val)
}).catch(() => {
  sitesData.value = sites as SiteCategory[]
}).finally(() => {
  sitesReady.value = true
})

// 别的上下文（另一个标签页 / 插件设置页）保存后同步过来：
// 以前只在模块加载时读一次，设置页改完菜单条要等刷新才变。
watchStorage<SiteCategory[]>('sites', (value) => {
  sitesData.value = JSON.parse(JSON.stringify(getSites(value)))
})

// 油猴脚本晚于页面就绪才连上时（WebBridge 快速路径 → 真 API），重新读一次
if (typeof window !== 'undefined') {
  window.addEventListener('as-bridge-up', () => {
    reloadSites().catch(() => {})
  })
}

function resetSites (): void {
  if (window.confirm('确认要重置所有网址吗')) {
    delStorage('sites')
  }
}

/**
 * 重新从存储读取站点列表。
 * 用于「恢复默认」：删除存储后需要把内存里的数据也刷回内置默认值，
 * 否则页面还显示旧数据、下次保存又写回去。
 */
export async function reloadSites (): Promise<void> {
  let value: SiteCategory[] | null = null
  try {
    value = await getStorage<SiteCategory[]>('sites')
  } catch {
    value = null
  }
  // 总是赋新数组，保证 computed 变更、使用方的 watch 能触发
  sitesData.value = JSON.parse(JSON.stringify(getSites(value)))
}

export default function useSites (type?: string): {
  sites: ComputedRef<SiteCategory[]>;
  resetSites: () => void;
  /** 真实数据是否已从存储读回（页面用它决定能不能编辑） */
  sitesReady: Ref<boolean>;
} {
  return {
    sites: computed(() => initSites(sitesData.value, type)),
    resetSites,
    sitesReady
  }
}

/** 非组件场景（配置页的 watch）直接用这个标记 */
export { sitesReady }
