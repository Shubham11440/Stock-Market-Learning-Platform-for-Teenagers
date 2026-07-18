'use client'

import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] gap-5 text-center px-4">
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
        <AlertTriangle size={32} />
      </div>
      <div>
        <h2 className="text-xl font-display font-semibold text-text-1 mb-2">
          Something went wrong
        </h2>
        <p className="text-text-2 text-sm max-w-[300px] mx-auto">
          We had trouble loading your dashboard data. Please try again.
        </p>
      </div>
      <button
        onClick={() => reset()}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-2 border border-border text-text-1 hover:bg-surface transition-colors"
      >
        <RefreshCw size={16} />
        <span>Retry</span>
      </button>
    </div>
  )
}
