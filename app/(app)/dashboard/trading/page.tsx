import { StockSearch } from '@/components/trading/StockSearch'
import { TrendingUp, Activity, Star } from 'lucide-react'
import Link from 'next/link'

export const runtime = 'nodejs'

export default function TradePage() {
  const watchlisted = [
    { symbol: 'RELIANCE.NS', name: 'Reliance Industries', price: '₹2,950.00', change: '+1.2%' },
    { symbol: 'HDFCBANK.NS', name: 'HDFC Bank', price: '₹1,430.50', change: '-0.5%' },
    { symbol: 'AAPL', name: 'Apple Inc.', price: '$189.20', change: '+2.1%' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <header className="mb-10 text-center">
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-text-1 mb-3">
          Virtual Market
        </h1>
        <p className="text-text-3 max-w-lg mx-auto">
          Search for stocks, analyze charts, and practice trading with your virtual portfolio.
        </p>
      </header>

      {/* Centered Search */}
      <div className="flex justify-center mb-16">
        <StockSearch />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Watchlist Quick View */}
        <div className="bg-surface border border-border rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6 text-text-1">
            <Star className="text-primary" size={20} />
            <h2 className="font-display font-bold text-xl">Popular Stocks</h2>
          </div>
          <div className="flex flex-col gap-3">
            {watchlisted.map(stock => (
              <Link 
                key={stock.symbol} 
                href={`/dashboard/trading/${encodeURIComponent(stock.symbol)}`}
                className="flex items-center justify-between p-4 bg-surface-2 hover:bg-surface border border-border/50 rounded-2xl transition-colors group"
              >
                <div>
                  <p className="font-bold text-text-1 group-hover:text-primary transition-colors">{stock.symbol}</p>
                  <p className="text-sm text-text-3">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-text-1">{stock.price}</p>
                  <p className={`text-sm font-medium ${stock.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stock.change}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Market Status (Mocked for now) */}
        <div className="bg-surface border border-border rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6 text-text-1">
            <Activity className="text-primary" size={20} />
            <h2 className="font-display font-bold text-xl">Market Status</h2>
          </div>
          
          <div className="space-y-6">
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 dark:text-green-400 font-bold tracking-wider uppercase mb-1">NSE (India)</p>
                <p className="font-medium text-text-1">Market is Open</p>
              </div>
              <TrendingUp className="text-green-500" size={24} />
            </div>

            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 dark:text-red-400 font-bold tracking-wider uppercase mb-1">NASDAQ (US)</p>
                <p className="font-medium text-text-1">Market is Closed</p>
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-red-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-red-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
