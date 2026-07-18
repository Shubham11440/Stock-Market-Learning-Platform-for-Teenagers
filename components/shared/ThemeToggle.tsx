'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
  iconSize?: number
}

export function ThemeToggle({ className, iconSize = 16 }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch — only render after mount
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div
        className={cn(
          'w-9 h-9 rounded-lg bg-surface-2 animate-pulse',
          className
        )}
      />
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative w-9 h-9 rounded-lg flex items-center justify-center',
        'bg-surface-2 border border-border',
        'text-text-2 hover:text-text-1 hover:border-primary/40 hover:bg-primary/10',
        'transition-all duration-200 cursor-pointer',
        'focus-visible:outline-2 focus-visible:outline-primary',
        className
      )}
    >
      <span
        className="absolute transition-all duration-300"
        style={{
          opacity: isDark ? 1 : 0,
          transform: isDark ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0)',
        }}
      >
        <Moon size={iconSize} />
      </span>
      <span
        className="absolute transition-all duration-300"
        style={{
          opacity: isDark ? 0 : 1,
          transform: isDark ? 'rotate(90deg) scale(0)' : 'rotate(0deg) scale(1)',
        }}
      >
        <Sun size={iconSize} />
      </span>
    </button>
  )
}
