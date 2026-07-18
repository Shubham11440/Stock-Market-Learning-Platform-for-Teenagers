'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UnlockedBadge } from '@/types/gamification';
import * as LucideIcons from 'lucide-react';

// This acts as a presentation layer for new achievements. 
// A parent component (or context) would pass newly unlocked badges here.
export function AchievementToast({ newBadge, onDismiss }: { newBadge: UnlockedBadge | null, onDismiss: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (newBadge) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onDismiss, 500); // Allow exit animation to finish
      }, 5000); // Show for 5 seconds
      return () => clearTimeout(timer);
    }
  }, [newBadge, onDismiss]);

  if (!newBadge) return null;

  const IconComponent = (LucideIcons as any)[newBadge.icon] || LucideIcons.Award;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-surface-2 border border-primary/30 shadow-[0_0_30px_rgba(124,58,237,0.3)] p-4 rounded-2xl w-80"
        >
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 animate-pulse">
            <IconComponent className="text-primary" size={24} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-gold uppercase tracking-wider mb-0.5">Badge Unlocked!</p>
            <h4 className="text-sm font-display font-semibold text-text-1 truncate">{newBadge.name}</h4>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-text-3 hover:text-text-1 p-1 transition-colors"
          >
            <LucideIcons.X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
