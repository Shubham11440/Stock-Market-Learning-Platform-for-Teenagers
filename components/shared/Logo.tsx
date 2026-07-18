'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  collapsed?: boolean
  className?: string
}

const sizes = {
  sm: { icon: 'w-6 h-6', text: 'text-lg' },
  md: { icon: 'w-8 h-8', text: 'text-xl' },
  lg: { icon: 'w-10 h-10', text: 'text-2xl' },
}

export function Logo({ size = 'md', collapsed = false, className }: LogoProps) {
  const s = sizes[size]

  return (
    <Link
      href="/"
      className={cn('flex items-center gap-2.5 select-none group', className)}
      aria-label="StockUp home"
    >
      {/* 
        Custom minimal geometric mark: 
        Two interlocking/ascending shapes representing progress and connection.
        Avoids generic arrows or charts.
      */}
      <div
        className={cn(
          s.icon,
          'relative flex items-center justify-center flex-shrink-0'
        )}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-text-1"
        >
          {/* Back shape - slightly faded */}
          <path
            d="M6 22V14C6 9.58172 9.58172 6 14 6H16C20.4183 6 24 9.58172 24 14V22"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Front shape - solid, crossing over */}
          <path
            d="M8 10V18C8 22.4183 11.5817 26 16 26H18C22.4183 26 26 22.4183 26 18V10"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Connection accent dot */}
          <circle cx="16" cy="16" r="3" fill="rgb(var(--primary))" />
        </svg>
      </div>

      {/* Wordmark */}
      {!collapsed && (
        <span
          className={cn(
            s.text,
            'font-sans font-semibold tracking-tight text-text-1'
          )}
        >
          StockUp
        </span>
      )}
    </Link>
  )
}
