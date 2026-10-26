import useConfig from './useConfig'
import type { OpenMode } from '../util/openUrl'

/**
 * 主菜单的点击行为，拆成两组配置：
 * - menu：主菜单（分类点击 + 子菜单网址）—— 默认当前页
 * - selection：划词搜索（工具栏按钮 + 「更多」弹窗）—— 默认新标签页
 * - openAllInCategory：点分类时一次性打开该分类下所有站点 —— 默认关闭
 *
 * 存储 key：`__allSearch__openModeMenu` / `__allSearch__openModeSelection`
 * / `__allSearch__openAllInCategory`
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

/**
 * 点分类时把该分类下所有站点各开一个新标签页。
 *
 * 取值的兼容处理：桥接（WebBridge）把非字符串写进 localStorage 后会原样读回 JSON，
 * 早期版本也可能存成 'true' / 'false' 字符串或 1 / 0，这里统一归一成布尔。
 */
export const openAllInCategory = useConfig<boolean>({
  name: 'openAllInCategory',
  defaultVal: false,
  get: (val: any) => val === true || val === 1 || val === 'true' || val === '1',
  set: (val, next) => next({ value: !!val })
})

export default function useOpenMode (): {
  menuOpenMode: typeof menuOpenMode;
  selectionOpenMode: typeof selectionOpenMode;
  openAllInCategory: typeof openAllInCategory;
} {
  return { menuOpenMode, selectionOpenMode, openAllInCategory }
}
