import Link from 'next/link'
import { ArrowUpRight, TrendingUp, Wallet } from 'lucide-react'

export interface PortfolioSnapshotProps {
  balance: number
}

export function PortfolioSnapshot({ balance }: PortfolioSnapshotProps) {
  // Format to Indian Rupee
  const formattedBalance = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(balance)

  return (
    <article className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-2 to-surface border border-border/50 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 relative z-10">
        
        <div>
          <div className="flex items-center gap-2 text-text-2 mb-2">
            <Wallet size={16} />
            <span className="text-sm font-medium">Virtual Portfolio</span>
          </div>
          
          <div className="flex items-baseline gap-3">
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-text-1 tracking-tight">
              {formattedBalance}
            </h2>
            {/* Hardcoded daily return placeholder for Phase 3 */}
            <span className="flex items-center text-sm font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-md">
              <TrendingUp size={14} className="mr-1" />
              +0.00%
            </span>
          </div>
        </div>

        <div className="flex gap-3 mt-2 sm:mt-0">
          <Link
            href="/portfolio"
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-surface-2 transition-colors text-center"
          >
            View Details
          </Link>
          <Link
            href="/trade"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors"
          >
            Trade
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      {/* Placeholder for future Recharts Graph (Phase 6) */}
      <div className="mt-8 h-32 w-full relative">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent rounded-b-xl" />
        {/* Decorative static wave to represent a chart temporarily */}
        <svg
          viewBox="0 0 100 25"
          preserveAspectRatio="none"
          className="w-full h-full text-primary-light/20 drop-shadow-[0_0_15px_rgba(124,58,237,0.2)]"
        >
          <path
            d="M0,25 C20,10 40,25 60,15 C80,5 90,20 100,10 L100,25 L0,25 Z"
            fill="currentColor"
          />
          <path
            d="M0,25 C20,10 40,25 60,15 C80,5 90,20 100,10"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-primary-light"
          />
        </svg>
      </div>
    </article>
  )
}
