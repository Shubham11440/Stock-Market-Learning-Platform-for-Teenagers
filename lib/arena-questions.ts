export interface ArenaQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

// A pool of financial literacy and stock market questions
export const ARENA_QUESTION_POOL: ArenaQuestion[] = [
  {
    id: 'q1',
    text: 'Which of the following describes a "Bull Market"?',
    options: ['Prices are falling', 'Prices are rising', 'Prices are stagnant'],
    correctAnswerIndex: 1
  },
  {
    id: 'q2',
    text: 'What does P/E ratio stand for?',
    options: ['Price to Earnings', 'Profit to Equity', 'Public to Enterprise'],
    correctAnswerIndex: 0
  },
  {
    id: 'q3',
    text: 'What is a dividend?',
    options: ['A penalty for selling early', 'A tax paid to the government', 'A share of profits paid to shareholders'],
    correctAnswerIndex: 2
  },
  {
    id: 'q4',
    text: 'What does IPO stand for?',
    options: ['Initial Public Offering', 'Internal Profit Objective', 'International Portfolio Organization'],
    correctAnswerIndex: 0
  },
  {
    id: 'q5',
    text: 'Which of these is a measure of stock volatility?',
    options: ['Alpha', 'Beta', 'Gamma'],
    correctAnswerIndex: 1
  },
  {
    id: 'q6',
    text: 'What is diversification?',
    options: ['Buying only tech stocks', 'Spreading investments to reduce risk', 'Selling all losing stocks'],
    correctAnswerIndex: 1
  },
  {
    id: 'q7',
    text: 'What is a Bear Market?',
    options: ['A market where prices are rising', 'A market where prices are falling', 'A market with no trading'],
    correctAnswerIndex: 1
  },
  {
    id: 'q8',
    text: 'What does ETF stand for?',
    options: ['Exchange Traded Fund', 'Equity Trust Fund', 'Earnings Transfer Facility'],
    correctAnswerIndex: 0
  },
  {
    id: 'q9',
    text: 'What is market capitalization?',
    options: ['Total revenue of a company', 'Stock price multiplied by total outstanding shares', 'The amount of cash a company holds'],
    correctAnswerIndex: 1
  },
  {
    id: 'q10',
    text: 'Who regulates the Indian stock market?',
    options: ['RBI', 'SEBI', 'Ministry of Finance'],
    correctAnswerIndex: 1
  },
  {
    id: 'q11',
    text: 'What is a blue-chip stock?',
    options: ['A highly speculative penny stock', 'Stock of a large, well-established, and financially sound company', 'A stock that only pays dividends in cash'],
    correctAnswerIndex: 1
  },
  {
    id: 'q12',
    text: 'What does SIP mean in mutual funds?',
    options: ['Systematic Investment Plan', 'Standard Index Portfolio', 'Secure Income Provision'],
    correctAnswerIndex: 0
  },
  {
    id: 'q13',
    text: 'What is short selling?',
    options: ['Selling shares you own very quickly', 'Borrowing shares to sell them, hoping the price will drop', 'Selling shares at a discount'],
    correctAnswerIndex: 1
  },
  {
    id: 'q14',
    text: 'Which index tracks the top 50 companies in India?',
    options: ['Sensex', 'Nifty 50', 'BankNifty'],
    correctAnswerIndex: 1
  },
  {
    id: 'q15',
    text: 'What is the primary purpose of a stock exchange?',
    options: ['To print money', 'To facilitate the buying and selling of securities', 'To set the prices of all goods'],
    correctAnswerIndex: 1
  }
];

export function getDailyArenaQuestions(): ArenaQuestion[] {
  // Use current date to seed the random selection so it stays the same all day
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  
  // Simple pseudo-random generator based on seed
  const seededRandom = (s: number) => {
    const x = Math.sin(s++) * 10000;
    return x - Math.floor(x);
  };

  const selectedQuestions: ArenaQuestion[] = [];
  const poolCopy = [...ARENA_QUESTION_POOL];
  let currentSeed = seed;

  for (let i = 0; i < 3; i++) {
    const index = Math.floor(seededRandom(currentSeed++) * poolCopy.length);
    selectedQuestions.push(poolCopy[index]);
    poolCopy.splice(index, 1); // Remove to avoid duplicates
  }

  return selectedQuestions;
}
