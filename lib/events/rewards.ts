import { db } from '@/lib/db'
import { getActiveEvents } from './calendar'
import { awardCustomXP } from '@/lib/xp'

/**
 * Checks if there are active events today and awards bonus XP to the user.
 * This should ideally be called once a day per user (e.g. on login).
 */
export async function processEventRewards(userId: string) {
  const activeEvents = getActiveEvents()

  if (activeEvents.length === 0) return { awarded: 0, events: [] }

  let totalBonus = 0
  const eventNames: string[] = []

  for (const event of activeEvents) {
    // In a real app, we would track if this specific event bonus was already claimed today
    // by checking XPHistory to prevent duplicate daily claims.
    const alreadyClaimed = await db.xPHistory.findFirst({
      where: {
        userId,
        reason: 'EVENT_BONUS',
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0))
        }
      }
    })

    if (!alreadyClaimed) {
      await awardCustomXP(userId, event.bonusXP, 'EVENT_BONUS')
      totalBonus += event.bonusXP
      eventNames.push(event.name)
    }
  }

  return {
    awarded: totalBonus,
    events: eventNames
  }
}
