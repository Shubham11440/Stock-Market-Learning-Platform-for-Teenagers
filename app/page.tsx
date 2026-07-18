import Link from 'next/link'
import { Logo } from '@/components/shared/Logo'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'StockUp — Learn. Trade. Level Up.',
  description:
    'Join 10,000+ teens learning the stock market through quests, virtual trading, and daily challenges. No real money until you are ready.',
}

// Static ticker data — will be live in Phase 5
const tickers = [
  { symbol: 'RELIANCE', change: '+1.24%', positive: true },
  { symbol: 'TCS', change: '+0.87%', positive: true },
  { symbol: 'INFY', change: '-0.43%', positive: false },
  { symbol: 'HDFC', change: '+2.11%', positive: true },
  { symbol: 'WIPRO', change: '-0.91%', positive: false },
  { symbol: 'ICICIBANK', change: '+1.56%', positive: true },
  { symbol: 'BAJFINANCE', change: '+3.02%', positive: true },
  { symbol: 'SBIN', change: '-0.28%', positive: false },
]

const features = [
  {
    icon: '🗺️',
    title: 'Quest-Based Learning',
    description:
      'Level up through 7 stages — from total rookie to market legend. Each level unlocks deeper concepts and bigger rewards.',
  },
  {
    icon: '📈',
    title: 'Virtual Trading Arena',
    description:
      'Practice with ₹1,00,000 of virtual money using real NSE & BSE data. Zero risk, maximum learning.',
  },
  {
    icon: '⚡',
    title: 'Daily Challenges',
    description:
      'Quick-fire quizzes, market events, and timed challenges keep you sharp and earning XP every single day.',
  },
  {
    icon: '🏆',
    title: 'Compete & Win',
    description:
      'Squad up with friends, challenge rivals to Stock Duels, and climb national leaderboards for real bragging rights.',
  },
  {
    icon: '🤖',
    title: 'AI Mentor: StockBot',
    description:
      'Ask anything in plain language. StockBot explains P/E ratios, candlesticks, and bull runs in Gen-Z speak.',
  },
  {
    icon: '🔓',
    title: 'Unlock Real Investing',
    description:
      'Reach Level 10 and unlock real investing with SEBI-compliant KYC. Graduate from virtual to actual wealth building.',
  },
]

const stats = [
  { value: '1%', label: 'Indians invest in stocks today', accent: 'loss' },
  { value: '₹1L', label: 'virtual cash to start learning', accent: 'profit' },
  { value: '7', label: 'levels from rookie to legend', accent: 'primary' },
  { value: '50+', label: 'badges & achievements to earn', accent: 'gold' },
]

