const fs = require('fs/promises')
const path = require('path')

const curriculum = {
  apprentice: [
    {
      id: "lesson-1",
      title: "What is a Broker?",
      description: "Learn how you actually place trades in the real world.",
      xpReward: 100,
      slides: [
        { id: "s1", title: "The Middleman", content: "You can't just walk into the stock exchange and buy shares. You need a broker—a middleman who is licensed to trade on the exchange." },
        { id: "s2", title: "Types of Brokers", content: "There are traditional full-service brokers (who give advice) and discount brokers (apps like Robinhood, Zerodha) which let you trade cheaply yourself." },
        { id: "s3", title: "Brokerage Accounts", content: "To start trading, you open a brokerage account, deposit money, and place orders through their app or website." }
      ],
      quiz: [
        {
          id: "q1",
          question: "What is a broker?",
          options: [
            { id: "o1", text: "A bank that loans money", isCorrect: false },
            { id: "o2", text: "A licensed middleman who places trades for you", isCorrect: true, explanation: "Brokers execute trades on your behalf." },
            { id: "o3", text: "The owner of the stock exchange", isCorrect: false }
          ]
        },
        {
          id: "q2",
          question: "Which of the following is a discount broker?",
          options: [
            { id: "o1", text: "A mobile app that lets you trade for a low flat fee", isCorrect: true, explanation: "Discount brokers offer low fees and self-service trading." },
            { id: "o2", text: "A personal financial advisor", isCorrect: false },
            { id: "o3", text: "The stock exchange itself", isCorrect: false }
          ]
        }
      ]
    },
    {
      id: "lesson-2",
      title: "Market Orders vs Limit Orders",
      description: "Learn the different ways to tell your broker to buy a stock.",
      xpReward: 120,
      slides: [
        { id: "s1", title: "The Market Order", content: "A Market Order tells your broker: 'Buy this stock right NOW at whatever the current price is.' It guarantees execution, but not the price." },
        { id: "s2", title: "The Limit Order", content: "A Limit Order tells your broker: 'Buy this stock ONLY if the price drops to $100.' It guarantees the price, but might never execute if the price never drops." },
        { id: "s3", title: "Which to choose?", content: "Use Market orders when you are in a rush to own the stock. Use Limit orders to avoid overpaying during volatile times." }
      ],
      quiz: [
        {
          id: "q1",
          question: "If you want to buy a stock right this second and don't care if you pay 5 cents more, you should use a...",
          options: [
            { id: "o1", text: "Limit Order", isCorrect: false },
            { id: "o2", text: "Market Order", isCorrect: true, explanation: "Market orders execute immediately at the best available current price." },
            { id: "o3", text: "Stop Order", isCorrect: false }
          ]
        }
      ]
    },
    {
      id: "lesson-3",
      title: "Dividends Explained",
      description: "How to make money just by holding a stock.",
      xpReward: 150,
      slides: [
        { id: "s1", title: "Sharing the Profits", content: "When a company makes a lot of profit, they can choose to give a portion of it directly to their shareholders. This cash payment is called a Dividend." },
        { id: "s2", title: "Passive Income", content: "Dividends are usually paid quarterly (4 times a year). If a company pays a $1 dividend per share, and you own 100 shares, you get $100 in cash!" },
        { id: "s3", title: "Dividend Yield", content: "The Dividend Yield is a percentage showing how much a company pays out each year relative to its stock price. A 4% yield is considered strong." }
      ],
      quiz: [
        {
          id: "q1",
          question: "What is a dividend?",
          options: [
            { id: "o1", text: "A fee you pay to the broker", isCorrect: false },
            { id: "o2", text: "A portion of company profits paid to shareholders", isCorrect: true, explanation: "Companies reward shareholders with cash dividends." },
            { id: "o3", text: "The difference between buy and sell price", isCorrect: false }
          ]
        },
        {
          id: "q2",
          question: "How often are dividends typically paid in the US?",
          options: [
            { id: "o1", text: "Daily", isCorrect: false },
            { id: "o2", text: "Quarterly (4 times a year)", isCorrect: true, explanation: "Most dividend-paying companies distribute cash quarterly." },
            { id: "o3", text: "Once every 10 years", isCorrect: false }
          ]
        }
      ]
    }
  ],
  analyst: [
    {
      id: "lesson-1",
      title: "Market Capitalization",
      description: "How do we measure the true size of a company?",
      xpReward: 150,
      slides: [
        { id: "s1", title: "Price vs Size", content: "A stock priced at $100 isn't necessarily a 'bigger' company than a stock priced at $50. It depends on how many total shares exist." },
        { id: "s2", title: "The Formula", content: "Market Cap = (Current Stock Price) × (Total Number of Outstanding Shares). This is the total price tag to buy the entire company." },
        { id: "s3", title: "Categories", content: "Mega-cap (Apple, Microsoft), Large-cap (over $10B), Mid-cap ($2B to $10B), and Small-cap (under $2B)." }
      ],
      quiz: [
        {
          id: "q1",
          question: "Company A has 1 million shares at $100. Company B has 10 million shares at $20. Which company is 'bigger' (higher market cap)?",
          options: [
            { id: "o1", text: "Company A", isCorrect: false },
            { id: "o2", text: "Company B", isCorrect: true, explanation: "B is worth 200 million (10m x $20). A is only worth 100 million (1m x $100)." },
            { id: "o3", text: "They are the same", isCorrect: false }
          ]
        }
      ]
    },
    {
      id: "lesson-2",
      title: "Introduction to P/E Ratio",
      description: "The most famous valuation metric in finance.",
      xpReward: 200,
      slides: [
        { id: "s1", title: "Price to Earnings", content: "The P/E ratio tells you how much investors are willing to pay for $1 of the company's profit." },
        { id: "s2", title: "How to calculate", content: "P/E = (Stock Price) / (Earnings Per Share). If a stock is $50 and earns $5 per share, its P/E is 10." },
        { id: "s3", title: "Is it expensive?", content: "A high P/E (like 50) means the stock is expensive, usually because investors expect huge future growth. A low P/E (like 8) might mean the stock is cheap, or the company is struggling." }
      ],
      quiz: [
        {
          id: "q1",
          question: "If a stock costs $100 and earns $2 per share, what is its P/E ratio?",
          options: [
            { id: "o1", text: "50", isCorrect: true, explanation: "$100 / $2 = 50." },
            { id: "o2", text: "200", isCorrect: false },
            { id: "o3", text: "2", isCorrect: false }
          ]
        },
        {
          id: "q2",
          question: "Generally, a very high P/E ratio suggests...",
          options: [
            { id: "o1", text: "The stock is cheap and undervalued", isCorrect: false },
            { id: "o2", text: "Investors expect high future growth", isCorrect: true, explanation: "Investors are willing to pay a premium today for big profits tomorrow." },
            { id: "o3", text: "The company is bankrupt", isCorrect: false }
          ]
        }
      ]
    },
    {
      id: "lesson-3",
      title: "What is an ETF?",
      description: "The ultimate tool for diversifying your portfolio.",
      xpReward: 200,
      slides: [
        { id: "s1", title: "Don't put all your eggs in one basket", content: "Buying a single stock is risky. If that company fails, you lose your money. Diversification means spreading your money across many companies." },
        { id: "s2", title: "Exchange Traded Funds", content: "An ETF is a basket of hundreds of different stocks bundled together. You can buy 1 share of an ETF, and you instantly own tiny pieces of hundreds of companies." },
        { id: "s3", title: "The S&P 500", content: "The most popular ETFs track the S&P 500—an index of the 500 largest companies in America. Buying an S&P 500 ETF is betting on the overall economy." }
      ],
      quiz: [
        {
          id: "q1",
          question: "What is an ETF?",
          options: [
            { id: "o1", text: "A single extremely safe tech company", isCorrect: false },
            { id: "o2", text: "A basket of many different stocks you can buy at once", isCorrect: true, explanation: "ETFs bundle multiple stocks into a single tradable asset." },
            { id: "o3", text: "A tax you pay to the government", isCorrect: false }
          ]
        },
        {
          id: "q2",
          question: "Why do investors love ETFs?",
          options: [
            { id: "o1", text: "They guarantee you will double your money in a week", isCorrect: false },
            { id: "o2", text: "They provide instant diversification and lower risk", isCorrect: true, explanation: "By holding many companies, the failure of one company doesn't ruin your portfolio." },
            { id: "o3", text: "They are completely free and pay massive dividends", isCorrect: false }
          ]
        }
      ]
    }
  ],
  strategist: [
    {
      id: "lesson-1",
      title: "Reading Candlestick Charts",
      description: "How to interpret the most famous stock charts.",
      xpReward: 250,
      slides: [
        { id: "s1", title: "More than just a line", content: "A basic line chart only shows the closing price. A 'Candlestick' shows the Open, High, Low, and Close (OHLC) for a specific time period (like one day)." },
        { id: "s2", title: "The Body and Wicks", content: "The thick 'body' shows the difference between the open and close price. The thin lines (wicks) on top and bottom show the highest and lowest price reached that day." },
        { id: "s3", title: "Green vs Red", content: "If the close is higher than the open, the candle is Green (Bullish). If the close is lower than the open, it's Red (Bearish)." }
      ],
      quiz: [
        {
          id: "q1",
          question: "What do the thin lines (wicks/shadows) on a candlestick represent?",
          options: [
            { id: "o1", text: "The opening and closing price", isCorrect: false },
            { id: "o2", text: "The highest and lowest prices reached during that period", isCorrect: true, explanation: "Wicks show the extremes of price movement before settling." },
            { id: "o3", text: "The volume of shares traded", isCorrect: false }
          ]
        },
        {
          id: "q2",
          question: "A green candlestick means...",
          options: [
            { id: "o1", text: "The closing price was higher than the opening price", isCorrect: true, explanation: "Green means the price went up during that session." },
            { id: "o2", text: "The closing price was lower than the opening price", isCorrect: false },
            { id: "o3", text: "The company paid a dividend", isCorrect: false }
          ]
        }
      ]
    },
    {
      id: "lesson-2",
      title: "Support and Resistance",
      description: "The invisible floors and ceilings of the market.",
      xpReward: 300,
      slides: [
        { id: "s1", title: "Support (The Floor)", content: "Support is a price level where a stock struggles to fall below. It's where buyers historically step in and think 'Wow, this is too cheap!' and start buying." },
        { id: "s2", title: "Resistance (The Ceiling)", content: "Resistance is a price level a stock struggles to break above. It's where sellers historically say 'Wow, this is expensive!' and start selling." },
        { id: "s3", title: "Breakouts", content: "If a stock finally smashes through a Resistance ceiling, it's called a 'Breakout'. That old ceiling often becomes the new floor (Support)!" }
      ],
      quiz: [
        {
          id: "q1",
          question: "A price level that a stock historically struggles to fall below is called...",
          options: [
            { id: "o1", text: "Resistance", isCorrect: false },
            { id: "o2", text: "Support", isCorrect: true, explanation: "Support acts as a floor holding the price up." },
            { id: "o3", text: "Breakout", isCorrect: false }
          ]
        },
        {
          id: "q2",
          question: "When a stock pushes past a major Resistance level, it is known as a...",
          options: [
            { id: "o1", text: "Breakout", isCorrect: true, explanation: "Breaking through resistance is a bullish sign called a breakout." },
            { id: "o2", text: "Correction", isCorrect: false },
            { id: "o3", text: "Dividend", isCorrect: false }
          ]
        }
      ]
    },
    {
      id: "lesson-3",
      title: "Moving Averages",
      description: "Smoothing out the chaos.",
      xpReward: 300,
      slides: [
        { id: "s1", title: "Market Noise", content: "Stock prices jump up and down crazily every day. To see the 'real' trend, traders use Moving Averages." },
        { id: "s2", title: "Simple Moving Average (SMA)", content: "A 50-day SMA takes the closing price of the last 50 days, adds them up, and divides by 50. It draws a smooth line on the chart." },
        { id: "s3", title: "The Golden Cross", content: "When a short-term SMA (like 50-day) crosses ABOVE a long-term SMA (like 200-day), it's called a Golden Cross—a highly bullish signal." }
      ],
      quiz: [
        {
          id: "q1",
          question: "Why do traders use Moving Averages?",
          options: [
            { id: "o1", text: "To calculate exactly how much money a company makes", isCorrect: false },
            { id: "o2", text: "To smooth out daily price fluctuations and identify the overall trend", isCorrect: true, explanation: "Moving averages filter out the noise of daily volatility." },
            { id: "o3", text: "To guarantee they buy at the lowest possible price", isCorrect: false }
          ]
        },
        {
          id: "q2",
          question: "What is a 'Golden Cross'?",
          options: [
            { id: "o1", text: "When you sell a stock for exactly double what you paid", isCorrect: false },
            { id: "o2", text: "When a short-term moving average crosses above a long-term moving average", isCorrect: true, explanation: "The Golden Cross is a famous technical indicator of a bull market." },
            { id: "o3", text: "When a long-term moving average crosses above a short-term one", isCorrect: false }
          ]
        }
      ]
    }
  ],
  trader: [
    {
      id: "lesson-1",
      title: "Short Selling",
      description: "How to make money when a stock goes down.",
      xpReward: 400,
      slides: [
        { id: "s1", title: "Betting against a company", content: "Normally you buy low and sell high. What if you think a company is garbage and the stock will crash? You can 'Short Sell' it." },
        { id: "s2", title: "How it works", content: "1. You BORROW shares from your broker. 2. You immediately SELL them at the high price. 3. Later, you BUY them back at the low price and RETURN them to the broker." },
        { id: "s3", title: "Infinite Risk", content: "When you buy a stock normally, the worst that happens is it goes to $0. When you short a stock, there is NO limit to how high the price can go. You could lose infinitely more money than you invested!" }
      ],
      quiz: [
        {
          id: "q1",
          question: "What is the correct order of operations for short selling?",
          options: [
            { id: "o1", text: "Buy low, then sell high", isCorrect: false },
            { id: "o2", text: "Borrow & sell high, then buy back low & return", isCorrect: true, explanation: "You sell first, and buy back later to cover your position." },
            { id: "o3", text: "Buy high, borrow low, return", isCorrect: false }
          ]
        },
        {
          id: "q2",
          question: "Why is short selling considered extremely risky?",
          options: [
            { id: "o1", text: "Because brokers charge a $1,000 fee to do it", isCorrect: false },
            { id: "o2", text: "Because a stock's price can technically rise infinitely, meaning infinite potential losses", isCorrect: true, explanation: "If you short a stock and it skyrockets (like GameStop), your losses have no cap." },
            { id: "o3", text: "Because the government monitors short sellers", isCorrect: false }
          ]
        }
      ]
    },
    {
      id: "lesson-2",
      title: "Margin Trading",
      description: "Trading with borrowed money.",
      xpReward: 400,
      slides: [
        { id: "s1", title: "Leverage", content: "If you have $1,000, your broker might let you buy $2,000 worth of stock by lending you the other $1,000. This is called 'Buying on Margin'." },
        { id: "s2", title: "Double Edged Sword", content: "If the stock goes up 10%, you made $200 on your $1,000 investment (a 20% gain!). But if it goes down 10%, you lost $200 (a 20% loss)." },
        { id: "s3", title: "The Margin Call", content: "If your stock drops too much, the broker gets nervous you can't pay them back. They will issue a 'Margin Call', forcing you to deposit cash immediately, or they will sell your stocks by force at a huge loss." }
      ],
      quiz: [
        {
          id: "q1",
          question: "What does it mean to 'Buy on Margin'?",
          options: [
            { id: "o1", text: "Buying a stock at the margin (edges) of the trading day", isCorrect: false },
            { id: "o2", text: "Borrowing money from your broker to buy more stock than you could normally afford", isCorrect: true, explanation: "Margin is leverage provided by your broker." },
            { id: "o3", text: "Buying only the cheapest stocks available", isCorrect: false }
          ]
        },
        {
          id: "q2",
          question: "What happens during a Margin Call?",
          options: [
            { id: "o1", text: "The broker calls you to congratulate you on your profits", isCorrect: false },
            { id: "o2", text: "You must immediately deposit more cash or the broker will forcefully sell your stocks", isCorrect: true, explanation: "The broker acts to protect their loaned money before your account goes negative." },
            { id: "o3", text: "You get a free stock from the broker", isCorrect: false }
          ]
        }
      ]
    },
    {
      id: "lesson-3",
      title: "Volume and Liquidity",
      description: "Why it matters how many people are trading.",
      xpReward: 400,
      slides: [
        { id: "s1", title: "Trading Volume", content: "Volume is the total number of shares traded in a day. Apple might have 50 million shares traded, while a tiny penny stock might only have 5,000." },
        { id: "s2", title: "High Liquidity", content: "High volume means High Liquidity. It's easy to buy or sell instantly at fair prices because there's always someone willing to trade with you." },
        { id: "s3", title: "The Danger of Low Liquidity", content: "If you own a stock with low liquidity, you might be stuck. When you want to sell, there might be NO buyers, forcing you to slash your price dramatically just to escape." }
      ],
      quiz: [
        {
          id: "q1",
          question: "What does 'Trading Volume' refer to?",
          options: [
            { id: "o1", text: "How loud the traders are shouting on the exchange floor", isCorrect: false },
            { id: "o2", text: "The total number of shares bought and sold in a given time period", isCorrect: true, explanation: "Volume indicates the activity level of a stock." },
            { id: "o3", text: "The physical size of the company's headquarters", isCorrect: false }
          ]
        },
        {
          id: "q2",
          question: "Why is High Liquidity good for a trader?",
          options: [
            { id: "o1", text: "It guarantees the stock price will go up", isCorrect: false },
            { id: "o2", text: "It means you can enter and exit trades easily and quickly without drastically affecting the price", isCorrect: true, explanation: "Liquidity ensures you can always find a buyer or seller." },
            { id: "o3", text: "It means the company pays high dividends", isCorrect: false }
          ]
        }
      ]
    }
  ],
  investor: [
    {
      id: "lesson-1",
      title: "Value vs Growth Investing",
      description: "Two fundamentally different philosophies.",
      xpReward: 500,
      slides: [
        { id: "s1", title: "Value Investing", content: "Value investors look for 'cheap' companies. These companies might be boring (like banks or oil), but their stock price is artificially low compared to the actual cash they make. Think Warren Buffett." },
        { id: "s2", title: "Growth Investing", content: "Growth investors look for companies expanding rapidly (like tech startups or AI). They are willing to pay very high prices today because they believe the company will be massive tomorrow." },
        { id: "s3", title: "The Tradeoff", content: "Value stocks often pay dividends and are safer in crashes. Growth stocks can crash hard, but also have the potential to return 1000% if they succeed." }
      ],
      quiz: [
        {
          id: "q1",
          question: "A company with negative profits but revenue growing 50% year-over-year is most likely attractive to a...",
          options: [
            { id: "o1", text: "Value Investor", isCorrect: false },
            { id: "o2", text: "Growth Investor", isCorrect: true, explanation: "Growth investors prioritize massive future potential over current profits." },
            { id: "o3", text: "Dividend Investor", isCorrect: false }
          ]
        },
        {
          id: "q2",
          question: "Which of these is a hallmark of a classic Value Stock?",
          options: [
            { id: "o1", text: "A very low P/E ratio and steady cash flow", isCorrect: true, explanation: "Value investors hunt for stocks trading for less than their intrinsic worth." },
            { id: "o2", text: "A brand new revolutionary technology", isCorrect: false },
            { id: "o3", text: "A P/E ratio over 200", isCorrect: false }
          ]
        }
      ]
    },
    {
      id: "lesson-2",
      title: "Index Funds & Passive Investing",
      description: "How to beat 90% of professional traders doing absolutely nothing.",
      xpReward: 500,
      slides: [
        { id: "s1", title: "The Brutal Truth", content: "Statistically, over a 10-year period, 90% of professional Wall Street fund managers fail to beat the overall market average (the S&P 500)." },
        { id: "s2", title: "The Index Fund", content: "An index fund is an ETF or mutual fund that simply buys everything in the S&P 500. It doesn't try to be smart or predict the future. It just matches the market." },
        { id: "s3", title: "Dollar Cost Averaging", content: "The ultimate strategy: Auto-invest $100 into an S&P 500 Index Fund every week, regardless of if the market is up or down. Over decades, compound interest will make you wealthy." }
      ],
      quiz: [
        {
          id: "q1",
          question: "What is an Index Fund?",
          options: [
            { id: "o1", text: "A fund run by an active manager who constantly trades", isCorrect: false },
            { id: "o2", text: "A passive fund designed to perfectly track a market index like the S&P 500", isCorrect: true, explanation: "Index funds don't pick winners; they just buy everything." },
            { id: "o3", text: "A secret fund only for billionaires", isCorrect: false }
          ]
        },
        {
          id: "q2",
          question: "What is Dollar Cost Averaging (DCA)?",
          options: [
            { id: "o1", text: "Investing a fixed amount of money on a regular schedule, ignoring short-term price changes", isCorrect: true, explanation: "DCA removes emotion and timing from investing." },
            { id: "o2", text: "Only investing when the market crashes", isCorrect: false },
            { id: "o3", text: "Selling all your stocks to average out your losses", isCorrect: false }
          ]
        },
        {
          id: "q3",
          question: "True or False: Most active professional fund managers beat the S&P 500 over a 10 year period.",
          options: [
            { id: "o1", text: "True", isCorrect: false },
            { id: "o2", text: "False", isCorrect: true, explanation: "Very few professionals beat the passive index over a long timeframe." }
          ]
        }
      ]
    }
  ],
  legend: [
    {
      id: "lesson-1",
      title: "Call Options",
      description: "The right to buy.",
      xpReward: 1000,
      slides: [
        { id: "s1", title: "Options Contracts", content: "An option is a contract. A 'Call Option' gives you the RIGHT, but not the obligation, to buy 100 shares of a stock at a specific 'Strike Price' by a certain 'Expiration Date'." },
        { id: "s2", title: "The Premium", content: "You pay a fee (the Premium) to buy this contract. If the stock explodes in value, you can exercise the contract to buy the shares at the cheap strike price!" },
        { id: "s3", title: "Extreme Leverage", content: "Options are incredibly powerful. A $500 option can become worth $5,000 in a day. BUT, if the stock doesn't reach the strike price before it expires, your option becomes worth exactly $0." }
      ],
      quiz: [
        {
          id: "q1",
          question: "What does a Call Option give you?",
          options: [
            { id: "o1", text: "The obligation to sell shares", isCorrect: false },
            { id: "o2", text: "The right (but not obligation) to buy shares at a specific price", isCorrect: true, explanation: "A call option is a bet that the price will go up." },
            { id: "o3", text: "A guaranteed dividend", isCorrect: false }
          ]
        },
        {
          id: "q2",
          question: "If your call option expires and the stock price is LOWER than your strike price, what happens?",
          options: [
            { id: "o1", text: "You must buy the shares anyway", isCorrect: false },
            { id: "o2", text: "The option expires worthless and you lose the premium you paid", isCorrect: true, explanation: "Out-of-the-money options expire with zero value." },
            { id: "o3", text: "The broker refunds your money", isCorrect: false }
          ]
        }
      ]
    },
    {
      id: "lesson-2",
      title: "Put Options",
      description: "The right to sell.",
      xpReward: 1000,
      slides: [
        { id: "s1", title: "The Put Option", content: "A 'Put Option' gives you the right to SELL 100 shares at a specific Strike Price. You buy a Put when you think the stock is going to CRASH." },
        { id: "s2", title: "Insurance", content: "Investors often buy Puts as insurance (hedging). If you own $100,000 of Apple stock, you can buy Put options. If Apple crashes, your stock loses value, but your Put options gain massive value, saving your portfolio!" },
        { id: "s3", title: "Zero Sum Game", content: "Options trading is a zero-sum game. For you to make $1,000 on an option trade, whoever sold you that contract lost $1,000." }
      ],
      quiz: [
        {
          id: "q1",
          question: "You would buy a Put Option if you believe...",
          options: [
            { id: "o1", text: "The stock price is going to crash", isCorrect: true, explanation: "Puts gain value as the underlying stock price falls." },
            { id: "o2", text: "The stock price is going to skyrocket", isCorrect: false },
            { id: "o3", text: "The stock will pay a high dividend", isCorrect: false }
          ]
        },
        {
          id: "q2",
          question: "Using options to protect your portfolio from a crash is known as...",
          options: [
            { id: "o1", text: "Short squeezing", isCorrect: false },
            { id: "o2", text: "Hedging", isCorrect: true, explanation: "Hedging is like buying insurance for your investments." },
            { id: "o3", text: "Averaging down", isCorrect: false }
          ]
        },
        {
          id: "q3",
          question: "If an option is a 'Zero Sum Game', that means...",
          options: [
            { id: "o1", text: "Every dollar won by a buyer is a dollar lost by a seller", isCorrect: true, explanation: "Options simply transfer money between participants." },
            { id: "o2", text: "Nobody makes money", isCorrect: false },
            { id: "o3", text: "The broker takes all the profits", isCorrect: false }
          ]
        }
      ]
    }
  ]
}

async function run() {
  const levelsDir = path.join(process.cwd(), 'content', 'levels')
  
  for (const [levelId, lessons] of Object.entries(curriculum)) {
    const dirPath = path.join(levelsDir, levelId)
    // Create directory if not exists
    await fs.mkdir(dirPath, { recursive: true })
    
    for (const lesson of lessons) {
      const filePath = path.join(dirPath, `${lesson.id}.json`)
      await fs.writeFile(filePath, JSON.stringify(lesson, null, 2))
      console.log(`Created ${levelId}/${lesson.id}.json`)
    }
  }
  console.log("Done generating all lessons!")
}

run().catch(console.error)
