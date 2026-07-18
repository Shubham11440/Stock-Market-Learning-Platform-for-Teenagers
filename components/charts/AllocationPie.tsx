'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Allocation } from '@/types/portfolio';

export function AllocationPie({ data }: { data: Allocation[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[250px] flex items-center justify-center border border-dashed border-border rounded-xl">
        <p className="text-text-3 text-sm">No allocation data available</p>
      </div>
    );
  }

  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload as Allocation;
                return (
                  <div className="bg-surface border border-border p-3 rounded-xl shadow-xl">
                    <p className="text-sm font-semibold text-text-1 mb-1">{data.name}</p>
                    <p className="text-sm text-text-2">{formatINR(data.value)}</p>
                  </div>
                );
              }
              return null;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Legend below the chart */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
        {data.map((entry, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-xs font-medium text-text-2">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
