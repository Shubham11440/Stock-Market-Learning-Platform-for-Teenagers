'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Trophy, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function HeroSection() {
  return (
    <section className="relative min-h-dvh pt-32 pb-20 overflow-hidden flex items-center">
      {/* Mesh Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal/5 blur-[100px] rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none" />
      <div className="absolute inset-0 noise-bg" />

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center relative z-10">
        
        {/* Left: Editorial Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface/50 backdrop-blur-md mb-8">
            <Star size={12} className="text-gold" />
            <span className="text-xs font-medium tracking-wide uppercase text-text-2">
              Next-Gen Learning Platform
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-sans font-semibold tracking-[-0.04em] leading-[1.05] text-text-1 mb-6 text-balance">
            Master the market. <br />
            <span className="text-editorial">Play the game.</span>
          </h1>

          <p className="text-lg text-text-2 leading-relaxed mb-10 max-w-md text-balance font-medium">
            A premium simulation environment to learn trading, build your virtual portfolio, and compete with friends. Zero risk, real knowledge.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/signup"
              className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-text-1 text-bg px-8 py-4 rounded-full font-medium text-sm transition-transform hover:scale-105 active:scale-95 shadow-premium-md"
            >
              Start your journey
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#product"
              className="w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-full font-medium text-sm text-text-1 border border-border bg-surface/50 backdrop-blur-md hover:bg-surface transition-colors"
            >
              Explore features
            </Link>
          </div>
        </motion.div>

        {/* Right: Realistic Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotateY: 10, rotateX: 5 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ perspective: 1200 }}
          className="relative"
        >
          {/* Main App Window */}
          <div className="relative z-10 premium-card overflow-hidden shadow-premium-lg bg-surface">
            {/* macOS style header */}
            <div className="h-12 border-b border-border bg-surface-2/50 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-border" />
              <div className="w-3 h-3 rounded-full bg-border" />
              <div className="w-3 h-3 rounded-full bg-border" />
            </div>
            
            {/* App Content */}
            <div className="p-6 grid gap-6 bg-bg">
              {/* Top row: Portfolio & XP */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-border shadow-premium-sm">
                  <p className="text-xs font-medium text-text-3 mb-1 uppercase tracking-wider">Virtual Portfolio</p>
                  <p className="text-2xl font-semibold font-mono tracking-tight">₹1,24,350<span className="text-text-3 text-lg">.00</span></p>
                  <p className="text-xs text-profit font-medium mt-2 flex items-center gap-1"><TrendingUp size={12}/> +₹3,250 today</p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-border shadow-premium-sm relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 w-24 h-24 bg-primary/10 rounded-full blur-xl translate-x-1/2 translate-y-1/2" />
                  <p className="text-xs font-medium text-text-3 mb-1 uppercase tracking-wider">Current Level</p>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-lg font-semibold">Trader</p>
                    <p className="text-xs font-mono text-primary">1540 XP</p>
                  </div>
                  <div className="h-1.5 w-full bg-surface-2 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[65%] rounded-full" />
                  </div>
                </div>
              </div>

              {/* Chart Area */}
              <div className="p-4 rounded-2xl bg-surface border border-border shadow-premium-sm">
                 <div className="flex justify-between items-center mb-4">
                    <p className="text-sm font-medium">Performance</p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 rounded bg-surface-2 text-[10px] font-medium">1W</span>
                      <span className="px-2 py-1 rounded bg-primary/10 text-primary text-[10px] font-medium">1M</span>
                    </div>
                 </div>
                 {/* Fake SVG Chart */}
                 <svg viewBox="0 0 400 100" className="w-full h-24 overflow-visible">
                    <path d="M0,80 C40,70 80,90 120,60 C160,30 200,50 240,20 C280,-10 320,30 360,10 L400,0" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M0,80 C40,70 80,90 120,60 C160,30 200,50 240,20 C280,-10 320,30 360,10 L400,0 L400,100 L0,100 Z" fill="url(#gradient)" opacity="0.1" />
                    <defs>
                      <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="1" className="text-primary" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0" className="text-primary" />
                      </linearGradient>
                    </defs>
                 </svg>
              </div>

              {/* Watchlist */}
              <div className="space-y-3">
                <p className="text-xs font-medium text-text-3 uppercase tracking-wider">Watchlist</p>
                {[
                  { name: 'Reliance', price: '₹2,914.50', change: '+1.2%', up: true },
                  { name: 'Infosys', price: '₹1,678.20', change: '-0.4%', up: false },
                  { name: 'TCS', price: '₹3,842.00', change: '+2.1%', up: true }
                ].map((s) => (
                  <div key={s.name} className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-2 transition-colors cursor-pointer border border-transparent hover:border-border">
                    <span className="text-sm font-semibold">{s.name}</span>
                    <div className="text-right">
                      <p className="text-sm font-mono">{s.price}</p>
                      <p className={cn("text-[10px] font-medium", s.up ? "text-profit" : "text-loss")}>{s.change}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating UI Element 1: Achievement Badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-12 top-24 z-20 glass-panel px-4 py-3 rounded-2xl shadow-premium-lg flex items-center gap-3 border border-border/50"
          >
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold"><Trophy size={20}/></div>
            <div>
              <p className="text-xs font-semibold">First Profit</p>
              <p className="text-[10px] text-text-3">Achievement Unlocked</p>
            </div>
          </motion.div>

          {/* Floating UI Element 2: Toast */}
          <motion.div
             animate={{ y: [0, 8, 0] }}
             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             className="absolute -left-8 bottom-32 z-20 glass-panel px-4 py-3 rounded-2xl shadow-premium-md flex items-center gap-3 border border-border/50"
          >
            <div className="w-2 h-2 rounded-full bg-profit" />
            <p className="text-xs font-medium">Buy order executed: <span className="font-semibold">10 RELIANCE</span></p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
