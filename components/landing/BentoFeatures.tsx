'use client'

import { motion } from 'framer-motion'
import { Target, Zap, Users, BarChart3, ShieldCheck } from 'lucide-react'

export function BentoFeatures() {
  return (
    <section id="product" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-4xl lg:text-5xl font-sans font-semibold tracking-tight text-text-1 mb-4"
             >
               Engineered for the <span className="text-editorial">next generation.</span>
             </motion.h2>
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-text-2 text-lg"
             >
               Every tool you need to understand the markets, beautifully crafted into a single, seamless experience.
             </motion.p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
          
          {/* Card 1: Large Quest Map (Span 2) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="md:col-span-2 premium-card p-8 flex flex-col justify-between group overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-surface-2 flex items-center justify-center border border-border mb-6 group-hover:scale-105 transition-transform">
                <Target size={24} className="text-violet-500" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Quest-Based Learning</h3>
              <p className="text-text-2 max-w-sm">
                Progress through a carefully curated curriculum. Earn XP, unlock levels, and master complex concepts without the overwhelm.
              </p>
            </div>
            {/* Custom Illustration: Glowing nodes */}
            <div className="absolute right-8 bottom-8 flex items-center gap-3">
              {[1, 2, 3].map((node) => (
                <div key={node} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${node === 3 ? 'border-border bg-surface-2' : 'border-violet-500 bg-violet-500/10'}`}>
                    {node < 3 ? <ShieldCheck size={14} className="text-violet-500"/> : <span className="w-2 h-2 rounded-full bg-text-3"/>}
                  </div>
                  {node < 3 && <div className="w-8 h-px bg-border" />}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Live Market Data (Tall) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="premium-card p-8 flex flex-col justify-between group overflow-hidden relative md:row-span-2"
          >
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-teal-500/10 to-transparent" />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-surface-2 flex items-center justify-center border border-border mb-6 group-hover:scale-105 transition-transform">
                <BarChart3 size={24} className="text-teal-500" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Live Market Data</h3>
              <p className="text-text-2">
                Real-time quotes from NSE & BSE. Practice trading in conditions that mirror the actual market.
              </p>
            </div>
            
            {/* Custom Illustration: Mini Ticker list */}
            <div className="space-y-3 mt-8 relative z-10">
               {[ {s: 'RELIANCE', c: '+1.2%'}, {s: 'HDFC', c: '+0.8%'}, {s: 'TCS', c: '-0.2%'}].map((stock, i) => (
                 <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-surface border border-border shadow-premium-sm">
                   <span className="text-sm font-semibold">{stock.s}</span>
                   <span className={`text-xs font-medium ${stock.c.includes('+') ? 'text-profit' : 'text-loss'}`}>{stock.c}</span>
                 </div>
               ))}
            </div>
          </motion.div>

          {/* Card 3: Multiplayer (Square) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="premium-card p-8 flex flex-col justify-between group overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-surface-2 flex items-center justify-center border border-border mb-6 group-hover:scale-105 transition-transform">
                <Users size={24} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiplayer</h3>
              <p className="text-text-2 text-sm">
                Squad up with friends, form investment clubs, and challenge each other in stock duels.
              </p>
            </div>
          </motion.div>

          {/* Card 4: Daily Arena (Square) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -4 }}
            className="premium-card p-8 flex flex-col justify-between group overflow-hidden relative"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-surface-2 flex items-center justify-center border border-border mb-6 group-hover:scale-105 transition-transform">
                <Zap size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Daily Arena</h3>
              <p className="text-text-2 text-sm">
                Short, high-intensity quizzes and market prediction events to keep your streak alive.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
