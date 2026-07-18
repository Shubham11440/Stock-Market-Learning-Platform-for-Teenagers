import { db } from '@/lib/db'

export async function createDuel(challengerId: string, opponentId: string, picks: string[]) {
  if (challengerId === opponentId) {
    throw new Error('You cannot challenge yourself.')
  }

  // Check if there is already a PENDING duel between these two
  const existingDuel = await db.duel.findFirst({
    where: {
      challengerId,
      opponentId,
      status: 'PENDING'
    }
  })

  if (existingDuel) {
    throw new Error('You already have a pending duel challenge with this user.')
  }

  const duel = await db.duel.create({
    data: {
      challengerId,
      opponentId,
      status: 'PENDING',
      picks: { challenger: picks, opponent: [] }
    }
  })

  return duel
}

export async function acceptDuel(duelId: string, opponentId: string, picks: string[]) {
  const duel = await db.duel.findUnique({ where: { id: duelId } })
  
  if (!duel) throw new Error('Duel not found.')
  if (duel.opponentId !== opponentId) throw new Error('You are not authorized to accept this duel.')
  if (duel.status !== 'PENDING') throw new Error('Duel is no longer pending.')

  const existingPicks = duel.picks as { challenger: string[], opponent: string[] }
  
  const updatedDuel = await db.duel.update({
    where: { id: duelId },
    data: {
      status: 'ACTIVE',
      startAt: new Date(),
      // Duel ends exactly 24 hours from now
      endAt: new Date(Date.now() + 24 * 60 * 60 * 1000), 
      picks: {
        challenger: existingPicks.challenger,
        opponent: picks
      }
    }
  })

  return updatedDuel
}

export async function cancelDuel(duelId: string, userId: string) {
  const duel = await db.duel.findUnique({ where: { id: duelId } })
  if (!duel) throw new Error('Duel not found.')
  
  if (duel.challengerId !== userId && duel.opponentId !== userId) {
    throw new Error('Unauthorized')
  }

  if (duel.status !== 'PENDING') {
    throw new Error('Can only cancel pending duels.')
  }

  await db.duel.update({
    where: { id: duelId },
    data: { status: 'CANCELLED' }
  })
}

/**
 * MVP Mock Resolution: Resolves a duel randomly immediately for testing purposes.
 */
export async function mockResolveDuel(duelId: string) {
  const duel = await db.duel.findUnique({ where: { id: duelId } })
  if (!duel) throw new Error('Duel not found.')
  if (duel.status !== 'ACTIVE') throw new Error('Can only resolve ACTIVE duels.')

  // Random winner for MVP testing
  const winnerId = Math.random() > 0.5 ? duel.challengerId : duel.opponentId

  await db.$transaction(async (tx) => {
    // Complete duel
    await tx.duel.update({
      where: { id: duelId },
      data: {
        status: 'COMPLETED',
        winnerId,
      }
    })

    // Award XP to winner
    await tx.user.update({
      where: { id: winnerId },
      data: { xp: { increment: duel.xpReward } }
    })
    
    // Log XP History
    await tx.xPHistory.create({
      data: {
        userId: winnerId,
        amount: duel.xpReward,
        reason: 'DUEL'
      }
    })
  })

  return winnerId
}

export async function getUserDuels(userId: string) {
  return db.duel.findMany({
    where: {
      OR: [
        { challengerId: userId },
        { opponentId: userId }
      ]
    },
    include: {
      challenger: { select: { name: true, image: true, level: true } },
      opponent: { select: { name: true, image: true, level: true } }
    },
    orderBy: { createdAt: 'desc' }
  })
}
