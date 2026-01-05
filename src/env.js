const target = import.meta.env.VITE_TARGET

export const isPlugin = target === 'plugin'
export const isScript = target === 'script' || !target // 默认为 script
// 未来可能的 Web 版
export const isWeb = target === 'web'

// 功能特性开关 (Feature Flags)
export const features = {
  useShadowDom: isPlugin,
  useGmApi: isScript,
}
