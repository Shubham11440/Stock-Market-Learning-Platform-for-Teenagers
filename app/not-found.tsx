import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-bg text-text-1 p-4">
      <div className="bg-surface border border-border rounded-2xl p-10 max-w-lg w-full text-center space-y-6">
        <div className="relative">
          <h1 className="text-[120px] font-display font-black text-primary/10 leading-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <FileQuestion size={64} className="text-primary" />
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-display font-bold text-text-1">Page Not Found</h2>
          <p className="text-text-3 mt-2">
            The page you're looking for doesn't exist or has been moved to another route.
          </p>
        </div>
        
        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
