'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function CtaSection() {
  return (
    <section className="py-24 px-6 mb-12">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
        >
          {/* Deep Mesh Gradient Background */}
          <div className="absolute inset-0 bg-primary" />
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-primary to-teal-500 opacity-80" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/20 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/2 mix-blend-overlay" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/20 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 mix-blend-overlay" />
          <div className="absolute inset-0 noise-bg opacity-30 mix-blend-overlay" />

          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-sans font-semibold tracking-tight text-white mb-6 text-balance">
              Your first ₹1,00,000 <br className="hidden md:block"/> portfolio awaits.
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-lg text-balance">
              Join thousands of teens mastering the stock market. Zero real money needed. Just start your quest.
            </p>
            <Link
              href="/signup"
              className="group flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-semibold transition-transform hover:scale-105 active:scale-95 shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
            >
              Create free account
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
