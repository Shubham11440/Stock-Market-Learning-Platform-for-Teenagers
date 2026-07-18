import Link from 'next/link'
import { Logo } from '@/components/shared/Logo'

export function PremiumFooter() {
  return (
    <footer className="border-t border-border bg-bg/50 backdrop-blur-3xl pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          <div className="lg:col-span-2">
            <Logo size="md" className="mb-6" />
            <p className="text-text-2 text-sm leading-relaxed max-w-sm mb-6">
              A premium simulation environment to learn trading, build your virtual portfolio, and compete with friends. Engineered for the next generation.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-text-1 mb-4 text-sm">Product</h4>
            <ul className="space-y-3">
              {['Features', 'Journey', 'Leaderboard', 'Pricing'].map(link => (
                <li key={link}>
                  <Link href="#" className="text-sm text-text-2 hover:text-text-1 transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-1 mb-4 text-sm">Company</h4>
            <ul className="space-y-3">
              {['About', 'Blog', 'Careers', 'Contact'].map(link => (
                <li key={link}>
                  <Link href="#" className="text-sm text-text-2 hover:text-text-1 transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-1 mb-4 text-sm">Legal</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Disclaimer'].map(link => (
                <li key={link}>
                  <Link href="#" className="text-sm text-text-2 hover:text-text-1 transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-3 font-medium">
            © {new Date().getFullYear()} StockUp Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-text-3">
            <span className="w-1.5 h-1.5 rounded-full bg-profit"></span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}
