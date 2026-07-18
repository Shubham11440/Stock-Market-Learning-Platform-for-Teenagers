import { PortfolioStats } from '@/components/trading/PortfolioStats';
import { PositionList } from '@/components/trading/PositionList';
import { AllocationPie } from '@/components/charts/AllocationPie';
import { PnLChart } from '@/components/charts/PnLChart';
import { RecentTrades } from '@/components/trading/RecentTrades';
import { EmptyState } from '@/components/trading/EmptyState';
import { PortfolioSummary, Position, PortfolioSnapshot, Allocation, Trade } from '@/types/portfolio';

// --- MOCK DATA --- 
// In a real app, this would be fetched from the database based on the authenticated user.

const mockPositions: Position[] = [
  {
    id: 'pos_1',
    symbol: 'RELIANCE.NS',
    name: 'Reliance Industries',
    quantity: 10,
    avgPrice: 2800,
    currentPrice: 2950,
    isVirtual: true,
    createdAt: new Date('2024-01-15')
  },
  {
    id: 'pos_2',
    symbol: 'TCS.NS',
    name: 'Tata Consultancy Services',
    quantity: 5,
    avgPrice: 3900,
    currentPrice: 3850,
    isVirtual: true,
    createdAt: new Date('2024-02-10')
  },
  {
    id: 'pos_3',
    symbol: 'HDFCBANK.NS',
    name: 'HDFC Bank',
    quantity: 20,
    avgPrice: 1400,
    currentPrice: 1480,
    isVirtual: true,
    createdAt: new Date('2024-03-01')
  }
];

const mockTrades: Trade[] = [
  {
    id: 'trd_1',
    symbol: 'HDFCBANK.NS',
    name: 'HDFC Bank',
    type: 'BUY',
    quantity: 20,
    price: 1400,
    total: 28000,
    xpEarned: 50,
    createdAt: new Date('2024-03-01T10:15:00')
  },
  {
    id: 'trd_2',
    symbol: 'TCS.NS',
    name: 'Tata Consultancy Services',
    type: 'BUY',
    quantity: 5,
    price: 3900,
    total: 19500,
    xpEarned: 50,
    createdAt: new Date('2024-02-10T14:30:00')
  }
];

const mockSnapshots: PortfolioSnapshot[] = Array.from({ length: 30 }).map((_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
  value: 100000 + Math.random() * 5000 - 2000 + i * 150 // General upward trend
}));

const mockSummary: PortfolioSummary = {
  totalValue: 101850, // Calculated dynamically in reality
  availableCash: 52500,
  totalPnL: 1850,
  todayPnL: 450,
  winRate: 0.66,
  bestPerformer: { symbol: 'RELIANCE.NS', returnPct: 5.35 },
  worstPerformer: { symbol: 'TCS.NS', returnPct: -1.28 }
};

const mockAllocations: Allocation[] = [
  { name: 'Reliance Industries', value: 29500, color: '#7C3AED' },
  { name: 'HDFC Bank', value: 29600, color: '#10B981' },
  { name: 'TCS', value: 19250, color: '#F59E0B' },
  { name: 'Cash', value: 52500, color: '#4B5563' }
];

export default async function PortfolioPage() {
  // Simulate network delay for loading states
  await new Promise((resolve) => setTimeout(resolve, 800));

  const hasTrades = mockTrades.length > 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-text-1">Your Portfolio</h1>
        <p className="text-text-2 mt-1">Track your investments and performance.</p>
      </div>

      {!hasTrades ? (
        <EmptyState />
      ) : (
        <>
          <PortfolioStats summary={mockSummary} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 p-6 rounded-2xl bg-surface border border-border">
              <PnLChart data={mockSnapshots} />
            </div>
            
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <h3 className="text-lg font-display font-semibold text-text-1 mb-6">Allocation</h3>
              <AllocationPie data={mockAllocations} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PositionList positions={mockPositions} />
            </div>
            
            <div>
              <h3 className="text-lg font-display font-semibold text-text-1 mb-4">Recent Activity</h3>
              <RecentTrades trades={mockTrades} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
