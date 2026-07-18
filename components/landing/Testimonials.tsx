'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    quote: "I never thought learning stocks could feel this addictive. I finished Level 3 in one weekend. My dad was shocked I knew what a P/E ratio was.",
    name: "Aarav K.",
    role: "Level 4 Strategist",
    initial: "A",
    color: "bg-violet-500",
    height: "md:col-span-1 md:row-span-2"
  },
  {
    quote: "The daily arena is literally the first thing I open in the morning. Beat my friend's 12-day streak and I'm not stopping until I reach Legend.",
    name: "Meera R.",
    role: "Level 5 Trader",
    initial: "M",
    color: "bg-teal-500",
    height: "md:col-span-1 md:row-span-1"
  },
  {
    quote: "StockBot explained EBITDA to me in 30 seconds. My finance teacher took 2 classes. The squad feature got my whole friend group hooked.",
    name: "Kabir T.",
    role: "Level 3 Analyst",
    initial: "K",
    color: "bg-orange-500",
    height: "md:col-span-1 md:row-span-1"
  }
]

export function Testimonials() {
  return (
    <section id="story" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-5xl font-sans font-semibold tracking-tight text-text-1 mb-16 text-center"
        >
          From the teens <span className="text-editorial">who are already ahead.</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`premium-card p-8 flex flex-col justify-between shadow-premium-md ${t.height}`}
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-gold text-gold"/>)}
                </div>
                <p className="text-text-1 font-medium text-lg leading-relaxed text-balance">
                  "{t.quote}"
                </p>
              </div>
              
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border/50">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${t.color}`}>
                  {t.initial}
                </div>
                <div>
                  <p className="font-semibold text-text-1 text-sm">{t.name}</p>
                  <p className="text-xs text-text-3">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
