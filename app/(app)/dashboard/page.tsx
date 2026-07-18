import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { LevelProgressCard } from '@/components/dashboard/LevelProgressCard'
import { PortfolioSnapshot } from '@/components/dashboard/PortfolioSnapshot'
import { StreakCard } from '@/components/dashboard/StreakCard'
import { DailyChallenge } from '@/components/dashboard/DailyChallenge'
import { TrendingStocks } from '@/components/dashboard/TrendingStocks'
import { NewsHighlight } from '@/components/dashboard/NewsHighlight'

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect('/login')
  }

  // Fetch only what we need using a strict select to minimize payload
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      image: true,
      xp: true,
      level: true,
      streak: true,
      virtualBalance: true,
      goalType: true,
    },
  })

  if (!user) {
    // Failsafe in case DB drops the user but session remains
    redirect('/login')
  }

  // A small dynamic greeting based on time of day
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  const firstName = user.name.split(' ')[0]

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto h-full">
      {/* ── Header ───────────────────────────────────────────── */}
      <header className="flex flex-col gap-1">
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-text-1">
          {greeting}, {firstName}!
        </h1>
        <p className="text-text-3">
          Here&apos;s your market overview for today.
        </p>
      </header>

      {/* ── Dashboard Grid ──────────────────────────────────────── */}
      {/* Mobile: 1 col, Desktop: 12 cols (8 main / 4 side) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Column (Left on Desktop) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Portfolio Snapshot (Hero Widget) */}
          <section aria-label="Portfolio Snapshot">
            <PortfolioSnapshot balance={user.virtualBalance} />
          </section>

          {/* Level Progress */}
          <section aria-label="Level Progress">
            <LevelProgressCard 
              name={user.name} 
              avatar={user.image} 
              currentXp={user.xp} 
              level={user.level} 
            />
          </section>

          {/* Trending Stocks (Visible early on Mobile, below level on Desktop) */}
          <section aria-label="Trending Stocks" className="hidden lg:block h-full">
            <TrendingStocks />
          </section>
        </div>

        {/* Side Column (Right on Desktop) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Streak & Daily Challenge Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <section aria-label="Daily Streak">
              <StreakCard streakCount={user.streak} className="h-full" />
            </section>
            
            <section aria-label="Daily Challenge">
              <DailyChallenge />
            </section>
          </div>

          <section aria-label="News Highlights" className="h-full">
            <NewsHighlight />
          </section>

          {/* Duplicate Trending Stocks for mobile view to order it differently if desired, 
              but standard responsive flow handles it. We just show it below news on mobile. */}
          <section aria-label="Trending Stocks" className="lg:hidden h-full">
            <TrendingStocks />
          </section>
        </div>

      </div>
    </div>
  )
}
