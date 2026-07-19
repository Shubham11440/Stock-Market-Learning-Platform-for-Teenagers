export default function ModalLoading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-bg rounded-2xl p-4 sm:p-6 shadow-2xl border border-border w-[95vw] max-w-4xl">
        <div className="space-y-6 animate-pulse">
          {/* Header Skeleton */}
          <div className="space-y-2">
            <div className="h-8 bg-surface-2 rounded-md w-1/4"></div>
            <div className="h-4 bg-surface-2 rounded-md w-1/2"></div>
          </div>
          
          {/* Content Skeleton */}
          <div className="bg-surface border border-border rounded-2xl p-6 h-64">
            <div className="flex flex-col gap-4">
               <div className="h-12 bg-surface-2 rounded-xl w-full"></div>
               <div className="h-12 bg-surface-2 rounded-xl w-full"></div>
               <div className="h-12 bg-surface-2 rounded-xl w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
