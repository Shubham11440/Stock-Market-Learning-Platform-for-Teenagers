'use client'

import { useState } from 'react'
import { Swords, Clock, CheckCircle2, XCircle, ChevronRight, User } from 'lucide-react'
import { challengeUserAction, acceptDuelAction, cancelDuelAction, resolveMockDuelAction } from '@/actions/duels'
import toast from 'react-hot-toast'

interface DuelArenaProps {
  duels: any[]
  currentUserId: string
}

export function DuelArena({ duels, currentUserId }: DuelArenaProps) {
  const [isChallenging, setIsChallenging] = useState(false)
  const [opponentId, setOpponentId] = useState('')
  const [stockPicks, setStockPicks] = useState(['RELIANCE', 'TCS', 'HDFC']) // Hardcoded defaults for MVP
  const [isSubmitting, setIsSubmitting] = useState(false)

  const activeDuels = duels.filter(d => d.status === 'ACTIVE')
  const pendingDuels = duels.filter(d => d.status === 'PENDING')
  const pastDuels = duels.filter(d => d.status === 'COMPLETED' || d.status === 'CANCELLED')

  const handleChallenge = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!opponentId.trim()) return toast.error('Enter an opponent ID')
    
    setIsSubmitting(true)
    const res = await challengeUserAction(opponentId.trim(), stockPicks)
    setIsSubmitting(false)
    
    if (res.success) {
      toast.success(res.message as string)
      setIsChallenging(false)
      setOpponentId('')
    } else {
      toast.error(res.error as string)
    }
  }

  const handleAccept = async (duelId: string) => {
    const res = await acceptDuelAction(duelId, ['TATAMOTORS', 'INFY', 'WIPRO']) // Default accept picks for MVP
    if (res.success) toast.success(res.message as string)
    else toast.error(res.error as string)
  }

  const handleCancel = async (duelId: string) => {
    const res = await cancelDuelAction(duelId)
    if (res.success) toast.success(res.message as string)
    else toast.error(res.error as string)
  }

  const handleResolveMock = async (duelId: string) => {
    const res = await resolveMockDuelAction(duelId)
    if (res.success) toast.success(res.message as string)
    else toast.error(res.error as string)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-xl text-text-1 flex items-center gap-2">
          <Swords className="text-primary" />
          Duel Arena
        </h3>
        <button 
          onClick={() => setIsChallenging(!isChallenging)}
          className="text-sm font-semibold bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-xl transition-colors"
        >
          {isChallenging ? 'Cancel' : 'New Challenge'}
        </button>
      </div>

      {isChallenging && (
        <form onSubmit={handleChallenge} className="bg-surface border border-border rounded-2xl p-5 shadow-sm space-y-4">
          <h4 className="text-sm font-semibold text-text-1">Challenge a Friend</h4>
          <p className="text-xs text-text-3">Enter their exact User ID to send a 24-hour stock performance challenge.</p>
          
          <div>
            <label className="text-[10px] font-bold text-text-2 uppercase tracking-wider mb-1 block">Opponent ID</label>
            <input 
              type="text" 
              value={opponentId}
              onChange={e => setOpponentId(e.target.value)}
              placeholder="e.g. cmrxxx..."
              className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text-1 focus:outline-none focus:border-primary"
            />
          </div>

          <button 
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-xl transition-colors text-sm disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Send Challenge'}
          </button>
        </form>
      )}

      {/* Active Duels */}
      {activeDuels.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-text-2 uppercase tracking-wider">Active Duels</h4>
          {activeDuels.map(duel => (
            <div key={duel.id} className="bg-surface border border-border rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Swords size={20} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-text-1">
                    {duel.challengerId === currentUserId ? `Vs ${duel.opponent?.name || 'Opponent'}` : `Vs ${duel.challenger?.name || 'Challenger'}`}
                  </p>
                  <p className="text-xs text-amber-500 flex items-center gap-1 mt-0.5">
                    <Clock size={12} />
                    Ends in 24h
                  </p>
                </div>
              </div>
              <button 
                onClick={() => handleResolveMock(duel.id)}
                className="text-xs font-semibold bg-surface-2 hover:bg-surface-3 px-3 py-1.5 rounded-lg text-text-2 transition-colors border border-border"
                title="Resolve instantly for testing"
              >
                Mock Resolve
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pending Duels */}
      {pendingDuels.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-text-2 uppercase tracking-wider mt-6">Pending Challenges</h4>
          {pendingDuels.map(duel => {
            const isReceived = duel.opponentId === currentUserId
            
            return (
              <div key={duel.id} className="bg-surface border border-border border-dashed rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-surface-2 rounded-full flex items-center justify-center text-text-3">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-text-1">
                      {isReceived ? `${duel.challenger?.name || 'Someone'} challenged you!` : `Waiting for ${duel.opponent?.name || 'Opponent'}...`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isReceived ? (
                    <>
                      <button onClick={() => handleCancel(duel.id)} className="text-xs font-medium text-text-3 hover:text-red-500 px-3 py-1.5 rounded-lg transition-colors">Decline</button>
                      <button onClick={() => handleAccept(duel.id)} className="text-xs font-semibold bg-primary text-white hover:bg-primary-dark px-4 py-1.5 rounded-lg transition-colors shadow-sm">Accept</button>
                    </>
                  ) : (
                    <button onClick={() => handleCancel(duel.id)} className="text-xs font-medium text-text-3 hover:text-red-500 px-3 py-1.5 rounded-lg transition-colors">Cancel</button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
      
      {duels.length === 0 && !isChallenging && (
        <div className="text-center py-10 bg-surface-2/50 rounded-2xl border border-dashed border-border">
          <Swords size={32} className="mx-auto text-text-4 mb-3" />
          <p className="text-sm font-semibold text-text-2">No active duels</p>
          <p className="text-xs text-text-3 mt-1">Challenge a friend to test your trading skills.</p>
        </div>
      )}
    </div>
  )
}
