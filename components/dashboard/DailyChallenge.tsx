import Link from 'next/link'
import { Zap, ChevronRight } from 'lucide-react'

export function DailyChallenge() {
  return (
    <article className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-light p-5 text-white shadow-lg group">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
            <Zap size={20} className="text-white fill-white/50" />
          </div>
          <span className="font-medium text-sm text-white/90 uppercase tracking-wider">
            Daily Arena
          </span>
        </div>
        
        <h3 className="font-display font-bold text-xl mb-1 leading-tight">
          Test your market knowledge
        </h3>
        <p className="text-white/80 text-sm mb-5">
          Answer 5 rapid-fire questions to earn up to 150 XP.
        </p>

        <Link
          href="/dashboard/arena"
          className="inline-flex items-center gap-2 bg-white text-primary px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/90 transition-colors"
        >
          Enter the Arena
          <ChevronRight size={16} />
        </Link>
      </div>

      {/* Decorative lightning bolts */}
      <div className="absolute -right-6 -bottom-6 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
        <Zap size={140} />
      </div>
    </article>
  )
}
