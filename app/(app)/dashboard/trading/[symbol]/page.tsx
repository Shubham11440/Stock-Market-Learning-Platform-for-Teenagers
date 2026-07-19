import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { getQuote, getHistorical } from '@/lib/market/yahoo'
import { redirect } from 'next/navigation'
import { TradeUIWrapper } from '@/components/trading/TradeUIWrapper'
import Link from 'next/link'
import { ArrowLeft, SearchX } from 'lucide-react'

export const runtime = 'nodejs'

// Attempt to resolve a Yahoo Finance symbol, trying common suffixes for Indian stocks
async function resolveSymbol(raw: string): Promise<{ symbol: string; quote: Awaited<ReturnType<typeof getQuote>> }> {
  // 1. Try the symbol as-is
  let quote = await getQuote(raw)
  if (quote) return { symbol: raw, quote }

  // 2. If no dot suffix, try appending common exchange suffixes
  if (!raw.includes('.')) {
    for (const suffix of ['.NS', '.BO']) {
      const candidate = `${raw}${suffix}`
      quote = await getQuote(candidate)
      if (quote) return { symbol: candidate, quote }
    }
  }

  return { symbol: raw, quote: null }
}

function StockNotFound({ symbol }: { symbol: string }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/dashboard/trading"
        className="inline-flex items-center gap-2 text-text-3 hover:text-text-1 transition-colors mb-10 text-sm font-medium"
      >
        <ArrowLeft size={16} /> Back to Search
      </Link>
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 rounded-2xl bg-surface-2 border border-border flex items-center justify-center mb-6">
          <SearchX size={36} className="text-text-3" />
        </div>
        <h1 className="font-display font-bold text-2xl text-text-1 mb-3">Stock Not Found</h1>
        <p className="text-text-2 max-w-sm mb-2">
          We couldn't find a stock with the symbol{' '}
          <span className="font-bold text-text-1 font-mono">{symbol}</span>.
        </p>
        <p className="text-text-3 text-sm mb-8 max-w-sm">
          For Indian stocks, try the exchange suffix — e.g.{' '}
          <span className="font-mono text-primary">RELIANCE.NS</span> for NSE or{' '}
          <span className="font-mono text-primary">RELIANCE.BO</span> for BSE.
        </p>
        <Link
          href="/dashboard/trading"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors"
        >
          <ArrowLeft size={16} /> Search Stocks
        </Link>
      </div>
    </div>
  )
}

// Next.js 15+ requires params to be awaited
export default async function StockPage({ params }: { params: Promise<{ symbol: string }> }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  // IMPORTANT: In Next.js 15+, params is a Promise — must be awaited
  const { symbol: rawSymbol } = await params

  // Defensive guard — should never happen in a valid dynamic route
  if (!rawSymbol) {
    return <StockNotFound symbol="(unknown)" />
  }

  // Decode URL-encoded symbols (e.g. RELIANCE%2ENS → RELIANCE.NS)
  const decodedSymbol = decodeURIComponent(rawSymbol).toUpperCase()

  // Resolve the symbol with auto-suffix fallback
  const { symbol: resolvedSymbol, quote } = await resolveSymbol(decodedSymbol)

  if (!quote) {
    return <StockNotFound symbol={decodedSymbol} />
  }

  // Fetch all remaining data in parallel
  const [historicalData, user, position] = await Promise.all([
    getHistorical(resolvedSymbol, '1m'),
    db.user.findUnique({
      where: { id: session.user.id },
      select: { virtualBalance: true },
    }),
    db.position.findUnique({
      where: {
        userId_symbol_isVirtual: {
          userId: session.user.id,
          symbol: resolvedSymbol,
          isVirtual: true,
        },
      },
      select: { quantity: true },
    }),
  ])

  return (
    <TradeUIWrapper
      quote={quote}
      historicalData={historicalData}
      userBalance={user?.virtualBalance || 0}
      positionQuantity={position?.quantity || 0}
    />
  )
}
