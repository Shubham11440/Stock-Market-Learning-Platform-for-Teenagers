'use client'

import { useState } from 'react'
import { Hexagon, Star, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { updateProfileSettingsAction } from '@/actions/profile'
import { toast } from 'react-hot-toast'

interface BadgeShowcaseProps {
  profile: any
  isOwnProfile: boolean
}

export function BadgeShowcase({ profile, isOwnProfile }: BadgeShowcaseProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  
  const badges = profile.badges.map((b: any) => b.badge)
  const featuredId = profile.featuredBadgeId

  const handleSetFeatured = async (badgeId: string) => {
    if (!isOwnProfile || badgeId === featuredId || isUpdating) return
    setIsUpdating(true)
    const res = await updateProfileSettingsAction({ featuredBadgeId: badgeId })
    if (res.success) {
      toast.success("Featured badge updated!")
    } else {
      toast.error(res.error || "Failed to update badge")
    }
    setIsUpdating(false)
  }

  if (badges.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-2xl p-8 text-center">
        <Star size={40} className="mx-auto text-text-3 opacity-30 mb-3" />
        <h3 className="text-lg font-bold text-text-1">No Badges Yet</h3>
        <p className="text-sm text-text-3 mt-1">
          {isOwnProfile ? "Complete lessons and daily challenges to earn badges!" : "This user hasn't earned any badges yet."}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-surface border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-bold text-text-1 flex items-center gap-2">
          <Star className="text-primary" size={20} />
          Earned Badges
        </h2>
        <span className="text-sm font-semibold text-text-3 bg-surface-2 px-3 py-1 rounded-full">
          {badges.length} Badges
        </span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {badges.map((badge: any) => {
          const isFeatured = badge.id === featuredId
          
          return (
            <div 
              key={badge.id}
              onClick={() => handleSetFeatured(badge.id)}
              className={cn(
                "relative group flex flex-col items-center p-4 rounded-xl border transition-all",
                isOwnProfile ? "cursor-pointer hover:bg-surface-2" : "",
                isFeatured ? "border-primary bg-primary/5" : "border-border/50 bg-surface-1"
              )}
            >
              {isFeatured && (
                <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-0.5 shadow-sm">
                  <CheckCircle2 size={16} />
                </div>
              )}
              
              <div className="relative mb-3 transform transition-transform group-hover:scale-110">
                <Hexagon size={48} className={cn(
                  badge.rarity === 'LEGENDARY' ? "text-orange-400" :
                  badge.rarity === 'EPIC' ? "text-purple-400" :
                  badge.rarity === 'RARE' ? "text-blue-400" : "text-gray-400",
                  isFeatured ? "fill-current/10" : ""
                )} />
              </div>
              
              <span className="text-[10px] font-bold text-center text-text-2 leading-tight">
                {badge.name}
              </span>

              {/* Hover tooltip essentially */}
              {isOwnProfile && !isFeatured && (
                <div className="absolute inset-0 bg-surface-2/90 flex items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold text-primary">Set Featured</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
