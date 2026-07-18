'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GoalCardProps {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  selected: boolean
  onClick: () => void
}

export function GoalCard({ title, description, icon, selected, onClick }: GoalCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative w-full p-6 text-left rounded-2xl border transition-all duration-200 overflow-hidden',
        selected 
          ? 'bg-primary/5 border-primary shadow-[0_0_20px_rgba(var(--primary)/0.1)]' 
          : 'bg-surface-2 border-border hover:border-text-3'
      )}
    >
      {selected && (
        <motion.div
          layoutId="goal-selected-bg"
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
      
      <div className={cn(
        'w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors',
        selected ? 'bg-primary text-white' : 'bg-surface text-text-2'
      )}>
        {icon}
      </div>
      
      <h3 className={cn('text-lg font-semibold mb-1', selected ? 'text-text-1' : 'text-text-1')}>
        {title}
      </h3>
      <p className="text-sm text-text-3 leading-relaxed">
        {description}
      </p>

      {selected && (
        <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      )}
    </motion.button>
  )
}
