'use client'

import { motion } from 'framer-motion'
import { Rocket } from 'lucide-react'

interface WelcomeModalProps {
  onStart: () => void
  onSkip: () => void
}

export function WelcomeModal({ onStart, onSkip }: WelcomeModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onSkip}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-surface border border-border rounded-3xl p-8 shadow-2xl overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-primary/20 blur-[60px] pointer-events-none" />

        <div className="relative flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 shadow-inner">
            <Rocket size={32} />
          </div>
          
          <h2 className="text-3xl font-display font-bold text-text-1 mb-4">
            Welcome to StockUp! 🎉
          </h2>
          
          <p className="text-text-2 mb-8 leading-relaxed">
            Learn the stock market, build your virtual portfolio, compete with friends, and unlock real investing—all without risking real money.
          </p>

          <div className="flex flex-col w-full gap-3">
            <button
              onClick={onStart}
              className="w-full h-12 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors shadow-premium"
            >
              Start Your Journey
            </button>
            <button
              onClick={onSkip}
              className="w-full h-12 rounded-xl bg-surface-2 text-text-2 font-medium hover:text-text-1 hover:bg-surface-3 transition-colors"
            >
              Skip Tour
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
