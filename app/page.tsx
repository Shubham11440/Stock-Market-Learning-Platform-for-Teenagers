import Link from 'next/link'
import { Logo } from '@/components/shared/Logo'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'StockUp — The stock market is your new game.',
  description:
    'Join 10,000+ teens learning the stock market through quests, virtual trading, and daily challenges. No real money until you are ready.',
}

// ── Static data ────────────────────────────────────────────────────────

const stats = [
  { value: '1%', label: 'Indians invest in stocks today', color: 'text-loss' },
  { value: '₹1L', label: 'virtual cash to start trading', color: 'gradient-text' },
  { value: '7', label: 'levels from rookie to legend', color: 'text-text-1' },
  { value: '50+', label: 'badges and achievements', color: 'gradient-text-gold' },
]

const levels = [
  { number: 1, label: 'Rookie', color: 'bg-[#94A3B8]', textColor: 'text-[#64748B]' },
  { number: 2, label: 'Level', color: 'bg-teal-500', textColor: 'text-teal-600' },
  { number: 3, label: 'Analyst', color: 'bg-orange-400', textColor: 'text-orange-500' },
  { number: 4, label: 'Strategist', color: 'bg-orange-500', textColor: 'text-orange-600' },
  { number: 5, label: 'Trader', color: 'bg-teal-600', textColor: 'text-teal-700' },
  { number: 6, label: 'Pro', color: 'bg-violet-600', textColor: 'text-violet-700' },
  { number: 7, label: 'Legend', color: 'bg-[#0F172A] dark:bg-white', textColor: 'text-[#0F172A] dark:text-white' },
]

const leaderboard = [
  { rank: 1, name: 'Arjun Mehta', username: '@arjunm', portfolio: '₹2,14,300', change: '+14.2%', positive: true },
  { rank: 2, name: 'Priya Singh', username: '@priyaS', portfolio: '₹1,98,450', change: '+11.8%', positive: true },
  { rank: 3, name: 'Rohan Shah', username: '@rohanS', portfolio: '₹1,76,200', change: '+9.4%', positive: true },
  { rank: 4, name: 'Anika Patel', username: '@anikaP', portfolio: '₹1,54,800', change: '+7.1%', positive: true },
  { rank: 5, name: 'Dev Sharma', username: '@devSh', portfolio: '₹1,32,100', change: '-2.3%', positive: false },
]

const testimonials = [
  {
    quote: 'I never thought learning stocks could feel this addictive. I finished Level 3 in one weekend. My dad was shocked I knew what a P/E ratio was.',
    name: 'Aarav K.',
    handle: '@aaravk_trades',
    level: 'Level 4 · Strategist',
    avatar: 'AK',
    color: 'bg-violet-500',
  },
  {
    quote: 'The daily arena is literally the first thing I open in the morning. Beat my friend\'s 12-day streak and I\'m not stopping until I reach Legend.',
    name: 'Meera R.',
    handle: '@meera_invests',
    level: 'Level 5 · Trader',
    avatar: 'MR',
    color: 'bg-teal-500',
  },
  {
    quote: 'StockBot explained EBITDA to me in 30 seconds. My finance teacher took 2 classes. The squad feature got my whole friend group hooked.',
    name: 'Kabir T.',
    handle: '@kabir_stocks',
    level: 'Level 3 · Analyst',
    avatar: 'KT',
    color: 'bg-orange-500',
  },
]

const features = [
  {
    emoji: '🗺️',
    label: 'Quest-Based Learning',
    color: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  },
  {
    emoji: '📈',
    label: 'Virtual Trading Arena',
    color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  },
  {
    emoji: '⚡',
    label: 'Daily Challenges',
    color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  },
  {
    emoji: '👥',
    label: 'Compete with Friends',
    color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  },
  {
    emoji: '🔓',
    label: 'Real Investing',
    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  },
]

// ── Ticker data ────────────────────────────────────────────────────────
const tickers = [
  { symbol: 'RELIANCE', change: '+1.24%', positive: true },
  { symbol: 'TCS', change: '+0.87%', positive: true },
  { symbol: 'INFY', change: '-0.43%', positive: false },
  { symbol: 'HDFC', change: '+2.11%', positive: true },
  { symbol: 'WIPRO', change: '-0.91%', positive: false },
  { symbol: 'BAJFINANCE', change: '+3.02%', positive: true },
  { symbol: 'SBIN', change: '-0.28%', positive: false },
  { symbol: 'ICICIBANK', change: '+1.56%', positive: true },
  { symbol: 'HCLTECH', change: '+0.72%', positive: true },
  { symbol: 'AXISBANK', change: '-0.14%', positive: false },
]

