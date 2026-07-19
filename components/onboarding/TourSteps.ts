import { DriveStep } from 'driver.js'

export const tourSteps: DriveStep[] = [
  {
    element: '#tour-learn',
    popover: {
      title: '📚 Learn',
      description: 'Complete bite-sized lessons designed like game levels. Finish lessons, earn XP, and unlock new content.',
      side: 'right',
      align: 'start',
    }
  },
  {
    element: '#tour-trade',
    popover: {
      title: '📈 Trade',
      description: 'Buy and sell stocks using ₹1,00,000 of virtual money. Practice without risking real cash.',
      side: 'right',
      align: 'start',
    }
  },
  {
    element: '#tour-portfolio',
    popover: {
      title: '💼 Portfolio',
      description: 'Track your investments, profits, losses, and sector allocation.',
      side: 'right',
      align: 'start',
    }
  },
  {
    element: '#tour-arena',
    popover: {
      title: '⚡ Daily Arena',
      description: 'Answer quick quizzes every day to earn bonus XP and coins.',
      side: 'right',
      align: 'start',
    }
  },
  {
    element: '#tour-leaderboard',
    popover: {
      title: '🏆 Leaderboard',
      description: 'Earn XP and climb the rankings. Challenge your friends and become the #1 trader.',
      side: 'right',
      align: 'start',
    }
  },
  {
    element: '#tour-clubs',
    popover: {
      title: '👥 Clubs',
      description: 'Join a squad, compete together, and challenge others in duels.',
      side: 'right',
      align: 'start',
    }
  },
  {
    element: '#tour-news',
    popover: {
      title: '📰 Market News',
      description: 'Stay updated with real market news and understand why stocks move.',
      side: 'right',
      align: 'start',
    }
  },
  {
    element: '#tour-stockbot',
    popover: {
      title: '🤖 StockBot',
      description: 'Ask anything about investing. StockBot explains concepts in simple language.',
      side: 'top',
      align: 'end',
    }
  },
  {
    element: '#tour-profile',
    popover: {
      title: '👤 Your Profile',
      description: 'Track your level, badges, streaks, achievements, and progress.',
      side: 'bottom',
      align: 'end',
    }
  }
];
