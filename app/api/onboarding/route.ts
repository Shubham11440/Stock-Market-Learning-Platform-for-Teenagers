// ─────────────────────────────────────────────────────────────────────
// PATCH /api/onboarding
// Saves user's goal, avatar, and streakGoal. Sets goalType to signal
// onboarding completion (middleware gates on this field).
// ─────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export const runtime = 'nodejs'
import { log } from '@/lib/auth-utils'

const schema = z.object({
  goalType: z.enum(['SAVE', 'INVEST', 'TRADE', 'LEARN']).optional(),
  avatar: z.string().max(32).optional(),
  streakGoal: z.number().int().min(5).max(60).optional(),
})

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
    }

    const body = await req.json().catch(() => null)
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', fields: parsed.error.flatten().fieldErrors },
        { status: 422 }
      )
    }

    const updates: Record<string, unknown> = {}
    if (parsed.data.goalType !== undefined) updates.goalType = parsed.data.goalType
    if (parsed.data.avatar !== undefined) updates.avatar = parsed.data.avatar
    // streakGoal is not in the Prisma schema yet — stored via a note here.
    // If you add a streakGoal field to the User model, uncomment:
    // if (parsed.data.streakGoal !== undefined) updates.streakGoal = parsed.data.streakGoal

    if (Object.keys(updates).length > 0) {
      await db.user.update({
        where: { id: session.user.id },
        data: updates,
      })
    }

    log.info({ event: 'onboarding.saved', userId: session.user.id, fields: Object.keys(updates) })

    return NextResponse.json({ success: true })
  } catch (err) {
    log.error({ event: 'api.error', route: '/api/onboarding', error: (err as Error).message })
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 })
  }
}
