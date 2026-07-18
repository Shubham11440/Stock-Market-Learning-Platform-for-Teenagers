export interface Position {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  isVirtual: boolean;
  createdAt: Date;
}

export interface PortfolioSummary {
  totalValue: number;
  availableCash: number;
  totalPnL: number;
  todayPnL: number;
  winRate: number;
  bestPerformer?: { symbol: string; returnPct: number };
  worstPerformer?: { symbol: string; returnPct: number };
}

export interface PortfolioSnapshot {
  date: string;
  value: number;
}

export interface Allocation {
  name: string;
  value: number;
  color: string;
}

export interface Trade {
  id: string;
  symbol: string;
  name: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  total: number;
  xpEarned: number;
  createdAt: Date;
}