// ── Page ────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const doubledTickers = [...tickers, ...tickers]

  return (
    <div className="min-h-dvh bg-bg text-text-1 overflow-x-hidden">

      {/* ════════════════════════════════════════
          NAVBAR
      ════════════════════════════════════════ */}
      <header className="fixed top-0 inset-x-0 z-50 h-16 flex items-center px-6 lg:px-12 border-b border-border bg-surface/80 backdrop-blur-xl">
        <Logo size="sm" />

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-7 mx-auto">
          {[
            { label: 'How it works', href: '#how-it-works' },
            { label: 'Features', href: '#features' },
            { label: 'Leaderboard', href: '#leaderboard' },
            { label: 'Blog', href: '#' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-text-2 hover:text-text-1 transition-colors duration-200 font-medium"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3 ml-auto md:ml-0">
          <ThemeToggle />
          <Link
            href="/login"
            className="hidden sm:block text-sm text-text-2 hover:text-text-1 font-medium transition-colors px-3 py-1.5"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            id="nav-cta"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[#0F172A] dark:bg-primary hover:opacity-90 transition-all duration-200 shadow-sm"
          >
            Get started <span aria-hidden>→</span>
          </Link>
        </div>
      </header>

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="relative min-h-dvh flex items-center pt-16 overflow-hidden">
        {/* Subtle top-right radial fill */}
        <div className="pointer-events-none absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-violet-50 via-transparent to-transparent dark:from-violet-950/20 dark:to-transparent" />

        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 py-20 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: text ── */}
          <div className="animate-[slideUp_0.7s_cubic-bezier(0.16,1,0.3,1)_both]">
            {/* Category label */}
            <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full border border-border bg-surface text-xs font-semibold tracking-widest text-text-2 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-profit animate-pulse" />
              Stock Market Learning Platform
            </div>

            {/* Headline */}
            <h1 className="font-display font-black text-[2.6rem] sm:text-5xl lg:text-[3.5rem] leading-[1.08] mb-6 tracking-tight">
              <span className="text-text-1 block">The stock market</span>
              <span className="text-editorial block">is your new game.</span>
            </h1>

            {/* Body */}
            <p className="text-text-2 text-lg leading-relaxed mb-8 max-w-md">
              Learn trading through quests, practice with ₹1,00,000 virtual cash, compete with friends, and unlock real investing when you&apos;re ready.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/signup"
                id="hero-primary-cta"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-base bg-[#0F172A] dark:bg-primary text-white hover:opacity-90 transition-all duration-200 shadow-lg hover:-translate-y-0.5"
              >
                Start your quest — free
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
              <Link
                href="#how-it-works"
                id="hero-secondary-cta"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-base border border-border text-text-1 hover:bg-surface-2 hover:border-primary/30 transition-all duration-200"
              >
                See how it works
              </Link>
            </div>

            {/* Trust text */}
            <p className="mt-5 text-xs text-text-3">
              No credit card · No real money at first · Free forever to start
            </p>
          </div>

          {/* ── Right: App mockup card ── */}
          <div className="relative animate-[slideUp_0.7s_cubic-bezier(0.16,1,0.3,1)_0.15s_both]">
            {/* Outer glow */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet-200/50 via-purple-100/30 to-teal-100/20 dark:from-violet-900/20 dark:via-purple-900/10 dark:to-transparent blur-2xl" />

            {/* App window */}
            <div className="relative rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-surface-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                <span className="flex-1 mx-3 h-5 rounded-md bg-surface-3 text-[10px] text-text-3 flex items-center justify-center">
                  stockup.in/portfolio
                </span>
              </div>

              {/* Dashboard content */}
              <div className="p-5 space-y-4 bg-gradient-to-br from-violet-50/50 to-bg dark:from-violet-950/10 dark:to-bg">
                {/* Portfolio header */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-text-3 font-medium mb-0.5">Total Portfolio Value</p>
                    <p className="font-display font-black text-2xl text-text-1">₹4,04,812<span className="text-lg">.40</span></p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-profit/10 text-profit font-semibold">+12.4% ↑</span>
                      <span className="text-xs text-text-3">this week</span>
                    </div>
                  </div>
                  {/* Mini bar chart */}
                  <div className="flex items-end gap-1 h-12">
                    {[40, 55, 45, 65, 58, 75, 68, 85].map((h, i) => (
                      <div
                        key={i}
                        className="w-2.5 rounded-sm"
                        style={{
                          height: `${h}%`,
                          backgroundColor: i === 7 ? 'rgb(var(--primary))' : 'rgb(var(--primary) / 0.2)',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* XP Level bar */}
                <div className="px-3 py-2.5 rounded-xl bg-surface border border-border">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs">⚡</span>
                      <span className="text-xs font-semibold text-text-1">Level 4 — Strategist</span>
                    </div>
                    <span className="text-xs text-text-3">3,200 / 3,500 XP</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light w-[91%]" />
                  </div>
                </div>

                {/* Stock mini cards */}
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { name: 'TCS', price: '₹3,842', change: '+2.4%', pos: true },
                    { name: 'RELIANCE', price: '₹2,914', change: '+1.8%', pos: true },
                    { name: 'INFY', price: '₹1,678', change: '-0.6%', pos: false },
                    { name: 'HDFC', price: '₹1,543', change: '+3.2%', pos: true },
                  ].map((stock) => (
                    <div
                      key={stock.name}
                      className="px-3 py-2 rounded-lg border border-border bg-surface hover:border-primary/30 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-bold text-text-1">{stock.name}</span>
                        <span className={`text-[10px] font-semibold ${stock.pos ? 'text-profit' : 'text-loss'}`}>
                          {stock.change}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-text-2">{stock.price}</p>
                    </div>
                  ))}
                </div>

                {/* Badges earned strip */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-3">Badges earned:</span>
                  {['🏆', '🔥', '⚡', '💎', '🎯'].map((b, i) => (
                    <span
                      key={i}
                      className="w-6 h-6 rounded-full bg-surface-2 border border-border flex items-center justify-center text-xs"
                    >
                      {b}
                    </span>
                  ))}
                  <span className="text-[10px] text-text-3 ml-1">+12 more</span>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -right-4 top-12 glass rounded-xl px-3 py-2 shadow-xl border border-border animate-[float_6s_ease-in-out_infinite]">
              <p className="text-xs font-semibold text-text-1">🔥 7-day streak!</p>
              <p className="text-[10px] text-text-3">+175 XP earned today</p>
            </div>

            {/* Floating trade card */}
            <div className="absolute -left-4 bottom-12 glass rounded-xl px-3 py-2 shadow-xl border border-border animate-[float_6s_ease-in-out_2s_infinite]">
              <p className="text-[10px] text-text-3 mb-0.5">Virtual trade placed</p>
              <p className="text-xs font-semibold text-profit">↑ TCS · BUY · ₹3,842</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TICKER STRIP
      ════════════════════════════════════════ */}
      <div className="border-y border-border bg-surface py-3 overflow-hidden">
        <div className="flex ticker-tape whitespace-nowrap w-max">
          {doubledTickers.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 px-6 text-xs font-mono">
              <span className="text-text-2 font-medium uppercase">{t.symbol}</span>
              <span className={t.positive ? 'text-profit font-semibold' : 'text-loss font-semibold'}>{t.change}</span>
              <span className="text-border ml-3">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          STATS STRIP
      ════════════════════════════════════════ */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-surface border border-border rounded-2xl p-6 text-center hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              <p className={`font-display font-black text-4xl lg:text-5xl mb-2 ${stat.color}`}>
                {stat.value}
              </p>
              <p className="text-xs text-text-3 leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          BUILT DIFFERENT
      ════════════════════════════════════════ */}
      <section id="features" className="py-20 px-6 bg-surface-2/50">
        <div className="max-w-5xl mx-auto">
          {/* Section label */}
          <p className="text-xs font-semibold tracking-widest text-text-3 uppercase mb-4">FEATURES</p>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <h2 className="font-display font-black text-3xl lg:text-5xl leading-tight max-w-md">
              Built different,{' '}
              <span className="text-editorial">for the different.</span>
            </h2>
            <p className="text-text-2 max-w-xs text-sm leading-relaxed">
              Not another boring finance course. StockUp is built the way Gen-Z actually learns — fast, social, visual, and addictive.
            </p>
          </div>

          {/* Feature cards grid */}
          <div className="grid lg:grid-cols-2 gap-5 mb-5">
            {/* Quest card */}
            <div className="relative bg-surface border border-border rounded-2xl p-6 overflow-hidden group hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-300">
              <div className="absolute inset-0 dot-grid opacity-30" />
              <div className="relative">
                <span className="text-3xl mb-4 block">🗺️</span>
                <h3 className="font-display font-bold text-xl text-text-1 mb-2">Quest-Based Learning</h3>
                <p className="text-sm text-text-2 leading-relaxed mb-5">
                  Seven levels, each unlocking deeper market concepts. Earn XP, unlock badges, and level up from Rookie to Legend at your own pace.
                </p>
                {/* Level preview */}
                <div className="flex items-center gap-2">
                  {['🟤', '🔵', '🟠', '🟠', '🔵', '🟣', '⚫'].map((dot, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <span className="text-sm">{dot}</span>
                      {i < 6 && <div className="w-4 h-px bg-border" />}
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-surface-2 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-400 w-[57%]" />
                  </div>
                  <span className="text-xs text-text-3 font-mono">Level 4</span>
                </div>
              </div>
            </div>

            {/* Virtual Trading card */}
            <div className="relative bg-surface border border-border rounded-2xl p-6 overflow-hidden group hover:border-teal-300 dark:hover:border-teal-700 transition-all duration-300">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-teal-50 dark:bg-teal-950/20 blur-2xl" />
              <div className="relative">
                <span className="text-3xl mb-4 block">📈</span>
                <h3 className="font-display font-bold text-xl text-text-1 mb-2">Virtual Trading Arena</h3>
                <p className="text-sm text-text-2 leading-relaxed mb-5">
                  Practice with ₹1,00,000 of virtual money using live NSE &amp; BSE data. Make mistakes, learn fast, and build confidence — zero risk.
                </p>
                {/* Mini bar chart */}
                <div className="flex items-end gap-1.5 h-16 px-2">
                  {[30, 45, 38, 60, 52, 70, 65, 80, 73, 88, 82, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm transition-all duration-300 group-hover:opacity-100"
                      style={{
                        height: `${h}%`,
                        background: i >= 9
                          ? 'linear-gradient(to top, #0D9488, #14B8A6)'
                          : 'rgb(var(--surface-2))',
                        opacity: i >= 9 ? 1 : 0.7,
                      }}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between mt-2 px-2">
                  <span className="text-xs text-text-3 font-mono">NIFTY 50</span>
                  <span className="text-xs text-profit font-semibold">+4.2% this week</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature pill tags */}
          <div className="flex flex-wrap gap-3">
            {features.map((f) => (
              <div
                key={f.label}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-transparent ${f.color} transition-all duration-200 hover:scale-105 cursor-default`}
              >
                <span>{f.emoji}</span>
                {f.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          LEVEL MAP
      ════════════════════════════════════════ */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-text-3 uppercase mb-4">THE JOURNEY</p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <h2 className="font-display font-black text-3xl lg:text-5xl leading-tight max-w-md">
              From Rookie to{' '}
              <span className="text-editorial">Legend</span>{' '}
              in seven levels.
            </h2>
            <Link
              href="/learn"
              className="text-sm text-primary font-semibold hover:underline underline-offset-4 flex-shrink-0"
            >
              See full curriculum →
            </Link>
          </div>

          {/* Level indicators */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-5 left-[3.5%] right-[3.5%] h-px bg-border hidden lg:block" />

            <div className="grid grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-0">
              {levels.map((level, i) => (
                <div key={level.number} className="relative flex flex-col items-center text-center lg:px-1">
                  {/* Circle */}
                  <div
                    className={`relative z-10 w-10 h-10 rounded-full ${level.color} flex items-center justify-center mb-3 shadow-md ring-2 ring-bg`}
                  >
                    <span className="text-white font-display font-black text-sm dark:text-white">
                      {level.number < 7 ? level.number : '★'}
                    </span>
                  </div>
                  <p className={`text-xs font-bold ${level.textColor}`}>{level.label}</p>
                  <p className="text-[10px] text-text-3 mt-0.5 hidden lg:block">
                    {
                      ['0 XP', '500 XP', '1.5K XP', '3.5K XP', '7K XP', '12K XP', '20K XP'][i]
                    }
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          LEADERBOARD (Dark section)
      ════════════════════════════════════════ */}
      <section id="leaderboard" className="py-20 px-6 bg-[#0F0E2A] dark:bg-surface-2">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <h2 className="font-display font-black text-3xl lg:text-5xl text-white leading-tight">
              The top 1%{' '}
              <span className="italic" style={{ color: '#14B8A6' }}>this week.</span>
            </h2>
            <Link
              href="/leaderboard"
              className="text-sm text-[#14B8A6] font-semibold hover:underline underline-offset-4 flex-shrink-0"
            >
              See full leaderboard →
            </Link>
          </div>

          {/* Table */}
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Rank</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Trader</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider hidden sm:table-cell">Portfolio</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Week</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, i) => (
                  <tr
                    key={entry.rank}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150"
                  >
                    <td className="px-5 py-4">
                      <span
                        className={`font-display font-bold text-sm ${
                          i === 0 ? 'text-[#F59E0B]' : i === 1 ? 'text-[#94A3B8]' : i === 2 ? 'text-[#CD7C2F]' : 'text-white/40'
                        }`}
                      >
                        #{entry.rank}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                          aria-hidden
                        >
                          {entry.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{entry.name}</p>
                          <p className="text-xs text-white/40">{entry.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right hidden sm:table-cell">
                      <span className="text-sm font-mono font-medium text-white">{entry.portfolio}</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span
                        className={`text-sm font-semibold ${entry.positive ? 'text-[#10B981]' : 'text-[#EF4444]'}`}
                      >
                        {entry.change}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-xs text-white/30 mt-5">
            Updated every Monday · Based on virtual portfolio performance
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════ */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-text-3 uppercase mb-4">REVIEWS</p>
          <h2 className="font-display font-black text-3xl lg:text-5xl leading-tight mb-14 max-w-lg">
            From the teens{' '}
            <span className="text-editorial">who are already ahead.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20" fill="#F59E0B" className="w-4 h-4" aria-hidden>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-text-2 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-2 border-t border-border">
                  <div
                    className={`w-8 h-8 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-1">{t.name}</p>
                    <p className="text-xs text-text-3">{t.level}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════ */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-violet-700 px-8 py-14 lg:px-14 lg:py-16">
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-3xl translate-x-1/3 -translate-y-1/3" />
            <div className="pointer-events-none absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 blur-2xl -translate-x-1/3 translate-y-1/3" />

            <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div>
                <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-3">
                  Ready to level up?
                </p>
                <h2 className="font-display font-black text-3xl lg:text-5xl text-white leading-tight mb-3">
                  Your first ₹1,00,000
                  <br />portfolio awaits.
                </h2>
                <p className="text-white/60 text-sm max-w-md">
                  No real money needed. No experience required. Just start your first quest and the rest follows.
                </p>
              </div>
              <Link
                href="/signup"
                id="banner-cta"
                className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white text-violet-700 font-bold text-base hover:bg-white/90 transition-all duration-200 shadow-2xl hover:-translate-y-0.5 whitespace-nowrap"
              >
                Create free account →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer className="border-t border-border py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
            {/* Brand */}
            <div className="col-span-2">
              <Logo size="sm" className="mb-4" />
              <p className="text-sm text-text-3 leading-relaxed max-w-xs">
                India&apos;s first gamified stock market learning platform built for the next generation of investors.
              </p>
            </div>

            {/* Links */}
            {[
              {
                title: 'Product',
                links: ['Features', 'How it works', 'Leaderboard', 'Campus Leagues'],
              },
              {
                title: 'Company',
                links: ['About', 'Blog', 'Careers', 'Press'],
              },
              {
                title: 'Legal',
                links: ['Privacy Policy', 'Terms of Service', 'SEBI Disclaimer', 'Cookie Policy'],
              },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold text-text-2 uppercase tracking-widest mb-4">
                  {col.title}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-text-3 hover:text-text-1 transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 border-t border-border">
            <p className="text-xs text-text-3">
              © {new Date().getFullYear()} StockUp. All rights reserved.
            </p>
            <p className="text-xs text-text-3">
              Made with ❤️ for India&apos;s next investors · Not SEBI registered · Virtual money only
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
