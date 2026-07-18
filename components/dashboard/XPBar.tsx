'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface XPBarProps {
  progressPercentage: number
  className?: string
  showLabel?: boolean
}

export function XPBar({ progressPercentage, className, showLabel = false }: XPBarProps) {
  // Clamp between 0 and 100
  const safeProgress = Math.min(Math.max(progressPercentage, 0), 100)

  return (
    <div className={cn('w-full', className)} aria-label={`XP Progress: ${safeProgress}%`}>
      {showLabel && (
        <div className="flex justify-between text-xs font-medium text-text-3 mb-2">
          <span>Progress</span>
          <span>{Math.round(safeProgress)}%</span>
        </div>
      )}
      <div className="h-2.5 bg-surface-2 rounded-full overflow-hidden border border-border/50">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${safeProgress}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full relative"
        >
          {/* Shine effect */}
          <div className="absolute top-0 inset-x-0 h-1/2 bg-white/20 rounded-full" />
        </motion.div>
      </div>
    </div>
  )
}
