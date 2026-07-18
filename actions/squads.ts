'use server'

import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import * as membership from '@/lib/social/membership'

export async function createSquadAction(name: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Unauthorized')

    if (!name || name.trim().length < 3) {
      throw new Error('Squad name must be at least 3 characters.')
    }

    const squad = await membership.createSquad(session.user.id, name.trim())
    
    revalidatePath('/dashboard/social')
    return {
      success: true,
      message: `Squad "${squad.name}" created successfully! Invite code: ${squad.code}`
    }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to create squad' }
  }
}

export async function joinSquadAction(code: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Unauthorized')

    if (!code || code.trim().length !== 6) {
      throw new Error('Invite code must be exactly 6 characters.')
    }

    const { squad } = await membership.joinSquad(session.user.id, code.trim().toUpperCase())
    
    revalidatePath('/dashboard/social')
    return {
      success: true,
      message: `Successfully joined "${squad.name}"!`
    }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to join squad' }
  }
}

export async function leaveSquadAction() {
  try {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Unauthorized')

    const result = await membership.leaveSquad(session.user.id)
    
    revalidatePath('/dashboard/social')
    if (result.action === 'DELETED') {
      return { success: true, message: 'You left the squad. As the last member, the squad was disbanded.' }
    }
    return { success: true, message: 'You have left the squad.' }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to leave squad' }
  }
}
