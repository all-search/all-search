export interface Site {
  /** 站点显示名称 */
  nameZh?: string;
  /** 内部名称 */
  name?: string;
  /** 搜索 URL 或匹配正则 */
  url: string | RegExp;
  /** 是否在菜单中隐藏 */
  invisible?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义样式 [全屏, 横向, 纵向] */
  style?: Record<number | string, string>;
  /** 页面元素选择器，用于获取关键字等 */
  selectors?: any;
  /** 搜索参数相关配置 */
  query?: any;
  /** 图标 */
  icon?: string;
  /** 自定义图标 (base64 或 url) */
  favicon?: string;
  /** 扩展数据 */
  data?: {
    visible?: boolean;
    [key: string]: any;
  };
  /** 展开状态 (用于菜单) */
  show?: boolean;
}

export interface SiteCategory {
  /** 分类显示名称 */
  nameZh?: string;
  /** 分类内部名称 */
  name: string;
  /** 分类下的站点列表 */
  list: Site[];
  /** 扩展数据 */
  data?: {
    visible?: boolean;
    [key: string]: any;
  };
  /** 是否显示 */
  show?: boolean;
}

export interface Config {
  /** 搜索引擎列表 */
  sites: SiteCategory[];
  /** 常用设置 */
  settings: Record<string, any>;
}
