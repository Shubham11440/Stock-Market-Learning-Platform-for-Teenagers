import { LEVEL_XP_REQUIREMENTS } from '@/types'

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
