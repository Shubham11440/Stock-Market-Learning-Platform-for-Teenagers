'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AvatarSelectorProps {
  selected: string
  onSelect: (avatar: string) => void
}

const avatars = [
  { id: 'avatar_1', emoji: '🦊' },
  { id: 'avatar_2', emoji: '🐼' },
  { id: 'avatar_3', emoji: '🦁' },
  { id: 'avatar_4', emoji: '🐯' },
  { id: 'avatar_5', emoji: '🦅' },
  { id: 'avatar_6', emoji: '🦉' },
  { id: 'avatar_7', emoji: '🦄' },
  { id: 'avatar_8', emoji: '🐉' },
]

export function AvatarSelector({ selected, onSelect }: AvatarSelectorProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {avatars.map((avatar) => {
        const isSelected = selected === avatar.id
        
        return (
          <button
            key={avatar.id}
            onClick={() => onSelect(avatar.id)}
            className="relative aspect-square flex items-center justify-center text-4xl rounded-2xl transition-colors hover:bg-surface-2 focus:outline-none"
            aria-label={`Select avatar ${avatar.emoji}`}
          >
            {isSelected && (
              <motion.div
                layoutId="avatar-ring"
                className="absolute inset-0 rounded-2xl border-2 border-primary"
                initial={false}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              />
            )}
            <span className="relative z-10">{avatar.emoji}</span>
          </button>
        )
      })}
    </div>
  )
}
