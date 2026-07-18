import { MARKET_EVENTS, MarketEvent } from './definitions'

/**
 * Checks if a specific date falls within any active market events.
 * Returns an array of active events.
 */
export function getActiveEvents(date: Date = new Date()): MarketEvent[] {
  const month = date.getMonth() + 1 // 1-12
  const day = date.getDate()

  return MARKET_EVENTS.filter((event) => {
    // Basic check for events spanning across the same month
    if (event.startMonth === event.endMonth) {
      return month === event.startMonth && day >= event.startDay && day <= event.endDay
    }

    // Check for events spanning across different months
    if (month > event.startMonth && month < event.endMonth) {
      return true
    }
    
    if (month === event.startMonth && day >= event.startDay) {
      return true
    }

    if (month === event.endMonth && day <= event.endDay) {
      return true
    }

    return false
  })
}
