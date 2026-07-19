'use client'

import { motion } from 'framer-motion'
import { Trophy, ArrowRight } from 'lucide-react'
import { TourConfetti } from './TourConfetti'
import Link from 'next/link'

interface SuccessModalProps {
  onClose: () => void
}

export function SuccessModal({ onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <TourConfetti />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-sm bg-surface border border-border rounded-3xl p-8 shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-profit/20 blur-[60px] pointer-events-none" />

        <div className="relative flex flex-col items-center text-center">
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 15, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-white mb-6 shadow-lg ring-4 ring-yellow-400/20"
          >
            <Trophy size={40} />
          </motion.div>
          
          <h2 className="text-2xl font-display font-bold text-text-1 mb-2">
            Achievement Unlocked!
          </h2>
          
          <p className="text-text-2 mb-6">
            Congratulations! You've completed the StockUp Tour.
          </p>

          <div className="w-full bg-surface-2 rounded-xl p-4 mb-8 border border-border flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-2 flex items-center gap-2"><span className="text-xl">🧭</span> Explorer Badge</span>
              <span className="font-semibold text-profit">Unlocked</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-2 flex items-center gap-2"><span className="text-xl">✨</span> Bonus XP</span>
              <span className="font-semibold text-primary">+50 XP</span>
            </div>
            <div className="w-full h-px bg-border my-1" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-2">Virtual Balance</span>
              <span className="font-semibold text-text-1">₹1,00,000</span>
            </div>
          </div>

          <Link href="/dashboard/learn" onClick={onClose} className="w-full">
            <button className="w-full h-12 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors shadow-premium flex items-center justify-center gap-2">
              Start Learning
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
