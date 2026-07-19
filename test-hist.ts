import YahooFinance from 'yahoo-finance2'

const yf = new YahooFinance({ suppressNotices: ['yahooSurvey', 'ripHistorical'] })

async function run() {
  try {
    const symbol = 'RELIANCE.NS'
    const period1 = new Date()
    period1.setMonth(period1.getMonth() - 1)
    
    console.log("Fetching chart for", symbol)
    
    const raw = await yf.chart(symbol, {
      period1: period1,
      interval: '1d',
    })
    console.log("Quotes length:", raw.quotes.length)
    if (raw.quotes.length > 0) {
      console.log(raw.quotes[0])
    }
  } catch (e) {
    console.error(e)
  }
}
run()
