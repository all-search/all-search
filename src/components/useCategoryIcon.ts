import useConfig from './useConfig'

export type CategoryIconSource = 'builtin' | 'site'

/**
 * 分类图标的来源（issue #90）：
 * - builtin：用 iconfont 里手绘的 SVG（默认，零请求）
 * - site：用该分类下第一个启用站点的 favicon（更直观，但每个分类要拉一次图）
 *
 * 存储 key：`__allSearch__categoryIconSource`
 */
export const categoryIconSource = useConfig<CategoryIconSource>({
  name: 'categoryIconSource',
  defaultVal: 'builtin',
  get: (val: any) => (val === 'site' ? 'site' : 'builtin'),
  set: (val, next) => next({ value: val === 'site' ? 'site' : 'builtin' })
})

export default function useCategoryIcon (): {
  categoryIconSource: typeof categoryIconSource;
} {
  return { categoryIconSource }
}
