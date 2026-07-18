'use client'

import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function LearnError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const isNotFound = error.message.includes('ENOENT') || error.message.includes('not found')

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center px-4 max-w-md mx-auto">
      <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
        <AlertTriangle size={40} />
      </div>
      
      <div>
        <h2 className="text-2xl font-display font-bold text-text-1 mb-2">
          {isNotFound ? 'Lesson Not Found' : 'Something went wrong'}
        </h2>
        <p className="text-text-2 text-sm sm:text-base leading-relaxed">
          {isNotFound 
            ? "We couldn't find the lesson you're looking for. It might be under construction."
            : "We had trouble loading this content. Our JSON parser or database connection might have failed."}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
        <button
          onClick={() => reset()}
          className="flex-1 flex justify-center items-center gap-2 px-5 py-3 rounded-xl bg-surface-2 border border-border text-text-1 font-medium hover:bg-surface transition-colors"
        >
          <RefreshCw size={18} />
          <span>Try Again</span>
        </button>
        <Link
          href="/dashboard"
          className="flex-1 flex justify-center items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-light transition-colors"
        >
          <Home size={18} />
          <span>Dashboard</span>
        </Link>
      </div>
    </div>
  )
}
