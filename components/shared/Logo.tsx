'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  collapsed?: boolean
  className?: string
}

const sizes = {
  sm: { icon: 'w-7 h-7 text-sm', text: 'text-lg', dot: 'w-1.5 h-1.5' },
  md: { icon: 'w-9 h-9 text-base', text: 'text-xl', dot: 'w-2 h-2' },
  lg: { icon: 'w-12 h-12 text-xl', text: 'text-3xl', dot: 'w-2.5 h-2.5' },
}

export function Logo({ size = 'md', collapsed = false, className }: LogoProps) {
  const s = sizes[size]

  return (
    <Link
      href="/"
      className={cn('flex items-center gap-2.5 select-none group', className)}
      aria-label="StockUp home"
    >
      {/* Icon mark */}
      <div
        className={cn(
          s.icon,
          'relative flex items-center justify-center rounded-xl',
          'bg-gradient-to-br from-primary to-primary-light',
          'shadow-lg shadow-primary/30 group-hover:shadow-primary/50',
          'transition-shadow duration-300',
          'flex-shrink-0'
        )}
      >
        {/* Up arrow / stock chart icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-[60%] h-[60%]"
          aria-hidden
        >
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>

        {/* Live pulse dot */}
        <span
          className={cn(
            s.dot,
            'absolute -top-0.5 -right-0.5 rounded-full bg-profit',
            'ring-2 ring-bg'
          )}
        />
      </div>

      {/* Wordmark */}
      {!collapsed && (
        <span
          className={cn(
            s.text,
            'font-display font-bold gradient-text leading-none tracking-tight'
          )}
        >
          StockUp
        </span>
      )}
    </Link>
  )
}
