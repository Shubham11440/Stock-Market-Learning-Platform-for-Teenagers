import { StockQuote, HistoricalDataPoint, StockSearchResult } from '@/types/market'

export function mapQuoteResponse(raw: any): StockQuote {
  return {
    symbol: raw.symbol,
    name: raw.shortName || raw.longName || raw.symbol,
    price: raw.regularMarketPrice ?? 0,
    change: raw.regularMarketChange ?? 0,
    changePercent: raw.regularMarketChangePercent ?? 0,
    high: raw.regularMarketDayHigh ?? 0,
    low: raw.regularMarketDayLow ?? 0,
    open: raw.regularMarketOpen ?? 0,
    volume: raw.regularMarketVolume ?? 0,
    marketCap: raw.marketCap,
    pe: raw.trailingPE,
    exchange: raw.exchange || 'Unknown',
    currency: raw.currency || 'USD',
  }
}

export function mapHistoricalResponse(raw: any[]): HistoricalDataPoint[] {
  if (!Array.isArray(raw)) return []
  return raw.map(point => ({
    date: point.date ? point.date.toISOString() : new Date().toISOString(),
    open: point.open ?? 0,
    high: point.high ?? 0,
    low: point.low ?? 0,
    close: point.close ?? 0,
    volume: point.volume ?? 0,
  })).filter(p => p.close > 0) // filter out invalid points
}

export function mapSearchResponse(raw: any): StockSearchResult[] {
  if (!raw.quotes || !Array.isArray(raw.quotes)) return []
  return raw.quotes
    .filter((q: any) => q.isYahooFinance === true && (q.quoteType === 'EQUITY' || q.quoteType === 'ETF'))
    .map((q: any) => ({
      symbol: q.symbol,
      name: q.shortName || q.longName || q.symbol,
      exchange: q.exchange || 'Unknown',
      type: q.quoteType,
    }))
}
