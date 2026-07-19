'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  GraduationCap,
  TrendingUp,
  Trophy,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Show the 5 most important tabs on mobile bottom nav
const mobileNavItems = [
  { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: '/dashboard/learn', label: 'Learn', icon: GraduationCap },
  { href: '/dashboard/trading', label: 'Trade', icon: TrendingUp },
  { href: '/dashboard/arena', label: 'Arena', icon: Zap },
  { href: '/dashboard/leaderboard', label: 'Ranks', icon: Trophy },
] as const

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        'lg:hidden fixed bottom-0 inset-x-0 z-40 h-16',
        'bg-surface/90 backdrop-blur-xl border-t border-border',
        'flex items-center',
        // Safe area inset for notched phones
        'pb-[env(safe-area-inset-bottom)]'
      )}
    >
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
            className="flex-1 flex flex-col items-center justify-center gap-1 h-full"
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
    </nav>
  )
}
