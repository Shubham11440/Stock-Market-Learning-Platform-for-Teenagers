import { cn } from '@/lib/utils'
import { Shield } from 'lucide-react'

export interface LevelBadgeProps {
  level: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LevelBadge({ level, size = 'md', className }: LevelBadgeProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-lg',
  }

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32,
  }

  // Calculate colors based on level (optional enhancement)
  const isHighLevel = level >= 5
  
  return (
    <div
      className={cn(
        'relative flex items-center justify-center font-display font-bold text-white shadow-lg',
        sizeClasses[size],
        className
      )}
      aria-label={`Level ${level} badge`}
    >
      <Shield 
        size={iconSizes[size]} 
        className={cn(
          "absolute inset-0 w-full h-full drop-shadow-xl",
          isHighLevel ? "text-gold fill-gold/20" : "text-primary-light fill-primary/20"
        )}
      />
      <span className="relative z-10">{level}</span>
    </div>
  )
}
