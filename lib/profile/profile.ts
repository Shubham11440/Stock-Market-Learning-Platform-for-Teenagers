import { db } from '@/lib/db'

export async function getProfile(userId: string) {
  return await db.user.findUnique({
    where: { id: userId },
    include: {
      squad: {
        include: {
          squad: true
        }
      },
      badges: {
        include: {
          badge: true
        }
      },
      portfolio: {
        where: { quantity: { gt: 0 } }
      },
      transactions: true,
      progress: true
    }
  })
}

export async function getPublicProfile(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      image: true,
      level: true,
      xp: true,
      streak: true,
      publicProfile: true,
      showPortfolio: true,
      showSquad: true,
      featuredBadgeId: true,
      badges: {
        include: { badge: true }
      },
      squad: {
        include: { squad: true }
      },
      // We only include aggregates for public stats, not detailed history unless public
      portfolio: true, 
      progress: true,
      transactions: true
    }
  })

  if (!user || !user.publicProfile) {
    return null
  }

  // Sanitize the returned object based on user privacy settings
  return {
    ...user,
    portfolio: user.showPortfolio ? user.portfolio : [],
    squad: user.showSquad ? user.squad : null,
  }
}
