'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lesson } from '@/lib/content/schema'
import { LessonSlide } from './LessonSlide'
import { QuizScreen } from './QuizScreen'
import { XPCelebration } from './XPCelebration'
import { saveLessonProgress } from '@/actions/progress'
import { Loader2 } from 'lucide-react'

export function LessonViewer({ lesson, levelId }: { lesson: Lesson, levelId: string }) {
  const router = useRouter()
  
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [showQuiz, setShowQuiz] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  
  // Celebration state (Optimistic UI)
  const [celebrationData, setCelebrationData] = useState<{
    xpEarned: number,
    isLevelUp: boolean,
    newLevel: number
  } | null>(null)

  const isLastSlide = currentSlideIndex === lesson.slides.length - 1

  const nextSlide = () => {
    if (isLastSlide) {
      if (lesson.quiz && lesson.quiz.length > 0) {
        setShowQuiz(true)
      } else {
        // No quiz, just finish
        handleFinish(0) // 0 correct answers, 0 total
      }
    } else {
      setDirection(1)
      setCurrentSlideIndex(i => i + 1)
    }
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentSlideIndex(i => i - 1)
  }

  const handleFinish = async (score: number) => {
    setIsSaving(true)
    try {
      const result = await saveLessonProgress(
        levelId,
        lesson.id, 
        score, 
        lesson.quiz?.length || 0, 
        lesson.xpReward
      )

      if (result.success) {
        setCelebrationData({
          xpEarned: result.xpEarned,
          isLevelUp: result.leveledUp,
          newLevel: result.newLevel
        })
      }
    } catch (err) {
      console.error(err)
      alert("Failed to save progress. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isSaving) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-text-2">Saving your progress...</p>
      </div>
    )
  }

  return (
    <>
      {!showQuiz ? (
        <LessonSlide
          slide={lesson.slides[currentSlideIndex]}
          isFirst={currentSlideIndex === 0}
          isLast={isLastSlide}
          onNext={nextSlide}
          onPrev={prevSlide}
          direction={direction}
        />
      ) : (
        <QuizScreen
          questions={lesson.quiz!}
          onComplete={handleFinish}
        />
      )}

      {celebrationData && (
        <XPCelebration
          xpEarned={celebrationData.xpEarned}
          isLevelUp={celebrationData.isLevelUp}
          newLevel={celebrationData.newLevel}
          onContinue={() => {
            // Navigate back to the level overview
            router.push(`/dashboard/learn/${levelId}`)
          }}
        />
      )}
    </>
  )
}
