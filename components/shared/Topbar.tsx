'use client'

import { Bell, Search } from 'lucide-react'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { cn } from '@/lib/utils'

interface TopbarProps {
  title?: string
  className?: string
}

export function Topbar({ title, className }: TopbarProps) {
  return (
    <header
      className={cn(
        'h-16 flex items-center gap-4 px-4 lg:px-6',
        'bg-surface/80 backdrop-blur-xl border-b border-border',
        'sticky top-0 z-30',
        className
      )}
    >
      {/* Page title */}
      <div className="flex-1 min-w-0">
        {title && (
          <h1 className="text-base font-semibold text-text-1 font-display truncate">
            {title}
          </h1>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Search button */}
        <button
          aria-label="Search"
          className="w-9 h-9 rounded-lg flex items-center justify-center text-text-2 hover:text-text-1 hover:bg-surface-2 border border-transparent hover:border-border transition-all duration-200 cursor-pointer"
        >
          <Search size={16} />
        </button>

        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="relative w-9 h-9 rounded-lg flex items-center justify-center text-text-2 hover:text-text-1 hover:bg-surface-2 border border-transparent hover:border-border transition-all duration-200 cursor-pointer"
        >
          <Bell size={16} />
          {/* Unread dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-light ring-2 ring-surface" />
        </button>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* User avatar */}
        <button
          aria-label="User menu"
          className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/30 hover:ring-primary/60 transition-all duration-200 cursor-pointer"
        >
          <div className="w-full h-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-sm font-semibold font-display">
            S
          </div>
        </button>
      </div>
    </header>
  )
}
