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
  query: string | string[] | null;
}

/**
 * 从搜索引擎的 URL 模板里反推关键词参数名
 * 例如 `https://www.baidu.com/s?wd=%s&ie=utf-8` → `wd`
 */
export function extractKeywordParam (url?: string | RegExp | null): string | null {
  if (typeof url !== 'string' || url.indexOf('%s') < 0) {
    return null
  }
  const queryStart = url.indexOf('?')
  if (queryStart < 0) {
    // 形如 /search/%s 的模板，参数在路径里，只能靠 DOM 兜底
    return null
  }
  const queryString = url.slice(queryStart + 1).split('#')[0]
  const pairs = queryString.split('&')
  for (const pair of pairs) {
    const [key, value = ''] = pair.split('=')
    // 占位符本身就是 %s，不能先 decodeURIComponent（会抛 URI malformed）
    if (key && value === '%s') {
      return key
    }
  }
  return null
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
      // loadList 只声明匹配规则时，借用菜单里该引擎的 URL 模板反推参数名
      query: target.query || extractKeywordParam(menuItem?.url)
    }
  } else if (menuItem) {
    const item = menuItem as Site
    return {
      url: item.url,
      invisible: false,
      disabled: false,
      style: item.style || {},
      selectors: item.selectors || null,
      // 没显式配置参数名时，从该引擎的 URL 模板里反推（如百度的 wd、谷歌的 q）
      query: item.query || extractKeywordParam(item.url)
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
