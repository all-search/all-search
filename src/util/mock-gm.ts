/**
 * 插件构建中顶替 `vite-plugin-monkey/dist/client` 的占位实现。
 *
 * 插件模式的数据走 ExtensionAdapter（chrome.storage），不应该触碰 GM API。
 * 这里刻意在**调用时**抛错、而不是返回 undefined：一旦 VITE_TARGET 失效或有人
 * 误用 TmAdapter，会立刻暴露问题，而不是静默地读不到/写不进配置。
 *
 * 注意：不能在模块顶层抛错。该模块会被 src/util/storage/index.ts 静态引入
 * （用于选择适配器），顶层抛错会让插件在加载阶段就直接崩掉。
 */
const unavailable = () => {
  throw new Error(
    '[all-search] GM API 在当前构建中不可用。插件模式请使用 ExtensionAdapter（chrome.storage），' +
      '并确认 packages/plugin/.env 中的 VITE_TARGET=plugin。'
  )
}

export const GM_getValue = unavailable
export const GM_setValue = unavailable
export const GM_deleteValue = unavailable
export const GM_listValues = unavailable
export const GM_xmlhttpRequest = unavailable
export const GM_registerMenuCommand = unavailable
export const GM_unregisterMenuCommand = unavailable
export const GM_addStyle = unavailable
export const GM_openInTab = unavailable
export const GM_setClipboard = unavailable
export const GM_notification = unavailable
export const GM_download = unavailable
export const GM_getResourceText = unavailable

/**
 * GM_info 是对象而不是函数，用 getter 保证访问时才抛错。
 */
export const GM_info = {
  get script (): never {
    return unavailable()
  }
}
