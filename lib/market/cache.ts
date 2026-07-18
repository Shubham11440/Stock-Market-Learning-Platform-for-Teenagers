interface CacheItem<T> {
  data: T
  expiresAt: number
}

class MemoryCache {
  private cache: Map<string, CacheItem<any>> = new Map()

  get<T>(key: string): T | null {
    const item = this.cache.get(key)
    if (!item) return null
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key)
      return null
    }
    return item.data as T
  }

  set<T>(key: string, data: T, ttlSeconds: number): void {
    this.cache.set(key, {
      data,
      expiresAt: Date.now() + ttlSeconds * 1000,
    })
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }
}

// Global singleton cache
export const marketCache = new MemoryCache()
