import { BadgeRule, UserState } from '@/types/gamification';

export const badgeRules: BadgeRule[] = [
  {
    id: 'first-trade',
    name: 'First Blood',
    description: 'Execute your first virtual trade.',
    icon: 'Swords',
    rarity: 'COMMON',
    evaluate: (state: UserState) => state.totalTrades >= 1
  },
  {
    id: 'streak-7',
    name: 'Consistency is Key',
    description: 'Maintain a 7-day learning streak.',
    icon: 'Flame',
    rarity: 'RARE',
    evaluate: (state: UserState) => state.streak >= 7
  },
  {
    id: 'level-5',
    name: 'Rising Star',
    description: 'Reach Level 5 on the learning path.',
    icon: 'Star',
    rarity: 'RARE',
    evaluate: (state: UserState) => state.level >= 5
  },
  {
    id: 'level-10',
    name: 'Market Legend',
    description: 'Reach Level 10.',
    icon: 'Crown',
    rarity: 'LEGENDARY',
    evaluate: (state: UserState) => state.level >= 10
  },
  {
    id: 'portfolio-profit',
    name: 'In the Green',
    description: 'Portfolio balance exceeds initial ₹1,00,000.',
    icon: 'TrendingUp',
    rarity: 'EPIC',
    evaluate: (state: UserState) => state.virtualBalance > 100000
  },
  {
    id: 'perfect-quiz',
    name: 'Flawless Victory',
    description: 'Score 100% on a learning quiz.',
    icon: 'Target',
    rarity: 'COMMON',
    evaluate: (state: UserState) => state.perfectQuizzes >= 1
  }
];
