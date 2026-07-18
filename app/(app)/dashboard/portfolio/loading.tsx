export default function PortfolioLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-pulse">
      {/* Header */}
      <div className="w-48 h-8 bg-surface-2 rounded-lg" />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-[120px] rounded-2xl bg-surface border border-border p-5">
            <div className="w-24 h-4 bg-surface-2 rounded mb-4" />
            <div className="w-32 h-8 bg-surface-2 rounded mb-3" />
            <div className="w-20 h-4 bg-surface-2 rounded" />
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-surface border border-border h-[400px]">
          <div className="w-40 h-6 bg-surface-2 rounded mb-6" />
          <div className="w-full h-[280px] bg-surface-2 rounded-xl" />
        </div>
        <div className="p-6 rounded-2xl bg-surface border border-border h-[400px]">
          <div className="w-32 h-6 bg-surface-2 rounded mb-6" />
          <div className="w-full h-[200px] bg-surface-2 rounded-full mx-auto" />
        </div>
      </div>

      {/* Lists Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="w-32 h-6 bg-surface-2 rounded" />
            <div className="w-40 h-8 bg-surface-2 rounded-lg" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 rounded-2xl bg-surface border border-border" />
            ))}
          </div>
        </div>
        <div>
          <div className="w-32 h-6 bg-surface-2 rounded mb-4" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 rounded-xl bg-surface border border-border" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
