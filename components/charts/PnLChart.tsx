'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PortfolioSnapshot } from '@/types/portfolio';
import { usePortfolioStore } from '@/store/portfolioStore';

export function PnLChart({ data }: { data: PortfolioSnapshot[] }) {
  const { selectedTimeframe, setTimeframe } = usePortfolioStore();

  // In a real app, we would filter `data` based on `selectedTimeframe`.
  // Here we just display the mock data as-is, assuming the parent component 
  // passed data matching the selected timeframe.

  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center border border-dashed border-border rounded-xl">
        <p className="text-text-3 text-sm">No historical data available</p>
      </div>
    );
  }

  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
    
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('en-IN', { month: 'short', day: 'numeric' }).format(d);
  };

  // Determine if overall trend is positive or negative for color
  const startVal = data[0].value;
  const endVal = data[data.length - 1].value;
  const isProfit = endVal >= startVal;
  
  const strokeColor = isProfit ? '#10B981' : '#EF4444'; // Green / Red
  const fillColor = isProfit ? 'url(#colorProfit)' : 'url(#colorLoss)';

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-display font-semibold text-text-1">Portfolio History</h3>
        
        {/* Timeframe Controls */}
        <div className="flex bg-surface-2 p-1 rounded-lg border border-border">
          {(['1W', '1M', '3M', 'ALL'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedTimeframe === tf
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-2 hover:text-text-1'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--text-3)', fontSize: 12 }}
              tickFormatter={formatDate}
              minTickGap={30}
            />
            <YAxis 
              domain={['auto', 'auto']}
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--text-3)', fontSize: 12 }}
              tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
              width={60}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-surface border border-border p-3 rounded-xl shadow-xl">
                      <p className="text-sm font-semibold text-text-1 mb-1">{formatDate(payload[0].payload.date)}</p>
                      <p className="text-sm font-medium" style={{ color: strokeColor }}>
                        {formatINR(payload[0].value as number)}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={strokeColor}
              strokeWidth={2}
              fillOpacity={1}
              fill={fillColor}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
