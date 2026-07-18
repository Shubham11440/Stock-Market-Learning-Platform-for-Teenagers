import { Flame } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface StreakCardProps {
  streakCount: number
  className?: string
}

export function StreakCard({ streakCount, className }: StreakCardProps) {
  const isHot = streakCount >= 3

  return (
    <article
      className={cn(
        'relative overflow-hidden p-5 rounded-2xl border flex flex-col justify-center',
        isHot
          ? 'bg-gradient-to-br from-orange-500/10 to-red-500/5 border-orange-500/20'
          : 'bg-surface-2 border-border/50',
        className
      )}
      aria-label={`Current streak: ${streakCount} days`}
    >
      <div className="flex items-center gap-4 relative z-10">
        <div
          className={cn(
            'flex items-center justify-center w-12 h-12 rounded-full',
            isHot ? 'bg-orange-500/20 text-orange-500' : 'bg-surface text-text-3'
          )}
        >
          <Flame
            size={24}
            className={cn(
              isHot ? 'drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]' : ''
            )}
          />
        </div>
        
        <div>
          <h3 className="text-text-3 text-sm font-medium">Daily Streak</h3>
          <p className="font-display font-bold text-2xl text-text-1">
            {streakCount} {streakCount === 1 ? 'Day' : 'Days'}
          </p>
        </div>
      </div>
      
      {/* Background decoration */}
      {isHot && (
        <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none blur-xl">
          <Flame size={120} className="text-orange-500" />
        </div>
      )}
    </article>
  )
}
