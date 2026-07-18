import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Check, Lock, Play } from 'lucide-react'

export interface LevelNode {
  id: string
  title: string
  description: string
  isUnlocked: boolean
  isCompleted: boolean
  progress: number // 0 to 100
  lessonsTotal: number
  lessonsCompleted: number
}

interface QuestMapProps {
  levels: LevelNode[]
}

export function QuestMap({ levels }: QuestMapProps) {
  // A simple vertical path with zig-zag offsets
  const offsets = ['translate-x-0', 'translate-x-12', 'translate-x-0', '-translate-x-12']

  return (
    <div className="flex flex-col items-center py-10 w-full max-w-lg mx-auto relative">
      {/* Background connecting line */}
      <div className="absolute top-10 bottom-10 w-3 bg-surface-2 rounded-full z-0" />
      
      {/* Progress line overlay (simplified for now) */}
      <div 
        className="absolute top-10 w-3 bg-primary rounded-full z-0 transition-all duration-1000" 
        style={{ 
          height: `${levels.filter(l => l.isCompleted || l.isUnlocked).length * 120}px`,
          maxHeight: 'calc(100% - 80px)' 
        }} 
      />

      {levels.map((level, index) => {
        const offsetClass = offsets[index % offsets.length]
        const isCurrent = level.isUnlocked && !level.isCompleted
        
        return (
          <div key={level.id} className={cn('relative z-10 flex flex-col items-center mb-10 w-full', offsetClass)}>
            
            {/* The Level Node */}
            <Link 
              href={level.isUnlocked ? `/dashboard/learn/${level.id}` : '#'}
              className={cn(
                'group relative flex items-center justify-center w-20 h-20 rounded-full border-4 shadow-xl transition-all duration-300',
                level.isCompleted ? 'bg-primary border-primary-light text-white hover:scale-105' :
                level.isUnlocked ? 'bg-surface border-primary text-primary hover:scale-110 hover:shadow-primary/20' :
                'bg-surface-2 border-border text-text-3 cursor-not-allowed opacity-80'
              )}
              aria-label={`Level ${index + 1}: ${level.title}`}
              aria-disabled={!level.isUnlocked}
            >
              {/* Icon */}
              {level.isCompleted ? <Check size={32} strokeWidth={3} /> :
               level.isUnlocked ? <Play size={28} className="ml-1" fill="currentColor" /> :
               <Lock size={28} />}
               
              {/* Progress Ring (SVG) for current level */}
              {isCurrent && level.progress > 0 && (
                <svg className="absolute -inset-2 w-24 h-24 -rotate-90 pointer-events-none">
                  <circle 
                    cx="48" cy="48" r="44" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    fill="none" 
                    className="text-surface-2"
                  />
                  <circle 
                    cx="48" cy="48" r="44" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    fill="none" 
                    strokeDasharray="276"
                    strokeDashoffset={276 - (276 * level.progress) / 100}
                    className="text-primary transition-all duration-1000"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </Link>

            {/* Floating Title Bubble */}
            <div className="mt-4 bg-surface border border-border px-4 py-2 rounded-2xl shadow-sm text-center min-w-[140px]">
              <p className="font-display font-bold text-text-1 text-sm">{level.title}</p>
              {level.isUnlocked && (
                <p className="text-xs text-text-3 font-medium mt-0.5">
                  {level.lessonsCompleted} / {level.lessonsTotal} Lessons
                </p>
              )}
            </div>
            
          </div>
        )
      })}
    </div>
  )
}
