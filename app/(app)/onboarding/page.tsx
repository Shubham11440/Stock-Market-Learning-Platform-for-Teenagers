'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { Target, TrendingUp, Shield, BookOpen } from 'lucide-react'

import { OnboardingProgress } from '@/components/auth/OnboardingProgress'
import { GoalCard } from '@/components/auth/GoalCard'
import { AvatarSelector } from '@/components/auth/AvatarSelector'

const GOALS = [
  { id: 'SAVE', title: 'Save Money', description: 'Build a safety net and start growing wealth.', icon: <Shield size={24} /> },
  { id: 'INVEST', title: 'Long-term Investing', description: 'Understand compounding and fundamental analysis.', icon: <TrendingUp size={24} /> },
  { id: 'TRADE', title: 'Active Trading', description: 'Learn charts, technicals, and short-term moves.', icon: <Target size={24} /> },
  { id: 'LEARN', title: 'Just Learning', description: 'Starting from zero. Teach me the basics.', icon: <BookOpen size={24} /> },
]

const STREAK_GOALS = [5, 10, 20]

export default function OnboardingPage() {
  const router = useRouter()
  const { update: updateSession } = useSession()
  
  const [step, setStep] = useState(1)
  const [goalType, setGoalType] = useState<string | null>(null)
  const [image, setImage] = useState<string>('avatar_1')
  const [streakGoal, setStreakGoal] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDone, setIsDone] = useState(false)

  // Wait 2.5s on the welcome screen then redirect
  useEffect(() => {
    if (isDone) {
      const t = setTimeout(() => {
        router.push('/dashboard')
        router.refresh()
      }, 2500)
      return () => clearTimeout(t)
    }
  }, [isDone, router])

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1)
      return
    }

    // Submit
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/onboarding', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goalType, image, streakGoal }),
      })

      if (!res.ok) throw new Error('Failed to save onboarding data')

      // Refresh session JWT so middleware knows we are onboarded
      await updateSession({ goalType })
      setIsDone(true)
    } catch (err) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  }

  if (isDone) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh text-center w-full max-w-md mx-auto">
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 flex justify-center">
           {/* Simple CSS Confetti */}
           {Array.from({ length: 50 }).map((_, i) => (
             <div 
               key={i}
               className="absolute w-2 h-2 rounded-sm"
               style={{
                 left: `${Math.random() * 100}%`,
                 top: `-5%`,
                 backgroundColor: ['#7C3AED', '#10B981', '#F59E0B', '#3B82F6'][Math.floor(Math.random() * 4)],
                 animation: `fall ${Math.random() * 2 + 1}s linear forwards ${Math.random() * 2}s`
               }}
             />
           ))}
           <style>{`
             @keyframes fall {
               to { transform: translateY(110vh) rotate(720deg); opacity: 0; }
             }
           `}</style>
        </div>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="relative z-10"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
            🚀
          </div>
          <h1 className="text-3xl font-display font-bold text-text-1 mb-3">Welcome to StockUp</h1>
          <p className="text-text-2 mb-8">Your ₹1,00,000 virtual portfolio is ready.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="text-sm font-medium text-primary hover:underline"
          >
            Let's go →
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 flex flex-col h-full min-h-[500px]">
      <div className="mb-10 mt-4">
        <OnboardingProgress total={3} current={step} />
      </div>

      <div className="flex-1 relative">
        <AnimatePresence mode="wait" custom={1}>
          
          {step === 1 && (
            <motion.div
              key="step1"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <h2 className="text-3xl font-display font-semibold mb-2">What's your vibe?</h2>
              <p className="text-text-2 text-sm mb-8">Pick your primary financial goal. You can change this later.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {GOALS.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    id={goal.id}
                    title={goal.title}
                    description={goal.description}
                    icon={goal.icon}
                    selected={goalType === goal.id}
                    onClick={() => setGoalType(goal.id)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <h2 className="text-3xl font-display font-semibold mb-2">Pick your avatar</h2>
              <p className="text-text-2 text-sm mb-8">Choose how you want to appear on the leaderboard.</p>
              
              <AvatarSelector selected={image} onSelect={setImage} />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <h2 className="text-3xl font-display font-semibold mb-2">How much time?</h2>
              <p className="text-text-2 text-sm mb-8">Set a daily commitment to keep your learning streak alive.</p>
              
              <div className="space-y-3">
                {STREAK_GOALS.map((mins) => (
                  <button
                    key={mins}
                    onClick={() => setStreakGoal(mins)}
                    className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-colors ${
                      streakGoal === mins
                        ? 'bg-primary border-primary text-white'
                        : 'bg-surface-2 border-border text-text-1 hover:border-text-3'
                    }`}
                  >
                    <span className="font-semibold text-lg">{mins} minutes / day</span>
                    {streakGoal === mins && (
                      <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-primary rounded-full" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-auto pt-10 flex items-center justify-between">
        <button
          onClick={handleBack}
          className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${
            step === 1 ? 'opacity-0 pointer-events-none' : 'text-text-3 hover:text-text-1 hover:bg-surface-2'
          }`}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={isSubmitting || (step === 1 && !goalType) || (step === 3 && !streakGoal)}
          className="bg-primary text-white px-8 py-3 rounded-full text-sm font-medium transition-colors hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? 'Saving...' : step === 3 ? 'Finish' : 'Continue'}
        </button>
      </div>
    </div>
  )
}
