'use server';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { awardXP } from '@/lib/gamification/xp';
import { XPRewardResult } from '@/types/gamification';

// Mock questions for the Arena (in a real app, this would be fetched from DB)
const TODAY_QUESTIONS = [
  { id: 'q1', correctAnswerIndex: 1 },
  { id: 'q2', correctAnswerIndex: 0 },
  { id: 'q3', correctAnswerIndex: 2 },
];

export async function submitArena(answers: Record<string, number>): Promise<{ success: boolean; error?: string; result?: XPRewardResult & { score: number } }> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: 'Unauthorized' };
  }
  const userId = session.user.id;

  // 1. Prevent Duplicates (1 attempt per day)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existingAttempt = await db.dailyQuizSubmission.findUnique({
    where: {
      userId_date: {
        userId,
        date: today
      }
    }
  });

  if (existingAttempt) {
    return { success: false, error: 'You have already completed the Arena today.' };
  }

  // 2. Grade the answers
  let score = 0;
  for (const q of TODAY_QUESTIONS) {
    if (answers[q.id] === q.correctAnswerIndex) {
      score += 1;
    }
  }

  // 3. Calculate XP Reward
  const xpReward = score * 50; // 50 XP per correct answer

  try {
    // 4. Save Attempt and Award XP (in transaction via awardXP engine)
    // First, save the attempt
    await db.dailyQuizSubmission.create({
      data: {
        userId,
        date: today,
        score,
        xpEarned: xpReward
      }
    });

    // Award XP using our central engine
    let rewardResult: XPRewardResult = { xpEarned: 0, newTotalXP: 0, levelUp: false, newLevel: 1, unlockedBadges: [] };
    if (xpReward > 0) {
      rewardResult = await awardXP(userId, xpReward, 'ARENA');
    }

    return { 
      success: true, 
      result: {
        ...rewardResult,
        score
      }
    };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to submit Arena.' };
  }
}
