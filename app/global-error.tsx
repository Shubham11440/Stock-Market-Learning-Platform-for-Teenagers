'use client'

import { useEffect } from 'react'
import { logger } from '@/lib/monitoring/logger'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    logger.error('Global unhandled exception', { 
      error: error.message, 
      stack: error.stack,
      digest: error.digest 
    })
  }, [error])

  return (
    <html>
      <body className="bg-bg text-text-1 font-sans antialiased min-h-dvh flex items-center justify-center p-4">
        <div className="bg-surface border border-border rounded-2xl p-8 max-w-md w-full text-center space-y-6">
          <AlertCircle size={48} className="mx-auto text-loss" />
          <div>
            <h1 className="text-2xl font-display font-bold text-text-1">Something went wrong!</h1>
            <p className="text-text-3 mt-2 text-sm">
              We've encountered a critical error. Our team has been notified.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => reset()} variant="default">
              Try again
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}
