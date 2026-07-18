'use client';

import { BadgeRule, UnlockedBadge, Rarity } from '@/types/gamification';
import { badgeRules } from '@/lib/gamification/badges/rules';
import * as LucideIcons from 'lucide-react';

const rarityConfig: Record<Rarity, { color: string; border: string; bg: string }> = {
  COMMON: { color: 'text-gray-400', border: 'border-gray-500', bg: 'bg-gray-500/10' },
  RARE: { color: 'text-blue-400', border: 'border-blue-500', bg: 'bg-blue-500/10' },
  EPIC: { color: 'text-purple-400', border: 'border-purple-500', bg: 'bg-purple-500/10' },
  LEGENDARY: { color: 'text-yellow-400', border: 'border-yellow-500', bg: 'bg-yellow-500/10' },
};

export function BadgeGrid({ unlockedBadges }: { unlockedBadges: UnlockedBadge[] }) {
  const unlockedIds = new Set(unlockedBadges.map((b) => b.badgeId));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {badgeRules.map((rule) => {
        const isUnlocked = unlockedIds.has(rule.id);
        const IconComponent = (LucideIcons as any)[rule.icon] || LucideIcons.Award;
        const config = rarityConfig[rule.rarity];

        return (
          <div
            key={rule.id}
            className={`relative flex flex-col items-center p-4 rounded-2xl border transition-all duration-300 ${
              isUnlocked
                ? `bg-surface ${config.border} shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,0,0,0.2)]`
                : 'bg-surface-2/50 border-dashed border-border opacity-60 grayscale'
            }`}
          >
            {/* Rarity Glow / Ring */}
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${isUnlocked ? config.bg : 'bg-surface-2'}`}>
              <IconComponent
                size={32}
                className={isUnlocked ? config.color : 'text-text-3'}
                strokeWidth={isUnlocked ? 2.5 : 1.5}
              />
            </div>
            
            <h4 className={`text-center font-display font-semibold text-sm mb-1 ${isUnlocked ? 'text-text-1' : 'text-text-3'}`}>
              {rule.name}
            </h4>
            
            {/* Tooltip on hover for description */}
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-surface/95 rounded-2xl flex items-center justify-center p-3 z-10 backdrop-blur-sm pointer-events-none">
              <p className="text-xs text-center font-medium text-text-2">
                {isUnlocked ? rule.description : 'Locked'}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
