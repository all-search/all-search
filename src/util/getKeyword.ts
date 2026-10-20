import { getAsRoot } from './dom'

type InputElement = HTMLInputElement | HTMLTextAreaElement

/**
 * 站点配置里与关键词相关的字段
 */
export interface KeywordOptions {
  /** 页面元素选择器，优先级最高 */
  selectors?: string | null
  /** URL 查询参数名，可以是多个 */
  query?: string | string[] | null
}

/** 常见的搜索关键词参数名（按命中概率排序） */
const COMMON_QUERY_KEYS = [
  'q',
  'wd',
  'word',
  'keyword',
  'query',
  'text',
  'kw',
  'qw',
  'search_query',
  'key'
]

/** 这些参数即使出现在 URL 里也不可能是关键词 */
const IGNORED_QUERY_KEYS = new Set([
  'ie', 'f', 'rsv_bp', 'rn', 'pn', 'tn', 'oq', 'rsv_spt', 'rsv_idx', 'rsv_pq'
])

function isInputElement (el: Element): el is InputElement {
  return el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA'
}

const NON_TEXT_TYPES = new Set([
  'hidden', 'button', 'checkbox', 'color', 'file', 'image',
  'radio', 'range', 'reset', 'submit', 'password', 'date', 'time',
  'datetime-local', 'month', 'week', 'number', 'email', 'tel', 'url'
])

function isTextInput (el: Element): el is InputElement {
  if (!isInputElement(el)) return false
  const type = (el.getAttribute('type') || 'text').toLowerCase()
  return !NON_TEXT_TYPES.has(type)
}

/** 判断元素是否可见（getClientRects 在 jsdom 里恒为空，因此只做样式判断） */
function isVisible (el: HTMLElement): boolean {
  if (!el.isConnected) return false
  const style = getComputedStyle(el)
  return (
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    style.width !== '0px' &&
    style.height !== '0px' &&
    style.opacity !== '0'
  )
}

function isInApp (el: Element): boolean {
  const root = getAsRoot()
  return !!root && root.contains(el)
}

function isUsableInput (el: Element): el is InputElement {
  return isTextInput(el) && isVisible(el as HTMLElement) && !isInApp(el)
}

/**
 * 从 URL 查询参数里取关键词
 */
export function getKeywordFromQuery (keys?: string | string[] | null): string | undefined {
  const list = (Array.isArray(keys) ? keys : [keys])
    .filter((key): key is string => typeof key === 'string' && !!key)
  const candidates = list.length ? list : COMMON_QUERY_KEYS
  const params = new URLSearchParams(window.location.search)

  for (const key of candidates) {
    if (IGNORED_QUERY_KEYS.has(key)) continue
    const value = params.get(key)
    if (value && value.trim()) {
      return value.trim()
    }
  }
  return undefined
}

/**
 * 从配置的选择器里取关键词
 */
export function getKeywordFromSelector (selectors?: string | null): string | undefined {
  if (!selectors) return undefined
  let el: Element | null = null
  try {
    el = document.querySelector(selectors)
  } catch (e) {
    // 选择器写错时不影响其它取词方式
    return undefined
  }
  if (!el) return undefined
  const value = isInputElement(el) ? el.value : el.textContent
  return value && value.trim() ? value.trim() : undefined
}

/** 候选输入框：优先搜索语义明确的，其次任意文本输入框 */
function collectCandidateInputs (): HTMLInputElement[] {
  const queries = [
    'input[type=search]',
    'input[name=q],input[name=wd],input[name=query],input[name=word],input[name=keyword]',
    'input[type=text][autocomplete=off]',
    'input[autocomplete=off]:not([type])',
    'input[id*=search i],input[class*=search i]',
    'input[placeholder*=search i],input[placeholder*=搜索]',
    'input:not([type]),input[type=text]'
  ]

  const result: HTMLInputElement[] = []
  const seen = new Set<Element>()

  for (const query of queries) {
    let list: NodeListOf<HTMLInputElement>
    try {
      list = document.querySelectorAll<HTMLInputElement>(query)
    } catch (e) {
      continue
    }
    for (const el of Array.from(list)) {
      if (seen.has(el) || !isUsableInput(el)) continue
      seen.add(el)
      result.push(el)
    }
  }

  return result
}

/**
 * 从页面 DOM 里取关键词
 *
 * 说明：老实现用 `document.querySelector` 只拿到第一个元素，选中隐藏元素后直接放弃，
 * 再退化成「输入框的值出现在 URL 里」这种弱匹配，百度之类带 `ie=utf-8`、`tn=1`
 * 隐藏域的页面会把关键词取成 `utf-8`、`1`（issue #95）。
 */
export function getKeywordFromDom (): string | undefined {
  const inputs = collectCandidateInputs()
  if (!inputs.length) {
    const textarea = Array.from(document.querySelectorAll('textarea'))
      .find(el => isVisible(el) && !isInApp(el)) as HTMLTextAreaElement | undefined
    const value = textarea?.value
    return value && value.trim() ? value.trim() : undefined
  }

  const withValue = inputs.find(el => !!el.value && !!el.value.trim())
  return (withValue || inputs[0])?.value?.trim() || undefined
}

/**
 * 获取搜索关键字（按优先级：站点配置选择器 → 站点配置参数 → 常见参数 → 页面输入框）
 *
 * @returns 解码后的原始文本，未找到时返回 undefined
 */
export function resolveKeyword (options: KeywordOptions = {}): string | undefined {
  return (
    getKeywordFromSelector(options.selectors) ||
    getKeywordFromQuery(options.query) ||
    getKeywordFromDom()
  )
}

/**
 * 兼容旧调用：直接取当前页面的关键词
 */
export function getKeyword (): string | undefined {
  return resolveKeyword()
}

/**
 * 获取页面中的搜索框 DOM（保留旧导出，供外部按需使用）
 */
export function getSearchDom (): HTMLElement | undefined {
  return collectCandidateInputs()[0]
}

export type { InputElement }
