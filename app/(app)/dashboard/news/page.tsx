import { Newspaper, TrendingUp, TrendingDown, Clock, ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'
import { getMarketNews } from '@/lib/market/news'

export const metadata: Metadata = {
  title: 'Market News | StockUp',
}

export default async function NewsPage() {
  const newsList = await getMarketNews('India Stock Market NSE BSE')

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-text-1 flex items-center gap-3">
          <Newspaper className="text-primary" size={32} />
          Market News
        </h1>
        <p className="text-text-3 mt-1 text-sm">Stay updated with the latest market trends and financial headlines.</p>
      </div>

      {newsList.length === 0 ? (
        <div className="bg-surface border border-border rounded-2xl p-8 text-center text-text-3">
          <Newspaper size={48} className="mx-auto mb-4 opacity-50" />
          <p>No news available at the moment. Please try again later.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {newsList.map((news) => (
            <a 
              key={news.id} 
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-surface border border-border rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group cursor-pointer"
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
                  
                  <h3 className="text-xl font-bold text-text-1 group-hover:text-primary transition-colors flex items-center gap-2">
                    {news.title}
                    <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </h3>
                  
                  <p className="text-sm text-text-2 leading-relaxed">
                    {news.summary}
                  </p>

                  {news.related.length > 0 && (
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-xs font-semibold text-text-3">Related:</span>
                      {news.related.map((ticker: string) => (
                        <span key={ticker} className="text-xs bg-surface-2 border border-border px-2 py-1 rounded-md text-text-2">
                          ${ticker}
                        </span>
                      ))}
                    </div>
                  )}
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
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
