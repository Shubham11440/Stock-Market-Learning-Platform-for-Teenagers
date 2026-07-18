'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ArrowRight, Shield } from 'lucide-react'
import { LevelBadge } from '@/components/gamification/LevelBadge'

export interface XPCelebrationProps {
  xpEarned: number
  isLevelUp: boolean
  newLevel?: number
  onContinue: () => void
}

export function XPCelebration({ xpEarned, isLevelUp, newLevel, onContinue }: XPCelebrationProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/95 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
          className="bg-surface border border-border p-8 sm:p-12 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm w-full text-center relative overflow-hidden"
        >
          {/* Confetti / Glow backdrop */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent opacity-50" />
          
          <div className="relative z-10">
            {isLevelUp ? (
              <div className="mb-6">
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                >
                  <LevelBadge level={newLevel ?? 1} size="lg" className="mx-auto" />
                </motion.div>
                <h2 className="font-display font-bold text-3xl text-text-1 mt-6">
                  Level Up!
                </h2>
                <p className="text-text-2 mt-2">You've reached Level {newLevel}.</p>
              </div>
            ) : (
              <div className="mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary"
                >
                  <Star size={48} className="fill-primary" />
                </motion.div>
                <h2 className="font-display font-bold text-3xl text-text-1 mt-6">
                  Lesson Complete!
                </h2>
              </div>
            )}

            <div className="py-6 border-y border-border/50 my-6">
              <p className="text-text-3 font-medium uppercase tracking-wider text-sm mb-1">
                XP Earned
              </p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-display font-bold text-5xl text-primary-light"
              >
                +{xpEarned}
              </motion.p>
            </div>

            <button
              onClick={onContinue}
              className="w-full flex items-center justify-center gap-2 bg-text-1 text-bg px-8 py-4 rounded-xl font-bold hover:bg-text-2 transition-colors active:scale-95"
            >
              Continue <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
