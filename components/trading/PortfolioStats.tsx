import { PortfolioSummary } from '@/types/portfolio';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PortfolioStats({ summary }: { summary: PortfolioSummary }) {
  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  const formatPct = (val: number) =>
    `${val > 0 ? '+' : ''}${val.toFixed(2)}%`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total Value */}
      <div className="p-5 rounded-2xl bg-surface border border-border">
        <p className="text-sm font-medium text-text-3 mb-1">Total Value</p>
        <h3 className="text-3xl font-display font-bold text-text-1 mb-2">
          {formatINR(summary.totalValue)}
        </h3>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full',
              summary.todayPnL >= 0
                ? 'bg-green-500/10 text-green-500'
                : 'bg-red-500/10 text-red-500'
            )}
          >
            {summary.todayPnL >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {formatINR(Math.abs(summary.todayPnL))}
          </span>
          <span className="text-xs text-text-3 font-medium">Today</span>
        </div>
      </div>

      {/* Available Cash */}
      <div className="p-5 rounded-2xl bg-surface border border-border">
        <p className="text-sm font-medium text-text-3 mb-1">Available Cash</p>
        <h3 className="text-3xl font-display font-bold text-text-1 mb-2">
          {formatINR(summary.availableCash)}
        </h3>
        <p className="text-xs text-text-3 font-medium">Buying power</p>
      </div>

      {/* Total Return */}
      <div className="p-5 rounded-2xl bg-surface border border-border">
        <p className="text-sm font-medium text-text-3 mb-1">Total Return</p>
        <h3
          className={cn(
            'text-3xl font-display font-bold mb-2',
            summary.totalPnL >= 0 ? 'text-green-500' : 'text-red-500'
          )}
        >
          {summary.totalPnL >= 0 ? '+' : '-'}
          {formatINR(Math.abs(summary.totalPnL))}
        </h3>
        <p className="text-xs text-text-3 font-medium">All-time P&L</p>
      </div>

      {/* Performance Stats */}
      <div className="p-5 rounded-2xl bg-surface-2 border border-border flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm font-medium text-text-2">
            <Trophy size={16} className="text-gold" /> Win Rate
          </div>
          <span className="font-semibold text-text-1">{(summary.winRate * 100).toFixed(0)}%</span>
        </div>
        
        {summary.bestPerformer && (
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1 text-sm font-medium text-text-2">
              <TrendingUp size={16} className="text-green-500" /> Best
            </div>
            <span className="font-semibold text-text-1 flex items-center gap-2">
              {summary.bestPerformer.symbol}
              <span className="text-green-500 text-xs bg-green-500/10 px-1.5 py-0.5 rounded">
                {formatPct(summary.bestPerformer.returnPct)}
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
