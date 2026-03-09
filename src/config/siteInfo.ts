import { reactive, watch } from 'vue'
import useSites from '../components/useSites'
import { list } from './loadList'
import { routerChange } from '@src/util'
import { Site } from '../types/site'

const { sites } = useSites('tm')

export interface CurrentSite {
  url: string | RegExp;
  invisible: boolean;
  disabled: boolean;
  style: any;
  selectors: string | null;
  query: string | null;
}

function getMenuItem (): Site | null {
  let targetItem: Site | null = null
  let urlObj: URL | null = null
  const curItem = new URL(window.location.href)

  sites.value.some(category => {
    const found = category.list.find(item => {
      // 只有当 url 是字符串且包含协议时，才尝试使用 new URL 解析
      if (typeof item.url !== 'string' || !item.url.includes('//')) {
        return false
      }
      try {
        // 预处理 URL，防止占位符 %s 干扰解析
        const processedUrl = item.url.replace('%s', 'placeholder')
        const menuItem = new URL(processedUrl)
        if (
          menuItem.hostname === curItem.hostname &&
          menuItem.pathname === curItem.pathname
        ) {
          urlObj = menuItem
          return true
        }
      } catch (e) {
        // invalid URL
      }
      return false
    })
    if (found) {
      targetItem = found
      return true
    }
    return false
  })

  if (urlObj && targetItem) {
    const obj = urlObj as URL
    for (const key of obj.searchParams.keys()) {
      // 如果配置的 URL 包含 query 参数，则当前页面也必须包含该参数
      if (!curItem.searchParams.has(key)) {
        targetItem = null
      }
    }
  }
  return targetItem
}

function getSite (): CurrentSite {
  const target = list
    .find(item => item.url.test(window.location.href.toLowerCase()))
  const menuItem = getMenuItem()

  if (target) {
    return {
      url: target.url,
      invisible: !!target.invisible,
      disabled: !!target.disabled,
      style: target.style || {},
      selectors: target.selectors || null,
      query: target.query || null
    }
  } else if (menuItem) {
    const item = menuItem as Site
    return {
      url: item.url,
      invisible: false,
      disabled: false,
      style: item.style || {},
      selectors: item.selectors || null,
      query: item.query || null
    }
  }

  return {
    url: '',
    invisible: true,
    disabled: true,
    style: {},
    selectors: null,
    query: null
  }
}

function updateCurrentSite () {
  const newSite = getSite()
  Object.keys(newSite).forEach(key => {
    (site as any)[key] = (newSite as any)[key]
  })
}

watch(sites, () => {
  updateCurrentSite()
})

routerChange(() => {
  updateCurrentSite()
})

export const site = reactive<CurrentSite>(getSite())
