import { Site } from '../../types/site'

/**
 * AI 搜索
 *
 * 只收「URL 带 `%s` 就能直接落到结果页」的引擎。
 * 纯 SPA（DeepSeek / Gemini / Kimi / Poe 等）只能预填输入框、需要再点一次发送，
 * 不计入本分类；新增条目前请在真实浏览器里各点一次确认。
 */
const sites: Partial<Site>[] = [
  {
    nameZh: 'ChatGPT',
    url: 'https://chatgpt.com/?q=%s&hints=search'
  },
  {
    nameZh: 'Perplexity',
    url: 'https://www.perplexity.ai/search?q=%s'
  },
  {
    nameZh: '秘塔AI',
    url: 'https://metaso.cn/?q=%s'
  },
  {
    nameZh: 'Devv',
    url: 'https://devv.ai/search?q=%s'
  },
  {
    nameZh: 'Claude',
    url: 'https://claude.ai/new?q=%s'
  },
  {
    nameZh: 'DDG AI',
    url: 'https://duckduckgo.com/?q=%s&ia=chat'
  }
]

export default sites
