// ─────────────────────────────────────────────────────────────
// XP Engine — Award, calculate, and track experience points
// ─────────────────────────────────────────────────────────────

import { XP_REWARDS, XPEventType } from '@/types'
import { db } from '@/lib/db'
import { calculateLevel, getProgressPercent } from './xp-calc'

/**
 * Award XP to a user for a specific event based on XP_REWARDS table.
 * Updates XP and level in the database.
 * Returns the XP awarded and the new total.
 */
export async function awardXP(
  userId: string,
  eventType: XPEventType
): Promise<{ xpAwarded: number; newXP: number; newLevel: number; leveledUp: boolean }> {
  const xpAwarded = XP_REWARDS[eventType]

  const user = await db.user.findUniqueOrThrow({ where: { id: userId } })
  const oldLevel = calculateLevel(user.xp)
  const newXP = user.xp + xpAwarded
  const newLevel = calculateLevel(newXP)
  const leveledUp = newLevel > oldLevel

  await db.user.update({
    where: { id: userId },
    data: { xp: newXP, level: newLevel },
  })

  return { xpAwarded, newXP, newLevel, leveledUp }
}

/**
 * Award a custom amount of XP to a user.
 */
export async function awardCustomXP(
  userId: string,
  amount: number,
  reason: string = 'CUSTOM'
): Promise<{ xpAwarded: number; newXP: number; newLevel: number; leveledUp: boolean }> {
  const user = await db.user.findUniqueOrThrow({ where: { id: userId } })
  const oldLevel = calculateLevel(user.xp)
  const newXP = user.xp + amount
  const newLevel = calculateLevel(newXP)
  const leveledUp = newLevel > oldLevel

  await db.user.update({
    where: { id: userId },
    data: { xp: newXP, level: newLevel },
  })

  return { xpAwarded: amount, newXP, newLevel, leveledUp }
}

export { calculateLevel, getProgressPercent }
