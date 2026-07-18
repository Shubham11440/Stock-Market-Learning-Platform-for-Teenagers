'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { GoogleButton } from '@/components/auth/GoogleButton'
import { OTPInput } from '@/components/auth/OTPInput'
import Link from 'next/link'
import toast from 'react-hot-toast'

type AuthState = 'EMAIL' | 'OTP'

export default function SignupPage() {
  const router = useRouter()
  const [state, setState] = useState<AuthState>('EMAIL')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (countdown > 0) {
      timerRef.current = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [countdown])

  const handleSendOTP = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please enter a valid email address.')
      return
    }

    setIsLoading(true)
    setErrorMsg('')

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (!res.ok) {
        if (data.error === 'RATE_LIMITED') {
          setErrorMsg(`Too many requests. Please try again in ${Math.ceil(data.retryAfter / 60)} minutes.`)
        } else {
          setErrorMsg('Failed to send code. Please try again.')
        }
        return
      }

      setState('OTP')
      setCountdown(60)
      setOtp('')
    } catch (err) {
      setErrorMsg('A network error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async (code: string) => {
    if (code.length !== 6) return
    setIsLoading(true)
    setErrorMsg('')

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: code }),
      })
      const data = await res.json()

      if (!res.ok) {
        if (data.error === 'TOO_MANY_ATTEMPTS') {
          setErrorMsg(`Too many attempts. Please try again in ${Math.ceil(data.retryAfter / 60)} minutes.`)
        } else {
          setErrorMsg('Invalid or expired code.')
        }
        setOtp('')
        return
      }

      toast.success('Account created successfully!')
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setErrorMsg('A network error occurred. Please verify your connection.')
      setOtp('')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpChange = (val: string) => {
    setOtp(val)
    if (val.length === 6) {
      handleVerifyOTP(val)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto relative">
      <div aria-live="assertive" className="sr-only">
        {errorMsg}
      </div>

      <AnimatePresence mode="wait">
        {state === 'EMAIL' ? (
          <motion.div
            key="email-state"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-display font-semibold text-text-1 mb-2">Create an account</h1>
              <p className="text-text-2 text-sm">Join StockUp and start your trading journey today.</p>
            </div>

            <div className="space-y-6">
              <GoogleButton />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-bg px-2 text-text-3">or continue with email</span>
                </div>
              </div>

              <form onSubmit={handleSendOTP} className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-medium text-text-2">Email address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => {
                       setEmail(e.target.value)
                       setErrorMsg('')
                    }}
                    placeholder="you@example.com"
                    className="w-full h-11 px-4 rounded-xl border border-border bg-surface-2 text-text-1 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors disabled:opacity-50"
                  />
                  {errorMsg && <p className="text-loss text-xs mt-1 font-medium">{errorMsg}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full h-11 rounded-xl bg-primary text-white font-medium text-sm transition-colors hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Send code'}
                </button>
              </form>
            </div>

            <p className="mt-8 text-center text-sm text-text-2">
              Already have an account?{' '}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Log in
              </Link>
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="otp-state"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
             <div className="mb-8">
              <button 
                onClick={() => {
                  setState('EMAIL')
                  setErrorMsg('')
                  setOtp('')
                }}
                className="text-text-3 hover:text-text-1 transition-colors text-sm font-medium mb-4 flex items-center gap-1"
              >
                ← Back
              </button>
              <h1 className="text-3xl font-display font-semibold text-text-1 mb-2">Check your email</h1>
              <p className="text-text-2 text-sm">We've sent a 6-digit code to <span className="font-medium text-text-1">{email}</span>.</p>
            </div>

            <div className="space-y-6">
               <div className="flex justify-center">
                 <OTPInput 
                   value={otp} 
                   onChange={handleOtpChange} 
                   disabled={isLoading}
                   error={!!errorMsg} 
                 />
               </div>
               
               {errorMsg && <p className="text-loss text-sm text-center font-medium">{errorMsg}</p>}

               <div className="text-center text-sm">
                 <button 
                   onClick={handleSendOTP}
                   disabled={countdown > 0 || isLoading}
                   className="text-primary font-medium disabled:text-text-3 transition-colors hover:underline"
                 >
                   {countdown > 0 ? `Resend code in ${countdown}s` : 'Resend code'}
                 </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
