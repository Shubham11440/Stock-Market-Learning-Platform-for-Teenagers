export interface StockQuote {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  high: number
  low: number
  open: number
  volume: number
  marketCap?: number
  pe?: number
  exchange: string
  currency: string
}

export interface HistoricalDataPoint {
  date: string // ISO string or simple YYYY-MM-DD
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface StockSearchResult {
  symbol: string
  name: string
  exchange: string
  type: string
}

export interface TradeResult {
  success: boolean
  message: string
  executedPrice?: number
}

