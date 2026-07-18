'use client'

import { motion } from 'framer-motion'

const levels = [
  { id: 1, title: 'Rookie', xp: '0 XP', status: 'completed' },
  { id: 2, title: 'Scout', xp: '500 XP', status: 'completed' },
  { id: 3, title: 'Analyst', xp: '1.5K XP', status: 'completed' },
  { id: 4, title: 'Strategist', xp: '3.5K XP', status: 'current' },
  { id: 5, title: 'Trader', xp: '7K XP', status: 'locked' },
  { id: 6, title: 'Pro', xp: '12K XP', status: 'locked' },
  { id: 7, title: 'Legend', xp: '20K XP', status: 'locked' },
]

export function JourneyMap() {
  return (
    <section id="journey" className="py-32 px-6 bg-surface-2/30 border-y border-border relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="max-w-5xl mx-auto text-center mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-5xl font-sans font-semibold tracking-tight text-text-1 mb-6"
        >
          A curriculum disguised as a <span className="text-editorial">game.</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-text-2 text-lg max-w-2xl mx-auto"
        >
          Follow a structured path from absolute beginner to market legend. 
          Each level unlocks new features, advanced trading tools, and actual rewards.
        </motion.p>
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Horizontal Line background */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2 hidden md:block" />
        
        {/* Active glowing line */}
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: '50%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-1/2 left-0 h-[2px] bg-primary -translate-y-1/2 hidden md:block shadow-[0_0_10px_rgb(var(--primary))]"
        />

        <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
          {levels.map((level, i) => (
            <motion.div 
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex md:flex-col items-center gap-4 md:gap-6 relative group"
            >
              {/* Desktop connector vertical line for staggering - optional, keeping it simple horizontal */}
              <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center bg-bg relative transition-all duration-300
                ${level.status === 'completed' ? 'border-primary text-primary' : 
                  level.status === 'current' ? 'border-primary bg-primary text-white shadow-[0_0_15px_rgb(var(--primary)_/_0.5)]' : 
                  'border-border text-text-3'}"
                style={{
                  borderColor: level.status === 'completed' || level.status === 'current' ? 'rgb(var(--primary))' : 'rgb(var(--border))',
                  backgroundColor: level.status === 'current' ? 'rgb(var(--primary))' : 'rgb(var(--bg))',
                  color: level.status === 'current' ? '#fff' : level.status === 'completed' ? 'rgb(var(--primary))' : 'rgb(var(--text-3))'
                }}
              >
                <span className="font-semibold text-sm">{level.id}</span>
                {level.status === 'current' && (
                  <div className="absolute -inset-2 rounded-full border border-primary/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                )}
              </div>
              
              <div className="text-left md:text-center">
                <p className={`font-semibold mb-1 ${level.status === 'locked' ? 'text-text-3' : 'text-text-1'}`}>
                  {level.title}
                </p>
                <p className="text-xs font-mono text-text-3">{level.xp}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
