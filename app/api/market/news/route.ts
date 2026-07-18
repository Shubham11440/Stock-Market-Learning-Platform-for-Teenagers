import { NextResponse } from 'next/server'
import { getMarketNews } from '@/lib/market/news'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('q') || 'Stock Market India'

    const news = await getMarketNews(query)
    return NextResponse.json({ news })
  } catch (error) {
    console.error('[NEWS_API_ERROR]', error)
    return NextResponse.json(
      { error: 'Failed to fetch market news' },
      { status: 500 }
    )
  }
}
