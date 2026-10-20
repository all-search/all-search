import useConfig from './useConfig'
import type { OpenMode } from '../util/openUrl'

/**
 * 点击打开方式，按功能区拆成两组：
 * - menu：主菜单（分类点击 + 子菜单网址）—— 默认当前页
 * - selection：划词搜索（工具栏按钮 + 「更多」弹窗）—— 默认新标签页
 *
 * 存储 key：`__allSearch__openModeMenu` / `__allSearch__openModeSelection`
 */
export const menuOpenMode = useConfig<OpenMode>({
  name: 'openModeMenu',
  defaultVal: 'same',
  reg: /^(same|new)$/
})

export const selectionOpenMode = useConfig<OpenMode>({
  name: 'openModeSelection',
  defaultVal: 'new',
  reg: /^(same|new)$/
})

export default function useOpenMode (): {
  menuOpenMode: typeof menuOpenMode;
  selectionOpenMode: typeof selectionOpenMode;
} {
  return { menuOpenMode, selectionOpenMode }
}
