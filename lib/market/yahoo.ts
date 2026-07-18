import yahooFinance from 'yahoo-finance2'
import { marketCache } from './cache'
import { mapQuoteResponse, mapHistoricalResponse, mapSearchResponse } from './mapper'
import { StockQuote, HistoricalDataPoint, StockSearchResult } from '@/types/market'

const CACHE_TTL_QUOTE = 30 // 30 seconds
const CACHE_TTL_HISTORICAL = 3600 // 1 hour
const CACHE_TTL_SEARCH = 86400 // 24 hours

export async function getQuote(symbol: string): Promise<StockQuote | null> {
  const cacheKey = `quote_${symbol}`
  const cached = marketCache.get<StockQuote>(cacheKey)
  if (cached) return cached

  try {
    const raw = await yahooFinance.quote(symbol)
    if (!raw) return null
    const mapped = mapQuoteResponse(raw)
    marketCache.set(cacheKey, mapped, CACHE_TTL_QUOTE)
    return mapped
  } catch (error) {
    console.error(`[Market] Error fetching quote for ${symbol}:`, error)
    return null
  }
}

export async function getHistorical(symbol: string, period: '1d' | '1w' | '1m' | '1y' = '1m'): Promise<HistoricalDataPoint[]> {
  const cacheKey = `historical_${symbol}_${period}`
  const cached = marketCache.get<HistoricalDataPoint[]>(cacheKey)
  if (cached) return cached

  try {
    const period1 = new Date()
    switch (period) {
      case '1d': period1.setDate(period1.getDate() - 1); break;
      case '1w': period1.setDate(period1.getDate() - 7); break;
      case '1m': period1.setMonth(period1.getMonth() - 1); break;
      case '1y': period1.setFullYear(period1.getFullYear() - 1); break;
    }

    const raw = await yahooFinance.historical(symbol, {
      period1: period1.toISOString().split('T')[0],
      interval: period === '1d' || period === '1w' ? '1d' : '1wk', // simple resolution
    })
    
    const mapped = mapHistoricalResponse(raw)
    marketCache.set(cacheKey, mapped, CACHE_TTL_HISTORICAL)
    return mapped
  } catch (error) {
    console.error(`[Market] Error fetching historical for ${symbol}:`, error)
    return []
  }
}

export async function searchStocks(query: string): Promise<StockSearchResult[]> {
  const cacheKey = `search_${query}`
  const cached = marketCache.get<StockSearchResult[]>(cacheKey)
  if (cached) return cached

  try {
    const raw = await yahooFinance.search(query)
    const mapped = mapSearchResponse(raw)
    marketCache.set(cacheKey, mapped, CACHE_TTL_SEARCH)
    return mapped
  } catch (error) {
    console.error(`[Market] Error searching for ${query}:`, error)
    return []
  }
}
