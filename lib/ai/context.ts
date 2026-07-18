import { db } from '@/lib/db'

export interface UserContext {
  name: string
  level: number
  xp: number
  streak: number
  virtualBalance: number
  portfolioCount: number
}

/**
 * Builds a structured context string to inject into the AI system prompt.
 * This gives the AI awareness of the user's current progress and state.
 */
export async function buildUserContext(userId: string): Promise<string> {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      portfolio: {
        where: { quantity: { gt: 0 } }
      }
    }
  })

  if (!user) return ''

  const contextObj: UserContext = {
    name: user.name.split(' ')[0], // First name
    level: user.level,
    xp: user.xp,
    streak: user.streak,
    virtualBalance: user.virtualBalance,
    portfolioCount: user.portfolio.length
  }

  return `
CURRENT USER CONTEXT:
- Name: ${contextObj.name}
- Level: ${contextObj.level}
- XP: ${contextObj.xp}
- Daily Streak: ${contextObj.streak} days
- Available Cash: ₹${contextObj.virtualBalance.toLocaleString()}
- Active Portfolio Positions: ${contextObj.portfolioCount}
`
}
