import Link from 'next/link';
import { Target } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-border bg-surface-2/50">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
        <Target size={32} />
      </div>
      <h3 className="text-xl font-display font-semibold text-text-1 mb-2">
        Start Your Investment Journey
      </h3>
      <p className="text-text-2 mb-6 max-w-sm">
        You haven't made any trades yet. Explore the market and buy your first stock to see your portfolio grow!
      </p>
      <Link
        href="/dashboard/trading"
        className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-primary text-white text-sm font-medium transition-colors hover:bg-primary-dark"
      >
        Explore Market
      </Link>
    </div>
  );
}
