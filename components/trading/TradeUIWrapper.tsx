'use client'

import { useState } from 'react'
import { TradeModal } from '@/components/trading/TradeModal'
import { StockQuote } from '@/types/market'
import { ArrowLeft, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'

// Dynamically import Chart to prevent SSR issues with Recharts
const Chart = dynamic(() => import('@/components/trading/Chart'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
    </div>
  )
})

interface TradeUIWrapperProps {
  quote: StockQuote
  historicalData: any[]
  userBalance: number
  positionQuantity: number
}

export function TradeUIWrapper({ quote, historicalData, userBalance, positionQuantity }: TradeUIWrapperProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const isPositive = quote.change >= 0

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back link */}
      <Link href="/trade" className="inline-flex items-center gap-2 text-text-3 hover:text-text-1 transition-colors mb-6 text-sm font-medium">
        <ArrowLeft size={16} /> Back to Search
      </Link>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="font-display font-bold text-4xl text-text-1 tracking-tight mb-1">
            {quote.symbol}
          </h1>
          <p className="text-text-3 text-lg font-medium">{quote.name} • {quote.exchange}</p>
        </div>
        
        <div className="text-left md:text-right">
          <p className="font-display font-bold text-4xl text-text-1">
            ₹{quote.price.toFixed(2)}
          </p>
          <div className={`flex items-center md:justify-end gap-1.5 font-bold text-lg mt-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <ArrowUpRight size={24} /> : <ArrowDownRight size={24} />}
            {Math.abs(quote.change).toFixed(2)} ({Math.abs(quote.changePercent).toFixed(2)}%)
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-surface border border-border rounded-3xl p-4 sm:p-6 mb-8 shadow-sm h-[400px]">
        <Chart data={historicalData} />
      </div>

      {/* Portfolio Info & Trade Action */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-1 bg-surface border border-border rounded-3xl p-6 shadow-sm flex flex-col justify-center">
          <div className="flex justify-between items-center mb-4">
            <span className="text-text-3 font-medium">Your Balance</span>
            <span className="text-text-1 font-bold text-xl">₹{userBalance.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-3 font-medium">Shares Owned</span>
            <span className="text-text-1 font-bold text-xl">{positionQuantity}</span>
          </div>
        </div>

        <div className="flex-1 bg-surface-2 border border-border rounded-3xl p-6 shadow-sm flex flex-col justify-center items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 hover:bg-primary-light active:scale-95 transition-all text-lg"
          >
            Trade {quote.symbol}
          </button>
        </div>
      </div>

      <TradeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        quote={quote}
        userBalance={userBalance}
        currentPositionQuantity={positionQuantity}
      />
    </div>
  )
}
