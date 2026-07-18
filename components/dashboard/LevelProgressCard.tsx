import Image from 'next/image'
import { LevelBadge } from '@/components/gamification/LevelBadge'
import { XPBar } from '@/components/dashboard/XPBar'

export interface LevelProgressCardProps {
  name: string
  avatar: string | null
  currentXp: number
  level: number
}

export function LevelProgressCard({ name, avatar, currentXp, level }: LevelProgressCardProps) {
  // Use gamification logic to get the current level's target XP
  // Wait, I should create a simple getLevelDetails in lib/gamification if it doesn't exist,
  // or mock it for now. We'll implement getLevelDetails inline or mock it.
  
  // For Phase 3, we define a simple exponential curve or hardcoded targets
  const getNextLevelXP = (lvl: number) => {
    const levels = [0, 500, 1500, 3500, 7000, 12000, 20000]
    return levels[lvl] ?? 20000
  }
  
  const getLevelName = (lvl: number) => {
    const names = [
      "The Rookie",
      "The Rookie",
      "The Apprentice",
      "The Analyst",
      "The Strategist",
      "The Trader",
      "The Investor",
      "The Legend"
    ]
    return names[lvl] ?? "The Legend"
  }

  const nextXp = getNextLevelXP(level)
  const prevXp = getNextLevelXP(level - 1)
  const progressPercentage = ((currentXp - prevXp) / (nextXp - prevXp)) * 100
  const xpNeeded = nextXp - currentXp

  return (
    <article className="p-5 rounded-2xl bg-surface-2 border border-border/50 flex flex-col sm:flex-row gap-5 items-center sm:items-start shadow-sm">
      {/* Avatar & Badge */}
      <div className="relative flex-shrink-0">
        <div className="w-20 h-20 rounded-full border-2 border-primary overflow-hidden relative bg-surface">
          {avatar ? (
            <Image 
              src={avatar} 
              alt={`${name}'s avatar`} 
              fill 
              className="object-cover"
              sizes="80px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-xl">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="absolute -bottom-3 -right-3">
          <LevelBadge level={level} size="md" />
        </div>
      </div>

      {/* Info & Progress */}
      <div className="flex-1 w-full text-center sm:text-left mt-2 sm:mt-0">
        <h3 className="font-display font-bold text-xl text-text-1">
          {getLevelName(level)}
        </h3>
        <p className="text-text-3 text-sm mb-4">
          {xpNeeded > 0 ? `${xpNeeded} XP to next level` : 'Max level reached!'}
        </p>

        <XPBar progressPercentage={progressPercentage} />
        
        <div className="flex justify-between text-xs font-medium text-text-3 mt-2">
          <span>{currentXp} XP</span>
          <span>{nextXp} XP</span>
        </div>
      </div>
    </article>
  )
}
