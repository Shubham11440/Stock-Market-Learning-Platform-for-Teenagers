import { badgeRules } from './rules';
import { UserState, UnlockedBadge } from '@/types/gamification';

// Note: Prisma transaction is passed in from xp.ts or other calling services
export async function evaluateBadges(
  state: UserState,
  existingBadgeIds: Set<string>,
  tx: any,
  userId: string
): Promise<UnlockedBadge[]> {
  const newBadges: UnlockedBadge[] = [];

  for (const rule of badgeRules) {
    // Skip if already earned
    if (existingBadgeIds.has(rule.id)) continue;

    // Check condition
    if (rule.evaluate(state)) {
      // 1. Ensure Badge exists in DB (or create it on the fly, since we define them in code)
      let dbBadge = await tx.badge.findFirst({ where: { name: rule.name } });
      if (!dbBadge) {
        dbBadge = await tx.badge.create({
          data: {
            name: rule.name,
            description: rule.description,
            icon: rule.icon,
            rarity: rule.rarity,
            condition: {} // We evaluate in code
          }
        });
      }

      // 2. Grant to user (Duplicate prevention handled by existingBadgeIds and DB unique constraint)
      await tx.userBadge.create({
        data: {
          userId,
          badgeId: dbBadge.id
        }
      });

      newBadges.push({
        id: dbBadge.id,
        badgeId: rule.id,
        name: rule.name,
        description: rule.description,
        icon: rule.icon,
        rarity: rule.rarity,
        earnedAt: new Date()
      });
    }
  }

  return newBadges;
}
