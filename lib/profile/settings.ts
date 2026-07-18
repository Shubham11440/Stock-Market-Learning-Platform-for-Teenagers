import { db } from '@/lib/db'
import { Theme, GoalType } from '@/types'

export interface UpdateSettingsPayload {
  name?: string
  theme?: Theme | 'system'
  goalType?: GoalType | null
  publicProfile?: boolean
  showPortfolio?: boolean
  showSquad?: boolean
  featuredBadgeId?: string | null
}

export async function updateUserSettings(userId: string, data: UpdateSettingsPayload) {
  return await db.user.update({
    where: { id: userId },
    data
  })
}
