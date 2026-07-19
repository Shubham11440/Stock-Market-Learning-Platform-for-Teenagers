export default function ModalLoading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-bg rounded-2xl p-4 sm:p-6 shadow-2xl border border-border w-[95vw] max-w-4xl">
        <div className="space-y-6 animate-pulse">
          {/* Header Skeleton */}
          <div className="space-y-2">
            <div className="h-8 bg-surface-2 rounded-md w-1/4"></div>
          </div>
          
          {/* Profile Header Skeleton */}
          <div className="bg-surface border border-border rounded-2xl p-6 h-32 flex items-center gap-6">
             <div className="w-24 h-24 rounded-full bg-surface-2 flex-shrink-0"></div>
             <div className="flex-1 space-y-4">
               <div className="h-6 bg-surface-2 rounded-md w-1/3"></div>
               <div className="h-4 bg-surface-2 rounded-md w-1/2"></div>
             </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 <div className="h-28 bg-surface-2 rounded-2xl"></div>
                 <div className="h-28 bg-surface-2 rounded-2xl"></div>
                 <div className="h-28 bg-surface-2 rounded-2xl"></div>
                 <div className="h-28 bg-surface-2 rounded-2xl"></div>
              </div>
            </div>
            <div className="h-64 bg-surface-2 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
