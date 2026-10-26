/**
 * 校验「站点配置」JSON 的形状。
 *
 * 导入（文件 / 剪贴板）时先过一遍：形状不对就拒绝写入，别把用户存储写坏。
 * 只校验结构，不校验内容（URL 是否可访问、分类名是否重复都不管）。
 */
export interface ValidateResult {
  ok: boolean;
  /** 失败原因，直接展示给用户 */
  error?: string;
  /** 通过校验时的统计，便于提示「导入 3 个分类 / 21 个站点」 */
  categories?: number;
  sites?: number;
}

export function validateSites (data: unknown): ValidateResult {
  if (!Array.isArray(data)) {
    return { ok: false, error: '顶层必须是分类数组' }
  }

  let siteCount = 0
  for (let i = 0; i < data.length; i++) {
    const cate = data[i] as any
    if (!cate || typeof cate !== 'object' || Array.isArray(cate)) {
      return { ok: false, error: `第 ${i + 1} 个分类不是对象` }
    }
    if (typeof cate.name !== 'string' || !cate.name) {
      return { ok: false, error: `第 ${i + 1} 个分类缺少 name` }
    }
    if (!Array.isArray(cate.list)) {
      return { ok: false, error: `分类「${cate.nameZh || cate.name}」缺少 list 数组` }
    }
    for (let j = 0; j < cate.list.length; j++) {
      const site = cate.list[j]
      if (!site || typeof site !== 'object') {
        return { ok: false, error: `分类「${cate.nameZh || cate.name}」的第 ${j + 1} 个站点不是对象` }
      }
      if (typeof site.url !== 'string' || !site.url) {
        return { ok: false, error: `分类「${cate.nameZh || cate.name}」的第 ${j + 1} 个站点缺少 url` }
      }
      siteCount += 1
    }
  }

  return { ok: true, categories: data.length, sites: siteCount }
}
