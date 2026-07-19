'use client'

import { useEffect, useState, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { WelcomeModal } from './WelcomeModal'
import { SuccessModal } from './SuccessModal'
import { tourSteps } from './TourSteps'
import { useTourStore } from '@/store/useTourStore'

interface WelcomeQuestProps {
  initialHasCompleted: boolean
}

type TourStage = 'IDLE' | 'WELCOME' | 'TOUR' | 'SUCCESS'

export function WelcomeQuest({ initialHasCompleted }: WelcomeQuestProps) {
  const [stage, setStage] = useState<TourStage>('IDLE')
  const { isActive, endTour } = useTourStore()
  const hasMounted = useRef(false)

  // 1. Initial trigger logic (delayed by 1s)
  useEffect(() => {
    if (hasMounted.current) return
    hasMounted.current = true

    const localSkipped = localStorage.getItem('stockup_tour_completed')
    if (localSkipped === 'true') return

    if (!initialHasCompleted) {
      const timer = setTimeout(() => {
        setStage('WELCOME')
        recordAnalytics('started')
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [initialHasCompleted])

  // 2. Trigger from Settings (Zustand store)
  useEffect(() => {
    if (isActive && stage === 'IDLE') {
      setStage('WELCOME')
    }
  }, [isActive, stage])

  // API Analytics Call
  const recordAnalytics = async (status: 'started' | 'skipped' | 'completed') => {
    try {
      await fetch('/api/onboarding/tour', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
    } catch (error) {
      console.error('Failed to record tour status', error)
    }
  }

  // Handle Welcome Modal "Start"
  const handleStartTour = () => {
    setStage('TOUR')
    startDriver()
  }

  // Handle Welcome Modal "Skip"
  const handleSkipTour = () => {
    setStage('IDLE')
    endTour()
    localStorage.setItem('stockup_tour_completed', 'true')
    if (!initialHasCompleted) {
      recordAnalytics('skipped')
    }
  }

  // Handle Success Modal "Close/Start Learning"
  const handleCloseSuccess = () => {
    setStage('IDLE')
    endTour()
    localStorage.setItem('stockup_tour_completed', 'true')
  }

  // Initialize and run Driver.js
  const startDriver = () => {
    const driverObj = driver({
      showProgress: true,
      progressText: '{{current}} / {{total}}',
      animate: true,
      smoothScroll: true,
      allowClose: true, // click outside or esc
      allowKeyboardControl: true, // arrows, esc
      overlayColor: 'rgba(0, 0, 0, 0.7)',
      steps: tourSteps,
      onDestroyStarted: () => {
        // User clicked outside or esc or close button before finishing
        if (!driverObj.hasNextStep() || driverObj.isLastStep()) {
          driverObj.destroy()
        } else {
          // If they skip mid-way
          driverObj.destroy()
          setStage('IDLE')
          endTour()
          localStorage.setItem('stockup_tour_completed', 'true')
          if (!initialHasCompleted) recordAnalytics('skipped')
        }
      },
      onPopoverRender: (popover, { state }) => {
        // Add custom finish button logic
        if (driverObj.isLastStep()) {
          const nextBtn = popover.nextButton
          if (nextBtn) {
            nextBtn.innerText = 'Finish'
            nextBtn.onclick = () => {
              driverObj.destroy()
              setStage('SUCCESS')
              localStorage.setItem('stockup_tour_completed', 'true')
              if (!initialHasCompleted) recordAnalytics('completed')
            }
          }
        }
      }
    })

    driverObj.drive()
  }

  if (stage === 'IDLE') return null

  return (
    <AnimatePresence>
      {stage === 'WELCOME' && (
        <WelcomeModal onStart={handleStartTour} onSkip={handleSkipTour} />
      )}
      {stage === 'SUCCESS' && (
        <SuccessModal onClose={handleCloseSuccess} />
      )}
    </AnimatePresence>
  )
}
