'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  LayoutDashboard,
  GraduationCap,
  TrendingUp,
  PieChart,
  Trophy,
  Zap,
  Newspaper,
  Users,
  User,
  ChevronLeft,
  ChevronRight,
  Flame,
  Star,
} from 'lucide-react'
import { Logo } from '@/components/shared/Logo'
import { cn } from '@/lib/utils'

// ── Nav items ──────────────────────────────────────────────────────────
const navItems = [
  {
    href: '/dashboard',
    label: 'Home',
    icon: LayoutDashboard,
    description: 'Your overview',
  },
  {
    href: '/dashboard/learn',
    label: 'Learn',
    icon: GraduationCap,
    description: 'Quest map',
    badge: '🔥',
  },
  {
    href: '/dashboard/trading',
    label: 'Trade',
    icon: TrendingUp,
    description: 'Virtual trading',
  },
  {
    href: '/dashboard/portfolio',
    label: 'Portfolio',
    icon: PieChart,
    description: 'Your holdings',
  },
  {
    href: '/dashboard/leaderboard',
    label: 'Leaderboard',
    icon: Trophy,
    description: 'Global rankings',
  },
  {
    href: '/dashboard/arena',
    label: 'Arena',
    icon: Zap,
    description: 'Daily challenge',
    badge: '⚡',
  },
  {
    href: '/dashboard/news',
    label: 'News',
    icon: Newspaper,
    description: 'Market buzz',
  },
  {
    href: '/dashboard/social',
    label: 'Clubs',
    icon: Users,
    description: 'Squads & duels',
  },
] as const

const bottomItems = [
  { href: '/dashboard/settings', label: 'Settings', icon: User, description: 'Your stats' },
] as const

// ── Sidebar Component ──────────────────────────────────────────────────
export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  // Persist collapse state in localStorage
  useEffect(() => {
    const stored = localStorage.getItem('sidebar-collapsed')
    if (stored !== null) setCollapsed(stored === 'true')
  }, [])

  const toggle = () => {
    const next = !collapsed
    setCollapsed(next)
    localStorage.setItem('sidebar-collapsed', String(next))
  }

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col fixed top-0 left-0 h-dvh z-40',
        'bg-surface border-r border-border',
        'sidebar-transition',
        collapsed ? 'w-[72px]' : 'w-[240px]'
      )}
    >
      {/* ── Logo area ──────────────────────────────────────────── */}
      <div
        className={cn(
          'flex items-center h-16 px-4 flex-shrink-0',
          'border-b border-border',
          collapsed ? 'justify-center' : 'justify-between'
        )}
      >
        <Logo size="sm" collapsed={collapsed} />
        {!collapsed && (
          <button
            onClick={toggle}
            aria-label="Collapse sidebar"
            className="w-7 h-7 rounded-md flex items-center justify-center text-text-3 hover:text-text-1 hover:bg-surface-2 transition-colors cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* ── Main nav ───────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-0.5">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            active={
              item.href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname === item.href || pathname.startsWith(item.href + '/')
            }
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* ── Bottom section ─────────────────────────────────────── */}
      <div className="px-3 pb-4 space-y-0.5 border-t border-border pt-3">
        {/* Streak mini widget */}
        {!collapsed && (
          <div className="mb-3 px-3 py-2.5 rounded-xl bg-surface-2 border border-border">
            <div className="flex items-center gap-2">
              <Flame size={16} className="text-orange-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-text-3">Daily streak</p>
                <p className="text-sm font-semibold text-text-1 font-display">0 days</p>
              </div>
              <Star size={14} className="text-gold flex-shrink-0" />
            </div>
          </div>
        )}

        {bottomItems.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            active={pathname === item.href}
            collapsed={collapsed}
          />
        ))}

        {/* Expand button when collapsed */}
        {collapsed && (
          <button
            onClick={toggle}
            aria-label="Expand sidebar"
            className="w-full flex items-center justify-center h-10 rounded-xl text-text-3 hover:text-text-1 hover:bg-surface-2 transition-colors cursor-pointer mt-1"
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </aside>
  )
}

// ── NavItem ────────────────────────────────────────────────────────────
interface NavItemData {
  href: string
  label: string
  icon: React.ElementType
  description: string
  badge?: string
}

function NavItem({
  item,
  active,
  collapsed,
}: {
  item: NavItemData
  active: boolean
  collapsed: boolean
}) {
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      title={collapsed ? item.label : undefined}
      className={cn(
        'group relative flex items-center gap-3 rounded-xl px-3 h-11',
        'transition-all duration-150 cursor-pointer',
        collapsed && 'justify-center px-0',
        active
          ? 'bg-primary/10 text-primary-light border border-primary/20'
          : 'text-text-2 hover:text-text-1 hover:bg-surface-2'
      )}
    >
      {/* Active indicator bar */}
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-primary-light" />
      )}

      {/* Icon */}
      <Icon
        size={18}
        className={cn(
          'flex-shrink-0 transition-transform duration-150',
          active ? 'text-primary-light' : 'text-text-3 group-hover:text-text-1',
          'group-hover:scale-105'
        )}
      />

      {/* Label + badge */}
      {!collapsed && (
        <>
          <span className="flex-1 text-sm font-medium truncate">{item.label}</span>
          {item.badge && (
            <span className="text-sm leading-none">{item.badge}</span>
          )}
        </>
      )}

      {/* Tooltip when collapsed */}
      {collapsed && (
        <div
          className={cn(
            'pointer-events-none absolute left-full ml-2 z-50',
            'px-2.5 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap',
            'bg-surface-2 border border-border text-text-1 shadow-xl',
            'opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0',
            'transition-all duration-200'
          )}
        >
          {item.label}
        </div>
      )}
    </Link>
  )
}
