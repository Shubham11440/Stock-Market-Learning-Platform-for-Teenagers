import { Newspaper, TrendingUp, TrendingDown, Clock } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Market News | StockUp',
}

// Temporary mock data until the real news API is implemented
const mockNews = [
  {
    id: 1,
    title: 'Tech Stocks Rally on AI Announcements',
    summary: 'Major tech companies saw significant gains today as new artificial intelligence features were revealed at the annual developer conference.',
    source: 'Financial Times',
    time: '2 hours ago',
    sentiment: 'positive',
    related: ['AAPL', 'MSFT', 'GOOGL']
  },
  {
    id: 2,
    title: 'Central Bank Keeps Rates Steady',
    summary: 'In a highly anticipated decision, the central bank opted to maintain current interest rates, signaling confidence in inflation control.',
    source: 'Wall Street Journal',
    time: '4 hours ago',
    sentiment: 'neutral',
    related: ['SPY', 'QQQ']
  },
  {
    id: 3,
    title: 'Retail Sector Faces Headwinds Amid Supply Chain Woes',
    summary: 'Retail giants warn of lower margins for the upcoming quarter due to persistent global supply chain disruptions.',
    source: 'Bloomberg',
    time: '6 hours ago',
    sentiment: 'negative',
    related: ['WMT', 'TGT']
  }
]

export default function NewsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-text-1 flex items-center gap-3">
          <Newspaper className="text-primary" size={32} />
          Market News
        </h1>
        <p className="text-text-3 mt-1 text-sm">Stay updated with the latest market trends and financial headlines.</p>
      </div>

      <div className="space-y-4">
        {mockNews.map((news) => (
          <article 
            key={news.id} 
            className="bg-surface border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                    {news.source}
                  </span>
                  <span className="text-xs text-text-3 flex items-center gap-1">
                    <Clock size={12} />
                    {news.time}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-text-1 group-hover:text-primary transition-colors">
                  {news.title}
                </h3>
                
                <p className="text-sm text-text-2 leading-relaxed">
                  {news.summary}
                </p>

                <div className="flex items-center gap-2 pt-2">
                  <span className="text-xs font-semibold text-text-3">Related:</span>
                  {news.related.map(ticker => (
                    <span key={ticker} className="text-xs bg-surface-2 border border-border px-2 py-1 rounded-md text-text-2">
                      ${ticker}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0 flex sm:flex-col items-center justify-center sm:justify-start gap-2 sm:border-l border-border sm:pl-6 pt-4 sm:pt-0">
                {news.sentiment === 'positive' && (
                  <div className="flex items-center gap-1 text-profit bg-profit/10 px-3 py-1.5 rounded-lg text-sm font-semibold">
                    <TrendingUp size={16} />
                    Bullish
                  </div>
                )}
                {news.sentiment === 'negative' && (
                  <div className="flex items-center gap-1 text-loss bg-loss/10 px-3 py-1.5 rounded-lg text-sm font-semibold">
                    <TrendingDown size={16} />
                    Bearish
                  </div>
                )}
                {news.sentiment === 'neutral' && (
                  <div className="flex items-center gap-1 text-text-2 bg-surface-2 px-3 py-1.5 rounded-lg text-sm font-semibold">
                    <TrendingUp size={16} className="rotate-90 opacity-50" />
                    Neutral
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="text-center pt-8 border-t border-border">
        <p className="text-sm text-text-3">Real-time news API integration coming soon in a future phase.</p>
      </div>
    </div>
  )
}
