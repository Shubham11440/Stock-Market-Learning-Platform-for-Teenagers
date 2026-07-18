import { Trade } from '@/types/portfolio';
import { ArrowDownLeft, ArrowUpRight, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RecentTrades({ trades }: { trades: Trade[] }) {
  if (!trades || trades.length === 0) {
    return (
      <div className="h-[200px] flex items-center justify-center border border-dashed border-border rounded-xl">
        <p className="text-text-3 text-sm">No recent activity</p>
      </div>
    );
  }

  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(val);
    
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  return (
    <div className="space-y-4">
      {trades.map((trade) => {
        const isBuy = trade.type === 'BUY';
        
        return (
          <div key={trade.id} className="flex items-center justify-between p-4 rounded-xl bg-surface border border-border">
            <div className="flex items-center gap-4">
              <div 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                  isBuy ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                )}
              >
                {isBuy ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
              </div>
              
              <div>
                <h4 className="font-display font-semibold text-text-1">
                  {trade.symbol}
                </h4>
                <p className="text-xs text-text-3">
                  {isBuy ? 'Bought' : 'Sold'} {trade.quantity} shares
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-medium text-text-1">
                {isBuy ? '-' : '+'}{formatINR(trade.total)}
              </p>
              <div className="flex items-center justify-end gap-2 mt-1">
                <span className="text-xs text-text-3">
                  {formatDate(trade.createdAt)}
                </span>
                {trade.xpEarned > 0 && (
                  <span className="text-[10px] font-bold text-gold bg-gold/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    +{trade.xpEarned} XP
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
