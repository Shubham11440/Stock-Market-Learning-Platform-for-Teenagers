import YahooFinance from 'yahoo-finance2'

// yahoo-finance2 v4 requires class instantiation
const yf = new YahooFinance({ suppressNotices: ['yahooSurvey'] })

export interface NewsArticle {
  id: string
  title: string
  summary: string
  source: string
  time: string
  sentiment: 'positive' | 'negative' | 'neutral'
  related: string[]
  url: string
}

export async function getMarketNews(query: string = 'NIFTY 50'): Promise<NewsArticle[]> {
  try {
    const result = await yf.search(query, { newsCount: 15 }) as any

    if (!result || !result.news) {
      return []
    }

    return result.news.map((item: any, index: number) => {
      const titleLower = item.title.toLowerCase()
      let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral'
      if (titleLower.includes('rally') || titleLower.includes('gain') || titleLower.includes('soar') || titleLower.includes('up')) {
        sentiment = 'positive'
      } else if (titleLower.includes('fall') || titleLower.includes('drop') || titleLower.includes('loss') || titleLower.includes('down')) {
        sentiment = 'negative'
      }

      let timeString = 'Recently'
      if (item.providerPublishTime) {
        const publishDate = item.providerPublishTime instanceof Date 
          ? item.providerPublishTime 
          : new Date(item.providerPublishTime * (typeof item.providerPublishTime === 'number' && item.providerPublishTime < 10000000000 ? 1000 : 1))
          
        const hoursAgo = Math.floor((Date.now() - publishDate.getTime()) / (1000 * 60 * 60))
        
        if (hoursAgo < 0) {
          timeString = 'Just now'
        } else if (hoursAgo === 0) {
          timeString = 'Just now'
        } else if (hoursAgo < 24) {
          timeString = `${hoursAgo} hours ago`
        } else {
          timeString = `${Math.floor(hoursAgo / 24)} days ago`
        }
      }

      return {
        id: item.uuid || index.toString(),
        title: item.title,
        summary: item.summary || item.title,
        source: item.publisher || 'Financial News',
        time: timeString,
        sentiment,
        related: item.relatedTickers?.slice(0, 3) || [],
        url: item.link
      }
    })
  } catch (error) {
    console.error('[NEWS_FETCH_ERROR]', error)
    return []
  }
}
