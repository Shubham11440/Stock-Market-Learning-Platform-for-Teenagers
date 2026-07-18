'use client'

import { useState, useEffect } from 'react'
import { 
  checkEligibilityAction, 
  verifyAgeAction, 
  processParentConsentAction, 
  processKYCAction, 
  processBrokerLinkAction 
} from '@/actions/unlock'
import { SupportedBroker } from '@/lib/unlock/broker'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

export function RealMoneyUnlockModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [status, setStatus] = useState<string>('LOCKED')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // Step states
  const [dob, setDob] = useState('')
  const [parentEmail, setParentEmail] = useState('')
  const [aadhaar, setAadhaar] = useState('')

  useEffect(() => {
    if (isOpen) {
      loadEligibility()
    }
  }, [isOpen])

  const loadEligibility = async () => {
    setLoading(true)
    const res = await checkEligibilityAction()
    if (res.success && res.data) {
      if (!res.data.isEligible) {
        setStatus('INELIGIBLE')
      } else {
        setStatus(res.data.currentStatus)
      }
    } else {
      setError(res.error || 'Failed to check eligibility')
    }
    setLoading(false)
  }

  const handleAgeVerify = async () => {
    if (!dob) return setError("Please enter Date of Birth")
    setLoading(true); setError('')
    const res = await verifyAgeAction(dob)
    if (res.success && res.data) {
      setStatus(res.data.nextStatus)
    } else {
      setError(res.error || 'Verification failed')
    }
    setLoading(false)
  }

  const handleParentConsent = async () => {
    if (!parentEmail) return setError("Please enter parent's email")
    setLoading(true); setError('')
    const res = await processParentConsentAction(parentEmail)
    if (res.success && res.data) {
      setStatus(res.data.nextStatus)
    } else {
      setError(res.error || 'Consent failed')
    }
    setLoading(false)
  }

  const handleKYC = async () => {
    if (aadhaar.length !== 12) return setError("Aadhaar must be 12 digits")
    setLoading(true); setError('')
    const res = await processKYCAction(aadhaar)
    if (res.success && res.data) {
      setStatus(res.data.nextStatus)
    } else {
      setError(res.error || 'KYC failed')
    }
    setLoading(false)
  }

  const handleBrokerLink = async (broker: SupportedBroker) => {
    setLoading(true); setError('')
    const res = await processBrokerLinkAction(broker)
    if (res.success && res.data) {
      setStatus(res.data.nextStatus)
    } else {
      setError(res.error || 'Broker linking failed')
    }
    setLoading(false)
  }

  const renderContent = () => {
    if (loading && status !== 'LOCKED' && status !== 'INELIGIBLE') {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="animate-spin text-primary mb-4" size={32} />
          <p className="text-text-3">Processing...</p>
        </div>
      )
    }

    if (status === 'INELIGIBLE') {
      return (
        <div className="text-center py-8">
          <Lock size={48} className="mx-auto text-text-3 opacity-50 mb-4" />
          <h3 className="text-lg font-bold text-text-1">Level 10 Required</h3>
          <p className="text-text-3 mt-2">You need to reach Level 10 to unlock real money investing. Keep learning and practicing in the Arena!</p>
          <Button onClick={onClose} className="mt-6">Close</Button>
        </div>
      )
    }

    if (status === 'LOCKED') {
      return (
        <div className="space-y-6">
          <div className="bg-primary/10 p-4 rounded-xl text-primary text-sm flex items-start gap-3">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <p>You are initiating the KYC process to trade with real money. Please provide accurate information.</p>
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-text-2">Date of Birth</label>
            <Input type="date" value={dob} onChange={e => setDob(e.target.value)} />
            {error && <p className="text-loss text-sm">{error}</p>}
            <Button onClick={handleAgeVerify} disabled={loading} className="w-full">
              {loading ? <Loader2 className="animate-spin" /> : "Verify Age"}
            </Button>
          </div>
        </div>
      )
    }

    if (status === 'PARENT_CONSENT_PENDING') {
      return (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-text-1">Parental Consent Required</h3>
            <p className="text-text-3 text-sm mt-1">Since you are under 18, we need your parent's approval to proceed.</p>
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-text-2">Parent's Email Address</label>
            <Input type="email" placeholder="parent@example.com" value={parentEmail} onChange={e => setParentEmail(e.target.value)} />
            {error && <p className="text-loss text-sm">{error}</p>}
            <Button onClick={handleParentConsent} disabled={loading} className="w-full">
              {loading ? <Loader2 className="animate-spin" /> : "Send Request"}
            </Button>
          </div>
        </div>
      )
    }

    if (status === 'KYC_PENDING') {
      return (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-text-1">Verify Identity (KYC)</h3>
            <p className="text-text-3 text-sm mt-1">Link your Aadhaar via DigiLocker.</p>
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-text-2">Aadhaar Number (Mock)</label>
            <Input type="text" placeholder="1234 5678 9012" value={aadhaar} onChange={e => setAadhaar(e.target.value)} maxLength={12} />
            {error && <p className="text-loss text-sm">{error}</p>}
            <Button onClick={handleKYC} disabled={loading} className="w-full">
              {loading ? <Loader2 className="animate-spin" /> : "Verify with DigiLocker"}
            </Button>
          </div>
        </div>
      )
    }

    if (status === 'BROKER_PENDING') {
      return (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-text-1">Connect Your Broker</h3>
            <p className="text-text-3 text-sm mt-1">Select a broker to link your demat account.</p>
          </div>
          {error && <p className="text-loss text-sm text-center">{error}</p>}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-20" onClick={() => handleBrokerLink('ZERODHA')} disabled={loading}>Zerodha</Button>
            <Button variant="outline" className="h-20" onClick={() => handleBrokerLink('GROWW')} disabled={loading}>Groww</Button>
            <Button variant="outline" className="h-20" onClick={() => handleBrokerLink('ANGELONE')} disabled={loading}>Angel One</Button>
            <Button variant="outline" className="h-20" onClick={() => handleBrokerLink('UPSTOX')} disabled={loading}>Upstox</Button>
          </div>
        </div>
      )
    }

    if (status === 'UNLOCKED') {
      return (
        <div className="text-center py-8">
          <CheckCircle2 size={64} className="mx-auto text-profit mb-4" />
          <h3 className="text-2xl font-bold text-text-1">Real Investing Unlocked!</h3>
          <p className="text-text-3 mt-2">Your account is fully verified and linked to your broker. You can now trade real stocks on StockUp.</p>
          <Button onClick={onClose} className="mt-8 w-full">Go to Dashboard</Button>
        </div>
      )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-surface border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">Unlock Real Investing</DialogTitle>
          <DialogDescription className="text-text-3">
            Transition from virtual practice to real-world wealth generation.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  )
}
