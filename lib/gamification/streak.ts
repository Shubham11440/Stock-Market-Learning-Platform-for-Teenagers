import { db } from '@/lib/db';

export async function processLoginStreak(userId: string) {
  return await db.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id: userId },
      select: { streak: true, lastLoginDate: true }
    });

    if (!user) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastLogin = user.lastLoginDate ? new Date(user.lastLoginDate) : null;
    if (lastLogin) {
      lastLogin.setHours(0, 0, 0, 0);
    }

    let newStreak = user.streak;
    let streakIncremented = false;
    let streakReset = false;

    if (!lastLogin) {
      // First login ever
      newStreak = 1;
      streakIncremented = true;
    } else {
      const diffTime = Math.abs(today.getTime() - lastLogin.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Logged in yesterday -> increment
        newStreak += 1;
        streakIncremented = true;
      } else if (diffDays > 1) {
        // Missed a day -> reset to 1
        newStreak = 1;
        streakReset = true;
      }
      // If diffDays === 0, they already logged in today. Do nothing.
    }

    if (streakIncremented || streakReset) {
      await tx.user.update({
        where: { id: userId },
        data: {
          streak: newStreak,
          lastLoginDate: new Date()
        }
      });
      
      // If they hit a milestone, we might want to award XP here,
      // but for now, we just update the streak. We can call awardXP from the caller
      // if streakIncremented is true (e.g. daily login bonus).
    }

    return {
      streak: newStreak,
      streakIncremented,
      streakReset
    };
  });
}
