export interface StorageAdapter {
  get<T = any>(name: string): Promise<T | null>;
  set<T = any>(name: string, value: T): Promise<T>;
  remove(name: string): Promise<boolean>;
}
