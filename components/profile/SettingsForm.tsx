'use client'

import { useState } from 'react'
import { updateProfileSettingsAction } from '@/actions/profile'
import { RealMoneyUnlockModal } from './RealMoneyUnlockModal'
import { useTheme } from 'next-themes'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock, User, Bell, Palette, Shield } from 'lucide-react'

export function SettingsForm({ user }: { user: any }) {
  const { setTheme } = useTheme()
  const [loading, setLoading] = useState(false)
  const [unlockModalOpen, setUnlockModalOpen] = useState(false)

  // Form State
  const [name, setName] = useState(user.name || '')
  const [themePref, setThemePref] = useState(user.theme || 'system')
  const [publicProfile, setPublicProfile] = useState(user.publicProfile ?? true)
  const [showPortfolio, setShowPortfolio] = useState(user.showPortfolio ?? true)
  const [showSquad, setShowSquad] = useState(user.showSquad ?? true)
  const [goal, setGoal] = useState(user.goalType || '')

  const handleSave = async () => {
    setLoading(true)
    const payload = {
      name,
      theme: themePref,
      publicProfile,
      showPortfolio,
      showSquad,
      goalType: goal || null
    }

    const res = await updateProfileSettingsAction(payload)
    if (res.success) {
      toast.success(res.message || 'Settings updated successfully!')
      setTheme(themePref) // Apply theme via next-themes
    } else {
      toast.error(res.error || 'Failed to update settings')
    }
    setLoading(false)
  }

  return (
    <div className="space-y-8">
      {/* Real Money Unlock Banner */}
      <div className="bg-gradient-to-r from-primary/10 to-surface-2 border border-primary/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* <div>
          <h3 className="text-lg font-bold text-text-1 flex items-center gap-2">
            <Lock className="text-primary" size={20} />
            Real Money Investing
          </h3>
          <p className="text-sm text-text-3 mt-1">
            Status: <strong className="text-text-1">{user.unlockStatus.replace(/_/g, ' ')}</strong>
          </p>
        </div> */}
        <Button onClick={() => setUnlockModalOpen(true)} variant={user.unlockStatus === 'UNLOCKED' ? 'outline' : 'default'}>
          {user.unlockStatus === 'UNLOCKED' ? 'View Details' : 'Continue Unlock'}
        </Button>
      </div>

      <RealMoneyUnlockModal isOpen={unlockModalOpen} onClose={() => setUnlockModalOpen(false)} />

      {/* Grid Layout for Settings */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Account Settings */}
        <div className="bg-surface border border-border rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <User className="text-text-2" size={24} />
            <h2 className="text-xl font-display font-bold text-text-1">Account</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-text-2 mb-1">Display Name</label>
              <Input value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-2 mb-1">Email Address</label>
              <Input value={user.email} disabled className="opacity-50 cursor-not-allowed" />
              <p className="text-xs text-text-3 mt-1">Email cannot be changed.</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-2 mb-1">Primary Goal</label>
              <select 
                value={goal} 
                onChange={e => setGoal(e.target.value)}
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-text-1 focus:ring-2 focus:ring-primary/50 outline-none"
              >
                <option value="">Select a goal</option>
                <option value="LEARN">Learn the Basics</option>
                <option value="TRADE">Active Trading</option>
                <option value="INVEST">Long-term Investing</option>
                <option value="SAVE">Saving Money</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-surface border border-border rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <Palette className="text-text-2" size={24} />
            <h2 className="text-xl font-display font-bold text-text-1">Appearance</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-text-2 mb-2">Theme Preference</label>
              <div className="flex bg-surface-2 p-1 rounded-lg">
                {['system', 'light', 'dark'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setThemePref(t)}
                    className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors capitalize ${
                      themePref === t ? 'bg-surface shadow-sm text-text-1' : 'text-text-3 hover:text-text-2'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-surface border border-border rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <Shield className="text-text-2" size={24} />
            <h2 className="text-xl font-display font-bold text-text-1">Privacy</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-text-1">Public Profile</h4>
                <p className="text-xs text-text-3">Allow others to view your profile</p>
              </div>
              <input type="checkbox" checked={publicProfile} onChange={e => setPublicProfile(e.target.checked)} className="w-4 h-4 accent-primary" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-text-1">Show Portfolio Stats</h4>
                <p className="text-xs text-text-3">Display virtual portfolio on public profile</p>
              </div>
              <input type="checkbox" checked={showPortfolio} onChange={e => setShowPortfolio(e.target.checked)} className="w-4 h-4 accent-primary" disabled={!publicProfile} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-text-1">Show Squad</h4>
                <p className="text-xs text-text-3">Display your squad membership</p>
              </div>
              <input type="checkbox" checked={showSquad} onChange={e => setShowSquad(e.target.checked)} className="w-4 h-4 accent-primary" disabled={!publicProfile} />
            </div>
          </div>
        </div>

        {/* Notifications (Mock) */}
        <div className="bg-surface border border-border rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <Bell className="text-text-2" size={24} />
            <h2 className="text-xl font-display font-bold text-text-1">Notifications</h2>
          </div>
          
          <div className="space-y-4 opacity-70">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-text-1">Market News</h4>
                <p className="text-xs text-text-3">Daily market updates</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-text-1">Squad Activity</h4>
                <p className="text-xs text-text-3">When someone joins your squad</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-text-1">Price Alerts</h4>
                <p className="text-xs text-text-3">When your watchlist stocks move wildly</p>
              </div>
              <input type="checkbox" className="w-4 h-4 accent-primary" />
            </div>
          </div>
        </div>

        {/* Help & Onboarding */}
        <div className="bg-surface border border-border rounded-2xl p-6 space-y-6 md:col-span-2">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <span className="text-2xl">🗺️</span>
            <h2 className="text-xl font-display font-bold text-text-1">Help & Onboarding</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-text-1">Product Tour</h4>
                <p className="text-xs text-text-3">Replay the Welcome Quest to re-familiarize yourself with StockUp.</p>
              </div>
              <Button type="button" onClick={() => {
                // Delay so dropdowns or popovers close
                setTimeout(() => {
                  window.dispatchEvent(new Event('start-tour-manually'))
                  // We'll also use Zustand just in case
                  const startTour = require('@/store/useTourStore').useTourStore.getState().startTour
                  startTour()
                }, 100)
              }} variant="outline">
                Take Product Tour
              </Button>
            </div>
          </div>
        </div>

      </div>

      <div className="flex justify-end pt-4 border-t border-border">
        <Button onClick={handleSave} disabled={loading} size="lg" className="w-full sm:w-auto">
          {loading ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>
    </div>
  )
}
