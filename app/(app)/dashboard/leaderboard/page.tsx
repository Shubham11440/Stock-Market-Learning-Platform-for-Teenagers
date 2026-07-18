import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { LeaderboardEntry } from '@/types/gamification';
import { LeaderboardList } from '@/components/gamification/Leaderboard';
import { Trophy } from 'lucide-react';

export const revalidate = 60; // Cache leaderboard for 1 minute

export default async function LeaderboardPage() {
  const session = await auth();
  const currentUserId = session?.user?.id;

  // 1. Fetch Top 50 Users
  const topUsers = await db.user.findMany({
    take: 50,
    orderBy: { xp: 'desc' },
    select: {
      id: true,
      name: true,
      image: true,
      xp: true,
    }
  });

  // 2. Map to entries
  const entries: LeaderboardEntry[] = topUsers.map((u, index) => ({
    userId: u.id,
    rank: index + 1,
    name: u.name,
    avatar: u.image,
    xp: u.xp,
    isCurrentUser: u.id === currentUserId
  }));

  // 3. Ensure current user is in the list (or append at bottom)
  const isCurrentUserInTop50 = entries.some(e => e.isCurrentUser);
  
  if (!isCurrentUserInTop50 && currentUserId) {
    const currentUserData = await db.user.findUnique({
      where: { id: currentUserId },
      select: { id: true, name: true, image: true, xp: true }
    });

    if (currentUserData) {
      // Find exact rank (count users with more XP)
      const usersAhead = await db.user.count({
        where: { xp: { gt: currentUserData.xp } }
      });
      
      entries.push({
        userId: currentUserData.id,
        rank: usersAhead + 1,
        name: currentUserData.name,
        avatar: currentUserData.image,
        xp: currentUserData.xp,
        isCurrentUser: true
      });
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-yellow-500/10 text-yellow-500 rounded-2xl flex items-center justify-center">
          <Trophy size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-text-1">Global Leaderboard</h1>
          <p className="text-text-2">Compete with traders nationwide.</p>
        </div>
      </div>

      <LeaderboardList entries={entries} />
    </div>
  );
}
