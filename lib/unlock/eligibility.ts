import { db } from '@/lib/db'

export const REAL_MONEY_UNLOCK_LEVEL = 10

export async function checkUnlockEligibility(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { level: true, unlockStatus: true }
  })

  if (!user) throw new Error("User not found")

  return {
    isEligible: user.level >= REAL_MONEY_UNLOCK_LEVEL,
    currentLevel: user.level,
    requiredLevel: REAL_MONEY_UNLOCK_LEVEL,
    currentStatus: user.unlockStatus
  }
}
