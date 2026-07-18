'use server'

import { searchStocks as yahooSearch } from '@/lib/market/yahoo'
import { StockSearchResult } from '@/types/market'

// Removed runtime export, handled by pages

export async function searchMarket(query: string): Promise<StockSearchResult[]> {
  if (!query || query.length < 2) return []
  return yahooSearch(query)
}
