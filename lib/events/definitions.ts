export interface MarketEvent {
  id: string
  name: string
  description: string
  bonusXP: number
  startMonth: number // 1-12
  startDay: number   // 1-31
  endMonth: number
  endDay: number
}

// Data-driven approach to market events
export const MARKET_EVENTS: MarketEvent[] = [
  {
    id: "budget-day",
    name: "Union Budget Day",
    description: "The Finance Minister presents the Union Budget. Massive market volatility expected!",
    bonusXP: 250,
    startMonth: 2,
    startDay: 1,
    endMonth: 2,
    endDay: 2
  },
  {
    id: "financial-literacy-month",
    name: "Financial Literacy Month",
    description: "April is Financial Literacy Month. Earn double XP on all lessons!",
    bonusXP: 100,
    startMonth: 4,
    startDay: 1,
    endMonth: 4,
    endDay: 30
  },
  {
    id: "diwali-muhurat",
    name: "Diwali Muhurat Trading",
    description: "An auspicious hour of trading on Diwali. Log in to claim your blessing!",
    bonusXP: 500,
    startMonth: 10,
    startDay: 25,
    endMonth: 11,
    endDay: 15
  }
]
