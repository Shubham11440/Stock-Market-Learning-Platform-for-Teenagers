'use client'

import { Share2, Link as LinkIcon, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { shareContent, ShareType, SharePayload, generateSharePayload } from '@/lib/social/share'
import toast from 'react-hot-toast'

interface ShareCardProps {
  type: ShareType
  data: any
  title?: string
  description?: string
}

export function ShareCard({ type, data, title = 'Share with friends', description = 'Brag about your achievements or invite friends.' }: ShareCardProps) {
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = async () => {
    setIsSharing(true)
    const payload = generateSharePayload(type, data)
    const result = await shareContent(payload)
    setIsSharing(false)

    if (result.success) {
      if (result.method === 'CLIPBOARD') {
        toast.success('Link copied to clipboard!')
      } else {
        toast.success('Shared successfully!')
      }
    } else {
      toast.error('Failed to share.')
    }
  }

  return (
    <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm flex items-center justify-between gap-4">
      <div>
        <h4 className="font-semibold text-sm text-text-1">{title}</h4>
        <p className="text-xs text-text-3 mt-1">{description}</p>
      </div>
      <button 
        onClick={handleShare}
        disabled={isSharing}
        className="flex-shrink-0 bg-primary/10 text-primary hover:bg-primary hover:text-white p-3 rounded-xl transition-colors disabled:opacity-50"
        title="Share"
      >
        <Share2 size={18} />
      </button>
    </div>
  )
}
