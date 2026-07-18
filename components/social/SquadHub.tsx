'use client'

import { useState } from 'react'
import { Trophy, Copy, CheckCircle2, User, LogOut } from 'lucide-react'
import Image from 'next/image'
import { leaveSquadAction } from '@/actions/squads'
import toast from 'react-hot-toast'

interface SquadHubProps {
  squad: {
    id: string
    name: string
    code: string
    members: any[]
  }
  currentUserId: string
}

export function SquadHub({ squad, currentUserId }: SquadHubProps) {
  const [copied, setCopied] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(squad.code)
    setCopied(true)
    toast.success('Invite code copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLeave = async () => {
    if (confirm('Are you sure you want to leave this squad?')) {
      setIsLeaving(true)
      const res = await leaveSquadAction()
      setIsLeaving(false)
      if (res.success) {
        toast.success(res.message as string)
      } else {
        toast.error(res.error as string)
      }
    }
  }

  // Sort members by XP descending
  const sortedMembers = [...squad.members].sort((a, b) => b.user.xp - a.user.xp)
  const totalXp = squad.members.reduce((sum, m) => sum + m.user.xp, 0)
  const currentUserRole = squad.members.find(m => m.userId === currentUserId)?.role

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="font-display font-bold text-2xl text-text-1">{squad.name}</h2>
            {currentUserRole === 'LEADER' && (
              <span className="bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                Leader
              </span>
            )}
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-text-2">
              <UsersIcon size={16} />
              <span>{squad.members.length} Members</span>
            </div>
            <div className="flex items-center gap-2 text-primary font-semibold">
              <Trophy size={16} />
              <span>{totalXp.toLocaleString()} Total XP</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="bg-surface-2 border border-border rounded-xl px-4 py-3 flex items-center gap-4 flex-1 sm:flex-initial">
            <div>
              <p className="text-[10px] font-semibold text-text-3 uppercase tracking-wider">Invite Code</p>
              <p className="font-mono font-bold text-lg text-text-1">{squad.code}</p>
            </div>
            <button 
              onClick={handleCopy}
              className="p-2 hover:bg-surface rounded-lg transition-colors text-text-2 hover:text-text-1"
            >
              {copied ? <CheckCircle2 size={18} className="text-green-500" /> : <Copy size={18} />}
            </button>
          </div>

          <button 
            onClick={handleLeave}
            disabled={isLeaving}
            className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors disabled:opacity-50"
            title="Leave Squad"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 bg-surface-2 border-b border-border font-semibold text-xs text-text-3 uppercase tracking-wider grid grid-cols-12 gap-4">
          <div className="col-span-2 text-center">Rank</div>
          <div className="col-span-7">Member</div>
          <div className="col-span-3 text-right">XP</div>
        </div>
        
        <div className="divide-y divide-border">
          {sortedMembers.map((member, index) => {
            const isMe = member.userId === currentUserId
            
            // Re-use logic from LevelProgressCard for avatars
            const avatarsMap: Record<string, string> = {
              avatar_1: '🦊', avatar_2: '🐼', avatar_3: '🦁', avatar_4: '🐯',
              avatar_5: '🦅', avatar_6: '🦉', avatar_7: '🦄', avatar_8: '🐉',
            }
            const isEmoji = member.user.image?.startsWith('avatar_')
            const emoji = isEmoji ? avatarsMap[member.user.image!] : null

            return (
              <div 
                key={member.id}
                className={`p-4 grid grid-cols-12 gap-4 items-center transition-colors hover:bg-surface-2/50 ${isMe ? 'bg-primary/5' : ''}`}
              >
                <div className="col-span-2 text-center font-display font-bold text-text-2">
                  #{index + 1}
                </div>
                
                <div className="col-span-7 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-2 border border-border flex items-center justify-center overflow-hidden flex-shrink-0">
                    {emoji ? (
                      <span className="text-xl">{emoji}</span>
                    ) : member.user.image ? (
                      <Image src={member.user.image} alt={member.user.name} width={40} height={40} className="w-full h-full object-cover" />
                    ) : (
                      <User size={20} className="text-text-3" />
                    )}
                  </div>
                  <div>
                    <p className={`font-semibold text-sm ${isMe ? 'text-primary' : 'text-text-1'}`}>
                      {member.user.name}
                      {isMe && <span className="ml-2 text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full uppercase tracking-wide">You</span>}
                    </p>
                    <p className="text-xs text-text-3">Level {member.user.level}</p>
                  </div>
                </div>

                <div className="col-span-3 text-right font-display font-bold text-text-1">
                  {member.user.xp.toLocaleString()}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
