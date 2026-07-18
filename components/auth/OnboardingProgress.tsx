'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface OnboardingProgressProps {
  total: number
  current: number
}

export function OnboardingProgress({ total, current }: OnboardingProgressProps) {
  return (
    <div className="flex items-center gap-2" role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total} aria-label={`Step ${current} of ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="relative h-1.5 rounded-full overflow-hidden bg-border" style={{ width: i === current - 1 ? 24 : 8 }}>
          {i < current && (
            <motion.div
              layoutId={`progress-fill-${i}`}
              className="absolute inset-0 bg-primary rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              style={{ transformOrigin: 'left' }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
