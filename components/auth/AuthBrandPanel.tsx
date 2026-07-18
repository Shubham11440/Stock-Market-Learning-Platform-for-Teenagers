import { Logo } from '@/components/shared/Logo'

// Brand panel — Server Component, no hydration cost
export function AuthBrandPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between p-12 bg-[#050505] relative overflow-hidden min-h-screen">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      <Logo size="md" className="relative z-10" />

      {/* Central content */}
      <div className="relative z-10">
        <p className="text-4xl font-display font-bold text-white leading-tight mb-4">
          Master the market.
          <br />
          <span className="text-primary-light">Play the game.</span>
        </p>
        <p className="text-zinc-400 text-base leading-relaxed max-w-sm">
          A premium simulation environment to learn trading, build your virtual portfolio, and compete with friends.
        </p>

        {/* Stat card */}
        <div className="mt-10 inline-flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="w-10 h-10 rounded-full bg-profit/20 flex items-center justify-center text-profit text-lg">₹</div>
          <div>
            <p className="text-white font-semibold">₹1,00,000</p>
            <p className="text-zinc-500 text-xs">virtual portfolio ready for you</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="relative z-10 text-zinc-600 text-xs">
        No real money until you're ready.
      </p>
    </div>
  )
}
