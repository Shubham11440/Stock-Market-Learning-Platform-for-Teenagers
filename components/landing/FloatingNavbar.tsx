'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Logo } from '@/components/shared/Logo'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { cn } from '@/lib/utils'

export function FloatingNavbar({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [isTop, setIsTop] = useState(true)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    setIsTop(latest < 50)
  })

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 inset-x-0 z-50 pt-6 px-6"
    >
      <div
        className={cn(
          "max-w-5xl mx-auto flex items-center justify-between h-14 px-6 rounded-full transition-all duration-500",
          isTop
            ? "bg-transparent border-transparent"
            : "glass-panel shadow-premium-sm"
        )}
      >
        <Logo size="sm" />

        <nav className="hidden md:flex items-center gap-1">
          {['Product', 'Journey', 'Leaderboard', 'Story'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative px-4 py-2 text-sm font-medium text-text-2 hover:text-text-1 transition-colors rounded-full hover:bg-surface-2/50"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle className="rounded-full bg-transparent border-none hover:bg-surface-2/50" />
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="text-sm font-semibold text-white bg-primary hover:bg-primary-dark px-5 py-2 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden sm:block text-sm font-medium text-text-2 hover:text-text-1 transition-colors px-3 py-2"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="text-sm font-semibold text-white bg-primary hover:bg-primary-dark px-5 py-2 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.header>
  )
}
