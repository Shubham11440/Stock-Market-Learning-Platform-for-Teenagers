'use client'

import { HistoricalDataPoint } from '@/types/market'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import { format, parseISO } from 'date-fns'

interface ChartProps {
  data: HistoricalDataPoint[]
}

export default function Chart({ data }: ChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-text-3">
        No chart data available.
      </div>
    )
  }

  const isPositive = data[data.length - 1].close >= data[0].close
  const strokeColor = isPositive ? '#10b981' : '#ef4444' // Emerald or Red

  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <XAxis 
            dataKey="date" 
            tickFormatter={(str) => {
              try {
                return format(parseISO(str), 'MMM d')
              } catch {
                return str
              }
            }}
            stroke="#525252"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            minTickGap={30}
          />
          <YAxis 
            domain={['dataMin', 'dataMax']}
            hide 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#171717', 
              border: '1px solid #262626',
              borderRadius: '12px',
              color: '#f5f5f5'
            }}
            itemStyle={{ color: '#f5f5f5' }}
            labelFormatter={(label) => {
              try {
                return format(parseISO(label as string), 'MMM d, yyyy')
              } catch {
                return label
              }
            }}
            formatter={(value: any) => [`₹${Number(value).toFixed(2)}`, 'Price']}
          />
          <Line 
            type="monotone" 
            dataKey="close" 
            stroke={strokeColor} 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: strokeColor, stroke: '#171717', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
