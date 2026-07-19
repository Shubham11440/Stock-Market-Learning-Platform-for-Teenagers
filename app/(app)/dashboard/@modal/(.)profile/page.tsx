import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getProfile } from '@/lib/profile/profile'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { StatsGrid } from '@/components/profile/StatsGrid'
import { BadgeShowcase } from '@/components/profile/BadgeShowcase'
import { InterceptedModal } from '@/components/ui/intercepted-modal'

export default async function InterceptedProfilePage() {
  const session = await auth()
  if (!session?.user?.id) return null

  const profile = await getProfile(session.user.id)
  if (!profile) return null

  return (
    <InterceptedModal>
      <div className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-text-1 px-2">Profile</h2>
        <ProfileHeader profile={profile} isOwnProfile={true} />
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <StatsGrid profile={profile} />
            
            <div className="bg-surface border border-border rounded-2xl p-6">
              <h3 className="text-lg font-bold text-text-1 mb-4">Recent Activity</h3>
              {profile.transactions.length === 0 ? (
                <p className="text-sm text-text-3 text-center py-4">No recent trading activity.</p>
              ) : (
                <div className="space-y-4">
                  {profile.transactions.slice(0, 5).map((t: any) => (
                    <div key={t.id} className="flex items-center justify-between p-3 bg-surface-2 rounded-xl">
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-text-1">{t.symbol}</span>
                        <span className="text-xs text-text-3">{t.type === 'BUY' ? 'Bought' : 'Sold'} {t.quantity} shares</span>
                      </div>
                      <span className={t.type === 'BUY' ? "text-loss font-semibold text-sm" : "text-profit font-semibold text-sm"}>
                        {t.type === 'BUY' ? '-' : '+'}₹{t.total.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <BadgeShowcase profile={profile} isOwnProfile={true} />
          </div>
        </div>
      </div>
    </InterceptedModal>
  )
}
