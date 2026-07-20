import YahooFinance from 'yahoo-finance2'

const yf = new YahooFinance({ suppressNotices: ['yahooSurvey'] })

async function run() {
  const result = await yf.search('NIFTY 50', { newsCount: 1 }) as any
  if (result.news.length > 0) {
    const item = result.news[0]
    console.log('providerPublishTime type:', typeof item.providerPublishTime)
    console.log('providerPublishTime value:', item.providerPublishTime)
    console.log('Is Date?', item.providerPublishTime instanceof Date)
  }
}
run()
