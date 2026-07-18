import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getSquadDetails } from '@/lib/social/membership'
import { getUserDuels } from '@/lib/social/duels'
import { JoinCreateSquad } from '@/components/social/JoinCreateSquad'
import { SquadHub } from '@/components/social/SquadHub'
import { DuelArena } from '@/components/social/DuelArena'
import { ShareCard } from '@/components/social/ShareCard'
import { Trophy, Share2 } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Social Hub | StockUp',
}

export default async function SocialPage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/login')
  }

  const squad = await getSquadDetails(session.user.id)
  const duels = await getUserDuels(session.user.id)

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-text-1">Social Hub</h1>
        <p className="text-text-3 mt-1 text-sm">Join a club, challenge friends, and brag about your gains.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Squads */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Trophy size={20} />
            </div>
            <h2 className="font-display font-bold text-2xl text-text-1">Your Club</h2>
          </div>

          {squad ? (
            <SquadHub squad={squad as any} currentUserId={session.user.id} />
          ) : (
            <div className="pt-4">
              <JoinCreateSquad />
            </div>
          )}
        </div>

        {/* Right Column: Duels & Sharing */}
        <div className="space-y-8">
          <DuelArena duels={duels} currentUserId={session.user.id} />

          <div className="space-y-4 pt-6 border-t border-border">
            <h3 className="font-display font-bold text-xl text-text-1 flex items-center gap-2">
              <Share2 className="text-primary" />
              Bragging Rights
            </h3>
            
            {squad && (
              <ShareCard 
                type="SQUAD_INVITE" 
                data={{ code: squad.code }} 
                title="Invite to Squad" 
                description={`Share code: ${squad.code}`}
              />
            )}
            
            <ShareCard 
              type="PORTFOLIO" 
              data={{ balance: 100000 }} // Typically passed from user context
              title="Share Portfolio" 
              description="Show off your gains."
            />
            
            <ShareCard 
              type="LEVEL_UP" 
              data={{ level: 5 }} 
              title="Share Level" 
              description="Challenge others to beat you."
            />
          </div>
        </div>

      </div>
    </div>
  )
}
