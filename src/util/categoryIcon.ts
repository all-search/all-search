import type { Site, SiteCategory } from '../types/site'

/**
 * 分类图标取哪个站点（issue #90）。
 *
 * 规则：分类里第一个**启用**的站点。
 * 用「启用」而不是「当前页可见」，是为了切页面时图标不跳——
 * 站点被「隐藏同站链接」过滤掉时，分类图标仍应稳定指向用户排在最前的那一个。
 */
export function pickCategoryIconSite (list: Site[] | undefined | null): Site | null {
  if (!Array.isArray(list) || !list.length) {
    return null
  }
  const usable = list.find(item => item && typeof item.url === 'string' && item.data?.visible !== false)
  return usable || null
}

/** 取分类图标的 url（没有可用站点时返回空串） */
export function categoryIconUrl (cate: SiteCategory | null | undefined): string {
  const site = pickCategoryIconSite(cate?.list)
  return site ? String(site.url) : ''
}
