import Link from 'next/link';
import { Position } from '@/types/portfolio';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PositionCard({ position }: { position: Position }) {
  const currentValue = position.quantity * position.currentPrice;
  const investedValue = position.quantity * position.avgPrice;
  const pnl = currentValue - investedValue;
  const pnlPct = (pnl / investedValue) * 100;
  const isProfit = pnl >= 0;

  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(val);

  return (
    <Link
      href={`/dashboard/trading/${position.symbol}`}
      className="block p-4 rounded-2xl border border-border bg-surface hover:bg-surface-2 transition-colors group"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-display font-semibold text-text-1 group-hover:text-primary transition-colors">
            {position.symbol}
          </h4>
          <p className="text-sm text-text-3 truncate max-w-[150px] sm:max-w-[200px]">
            {position.name}
          </p>
        </div>
        <div className="text-right">
          <p className="font-display font-semibold text-text-1">
            {formatINR(currentValue)}
          </p>
          <div
            className={cn(
              'flex items-center justify-end gap-1 text-sm font-medium',
              isProfit ? 'text-green-500' : 'text-red-500'
            )}
          >
            {isProfit ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {Math.abs(pnlPct).toFixed(2)}%
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-text-2 pt-3 border-t border-border/50">
        <div>
          <span className="text-text-3">Qty:</span> {position.quantity}
        </div>
        <div>
          <span className="text-text-3">Avg:</span> {formatINR(position.avgPrice)}
        </div>
        <div>
          <span className="text-text-3">LTP:</span> {formatINR(position.currentPrice)}
        </div>
      </div>
    </Link>
  );
}
