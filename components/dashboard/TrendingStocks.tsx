import Link from 'next/link'
import { TrendingUp, ArrowRight, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Stock {
  symbol: string
  name: string
  price: number
  changePercent: number
}

// Temporary mock data for Phase 3
const mockTrendingStocks: Stock[] = [
  { symbol: 'RELIANCE', name: 'Reliance Ind.', price: 2854.20, changePercent: 1.25 },
  { symbol: 'TATAMOTORS', name: 'Tata Motors', price: 984.10, changePercent: -0.42 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1540.85, changePercent: 0.85 },
  { symbol: 'ZOMATO', name: 'Zomato Ltd', price: 185.30, changePercent: 4.20 },
]

export function TrendingStocks() {
  return (
    <article className="p-5 rounded-2xl bg-surface-2 border border-border/50 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-primary" />
          <h3 className="font-display font-semibold text-text-1">Trending</h3>
        </div>
        <Link href="/trade" className="text-sm font-medium text-primary hover:text-primary-light transition-colors flex items-center gap-1">
          Explore <ArrowRight size={14} />
        </Link>
      </div>

      <div className="flex flex-col gap-3 flex-1 justify-between">
        {mockTrendingStocks.map((stock) => {
          const isUp = stock.changePercent >= 0
          return (
            <Link 
              key={stock.symbol} 
              href={`/trade/${stock.symbol}`}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-surface transition-colors border border-transparent hover:border-border/50 group"
            >
              <div className="flex flex-col">
                <span className="font-display font-bold text-text-1 group-hover:text-primary-light transition-colors">
                  {stock.symbol}
                </span>
                <span className="text-xs text-text-3 truncate max-w-[100px] sm:max-w-[150px]">
                  {stock.name}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-medium text-text-1 text-sm">
                  ₹{stock.price.toFixed(2)}
                </span>
                <span className={cn(
                  "text-xs font-medium flex items-center gap-0.5",
                  isUp ? "text-green-500" : "text-red-500"
                )}>
                  {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {Math.abs(stock.changePercent).toFixed(2)}%
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </article>
  )
}
