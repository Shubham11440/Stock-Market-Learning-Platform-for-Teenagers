import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { getQuote, getHistorical } from '@/lib/market/yahoo'
import { notFound, redirect } from 'next/navigation'
import { TradeUIWrapper } from '@/components/trading/TradeUIWrapper'

export const runtime = 'nodejs'

export default async function StockPage({ params }: { params: { symbol: string } }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const { symbol } = params
  
  // Decoded symbol just in case (e.g. RELIANCE.NS)
  const decodedSymbol = decodeURIComponent(symbol).toUpperCase()

  // 1. Fetch Market Data Server-Side (Cached in our abstraction)
  const [quote, historicalData] = await Promise.all([
    getQuote(decodedSymbol),
    getHistorical(decodedSymbol, '1m')
  ])

  if (!quote) {
    notFound()
  }

  // 2. Fetch User Portfolio State
  // Sequential DB read in Server Component
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { virtualBalance: true }
  })

  const position = await db.position.findUnique({
    where: {
      userId_symbol_isVirtual: {
        userId: session.user.id,
        symbol: decodedSymbol,
        isVirtual: true
      }
    },
    select: { quantity: true }
  })

  return (
    <TradeUIWrapper 
      quote={quote}
      historicalData={historicalData}
      userBalance={user?.virtualBalance || 0}
      positionQuantity={position?.quantity || 0}
    />
  )
}
