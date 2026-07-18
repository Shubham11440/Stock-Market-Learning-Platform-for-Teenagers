'use client';

import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StreakTracker({ currentStreak }: { currentStreak: number }) {
  // Mock the last 7 days based on currentStreak integer
  // If streak is 3, the last 3 days are active, 4 days before that are inactive.
  const days = Array.from({ length: 7 }).map((_, i) => {
    const isActive = i >= (7 - currentStreak) || currentStreak >= 7;
    return { isActive, day: ['M', 'T', 'W', 'T', 'F', 'S', 'S'][i] }; // Just mock labels
  });

  return (
    <div className="p-6 rounded-2xl bg-surface border border-border flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
          <Flame size={28} className="text-orange-500" />
        </div>
        <div>
          <h4 className="text-xl font-display font-bold text-text-1">
            {currentStreak} Day Streak
          </h4>
          <p className="text-sm text-text-3">
            {currentStreak > 0 ? "You're on fire! Keep it up." : "Start learning today to build a streak!"}
          </p>
        </div>
      </div>
      
      {/* 7-day visualizer */}
      <div className="hidden sm:flex items-center gap-2">
        {days.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div 
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
                d.isActive 
                  ? "bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.4)]" 
                  : "bg-surface-2 text-text-3"
              )}
            >
              {d.isActive ? <Flame size={14} /> : null}
            </div>
            <span className="text-xs text-text-3 font-medium">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
