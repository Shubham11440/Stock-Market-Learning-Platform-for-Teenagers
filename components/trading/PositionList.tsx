'use client';

import { Position } from '@/types/portfolio';
import { PositionCard } from './PositionCard';
import { usePortfolioStore } from '@/store/portfolioStore';
import { ArrowUpDown, Filter } from 'lucide-react';

export function PositionList({ positions }: { positions: Position[] }) {
  const { sortBy, hideSmallBalances, setSortBy, setHideSmallBalances } = usePortfolioStore();

  let filtered = [...positions];

  if (hideSmallBalances) {
    filtered = filtered.filter((p) => p.quantity * p.currentPrice > 100);
  }

  filtered.sort((a, b) => {
    const valA = a.quantity * a.currentPrice;
    const valB = b.quantity * b.currentPrice;
    const pnlA = valA - a.quantity * a.avgPrice;
    const pnlB = valB - b.quantity * b.avgPrice;

    switch (sortBy) {
      case 'VALUE_DESC': return valB - valA;
      case 'VALUE_ASC': return valA - valB;
      case 'PNL_DESC': return pnlB - pnlA;
      case 'PNL_ASC': return pnlA - pnlB;
      default: return 0;
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-display font-semibold text-text-1">Your Holdings</h3>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHideSmallBalances(!hideSmallBalances)}
            className={`p-2 rounded-lg border transition-colors flex items-center justify-center ${hideSmallBalances ? 'bg-primary border-primary text-white' : 'bg-surface border-border text-text-2 hover:text-text-1'}`}
            title="Hide small balances"
          >
            <Filter size={16} />
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="h-9 px-3 rounded-lg border border-border bg-surface text-sm font-medium text-text-2 outline-none focus:border-primary transition-colors"
          >
            <option value="VALUE_DESC">Highest Value</option>
            <option value="VALUE_ASC">Lowest Value</option>
            <option value="PNL_DESC">Highest Profit</option>
            <option value="PNL_ASC">Highest Loss</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-8 text-text-3 text-sm border border-dashed border-border rounded-xl">
          No positions found matching your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((pos) => (
            <PositionCard key={pos.id} position={pos} />
          ))}
        </div>
      )}
    </div>
  );
}
