// ─────────────────────────────────────────────────────────────
// XP Engine — Award, calculate, and track experience points
// ─────────────────────────────────────────────────────────────

import { XP_REWARDS, XPEventType, LEVEL_XP_REQUIREMENTS } from '@/types'
import { db } from '@/lib/db'

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

/**
 * Calculate the level (1-7) for a given XP value
 */
export function calculateLevel(xp: number): number {
  let level = 1
  for (let i = LEVEL_XP_REQUIREMENTS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_XP_REQUIREMENTS[i]) {
      level = i + 1
      break
    }
  }
  return Math.min(level, 7)
}

/**
 * Get XP progress percentage within the current level (0–100)
 */
export function getProgressPercent(xp: number): number {
  const level = calculateLevel(xp)
  if (level >= 7) return 100

  const currentLevelXP = LEVEL_XP_REQUIREMENTS[level - 1]
  const nextLevelXP = LEVEL_XP_REQUIREMENTS[level]
  const progress = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100
  return Math.round(Math.min(Math.max(progress, 0), 100))
}