export default function LandingPage() {
  const doubledTickers = [...tickers, ...tickers] // for seamless loop

  return (
    <div className="min-h-dvh bg-bg overflow-x-hidden">
      {/* ── Navbar ──────────────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 h-16 flex items-center justify-between px-6 lg:px-12 border-b border-border/40 bg-surface/60 backdrop-blur-xl">
        <Logo size="md" />
        <nav className="hidden md:flex items-center gap-8">
          {['Features', 'How it works', 'Leaderboard'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, '-')}`}
              className="text-sm text-text-2 hover:text-text-1 transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-text-2 hover:text-text-1 transition-colors duration-200"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 text-sm font-semibold rounded-xl bg-primary hover:bg-primary-dark text-white transition-all duration-200 shadow-lg shadow-primary/30 hover:shadow-primary/50"
          >
            Start for free
          </Link>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative min-h-dvh flex flex-col items-center justify-center pt-16 px-6 text-center overflow-hidden">
        {/* Radial glow bg */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        </div>
        <div className="pointer-events-none absolute top-1/3 -right-32 w-[400px] h-[400px] rounded-full bg-primary-light/5 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-1/4 -left-32 w-[350px] h-[350px] rounded-full bg-profit/5 blur-[100px]" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary-light text-sm font-medium mb-8 animate-[fadeIn_0.5s_ease-out]">
          <span className="w-2 h-2 rounded-full bg-profit animate-pulse" />
          India&apos;s first gamified trading school for teens
        </div>

        {/* Headline */}
        <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-7xl leading-[1.05] mb-6 max-w-4xl animate-[slideUp_0.6s_cubic-bezier(0.16,1,0.3,1)_0.1s_both]">
          <span className="text-text-1">The stock market</span>
          <br />
          <span className="gradient-text">is your new game.</span>
        </h1>

        {/* Subline */}
        <p className="text-text-2 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed animate-[slideUp_0.6s_cubic-bezier(0.16,1,0.3,1)_0.2s_both]">
          Learn trading through quests, compete with friends, and graduate to real investing
          — all built for the Gen-Z way of learning.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 animate-[slideUp_0.6s_cubic-bezier(0.16,1,0.3,1)_0.3s_both]">
          <Link
            href="/signup"
            id="hero-cta-signup"
            className="group px-7 py-3.5 rounded-2xl bg-primary text-white font-semibold text-base hover:bg-primary-dark transition-all duration-300 shadow-xl shadow-primary/35 hover:shadow-primary/55 hover:-translate-y-0.5 flex items-center gap-2"
          >
            Start your quest — it&apos;s free
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
          <Link
            href="/learn"
            id="hero-cta-demo"
            className="px-7 py-3.5 rounded-2xl border border-border text-text-1 font-medium text-base hover:bg-surface-2 hover:border-primary/40 transition-all duration-200"
          >
            See how it works
          </Link>
        </div>

        {/* Social proof */}
        <p className="mt-6 text-sm text-text-3 animate-[fadeIn_0.5s_ease-out_0.5s_both]">
          No credit card · No real money at first · 100% free to start
        </p>
      </section>

      {/* ── Live ticker ─────────────────────────────────────────────── */}
      <div className="border-y border-border bg-surface/50 py-3 overflow-hidden">
        <div className="flex ticker-tape whitespace-nowrap w-max">
          {doubledTickers.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 px-6 text-sm font-mono">
              <span className="text-text-2 font-medium">{t.symbol}</span>
              <span className={t.positive ? 'text-profit' : 'text-loss'}>{t.change}</span>
              <span className="text-border ml-3">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Stats ───────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="card p-6 text-center">
              <p
                className={`font-display font-black text-4xl mb-2 ${
                  stat.accent === 'loss'
                    ? 'text-loss'
                    : stat.accent === 'profit'
                      ? 'gradient-text-profit'
                      : stat.accent === 'gold'
                        ? 'gradient-text-gold'
                        : 'gradient-text'
                }`}
              >
                {stat.value}
              </p>
              <p className="text-sm text-text-2 leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────── */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl lg:text-5xl text-text-1 mb-4">
              Built different,{' '}
              <span className="gradient-text">for the different</span>
            </h2>
            <p className="text-text-2 max-w-xl mx-auto">
              Not another boring finance app. StockUp was designed from scratch for how Gen-Z actually learns — fast, social, and with real stakes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="card p-6 group hover:glow-primary transition-all duration-300"
              >
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <h3 className="font-display font-semibold text-text-1 text-lg mb-2">
                  {f.title}
                </h3>
                <p className="text-text-2 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl p-10 text-center gradient-animated">
            <div className="relative z-10">
              <p className="text-white/80 text-sm font-medium mb-3 uppercase tracking-widest">
                Ready to level up?
              </p>
              <h2 className="font-display font-black text-3xl lg:text-5xl text-white mb-6 leading-tight">
                Your first ₹1,00,000
                <br />
                portfolio awaits.
              </h2>
              <Link
                href="/signup"
                id="cta-banner-signup"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-primary font-bold text-base hover:bg-white/90 transition-all duration-200 shadow-2xl"
              >
                Create free account →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="border-t border-border py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-sm text-text-3 text-center">
            © {new Date().getFullYear()} StockUp · Made with ❤️ for India&apos;s next investors
          </p>
          <div className="flex gap-5 text-sm text-text-3">
            <a href="#" className="hover:text-text-1 transition-colors">Privacy</a>
            <a href="#" className="hover:text-text-1 transition-colors">Terms</a>
            <a href="#" className="hover:text-text-1 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
