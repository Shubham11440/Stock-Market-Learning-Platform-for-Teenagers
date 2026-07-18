'use server'

import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import * as duels from '@/lib/social/duels'

export async function challengeUserAction(opponentId: string, picks: string[]) {
  try {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Unauthorized')

    if (picks.length !== 3) {
      throw new Error('You must select exactly 3 stocks for a duel.')
    }

    await duels.createDuel(session.user.id, opponentId, picks)
    
    revalidatePath('/dashboard/social')
    return { success: true, message: 'Challenge sent successfully!' }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to send challenge' }
  }
}

export async function acceptDuelAction(duelId: string, picks: string[]) {
  try {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Unauthorized')

    if (picks.length !== 3) {
      throw new Error('You must select exactly 3 stocks for a duel.')
    }

    await duels.acceptDuel(duelId, session.user.id, picks)
    
    revalidatePath('/dashboard/social')
    return { success: true, message: 'Duel accepted! The 24-hour match begins now.' }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to accept duel' }
  }
}

export async function cancelDuelAction(duelId: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Unauthorized')

    await duels.cancelDuel(duelId, session.user.id)
    
    revalidatePath('/dashboard/social')
    return { success: true, message: 'Duel cancelled.' }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to cancel duel' }
  }
}

export async function resolveMockDuelAction(duelId: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Unauthorized')

    const winnerId = await duels.mockResolveDuel(duelId)
    
    revalidatePath('/dashboard/social')
    const won = winnerId === session.user.id
    return { 
      success: true, 
      message: won ? 'You WON the duel! XP has been awarded.' : 'You lost the duel. Better luck next time!' 
    }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to resolve duel' }
  }
}
