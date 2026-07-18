'use client'

import { useEffect } from 'react'
import { logger } from '@/lib/monitoring/logger'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export function RouteError({
  error,
  reset,
  title = "Failed to load content"
}: {
  error: Error & { digest?: string }
  reset: () => void
  title?: string
}) {
  useEffect(() => {
    logger.error(`Route Error: ${title}`, { 
      error: error.message, 
      digest: error.digest 
    })
  }, [error, title])

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-surface border border-border rounded-2xl text-center space-y-4">
      <div className="w-12 h-12 bg-loss/10 rounded-full flex items-center justify-center text-loss">
        <AlertTriangle size={24} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-text-1">{title}</h3>
        <p className="text-sm text-text-3 mt-1">
          {error.message || "An unexpected error occurred while loading this section."}
        </p>
      </div>
      <Button onClick={() => reset()} variant="outline">
        Try again
      </Button>
    </div>
  )
}
