const target = import.meta.env.VITE_TARGET as string

export const isPlugin: boolean = target === 'plugin'
export const isScript: boolean = target === 'script' || !target // 默认为 script
// 未来可能的 Web 版
export const isWeb: boolean = target === 'web'

// 功能特性开关 (Feature Flags)
export interface Features {
  useShadowDom: boolean;
  useGmApi: boolean;
}

export const features: Features = {
  useShadowDom: true, // 统一开启 Shadow DOM
  useGmApi: isScript
}
