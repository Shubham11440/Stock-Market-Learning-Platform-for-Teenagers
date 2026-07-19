'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  GraduationCap,
  TrendingUp,
  Trophy,
  Zap,
  PieChart,
  Newspaper,
  Users
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Include all tabs and make the container horizontally scrollable
const mobileNavItems = [
  { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: '/dashboard/learn', label: 'Learn', icon: GraduationCap },
  { href: '/dashboard/trading', label: 'Trade', icon: TrendingUp },
  { href: '/dashboard/portfolio', label: 'Portfolio', icon: PieChart },
  { href: '/dashboard/arena', label: 'Arena', icon: Zap },
  { href: '/dashboard/social', label: 'Clubs', icon: Users },
  { href: '/dashboard/leaderboard', label: 'Ranks', icon: Trophy },
  { href: '/dashboard/news', label: 'News', icon: Newspaper },
] as const

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        'lg:hidden fixed bottom-0 inset-x-0 z-40 h-16',
        'bg-surface/90 backdrop-blur-xl border-t border-border',
        'flex items-center overflow-x-auto snap-x snap-mandatory no-scrollbar',
        // Safe area inset for notched phones
        'pb-[env(safe-area-inset-bottom)]'
      )}
    >
      <div className="flex w-max min-w-full px-2">
        {mobileNavItems.map((item) => {
          const active =
            item.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 h-16 min-w-[72px] snap-center relative"
            >
              <Icon
                size={20}
                className={cn(
                  'transition-all duration-200',
                  active
                    ? 'text-primary-light scale-110'
                    : 'text-text-3'
                )}
              />
              <span
                className={cn(
                  'text-[10px] font-medium transition-colors duration-200',
                  active ? 'text-primary-light' : 'text-text-3'
                )}
              >
                {item.label}
              </span>
              {active && (
                <span className="absolute bottom-0 w-8 h-0.5 rounded-full bg-primary-light" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
