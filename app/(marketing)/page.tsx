import { FloatingNavbar } from '@/components/landing/FloatingNavbar'
import { HeroSection } from '@/components/landing/HeroSection'
import { BentoFeatures } from '@/components/landing/BentoFeatures'
import { JourneyMap } from '@/components/landing/JourneyMap'
import { LeaderboardShowcase } from '@/components/landing/LeaderboardShowcase'
import { Testimonials } from '@/components/landing/Testimonials'
import { CtaSection } from '@/components/landing/CtaSection'
import { PremiumFooter } from '@/components/landing/PremiumFooter'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'StockUp — Master the market. Play the game.',
  description: 'A premium simulation environment to learn trading, build your virtual portfolio, and compete with friends. Zero risk, real knowledge.',
}

export default function LandingPage() {
  return (
    <main className="min-h-dvh bg-bg text-text-1 selection:bg-primary/20 selection:text-primary">
      <FloatingNavbar />
      
      {/* Sections built with Framer Motion and premium UI design principles */}
      <HeroSection />
      
      {/* Divider */}
      <div className="h-px w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <BentoFeatures />
      
      <JourneyMap />
      
      <LeaderboardShowcase />
      
      <Testimonials />
      
      <CtaSection />
      
      <PremiumFooter />
    </main>
  )
}
