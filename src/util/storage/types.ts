export interface StorageAdapter {
  get<T = any>(name: string): Promise<T | null>;
  set<T = any>(name: string, value: T): Promise<T>;
  remove(name: string): Promise<boolean>;
  /**
   * 订阅某个 key 的变化（跨标签页 / 跨上下文）。
   * 返回取消订阅函数；平台不支持时返回 noop。
   */
  watch?<T = any>(name: string, callback: (value: T | null) => void): () => void;
}
