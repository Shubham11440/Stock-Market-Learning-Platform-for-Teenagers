'use client'

import { Loader2 } from 'lucide-react'

export default function DashboardLoading() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
      <Loader2 className="w-10 h-10 text-primary animate-spin" />
      <p className="text-text-2 animate-pulse font-medium">Loading your dashboard...</p>
    </div>
  )
}
