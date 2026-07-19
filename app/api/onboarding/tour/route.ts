import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { status } = body // 'started', 'skipped', 'completed'

    if (!['started', 'skipped', 'completed'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Basic tracking (console for now, can be hooked into PostHog later)
    console.log(`[Tour Analytics] User ${user.id} ${status} the tour.`)

    if (status === 'started') {
      return NextResponse.json({ success: true, message: 'Started' })
    }

    if (status === 'skipped') {
      await db.user.update({
        where: { id: user.id },
        data: {
          hasCompletedTour: true,
          tourCompletedAt: new Date(),
        },
      })
      return NextResponse.json({ success: true, message: 'Skipped' })
    }

    if (status === 'completed') {
      // 1. Ensure the Explorer Badge exists
      const badge = await db.badge.upsert({
        where: { id: 'badge-explorer' },
        update: {},
        create: {
          id: 'badge-explorer',
          name: 'Explorer',
          description: 'Completed the StockUp onboarding tour.',
          icon: '🗺️',
          rarity: 'COMMON',
          condition: { type: 'tour_completed' },
        },
      })

      // 2. Wrap in transaction to award XP and Badge, and update user flags
      await db.$transaction(async (tx: any) => {
        // Mark tour as completed
        await tx.user.update({
          where: { id: user.id },
          data: {
            hasCompletedTour: true,
            tourCompletedAt: new Date(),
            xp: { increment: 50 },
          },
        })

        // Award badge if they don't already have it
        const existingBadge = await tx.userBadge.findUnique({
          where: {
            userId_badgeId: {
              userId: user.id,
              badgeId: badge.id,
            },
          },
        })

        if (!existingBadge) {
          await tx.userBadge.create({
            data: {
              userId: user.id,
              badgeId: badge.id,
            },
          })
        }

        // Add XP History record
        await tx.xPHistory.create({
          data: {
            userId: user.id,
            amount: 50,
            reason: 'TOUR',
          },
        })
      })

      return NextResponse.json({ success: true, message: 'Completed' })
    }

    return NextResponse.json({ error: 'Unhandled status' }, { status: 400 })
  } catch (error) {
    console.error('Tour API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
