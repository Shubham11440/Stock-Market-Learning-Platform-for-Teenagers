'use client'

import { getProgressPercent } from '@/lib/xp-calc'
import { Trophy, Shield, Flame, Star, Hexagon, User } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import Image from 'next/image'

import { getValidAvatarUrl, getAvatarEmoji } from '@/lib/utils'

interface ProfileHeaderProps {
  profile: any // The returned object from getProfile/getPublicProfile
  isOwnProfile: boolean
}

export function ProfileHeader({ profile, isOwnProfile }: ProfileHeaderProps) {
  const progress = getProgressPercent(profile.xp)
  const featuredBadge = profile.featuredBadgeId 
    ? profile.badges.find((b: any) => b.badge.id === profile.featuredBadgeId)?.badge 
    : null
    
  const validAvatar = getValidAvatarUrl(profile.image, profile.name)

  return (
    <div className="bg-surface border border-border rounded-2xl p-6 relative overflow-hidden">
      {/* Background Decorator */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
        
        {/* Avatar */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-surface-2 overflow-hidden bg-surface-3 flex items-center justify-center">
            {(() => {
              const avatarEmoji = getAvatarEmoji(profile.image)
              if (avatarEmoji) {
                return <span className="text-5xl">{avatarEmoji}</span>
              }
              if (validAvatar) {
                return <Image src={validAvatar} alt={profile.name} width={96} height={96} className="w-full h-full object-cover" />
              }
              return <User size={48} className="text-text-3" />
            })()}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-md border-2 border-surface shadow-sm">
            Lvl {profile.level}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <h1 className="text-2xl font-display font-bold text-text-1">
              {profile.name}
            </h1>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md bg-orange-500/10 text-orange-500">
                <Flame size={14} className="fill-current" />
                {profile.streak} Day Streak
              </span>
              
              {profile.showSquad && profile.squad && (
                <span className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md bg-primary/10 text-primary">
                  <Shield size={14} className="fill-current" />
                  {profile.squad.squad.name}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-text-3">
            <span>{profile.xp.toLocaleString()} XP Total</span>
            
            <div className="flex-1 max-w-xs flex items-center gap-3">
              <Progress value={progress} className="h-2 flex-1" />
              <span className="text-xs font-mono">{progress}%</span>
            </div>
          </div>
        </div>

        {/* Featured Badge */}
        {featuredBadge ? (
          <div className="flex-shrink-0 flex flex-col items-center p-3 bg-surface-2 rounded-xl border border-border/50 shadow-sm mt-4 md:mt-0">
            <div className="text-[10px] uppercase tracking-wider text-text-3 font-semibold mb-2">Featured</div>
            <div className="relative">
              {/* If we had SVGs, we'd use them. Falling back to an icon */}
              <Hexagon size={48} className={cn(
                featuredBadge.rarity === 'LEGENDARY' ? "text-orange-400" :
                featuredBadge.rarity === 'EPIC' ? "text-purple-400" :
                featuredBadge.rarity === 'RARE' ? "text-blue-400" : "text-gray-400"
              )} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Trophy size={20} className="text-white drop-shadow-md" />
              </div>
            </div>
            <span className="text-xs font-bold mt-2 text-text-1">{featuredBadge.name}</span>
          </div>
        ) : (
          <div className="flex-shrink-0 flex flex-col items-center p-3 border border-dashed border-border rounded-xl mt-4 md:mt-0 opacity-50">
            <div className="text-[10px] uppercase tracking-wider text-text-3 font-semibold mb-2">Featured</div>
            <div className="w-12 h-12 rounded-full bg-surface-3 flex items-center justify-center">
              <Star size={20} className="text-text-3" />
            </div>
            <span className="text-xs font-semibold mt-2 text-text-3">No Badge Set</span>
          </div>
        )}

      </div>
    </div>
  )
}
