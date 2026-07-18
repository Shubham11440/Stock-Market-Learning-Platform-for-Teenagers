'use client'

import { 
  TrendingUp, 
  BookOpen, 
  Crosshair, 
  Shield, 
  Trophy, 
  Wallet,
  Zap,
  Swords
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsGridProps {
  profile: any
}

export function StatsGrid({ profile }: StatsGridProps) {
  // Calculate derived stats safely
  const completedLessons = profile.progress?.filter((p: any) => p.completed).length || 0
  
  const trades = profile.transactions || []
  const buyTrades = trades.filter((t: any) => t.type === 'BUY').length
  const sellTrades = trades.filter((t: any) => t.type === 'SELL').length
  // Win rate is a bit complex for virtual trades without closing them, we'll mock it for now based on portfolio green/red or just a placeholder
  const winRate = "68%" // Placeholder for MVP

  const portfolioValue = profile.virtualBalance || 0

  const stats = [
    {
      label: "Total XP",
      value: profile.xp.toLocaleString(),
      icon: Zap,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      label: "Current Level",
      value: profile.level,
      icon: Trophy,
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    },
    {
      label: "Portfolio Value",
      value: `₹${portfolioValue.toLocaleString()}`,
      icon: Wallet,
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    {
      label: "Win Rate",
      value: winRate,
      icon: TrendingUp,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      label: "Lessons Done",
      value: completedLessons,
      icon: BookOpen,
      color: "text-pink-500",
      bg: "bg-pink-500/10"
    },
    {
      label: "Total Trades",
      value: trades.length,
      icon: Crosshair,
      color: "text-red-500",
      bg: "bg-red-500/10"
    },
    {
      label: "Squad Rank",
      value: profile.squad ? "#4" : "N/A", // Mock rank
      icon: Shield,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      label: "Duels Won",
      value: "3", // Mock duels won for now until we expand the duels relation
      icon: Swords,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10"
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div 
          key={i} 
          className="bg-surface border border-border rounded-2xl p-4 flex flex-col hover:border-primary/30 transition-colors"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", stat.bg, stat.color)}>
              <stat.icon size={16} />
            </div>
            <span className="text-xs font-semibold text-text-3 tracking-wide">{stat.label}</span>
          </div>
          <div className="text-xl md:text-2xl font-display font-bold text-text-1">
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  )
}
