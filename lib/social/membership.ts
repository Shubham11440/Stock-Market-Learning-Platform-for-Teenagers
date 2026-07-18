import { db } from '@/lib/db'
import { generateUniqueInviteCode } from './invite'

export async function createSquad(userId: string, name: string) {
  // 1. Check if user is already in a squad
  const existingMembership = await db.squadMember.findUnique({ where: { userId } })
  if (existingMembership) {
    throw new Error('You are already in a squad. Leave it first to create a new one.')
  }

  // 2. Check if name is taken
  const existingSquad = await db.squad.findUnique({ where: { name } })
  if (existingSquad) {
    throw new Error('A squad with this name already exists.')
  }

  // 3. Generate invite code
  const code = await generateUniqueInviteCode()

  // 4. Create Squad and SquadMember in a transaction
  const result = await db.$transaction(async (tx) => {
    const squad = await tx.squad.create({
      data: {
        name,
        code,
        members: {
          create: {
            userId,
            role: 'LEADER',
          }
        }
      },
      include: {
        members: true
      }
    })
    return squad
  })

  return result
}

export async function joinSquad(userId: string, code: string) {
  // 1. Check if user is already in a squad
  const existingMembership = await db.squadMember.findUnique({ where: { userId } })
  if (existingMembership) {
    throw new Error('You are already in a squad.')
  }

  // 2. Find the squad by code
  const squad = await db.squad.findUnique({ where: { code } })
  if (!squad) {
    throw new Error('Invalid or expired invite code.')
  }

  // 3. Join
  const member = await db.squadMember.create({
    data: {
      userId,
      squadId: squad.id,
      role: 'MEMBER',
    }
  })

  return { squad, member }
}

export async function leaveSquad(userId: string) {
  const membership = await db.squadMember.findUnique({
    where: { userId },
    include: { squad: { include: { members: true } } }
  })

  if (!membership) {
    throw new Error('You are not in a squad.')
  }

  const { squad } = membership
  
  if (membership.role === 'LEADER') {
    if (squad.members.length > 1) {
      throw new Error('You cannot leave as the leader while there are other members. Transfer leadership first or kick everyone.')
    } else {
      // Last member is the leader -> delete the squad entirely
      await db.squad.delete({ where: { id: squad.id } })
      return { action: 'DELETED' }
    }
  } else {
    // Normal member -> just delete the membership
    await db.squadMember.delete({ where: { userId } })
    return { action: 'LEFT' }
  }
}

export async function getSquadDetails(userId: string) {
  const membership = await db.squadMember.findUnique({
    where: { userId },
  })

  if (!membership) return null

  // Fetch squad with members and their XP
  const squad = await db.squad.findUnique({
    where: { id: membership.squadId },
    include: {
      members: {
        include: {
          user: {
            select: { id: true, name: true, image: true, xp: true, level: true }
          }
        },
        orderBy: { joinedAt: 'asc' }
      }
    }
  })

  return squad
}
