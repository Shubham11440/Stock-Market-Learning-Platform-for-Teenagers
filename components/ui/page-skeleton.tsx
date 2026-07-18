export function PageSkeleton() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-surface-2 rounded-lg"></div>
          <div className="h-4 w-72 bg-surface-2 rounded-lg"></div>
        </div>
        <div className="h-10 w-24 bg-surface-2 rounded-lg"></div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="h-[300px] w-full bg-surface-2 rounded-2xl"></div>
          <div className="grid grid-cols-2 gap-4">
             <div className="h-24 bg-surface-2 rounded-2xl"></div>
             <div className="h-24 bg-surface-2 rounded-2xl"></div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-[200px] w-full bg-surface-2 rounded-2xl"></div>
          <div className="h-[250px] w-full bg-surface-2 rounded-2xl"></div>
        </div>
      </div>
    </div>
  )
}
