import YahooFinance from 'yahoo-finance2'

const yf = new YahooFinance({ suppressNotices: ['yahooSurvey'] })

async function run() {
  const result = await yf.search('^NSEI', { newsCount: 15 })
  console.log('^NSEI count:', result.news.length)
  const result2 = await yf.search('^BSESN', { newsCount: 15 })
  console.log('^BSESN count:', result2.news.length)
}
run()
