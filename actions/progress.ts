'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { calculateLevel } from '@/lib/xp'

export async function saveLessonProgress(
  lessonId: string,
  score: number,
  totalQuestions: number,
  baseXpReward: number
) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  // Calculate XP (Simple proportional logic)
  let xpEarned = baseXpReward
  if (totalQuestions > 0) {
    const scoreRatio = score / totalQuestions
    if (scoreRatio < 0.5) {
      xpEarned = Math.floor(baseXpReward * 0.2) // 20% for trying
    } else if (scoreRatio === 1) {
      xpEarned = baseXpReward + 50 // Perfect score bonus
    } else {
      xpEarned = Math.floor(baseXpReward * scoreRatio) // Proportional
    }
  }

  try {
    const user = await db.user.findUniqueOrThrow({ where: { id: session.user.id } })
    
    // Check if progress already exists
    const existingProgress = await db.lessonProgress.findFirst({
      where: { userId: session.user.id, lessonId }
    })

    if (!existingProgress || !existingProgress.completed) {
      // Award XP
      const newXP = user.xp + xpEarned
      const newLevel = calculateLevel(newXP)
      const leveledUp = newLevel > user.level

      // Transaction: Update user XP and create/update lesson progress
      await db.$transaction([
        db.user.update({
          where: { id: session.user.id },
          data: { xp: newXP, level: newLevel },
        }),
        existingProgress 
          ? db.lessonProgress.update({
              where: { id: existingProgress.id },
              data: { completed: true, score, xpEarned, completedAt: new Date() }
            })
          : db.lessonProgress.create({
              data: {
                userId: session.user.id,
                lessonId,
                completed: true,
                score,
                xpEarned,
                completedAt: new Date()
              }
            })
      ])

      // Revalidate dashboard and learn routes
      revalidatePath('/dashboard', 'layout')

      return {
        success: true,
        xpEarned,
        leveledUp,
        newLevel
      }
    } else {
      // Already completed, don't award duplicate XP
      return {
        success: true,
        xpEarned: 0,
        leveledUp: false,
        newLevel: user.level,
        alreadyCompleted: true
      }
    }

  } catch (error) {
    console.error('[Progress Action] Error saving lesson progress:', error)
    throw new Error('Failed to save progress')
  }
}
