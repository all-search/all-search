import { getStorage, setStorage } from './storage'

/** auto = 跟随系统；light / dark = 强制 */
export type ThemePreference = 'auto' | 'light' | 'dark'

export type ResolvedTheme = 'light' | 'dark'

/** 存储 key（实际写入时由 storage 适配器加 `__allSearch__` 前缀） */
export const THEME_STORAGE_KEY = 'theme'

const DARK_QUERY = '(prefers-color-scheme: dark)'

export function normalizeTheme (value: unknown): ThemePreference {
  return value === 'light' || value === 'dark' ? value : 'auto'
}

export async function loadTheme (): Promise<ThemePreference> {
  try {
    return normalizeTheme(await getStorage(THEME_STORAGE_KEY))
  } catch {
    return 'auto'
  }
}

export async function saveTheme (preference: ThemePreference): Promise<void> {
  await setStorage(THEME_STORAGE_KEY, preference)
}

export function getMediaQuery (): MediaQueryList | null {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return null
  }
  return window.matchMedia(DARK_QUERY)
}

export function systemPrefersDark (): boolean {
  return getMediaQuery()?.matches ?? false
}

export function resolveTheme (preference: ThemePreference): ResolvedTheme {
  if (preference === 'light' || preference === 'dark') {
    return preference
  }
  return systemPrefersDark() ? 'dark' : 'light'
}

/** 监听系统主题变化，返回取消监听函数 */
export function onSystemThemeChange (callback: (isDark: boolean) => void): () => void {
  const query = getMediaQuery()
  if (!query) {
    return () => {}
  }
  const handler = (event: MediaQueryListEvent) => callback(event.matches)
  // Safari < 14 只有 addListener
  if (typeof query.addEventListener === 'function') {
    query.addEventListener('change', handler)
    return () => query.removeEventListener('change', handler)
  }
  query.addListener(handler)
  return () => query.removeListener(handler)
}
