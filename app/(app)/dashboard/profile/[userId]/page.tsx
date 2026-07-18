import { getPublicProfile } from '@/lib/profile/profile'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { StatsGrid } from '@/components/profile/StatsGrid'
import { BadgeShowcase } from '@/components/profile/BadgeShowcase'
import { notFound } from 'next/navigation'
import { Lock } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Public Profile | StockUp',
}

interface PublicProfileProps {
  params: { userId: string }
}

export default async function PublicProfilePage({ params }: PublicProfileProps) {
  const profile = await getPublicProfile(params.userId)
  
  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center bg-surface border border-border rounded-2xl p-8">
        <Lock size={48} className="mx-auto mb-4 text-text-3 opacity-50" />
        <h1 className="text-2xl font-bold text-text-1">Profile Not Available</h1>
        <p className="text-text-3 mt-2">This user's profile is set to private or does not exist.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <ProfileHeader profile={profile} isOwnProfile={false} />
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <StatsGrid profile={profile} />
        </div>

        <div className="space-y-8">
          <BadgeShowcase profile={profile} isOwnProfile={false} />
        </div>
      </div>
    </div>
  )
}
