export interface Site {
  /** 站点名称 */
  name?: string;
  /** 搜索 URL 或匹配正则 */
  url: string | RegExp;
  /** 是否在菜单中隐藏 */
  invisible?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义样式 [全屏, 横向, 纵向] */
  style?: Record<number, string>;
  /** 页面元素选择器，用于获取关键字等 */
  selectors?: {
    item?: string;
    [key: string]: any;
  };
  /** 搜索参数相关配置 */
  query?: string | Record<string, any>;
  /** 图标 */
  icon?: string;
}

export interface SiteCategory {
  /** 分类名称 */
  name: string;
  /** 分类下的站点列表 */
  list: Site[];
}

export interface Config {
  /** 搜索引擎列表 */
  sites: SiteCategory[];
  /** 常用设置 */
  settings: Record<string, any>;
}
