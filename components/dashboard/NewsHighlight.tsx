import Link from 'next/link'
import { Newspaper, ArrowRight, ExternalLink } from 'lucide-react'

export interface NewsItem {
  id: string
  headline: string
  source: string
  time: string
}

// Temporary mock data for Phase 3
const mockNews: NewsItem[] = [
  {
    id: '1',
    headline: 'RBI holds repo rate steady at 6.5%, maintains withdrawal of accommodation stance',
    source: 'Moneycontrol',
    time: '2h ago'
  },
  {
    id: '2',
    headline: 'Tech stocks rally as quarterly earnings beat expectations',
    source: 'Economic Times',
    time: '4h ago'
  },
  {
    id: '3',
    headline: 'Understanding the impact of the new EV policy on auto stocks',
    source: 'Mint',
    time: '6h ago'
  }
]

export function NewsHighlight() {
  return (
    <article className="p-5 rounded-2xl bg-surface-2 border border-border/50 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Newspaper size={18} className="text-primary" />
          <h3 className="font-display font-semibold text-text-1">Market Buzz</h3>
        </div>
        <Link href="/news" className="text-sm font-medium text-primary hover:text-primary-light transition-colors flex items-center gap-1">
          All news <ArrowRight size={14} />
        </Link>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {mockNews.map((news) => (
          <Link 
            key={news.id} 
            href="/news" // In reality, this might open a modal or external link
            className="group flex flex-col gap-1 border-l-2 border-border pl-3 hover:border-primary transition-colors"
          >
            <h4 className="text-sm font-medium text-text-1 group-hover:text-primary-light transition-colors line-clamp-2 leading-snug">
              {news.headline}
            </h4>
            <div className="flex items-center gap-2 text-xs text-text-3 mt-1">
              <span className="font-medium text-text-2">{news.source}</span>
              <span>•</span>
              <span>{news.time}</span>
            </div>
          </Link>
        ))}
      </div>
    </article>
  )
}
