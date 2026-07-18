'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, UserPlus, Key, ArrowRight } from 'lucide-react'
import { createSquadAction, joinSquadAction } from '@/actions/squads'
import toast from 'react-hot-toast'

export function JoinCreateSquad() {
  const [activeTab, setActiveTab] = useState<'JOIN' | 'CREATE'>('JOIN')
  
  const [joinCode, setJoinCode] = useState('')
  const [squadName, setSquadName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!joinCode || joinCode.length !== 6) {
      return toast.error('Invite code must be 6 characters.')
    }
    
    setIsSubmitting(true)
    const res = await joinSquadAction(joinCode)
    setIsSubmitting(false)
    
    if (res.success) {
      toast.success(res.message as string)
    } else {
      toast.error(res.error as string)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!squadName || squadName.length < 3) {
      return toast.error('Squad name must be at least 3 characters.')
    }

    setIsSubmitting(true)
    const res = await createSquadAction(squadName)
    setIsSubmitting(false)
    
    if (res.success) {
      toast.success(res.message as string)
    } else {
      toast.error(res.error as string)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-surface-2 p-1 rounded-2xl flex items-center mb-8 border border-border/50 shadow-sm">
        <button
          onClick={() => setActiveTab('JOIN')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'JOIN' ? 'bg-primary text-white shadow-md' : 'text-text-3 hover:text-text-1'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Key size={16} />
            Join a Squad
          </div>
        </button>
        <button
          onClick={() => setActiveTab('CREATE')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'CREATE' ? 'bg-primary text-white shadow-md' : 'text-text-3 hover:text-text-1'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <UserPlus size={16} />
            Create Squad
          </div>
        </button>
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'JOIN' ? (
            <motion.form 
              key="join"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleJoin}
              className="bg-surface border border-border rounded-2xl p-6 shadow-sm"
            >
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users size={24} />
                </div>
                <h3 className="font-display font-bold text-xl text-text-1">Got an invite code?</h3>
                <p className="text-sm text-text-3 mt-1">Enter it below to join your friends.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-text-2 uppercase tracking-wider mb-2 block">Invite Code</label>
                  <input
                    type="text"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    placeholder="e.g. A1B2C3"
                    maxLength={6}
                    className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-text-1 font-mono tracking-widest text-center uppercase focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>

                <button 
                  disabled={isSubmitting || joinCode.length !== 6}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Joining...' : 'Join Squad'}
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.form 
              key="create"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleCreate}
              className="bg-surface border border-border rounded-2xl p-6 shadow-sm"
            >
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <UserPlus size={24} />
                </div>
                <h3 className="font-display font-bold text-xl text-text-1">Start a new Squad</h3>
                <p className="text-sm text-text-3 mt-1">Lead your own trading club.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-text-2 uppercase tracking-wider mb-2 block">Squad Name</label>
                  <input
                    type="text"
                    value={squadName}
                    onChange={(e) => setSquadName(e.target.value)}
                    placeholder="e.g. Wall Street Wolves"
                    maxLength={20}
                    className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-text-1 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>

                <button 
                  disabled={isSubmitting || squadName.length < 3}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Creating...' : 'Create Squad'}
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
