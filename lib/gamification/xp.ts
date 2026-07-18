import { db } from '@/lib/db';
import { evaluateBadges } from './badges';
import { XPRewardResult } from '@/types/gamification';

export const LEVEL_THRESHOLDS = [
  0,       // Lvl 1
  500,     // Lvl 2
  1500,    // Lvl 3
  3500,    // Lvl 4
  7000,    // Lvl 5
  12000,   // Lvl 6
  20000,   // Lvl 7
  35000,   // Lvl 8
  50000,   // Lvl 9
  75000,   // Lvl 10
];

export function calculateLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      return i + 1; // Levels are 1-indexed
    }
  }
  return 1;
}

export function calculateProgress(xp: number, level: number): { current: number; required: number; percent: number } {
  if (level >= LEVEL_THRESHOLDS.length) {
    return { current: xp, required: xp, percent: 100 };
  }
  
  const currentLevelXP = LEVEL_THRESHOLDS[level - 1];
  const nextLevelXP = LEVEL_THRESHOLDS[level];
  const requiredForNext = nextLevelXP - currentLevelXP;
  const progressInLevel = xp - currentLevelXP;
  
  return {
    current: progressInLevel,
    required: requiredForNext,
    percent: Math.min(100, Math.max(0, (progressInLevel / requiredForNext) * 100))
  };
}

export async function awardXP(userId: string, amount: number, reason: string): Promise<XPRewardResult> {
  // Use transaction to ensure XP is awarded atomically
  const result = await db.$transaction(async (tx) => {
    // 1. Get current user state
    const user = await tx.user.findUnique({
      where: { id: userId },
      include: {
        badges: true,
        transactions: true,
        progress: true,
      }
    });

    if (!user) throw new Error('User not found');

    const newXP = user.xp + amount;
    const newLevel = calculateLevel(newXP);
    const leveledUp = newLevel > user.level;

    // 2. Add history
    await tx.xPHistory.create({
      data: {
        userId,
        amount,
        reason
      }
    });

    // 3. Update User
    const updatedUser = await tx.user.update({
      where: { id: userId },
      data: {
        xp: newXP,
        level: newLevel
      }
    });

    // 4. Construct UserState for badge evaluation
    const userState = {
      xp: newXP,
      level: newLevel,
      streak: user.streak,
      virtualBalance: user.virtualBalance,
      totalTrades: user.transactions.length,
      completedLessons: user.progress.filter(p => p.completed).length,
      perfectQuizzes: user.progress.filter(p => p.score === 100).length,
      hasSquad: false, // Squad logic phase 8
    };

    // 5. Evaluate Badges
    const existingBadgeIds = new Set(user.badges.map(b => b.badgeId));
    const unlockedBadges = await evaluateBadges(userState, existingBadgeIds, tx, userId);

    return {
      xpEarned: amount,
      newTotalXP: newXP,
      levelUp: leveledUp,
      newLevel,
      unlockedBadges
    };
  });

  return result;
}
