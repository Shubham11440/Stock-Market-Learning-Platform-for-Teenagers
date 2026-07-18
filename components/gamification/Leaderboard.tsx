import { LeaderboardEntry } from '@/types/gamification';
import { Trophy, Medal, User } from 'lucide-react';

export function LeaderboardList({ entries }: { entries: LeaderboardEntry[] }) {
  if (!entries || entries.length === 0) {
    return (
      <div className="text-center py-12 text-text-3 text-sm border border-dashed border-border rounded-xl">
        No leaderboard data available.
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-12 gap-4 p-4 bg-surface-2 border-b border-border text-xs font-semibold text-text-3 uppercase tracking-wider">
        <div className="col-span-2 sm:col-span-1 text-center">Rank</div>
        <div className="col-span-7 sm:col-span-8">Trader</div>
        <div className="col-span-3 text-right">XP</div>
      </div>

      {/* List */}
      <div className="divide-y divide-border">
        {entries.map((entry) => {
          let rankColor = 'text-text-3';
          if (entry.rank === 1) rankColor = 'text-yellow-400';
          else if (entry.rank === 2) rankColor = 'text-gray-300';
          else if (entry.rank === 3) rankColor = 'text-amber-600';

          return (
            <div 
              key={entry.userId} 
              className={`grid grid-cols-12 gap-4 p-4 items-center transition-colors hover:bg-surface-2/50 ${
                entry.isCurrentUser ? 'bg-primary/5' : ''
              }`}
            >
              {/* Rank */}
              <div className={`col-span-2 sm:col-span-1 text-center font-display font-bold text-lg ${rankColor}`}>
                {entry.rank <= 3 ? <Trophy size={20} className="mx-auto" /> : `#${entry.rank}`}
              </div>

              {/* User Info */}
              <div className="col-span-7 sm:col-span-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-2 border border-border flex items-center justify-center overflow-hidden flex-shrink-0">
                  {entry.avatar ? (
                    <img src={entry.avatar} alt={entry.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={20} className="text-text-3" />
                  )}
                </div>
                <div>
                  <p className={`font-semibold text-sm ${entry.isCurrentUser ? 'text-primary' : 'text-text-1'}`}>
                    {entry.name}
                    {entry.isCurrentUser && <span className="ml-2 text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full uppercase tracking-wide">You</span>}
                  </p>
                </div>
              </div>

              {/* Score */}
              <div className="col-span-3 text-right font-display font-bold text-text-1">
                {entry.xp.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
