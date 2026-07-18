export type Rarity = 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';

export interface BadgeRule {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: Rarity;
  evaluate: (userState: UserState) => boolean;
}

export interface UserState {
  xp: number;
  level: number;
  streak: number;
  virtualBalance: number;
  totalTrades: number;
  completedLessons: number;
  perfectQuizzes: number;
  hasSquad: boolean;
}

export interface UnlockedBadge {
  id: string;
  badgeId: string;
  name: string;
  description: string;
  icon: string;
  rarity: Rarity;
  earnedAt: Date;
}

export interface LeaderboardEntry {
  userId: string;
  rank: number;
  name: string;
  avatar: string | null;
  xp: number;
  isCurrentUser: boolean;
}

export interface ArenaQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface XPRewardResult {
  xpEarned: number;
  newTotalXP: number;
  levelUp: boolean;
  newLevel: number;
  unlockedBadges: UnlockedBadge[];
}
