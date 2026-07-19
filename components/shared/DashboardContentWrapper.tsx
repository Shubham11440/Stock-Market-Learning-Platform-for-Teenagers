'use client'

import { useEffect, useState } from 'react'
import { useSidebarStore } from '@/store/useSidebarStore'

export function DashboardContentWrapper({ children }: { children: React.ReactNode }) {
  const { collapsed, setCollapsed } = useSidebarStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('sidebar-collapsed')
    if (stored !== null) setCollapsed(stored === 'true')
    setMounted(true)
  }, [setCollapsed])

  // Prevent layout shift during SSR by defaulting to expanded padding (240px)
  // or you could use a CSS variable to make it seamless. We'll just transition nicely.
  const paddingClass = mounted && collapsed ? 'lg:pl-[72px]' : 'lg:pl-[240px]'

  return (
    <div className={`flex-1 flex flex-col transition-[padding] duration-300 min-w-0 ${paddingClass}`}>
      {children}
    </div>
  )
}
