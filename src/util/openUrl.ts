export type OpenMode = 'same' | 'new'

/**
 * 按配置打开链接。
 * - 'new'  ：新标签页（不打断当前页）
 * - 'same' ：当前页跳转
 */
export function openUrl (url: string, mode: OpenMode): void {
  if (mode === 'new') {
    window.open(url, '_blank')
  } else {
    window.location.href = url
  }
}

/** 取另一种打开方式（供 Ctrl / 中键使用，保证两个入口都可用） */
export function otherOpenMode (mode: OpenMode): OpenMode {
  return mode === 'new' ? 'same' : 'new'
}
